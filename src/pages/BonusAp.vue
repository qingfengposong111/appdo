<template>
  <div>
    <!--<div
      style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="分红中的AP" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <div class="head-zw"></div>
    <!-- main -->
    <MeScroll ref="mescroll" class="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class=" single flex-box" v-for="(item,index) in dataList" :key="index">
        <div class="flex-1" style="color:#5d0e13;">{{item.total}} AP</div>
        <div class="flex-1 font13 days-com-flex flex-box-center">分红天数:{{item.count}}天</div>
        <div class="flex-1 flex-right ">
          <div class="btn-get-flex font13 flex-box-center empty" v-if="(!item.flagTime)||(item.count<7)"  @click="toGet(item.number,item.count,item.id)">提取</div>
          <div class="btn-get-flex font13 flex-box-center permit" v-else-if="(item.count>=7)&&(item.flagTime)"  @click="toGet(item.number,item.count,item.id)">提取</div>
        </div>
      </div>
    </MeScroll>
    <!-- popup -->
    <div class="popup" v-show="choose">
      <div class="popup-class-flex">
        <div class="update-title-view">提取分红确认</div>
        <div class="version-flex-view">
          提出分红会把同一时间所有分红全部提取，您确定提取吗？
        </div>
        <div class="update-btn-view flex-box">
          <div class="flex-1 font13" @click="">
            <div class="save-flex-btn" @click="toSunmission">提交</div>
          </div>
          <div class="flex-1 font13 flex-right" @click="">
            <div class="del-flex-btn" @click="toClose">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  import MeScroll from 'mescroll.js/mescroll.vue'
  import 'mescroll.js/mescroll.min.css'
  export default{
    components: {
      MeScroll
    },
    data () {
      return {
        APNumber: 0,
        choose: false,
        times: 0,//生长天数
        flagTime: false,//判断是否改变按钮样式
        pageSize: 200,
        mescroll: null,
        mescrollDown: {
          callback: this.downCallback,
        },
        mescrollUp: {
          callback: this.upCallback,
          page: {
            num: 0,
            size: 200
          },
          htmlNodata: '<p class="upwarp-nodata">-- 加载完成 --</p>'
        },
        dataList: [],
        id: null,//提取项的id
        minDay: 0
      }
    },
    filters: {
      formatDate: function (value) {
        let date = new Date(Number(value) * 1000);
        let YY = date.getFullYear();
        let MM = date.getMonth() + 1;
        let d = date.getDate();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        MM = MM < 10 ? ('0' + MM) : MM;
        d = d < 10 ? ('0' + d) : d;
        h = h < 10 ? ('0' + h) : h;
        m = m < 10 ? ('0' + m) : m;
        s = s < 10 ? ('0' + s) : s;
        return d
      },

      formatLeftDate: function (leftMs) {
        let totalSeconds = leftMs / 1000;
        let h = Math.floor(totalSeconds / (60 * 60));
        totalSeconds = totalSeconds - h * 60 * 60;
        let m = Math.floor(totalSeconds / 60);
        totalSeconds = totalSeconds - m * 60;
        let s = Math.floor(totalSeconds);

        h = h < 10 ? ('0' + h) : h;
        m = m < 10 ? ('0' + m) : m;
        s = s < 10 ? ('0' + s) : s;
        return ' ' + h + ':' + m + ':' + s
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      mescrollInit (mescroll) {// mescroll组件初始化的回调,可获取到mescroll对象
        this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },
      upCallback(page){
        let that = this;
        const currIndex = (page.num) * that.pageSize;
        Util.ajax.post('/api/seed', {
          start: currIndex,
          length: page.size
        }).then((res) => {
          if (res.data.status === 200) {
            if (currIndex < res.data.data.pager.totalNum) {
              let arr1 = res.data.data.data, arr = [];
              arr1.forEach((item, index) => {
                if ((item.status==='growing')&&(item.harvestTime==="0")) {
                  arr.push(item);
                }
              });
              let time24ms = 24 * 3600 * 1000;
              if (that.growTimer != null) {
                clearInterval(that.growTimer);
              }
              that.growTimer = setInterval(() => {
                for (let i = 0; i < arr.length; i++) {
                  let curGrow = arr[i];
                  let sowingTime = Number(curGrow.time) * 1000;//播种时间
                  if (!curGrow.hasOwnProperty("sowingTime")) {
                    let sowingOffsetTime = (Date.now() - sowingTime);//从播种到现在已经过去的毫秒时间
                    if(!curGrow.hasOwnProperty('flagTime')){
                      curGrow.flagTime=false;
                    }
                    if (!curGrow.hasOwnProperty("count")) {
                      curGrow.count = Math.floor(sowingOffsetTime / (1000 * 24 * 3600))
                      if ((curGrow.count >= 7) && (curGrow.number > 0)) {//
                        curGrow.flagTime = true;
                        //提示可以收割
                      }else{
                        curGrow.flagTime = false;
                      }
                    }
                  }
                  if (!curGrow.hasOwnProperty('total')) {
                    curGrow.total = (Number(curGrow.number) + Number(curGrow.harvestNumber)).toFixed(4);
                  }
                }
                that.dataList = arr;
              }, 1000);
              that.dataList = that.dataList.concat(arr);
              //page.num = page.size*page.num;
              //隐藏下拉刷新的状态
              let nums = that.dataList.length / that.mescrollUp.page.size;
              let hasNext;
              if (nums < res.data.data.pager.totalNum) {
                hasNext = true;
              } else {
                hasNext = false;
              }
              /*let hasNext = this.dataList.length < res.data.data.pager.totalNum;*/
              that.$nextTick(() => {
                that.mescroll.endSuccess(arr.length, hasNext);
              })
            } else {
              that.mescroll.endSuccess(res.data.data.pager.totalNum, false);
            }
          }
        }).catch(() => that.mescroll.endErr());

      },

      downCallback () {
        const pageStart = 0;
        let that = this;
        if (pageStart === 0 && that.dataList.length == 0) {
          Util.ajax.post('/api/seed', {
            start: pageStart,
            length: that.mescrollUp.page.size,
          }).then((res) => {
            if (res.data.status === 200) {
              let arr1 = res.data.data.data, arr = [];
              arr1.forEach((item, index) => {
                if ((item.status==='growing')&&(item.harvestTime==="0")) {
                  arr.push(item);
                }
              });
              let time24ms = 7 * 24 * 3600 * 1000;
              if (that.growTimer != null) {
                clearInterval(that.growTimer);
              }
              that.growTimer = setInterval(() => {
                for (let i = 0; i < arr.length; i++) {
                  let curGrow = arr[i];
                  let sowingTime = Number(curGrow.time) * 1000;//播种时间
                  if (!curGrow.hasOwnProperty("sowingTime")) {
                    let sowingOffsetTime = (Date.now() - sowingTime);//从播种到现在已经过去的毫秒时间
                    if(!curGrow.hasOwnProperty('flagTime')){
                      curGrow.flagTime=false;
                    }
                    if (!curGrow.hasOwnProperty("count")) {
                      curGrow.count = Math.floor(sowingOffsetTime / (1000 * 24 * 3600))
                      if ((curGrow.count >= 7) && (curGrow.number > 0)) {
                        curGrow.flagTime = true;
                        //提示可以收割
                      }else{
                        curGrow.flagTime = false;
                      }
                    }
                  }
                  if (!curGrow.hasOwnProperty('total')) {
                    curGrow.total = (Number(curGrow.number) + Number(curGrow.harvestNumber)).toFixed(4);
                  }
                }
                that.dataList = arr;
              }, 1000);

              that.dataList = that.dataList.concat(arr);
              that.mescroll.endSuccess();
            }
          }).catch(() => that.mescroll.endErr());

        } else {
          that.mescroll.endSuccess();
        }
      },
      toGet (number, count, id) {
        this.id = id;
        if ((count >= 7) && (number > 0)) {//若AP数量大于0并且生长天数大于等于最小收割天数，则表示可以提取
          this.choose = true;
        } else if (number <= 0) {//否则不能提取
          TostUtil.tostTop('暂无分红中的AP！');
          this.choose = false;
        } else if (number < 7) {
          TostUtil.tostTop('最低分红7天方可提取！');
        }
      },
      toSunmission () {
        Util.ajax.post('/api/seed/harvest', {
          Id: this.id
        }).then(res => {
          if (res.data.status === 200) {
            this.$router.go('-1');
          }
          TostUtil.tostTop(res.data.message);
          this.choose = !this.choose;
        })
        /*
         */
      },
      toClose () {
        TostUtil.tostTop('已取消！');
        this.choose = !this.choose
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that = this;
      setTimeout(function () {
        that.$bus.$emit('loading', false);
      }, 1200);
      /*Util.ajax.getByForm('/api/setting', {
        params: {
          group: 'speed'
        }
      }).then(res => {
        let arr = res.data.data;
        arr.forEach(item => {
          if ((item.key === 'min_day')) {
            that.minDay = parseInt(item.value);
          }
        })

      });*/
    }
  }
</script>
<style scoped>
  .header {

    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
    /*position:fixed;
    width:100%;
    z-index:10000;*/
  }

  .main-content-view {
    padding: 7px 7%;
    background: #fff;
    color: #333;

  }

  .main-content-view {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 10px 20px;
    margin-bottom: 10px;
    position: relative;
  }

  .flex-box {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  }

  .flex-1 {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    flex-wrap: wrap;
  }

  .days-com-flex {
    border-left: 1px solid #fff;
    padding-left: 5%;
    height: 20px;
  }

  .font13 {
    font-size: 14px !important;
  }

  .flex-box-center {
    display: flex;
    align-items: center;
  }

  .flex-right {
    display: flex;
    justify-content: flex-end;
  }

  .btn-get-flex {
    padding: 5px 15px;
    border-radius: 5px;
  }

  .empty {
    background: #ccc;
    color: #333;
  }

  .permit {
    background: #f1b048;
    color: #5D0E13;
  }

  .popup {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
  }
  .popup-class-flex {
    width: 60%;
    height: auto;
    background: #5D0E13;
    border-radius: 5px;
    position: absolute;
    left: 20%;
    top: 35%;
  }
  .update-title-view {
    color: #fff;
    font-size: 16px;
    padding: 5px 0;
    text-align: center;
  }
  .version-flex-view {
    color: #fff;
    font-size: 13px;
    padding: 5px 7%;
  }
  .update-btn-view {
    width: 90%;
    padding: 5px 5% 10px;
  }
  .save-flex-btn {
    background: #F1CA8F;
    color: #5D0E13;
    border-radius: 5px;
    width: 50%;
    padding: 5px 0;
    text-align: center;
    /*margin: 0 auto;*/
  }
  .del-flex-btn {
    background: #4D4D4D;
    color: #fff;
    border-radius: 5px;
    width: 50%;
    padding: 5px 0;
    text-align: center;
  }

  .single {
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 10px 20px;
  }
</style>
