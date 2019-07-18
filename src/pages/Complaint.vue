<template>
  <div>
    <!--<div
      style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="投诉信息" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <div class="head-zw"></div>
    <!-- main  有数据的情况-->
    <div class="main-this-galley" v-show="dataList.length>0">
      <!-- 占位 -->
      <div class="footprint"></div>
      <!-- copy -->
      <MeScroll ref="mescroll" class="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="copy-this-flex-view column font14" v-for="(item,index) in dataList" :key="index"
             @click="detail(item.id)">
          <div class="wrap-row"><!--<span>内容： </span>--><span style="color:#333;">{{item.content}}</span> <span>{{item.time|formatDate}}</span></div>
        </div>
      </MeScroll>

    </div>

    <!-- main 没有的情况 -->
    <div class="main-none-flex column flex-justify-center" v-show="dataList.length===0">
      <div class="none-icon-flex"></div>
      <div class="font13 marginTop">暂无消息</div>
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
        pageSize: 10,
        mescroll: null,
        mescrollDown: {
          callback: this.downCallback,
        },
        mescrollUp: {
          callback: this.upCallback,
          page: {
            num: 0,
            size: 9
          },
          htmlNodata: '<p class="upwarp-nodata">-- 加载完成 --</p>'
        },
        dataList: [],
      }
    },
    filters: {
      formatDate: function (value) {
        let val = JSON.parse(value*1000);
        let date = new Date(val);
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
        return YY + '-' + MM + '-' + d + ':' + h + ':' + m + ':' + s
      }
    },
    methods: {
      mescrollInit (mescroll) {// mescroll组件初始化的回调,可获取到mescroll对象
        this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },
      upCallback(page){
        const currIndex = (page.num) * this.pageSize;

        Util.ajax.post('/api/complaint', {
          start: currIndex,
          length: page.size
        }).then((res) => {
          if (res.data.status === 200) {
            if (currIndex < res.data.data.pager.totalNum) {
              let arr = res.data.data.data;
              this.dataList = this.dataList.concat(arr);
              //page.num = page.size*page.num;
              //隐藏下拉刷新的状态
              let hasNext = this.dataList.length < res.data.data.pager.totalNum;
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
          Util.ajax.post('/api/complaint', {
            start: pageStart,
            length: this.mescrollUp.page.size,
          }).then((res) => {
            if (res.data.status === 200) {
              let arr = res.data.data.data;
              this.dataList = this.dataList.concat(arr);
              this.mescroll.endSuccess();
            }
          }).catch(() => this.mescroll.endErr());

        } else {
          this.mescroll.endSuccess();
        }
      },
      goBack(){
        this.$router.go('-1')
      },
      detail(id){
        this.$router.push('/ComplaintDetail/' + id)
      }
    },
    created()
    {
      this.$bus.$emit('loading', true);
      let that = this;
      setTimeout(function () {
        that.$bus.$emit('loading', false);
      }, 600);
    }
  }
</script>
<style scoped>
  .mescroll {
    position: fixed;
    top: 70px!important;
    bottom: 0;
    height: auto;
    background: #fff !important;
  }

  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  .font14 {
    font-size: 14px !important;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  .wrap-row {
    width: 96%;
    word-wrap: break-word;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    margin: 0 2%;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background: #fff;
    border-bottom: 1px solid #d4d4d4;
  }
  .wrap-row>span:nth-child(1){
    color: rgb(51, 51, 51);
    display: block;
    overflow: hidden;
    width: 70%;
    text-overflow: ellipsis;
  }
  .wrap-row>span:nth-child(2){
    position: absolute;
    right: 10px;
    top: 10px;
    color:#999;
    font-size: 10px;
  }

  .footprint {
    width: 100%;
    height: 10px;
  }

  /* main */
  .main-this-galley {
    width: 100%;
    height: auto;
  }

  .copy-this-flex-view {
    width: 100%;
    background: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    /* margin: 0 2%; */
    height: 50px;
    line-height: 50px;

  }

  .color-and-padding {
    color: #999;
    margin: 10px 0;
  }

  /* 没有数据的情况 */
  .main-none-flex {
    width: 100%;
    height: 80%;
  }

  .color-red-flex {
    color: red;
  }

  .none-icon-flex {
    width: 100px;
    height: 100px;
    background-image: url('./../../static/images/icon/djsc/none.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin: 50% auto 0;
  }

  .marginTop {
    margin: 10px auto;
    color: #666;
  }
</style>
