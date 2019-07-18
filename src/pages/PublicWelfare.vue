<template>
  <div>
   <!-- <div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header fixed title="" class="header">
      <router-link to="/PersonCenter" slot="left">
        <div class="login-class">
          <img src="static/images/icon/setting/head.png"/>
          <div class="level-common-flex font8 flex-justify-center">{{levelName}}</div>
        </div>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
      <div slot="right">
        <img src="static/images/icon/sy/china.png"/>
        <img @click="toStytemMessage" src="static/images/icon/sy/message.png"/>
      </div>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <!--main-->
    <div class="img-flex">
      <img src="static/images/icon/gy/gy.png" alt="">
    </div>
    <div style="width: 100%;height:50px;"></div>
    <div class="weui-tabbar wy-foot-menu">
      <router-link to="/" class="weui-tabbar__item">
        <img src="static/images/icon/gy/gray-index.png" alt="">
        <p class="weui-tabbar__label">首页</p>
      </router-link>
      <router-link to="/Shop" class="weui-tabbar__item">
        <img src="static/images/icon/sy/shoping.png" alt="">
        <p class="weui-tabbar__label">商城</p>
      </router-link>
      <router-link to="/PublicWelfare" class="weui-tabbar__item">
        <img src="static/images/icon/gy/native-love.png" alt="">
        <p class="weui-tabbar__label selected-color">公益</p>
      </router-link>
      <router-link to="/Mine" class="weui-tabbar__item">
        <img src="static/images/icon/sy/person.png" alt="">
        <p class="weui-tabbar__label">我</p>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        levelName:null,
        selected: true
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      toStytemMessage(){
        this.$router.push('/StytemMessage');
      }
    },
    created(){
      if(localStorage.loginInfo){
        this.levelName=JSON.parse(localStorage.loginInfo).levelName
      }else{
        this.levelName='A0'
      }
    }
  }
</script>
<style scoped>
  .img-flex {
    /*margin-top: 40px;*/
  }

  .img-flex img {
    width: 100%;
  }

  .header {
    background: #5D0E13;
    height: 50px;
  }

  .header > div:last-child img {
    width: 20px;
    height: 15px;
  }

  .header img + img {
    margin-left: 10px;
  }

  .login-class {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    position: relative;
    top: 0;
    left: 10%;
    border: 1px solid #fff;
  }

  .login-class img {
    width: 28px;
    height: 28px;
  }

  .level-common-flex {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #F2AA0A;
    position: absolute;
    top: 15px;
    left: 75%;
    color: #fff;
    border: 1px solid #fff;
    font-size: 10px;
    text-align: center;
    line-height: 15px;
  }

  .weui-tabbar.wy-foot-menu {
    position: fixed;
  }

  .weui-tabbar {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: absolute;
    z-index: 999999;
    bottom: 0;
    width: 100%;
    background-color: #f7f7fa;
  }

  .weui-tabbar__label {
    color: #666;
  }

  .weui-tabbar__label {
    text-align: center;
    color: #999;
    font-size: 14px !important;
    line-height: 1.8 !important;
  }

  .selected-color, .is-selected {
    color: #81231f !important;
  }

  .weui-tabbar__item img {
    width: 22px;
    height: 22px;
  }
</style>
