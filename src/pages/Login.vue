<template>
  <div>
    <!--<div
      style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="登录" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <!-- 图标 -->
    <div class="logo-top-flex flex-justify-center">
      <div class="logo-img-view"></div>
    </div>
    <!-- 登录输入框位置 -->
    <div class="main-comment-flex column">
      <div class="input-login-name flex-box-center row">
        <div class="icon-phone-flex"></div>
        <input placeholder="用户名" v-model.trim="userName" type="text">
      </div>
      <div class="password-view-flex row">
        <div class="input-password-view flex-box-center row">
          <div class="icon-password-flex"></div>
          <input placeholder="密码" v-model.trim="pwd" type="password">
        </div>
        <div class="forget-pwd-view">忘记密码</div><!-- @click="toUpdatePwd"-->
      </div>
    </div>
    <!-- 登录按钮 -->
    <div class="btn-to-login" @click="toLevel">
      立即登录
    </div>
    <!-- 手机号注册/快捷登录 -->
    <div class="regist-view-flex" @click="toRegist">
      手机号注册/快捷登录
    </div>
    <!-- 占位 -->
    <div class="zw-flex"></div>
    <!-- 服务协议 -->
    <div style="width: 100%;height: 100px;"></div>
    <div class="server-flex-view row flex-box-justify">
      <div class="icon-server-view"></div>
      <div class="font-message-view">登录即代表阅读并同意<span>服务协议</span></div>
    </div>
  </div>
</template>
<script>
  import Util from './../common/util';
  import TostUtil from './../common/tostUtil';
  import RegUtil from './../common/regUtil';
  export default{
    data(){
      return {
        pwd: '',//登陆密码
        userName: ''//用户名
      }
    },
    created(){
      /*Util.ajax.checkGetAuth();*/
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      toUpdatePwd () {
        this.$router.push('/UpdateLoginPwd')
      },
      toRegist () {
        this.$router.push('/Register');
      },
      toLevel () {//何时判断是否已激活
        if (!RegUtil.isMatchMix(this.userName)) {
          TostUtil.tostTop('用户名格式不正确！');
          return false;
        }
        if (!RegUtil.isMatchPwd(this.pwd)) {
          TostUtil.tostTop('密码格式不正确！');
          return false;
        }
        const that = this;
        /*Util.ajax.checkGetAuth(function(){*/
          Util.ajax.post("/api/login", {//登陆
            username: that.userName,
            password: that.pwd
          }).then(res => {
            if (res.data.message === "登录成功") {//已激活
              localStorage.setItem('loginInfo', JSON.stringify(res.data.data));//存储登陆信息
              localStorage.setItem('sessionid', res.data.data.sessionId);//存储用户检测凭证
              localStorage.setItem('time', new Date().getTime());//设置登陆过期时间
              if (!JSON.parse(localStorage.loginInfo).realName) {//未完善资料跳转至完善资料页面
                that.$router.push('/Perfict');
              } else {
                if (that.$route.query.redirect) {//若存在登陆之前的页面，则重定向至登陆前的页面
                  that.$router.go('-1');
                } else {//若不存在则跳转至首页
                  that.$router.push('/');
                }
              }
            }
            if (res.data.message === "未激活用户。") {//未激活
              that.$router.push('/GoActive');
            }

            TostUtil.tostTop(res.data.message);
          }).catch(err => {
            TostUtil.tostTop('网络出错,请稍后重试!')
          })
        /*});*/
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

  .logo-top-flex {
    width: 100%;
    height: 200px;
  }

  .flex-justify-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo-img-view {
    width: 100px;
    height: 100px;
    background-image: url('./../../static/images/icon/dl/logo.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .flex-box-center {
    display: flex;
    align-items: center;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .flex-box-justify {
    display: flex;
    justify-content: center;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  /* 输入框 */
  .main-comment-flex {
    width: 76%;
    margin-left: 12%;
    height: auto;
    /* border: 1px solid red; */
  }

  .input-login-name {
    width: 100%;
    height: 40px;
    border: 1px solid #040404;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .icon-phone-flex {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    background-image: url('./../../static/images/icon/dl/phone.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .icon-password-flex {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    background-image: url('./../../static/images/icon/dl/pwd.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .input-login-name input, .input-password-view input {
    padding-left: 10px;
    width: 80%;
    background: transparent;
    color: #000;
    font-size: 13px;
  }

  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #cccccc;
    /* placeholder字体大小  */
    font-size: 13px;
  }

  .input-password-view {
    width: 75%;
    height: 40px;
    border: 1px solid #040404;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-top: 15px;
  }

  .password-view-flex {
    width: 100%;
  }

  .forget-pwd-view {
    color: #040404;
    font-size: 13px;
    margin-top: 20px;
    height: 30px;
    line-height: 30px;
    width: 25%;
    text-align: right;
  }

  /* 立即登录按钮 */
  .btn-to-login {
    width: 76%;
    margin-left: 12%;
    padding: 10px 0;
    background: #5D0E13;
    color: #ECC489;
    font-size: 16px;
    text-align: center;
    border-radius: 5px;
    margin-top: 20px;
  }

  /* 手机号注册，快捷登录 */
  .regist-view-flex {
    width: 100%;
    color: #5D0E13;
    font-size: 13px;
    text-align: center;
    margin-top: 15px;
  }

  /* 服务协议 */
  .server-flex-view {
    width: 100%;
    height: 20px;
  }

  .font-message-view {
    font-size: 13px;
    color: #4d4d4d;
  }

  .font-message-view span {
    font-size: 13px;
    color: #5D0E13;
    margin-left: 3px;
  }

  .icon-server-view {
    width: 16px;
    height: 16px;
    background-image: url('./../../static/images/icon/dl/check.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-top: 2px;
    margin-right: 5px;
  }

  input {
    border: none;
    outline: none;
  }
</style>
