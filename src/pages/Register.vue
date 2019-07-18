<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="注册" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <!-- 图标 -->
    <div class="logo-top-flex flex-justify-center">
      <div class="logo-img-view"></div>
    </div>
    <!-- 登录输入框位置 -->
    <div class="main-comment-flex column">
      <!-- 账户 -->
      <div class="input-name-view flex-box-center row">
        <div class="icon-person-flex"></div>
        <input placeholder="请输入用户名" v-model.trim="userName" type="text">
      </div>
      <!-- 密码 -->
      <div class="input-name-view flex-box-center row">
        <div class="icon-password-flex"></div>
        <input v-model.trim="userPwd" placeholder="不少于8位数字字母组合" type="password">
      </div>
      <!-- 手机号 -->
      <div class="input-name-view flex-box-center row">
        <div class="icon-phone-flex"></div>
        <input placeholder="请输入您的手机号" v-model.trim="userPhone" type="text">
      </div>
      <!-- 验证码 -->
      <div class="password-view-flex row">
        <div class="input-password-view flex-box-center row">
          <div class="icon-valid-flex"></div>
          <input placeholder="请输入验证码" v-model.trim="userCode" type="number">
        </div>
        <div class="forget-pwd-view" @click="goMess" v-show="show">获取验证码</div>
        <div class="forget-pwd-view" v-show="!show">重新发送({{count}})</div>
      </div>
      <!-- select -->
      <div class="server-view-flex row flex-box-center">
        <div class="none-choose-flex" v-show="!choose" @click="toChoose"></div>
        <div class="none-choose-flex2" v-show="choose" @click="toChoose"></div>
        <div class="font13">
          我已阅读并同意
          <span class="color-clone">《用户协议》</span>
        </div>
      </div>
    </div>
    <!-- 登录按钮 -->
    <div class="btn-to-login" @click="toRegister">
      同意并创建账号



    </div>
    <!-- 占位 -->
    <div class="zw-flex"></div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  import RegUtil from './../common/regUtil';
  export default{
    data () {
      return {
        show: true,
        count: '',
        timer: null,
        choose: true,
        userName: '',
        userPwd: '',
        userPhone: '',
        userCode: ''
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      goMess(){//yanzhengma
        const that = this;
        /*Util.ajax.checkGetAuth(function(){*/
          if (!RegUtil.isMatchPhoneNumber(that.userPhone)) {
            TostUtil.tostTop('请输入正确的手机号码！');
            return false;
          } else {
            const TIME_COUNT = 60;
            if (!that.timer) {
              Util.ajax.post('/api/register/sms', {
                phone: that.userPhone
              }).then(res => {
                if (res.data.status === 200) {
                  that.count = TIME_COUNT;
                  that.show = false;
                  that.timer = setInterval(() => {
                    if (that.count > 0 && that.count <= TIME_COUNT) {
                      that.count--;
                    } else {
                      that.show = true;
                      clearInterval(that.timer);
                      that.timer = null;
                    }
                  }, 1000);
                  TostUtil.tostTop(res.data.message);
                }else{
                  that.show = true;
                  TostUtil.tostTop(res.data.message);
                  return false;
                }
              }).catch(err=>{
                TostUtil.tostTop('网络出错,请稍后再试!')
              })
            }
          }
      },
      toChoose () {
        this.choose = !this.choose;
      },
      secondAjax(num){
        if(num===200){
          Util.ajax.post('/api/register', {
            username: this.userName,
            password: this.userPwd,
            phone: this.userPhone,
            sms_code: this.userCode
          }).then(res1 => {
            if (res1.data.status === 200) {
              TostUtil.tostTop(res1.data.message);
              this.$router.push('/Login')
            }
          }).catch(err1 => {
            TostUtil.tostTop(err1.response.data.message);
          })
        }
      },
      passReg(val){

      },
      toRegister () {
        //密码手机号正则
        const that = this;
        if (!RegUtil.isMatchMix(that.userName)) {
          TostUtil.tostTop('请输入正确格式的用户名！');
          return;
        }
        if (!RegUtil.isMatchPwd(that.userPwd)) {
          TostUtil.tostTop('密码格式不正确！');
          return;
        }
        if (!that.choose) {
          TostUtil.tostTop('请先阅读并同意《服务协议》！');
          return;
        }
        if (!RegUtil.isMatchPhoneNumber(that.userPhone)) {
          TostUtil.tostTop('手机号码格式不正确！');
          return;
        }
        if (that.userCode === '') {
          TostUtil.tostTop('请输入验证码！');
          return;
        }
        /*Util.ajax.checkGetAuth(function(){*/
          Util.ajax.getByForm('/api/register/ajax', {
            params: {
              key: 'username' || 'phone' || 'invite_name',
              value: that.userName || that.userPhone
            }
          }).then(res => {
            if (res.data.status === 200) {
              that.secondAjax(res.data.status)
            } else {
              TostUtil.tostTop(res.data.message);
            }
          }).catch(err => {
            TostUtil.tostTop('网络出错,请稍后重试!')
          });
       /* })*/
      }
    },
    created(){
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
    height: 150px;
  }

  .flex-justify-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  .flex-box-center {
    display: flex;
    align-items: center;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .logo-img-view {
    width: 100px;
    height: 100px;
    background-image: url('./../../static/images/icon/dl/logo.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  /* 输入框 */
  .main-comment-flex {
    width: 76%;
    margin-left: 12%;
    height: auto;
    position: relative;
    z-index: 999;
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

  .icon-person-flex {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    background-image: url('./../../static/images/icon/register/icon02.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .icon-valid-flex {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    background-image: url('./../../static/images/icon/register/icon01.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .input-login-name input,
  .input-password-view input,
  .input-name-view input {
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

  .input-name-view {
    width: 100%;
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
    position: relative;
    z-index: 99;
  }

  /* 立即登录按钮 */
  .btn-to-login {
    width: 76%;
    margin-left: 12%;
    background: #5D0E13;
    color: #ECC489;
    font-size: 16px;
    text-align: center;
    border-radius: 5px;
    margin-top: 20px;
    padding: 10px 0;
  }

  /* 手机号注册，快捷登录 */
  .regist-view-flex {
    width: 100%;
    color: #5D0E13;
    font-size: 13px;
    text-align: center;
    margin-top: 5px;
  }

  /* 占位 */
  .zw-flex {
    width: 100%;
    height: 20%;
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

  .color-clone {
    color: #5D0E13;
  }

  .server-view-flex {
    margin-top: 10px;
  }

  input {
    border: none;
    outline: none;
  }

  .none-choose-flex {
    width: 13px;
    height: 13px;
    border: 1px solid #5D0E13;
    border-radius: 50%;
    margin-right: 5px;
  }

  .none-choose-flex2 {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-right: 5px;
    background-image: url('./../../static/images/icon/dl/check.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .weui-toptips {
    position: fixed;
    top: 50px;
    left: 0;
  }
</style>
