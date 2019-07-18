<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="消息" class="header">
      <mt-button slot="left" @click="goBack" icon="back">返回</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <div class="head-zw"></div>
    <!-- main -->
    <div class="main-this-galley">
      <div class="common-view-flex-this row flex-box-center" @click="toOrder">
        <div class="icon-flex-this-view" style="background-image:url('static/images/icon/dl/icon01.png')"></div>
        <div>订单消息</div>
      </div>
      <div class="common-view-flex-this row flex-box-center" @click="toSys">
        <div class="icon-flex-this-view" style="background-image:url('static/images/icon/dl/icon02.png')"></div>
        <div>新闻公告</div>
      </div>
      <div class="common-view-flex-this row flex-box-center" @click="toLeavMessage">
        <div class="icon-flex-this-view" style="background-image:url('static/images/icon/dl/info.png')"></div>
        <div>留言信息</div>
      </div>
      <div class="common-view-flex-this row flex-box-center" @click="toComplaint">
        <div class="icon-flex-this-view" style="background-image:url('static/images/icon/dl/complain.png')"></div>
        <div>投诉信息</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {}
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
      setTimeout(function(){
        that.$bus.$emit('loading', false);
      },600);
    },
    methods: {
      toOrder () {
        this.$router.push('/OrderMessage')
      },
      toSys () {
        this.$router.push('/Sys')
      },
      toComplaint(){
        this.$router.push('/Complaint');
      },
      goBack(){
        this.$router.go('-1')
      },
      toLeavMessage(){
        this.$router.push('/LeavMessage')
      }
    }
  }
</script>
<style scoped>
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  .flex-box-center {
    display: flex;
    align-items: center;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  /* main */
  .main-this-galley {
    width: 100%;
    height: auto;
    background: #fff;
  }

  .common-view-flex-this {
    width: 86%;
    padding: 15px 7%;
    height: auto;
    border-bottom: 1px solid #efefef;
  }

  .icon-flex-this-view {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
</style>
