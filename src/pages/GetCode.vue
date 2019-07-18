<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="激活码如何获得" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <!-- 说明 -->
    <div class="input-name-flex">
      <div class="input-div-view">
        200元每个(新注册账号需要一个激活码激活。激活后立即返0.2个AP即400元到用户的希望钱包)
      </div>
    </div>
    <!-- 如何获得 -->
    <div class="how-flex-get row">
      <div class="message-title-view row">
        <div class="left-view-message row">
          <div class="padding-font-view">如何获得:</div>
          <div class="row">
            <div class="icon-message-flex" style="background-image:url('/static/images/icon/jhmrhhd/one.png')"></div>
            <div>1.向推荐人购买</div>
          </div>
        </div>
        <div class="right-messge-flex row">
          <div class="icon-message-flex" style="background-image:url('/static/images/icon/jhmrhhd/two.png')"></div>
          <div>2.系统奖励</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {}
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
      setTimeout(function(){
        that.$bus.$emit('loading', false);
      },600);
    }
  }
</script>
<style scoped>
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  .input-name-flex {
    width: 86%;
    padding: 15px 7%;
    background: #fff;
    font-size: 13px;
  }

  .input-div-view {
    width: 100%;
    height: auto;
    color: #4d4d4d;
  }

  .how-flex-get {
    width: 86%;
    padding: 15px 7%;
    background: #984D4a;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .message-title-view {
    font-size: 0.6rem;
    color: #fff;
    width: 100%;
  }

  .left-view-message {
    width: 65%;
    padding: 5px 0;
  }

  .right-messge-flex {
    padding: 5px 5%;
    border-left: 1px solid #fff;
    width: 29%;
  }

  .padding-font-view {
    width: 30%;
  }

  .icon-message-flex {
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right: 5px;
  }
</style>
