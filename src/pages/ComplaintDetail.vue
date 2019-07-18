<template>
  <div style="height: 90%;">
   <!-- <div
      style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="投诉详情" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <div class="head-zw"></div>
    <!-- main  有数据的情况-->
    <div class="main-this-galley" v-show="info!=={}">
      <!-- copy -->
      <div class="copy-this-flex-view column font14">
        <div><span>投诉:</span></div>
        <div class="doflex padding-10"><span>投诉帐户：</span><span>{{info.toUsername}}</span></div>
        <div class="doflex padding-10"><span>订单编号：</span><span>{{info.orderNumber}}</span></div>
        <div class="doflex padding-10"><span>时间：</span><span>{{info.time|formatDate}}</span></div>
        <div  class="wrap-row padding-10">内容：
        <span style="color:#000!important;">{{info.content}}</span></div>
        <div v-if="info.reply!==''">
          <div>回复信息:</div>
          <div class="doflex padding-10"><span>时间：</span><span>{{info.replyTime |formatDate}}</span></div>
          <div class=" wrap-row padding-10"> 内容：
          <span class="color-red-flex">{{info.reply}}</span></div>
        </div>
        <div class="padding-10" v-else style="display:inline-block;">
          暂无回复
         </div>
      </div>

    </div>

    <!-- main 没有的情况 -->
    <div class="main-none-flex column flex-justify-center" v-show="info === {}">
      <div class="none-icon-flex"></div>
      <div class="font13 marginTop">暂无消息</div>
    </div>
  </div>
</template>
<script>
  import Util from './../common/util';
  import TostUtil from './../common/tostUtil';
  export default{
    data () {
      return {
        info:{}
      }
    },
    filters: {
      formatDate: function (value) {
        let date = new Date(Number(value)*1000);
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
        return YY+'-'+MM + '-' + d + ':' + h + ':'+ m + ':' +s
      },
      yuan: function (value) {
        return isNaN(value) ? 0.00 : parseFloat((value/100).toFixed(2)).toFixed(2);
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      messageDetail(){
        Util.ajax.getByForm('/api/complaint/show', {
          params: {
            key: 'id',
            value:this.$route.params.id
          }
        }).then(res => {
          if (res.data.status === 200) {
            this.info=res.data.data;
            this.$bus.$emit('loading', false);
          }else{
            this.$bus.$emit('loading', false);
            TostUtil.tostTop(res.data.message);
          }
          this.$bus.$emit('loading', false);
        }).catch(err=>{
          this.$bus.$emit('loading', false);
          TostUtil.tostTop('网络出错,请稍后重试!')
        })
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that = this;
      /*setTimeout(function () {
        that.$bus.$emit('loading', false);
      }, 800);*/
      that.messageDetail();
    }
  }
</script>
<style scoped>
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }
  .font14 {
    font-size: 14px !important;
  }
  .padding-10{
    padding: 10px 0;
    border-bottom:1px solid #f7f7f7;
  }
  .column {
    display: flex;
    flex-direction: column;
  }
  .wrap-row{
    width:100%;
    word-wrap: break-word;
    word-break:break-all;
    /*text-indent:2em;*/
  }
  .padding-10{
    padding: 10px 0;
    border-bottom:1px solid #f7f7f7;
  }
  .footprint {
    width: 100%;
    height: 10px;
  }

  /* main */
  .main-this-galley {
    width: 100%;
    height: 95%;
    /*background: #fff;*/
  }

  .copy-this-flex-view {
    width: 100%;
    background: #fff;
    padding: 10px 5%;
    box-sizing: border-box;

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
    background-image: url('/static/images/icon/djsc/none.png');
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
