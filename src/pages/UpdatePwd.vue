<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="密码管理" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <div class="main-content-view" @click="loginPwd">
      <span class="font13">修改登录密码</span>
      <img height="15" src="static/images/icon/grzx/right.png"/>
    </div>
    <div class="main-content-view" @click="safePwd">
      <span class="font13">修改安全密码</span>
      <img height="15" src="static/images/icon/grzx/right.png"/>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {}
    },
    created(){
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      loginPwd(){
        this.$router.push('/UpdateLoginPwd')
      },
      safePwd(){
        this.$router.push('/UpdateSafePwd')
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

  .font13 {
    display: inline-block;
    font-size: 14px;
  }

  .main-content-view {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    line-height: 30px;
    padding: 10px 5%;
    background: #fff;
    position: relative;
    border-bottom: 1px solid #d4d4d4;
  }

  .main-content-view text {
    width: 60px;
  }

</style>
