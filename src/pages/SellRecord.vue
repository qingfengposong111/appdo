<template>
  <div>
   <!-- <div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="退租记录" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <!--记录-->
    <div style="width: 100%;height: 50px;"></div>
    <div class="main-content-flex" v-if="dataList.length>0">
      <!-- copy部分 -->
      <MeScroll ref="mescroll" class="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div style="width: 100%;height: 1px;"></div>
      <div class="copy-main-flex row flex-box-center" v-for="(item,index) in dataList" :key="index" @click="toMessage(item.id)" v-if="item.type==='sell'">
        <div class="column">
          <div class="font14">退租AP</div>
          <div class="font10">{{item.finishTime | formatDate}}</div>
        </div>
        <div class="column two-flex-view-this">
          <div class="font10" style="margin-top: 2px;">+{{item.number}}</div>
        </div>
        <div class="right-common-flex"></div>
      </div>
      </MeScroll>
    </div>
    <div class="weui-tab__bd-item" v-else>
      <div class="none-flex-view flex-justify-center column">
        <div class="none-icon-flex"></div>
        <div class="font13">暂无数据</div>
      </div>
    </div>
  </div>
</template>
<script>
  import Util from './../common/util';
  import MeScroll from 'mescroll.js/mescroll.vue'
  import 'mescroll.js/mescroll.min.css'
  export default{
    components: {
      MeScroll
    },
    data () {
      return {
        pageSize: 20,
        mescroll: null,
        mescrollDown: {
          callback: this.downCallback,
        },
        mescrollUp: {
          callback: this.upCallback,
          page: {
            num: 0,
            size: 20
          },
          htmlNodata: '<p class="upwarp-nodata">-- 加载完成 --</p>'
        },
        dataList: [],
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
        return YY + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
      },
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      toMessage (id) {
        this.$router.push('/SellMessage/'+id);
      },
      mescrollInit (mescroll) {// mescroll组件初始化的回调,可获取到mescroll对象
        this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },
      upCallback(page){
        let that = this;
        const currIndex = (page.num) * this.pageSize;
        Util.ajax.post('/api/order', {
          start: currIndex,
          length: page.size,
          status: 'finish',
          type: 'sell'
        }).then((res) => {
          if (res.data.status === 200){
            if (currIndex < res.data.data.pager.totalNum) {
              let arr=res.data.data.data;
              this.dataList = this.dataList.concat(arr);
              //page.num = page.size*page.num;
              //隐藏下拉刷新的状态
              let nums = this.dataList.length/this.mescrollUp.page.size;
              let hasNext;
              if(nums<res.data.data.pager.totalNum){
                hasNext=true;
              }else{
                hasNext=false;
              }
              this.$nextTick(() => {
                this.mescroll.endSuccess(arr.length, hasNext);
              })
            }else{
              this.mescroll.endSuccess(res.data.data.pager.totalNum, false);
            }
          }
        }).catch(() => this.mescroll.endErr());

      },

      downCallback () {
        const pageStart = 0;
        if (pageStart === 0 && this.dataList.length == 0) {
          Util.ajax.post('/api/order', {
            start: pageStart,
            length: this.mescrollUp.page.size,
            status: 'finish',
            type: 'sell'
          }).then((res) => {
            if (res.data.status === 200) {
              let arr=res.data.data.data;
              this.dataList = this.dataList.concat(arr);
              this.mescroll.endSuccess();
            }
          }).catch(() => this.mescroll.endErr());

        } else {
          this.mescroll.endSuccess();
        }
      },
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
      setTimeout(function(){
        that.$bus.$emit('loading', false);
      },600);
      /*that.info();*/
      that.downCallback()
    }
  }
</script>
<style scoped>
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  .main-content-flex {
    width: 86%;
    padding: 0 7%;
    height: auto;
    background: #fff;
  }

  .copy-main-flex {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 0;
    height: auto;
    position: relative;
    border-bottom: 1px solid #efefef;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  .font14 {
    font-size: 14px !important;
  }

  .font10 {
    font-size: 10px;
  }

  .two-flex-view-this {
    position: absolute;
    right: 5%;
    text-align: right;
    padding-right: 3px;
  }

  .right-common-flex {
    width: 15px;
    height: 15px;
    background-image: url(./../../static/images/icon/grzx/right.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    position: absolute;
    right: 0;
  }
  .none-flex-view {
    width: 100%;
    height: 80%;
    text-align: center;
    position: absolute;
    top: 40%;
  }

  .none-icon-flex {
    width: 100px;
    height: 100px;
    background-image: url(./../../static/images/icon/djsc/none.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin: 0 auto 10px;
  }
</style>
