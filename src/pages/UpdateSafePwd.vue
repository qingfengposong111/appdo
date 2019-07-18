<template>
  <div>
   <!-- <div
      style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="修改安全密码" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <div style="width: 100%;height:50px;"></div>
    <div class="main-content-view2 row flex-box-center">
      <div class="font13 common-left-name">原始密码</div>
      <input type="password" style="width: 80%;" v-model.trim="oldPwd" placeholder="请输入原始密码(未设置无需填写)"/>
    </div>
    <div class="main-content-view2 row flex-box-center">
      <div class="font13 common-left-name">新密码</div>
      <input type="password" v-model.trim="newPwd1" placeholder="请输入6位数字新密码"/>
    </div>
    <div class="main-content-view row flex-box-center">
      <div class="font13 common-left-name">确认密码</div>
      <input type="password" v-model.trim="newPwd2" placeholder="请确认密码"/>
    </div>
    <!--<div class="main-content-view row flex-box-center">
      <div class="font13 common-left-name">手机验证码</div>
      <input v-model.trim="smsCode" type="number" placeholder="输入验证码"/>
      <div class="getyz" @click="getyz" v-show="show">获取验证码</div>
      <div class="getyz" v-show="!show">重新发送({{count}})</div>
    </div>-->
    <div class="btn-common-flex" @click="ensure">{{flag?'确认':'正在处理中...'}}</div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  import RegUtil from './../common/regUtil'
  export default{
    data () {
      return {
        show: true,
        count: '',
        oldPwd:'',
        timer: null,
        flag:true,
        newPwd1: '',
        newPwd2: '',
        smsCode: ''
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that = this;
      setTimeout(function () {
        that.$bus.$emit('loading', false);
      }, 600);
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      getyz () {
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      },
      ensure(){//确认提交
        if(this.flag){
          this.flag=false;
          if (!RegUtil.isMatchSafePwd(this.newPwd1) || !RegUtil.isMatchSafePwd(this.newPwd2)) {
            TostUtil.tostTop('密码格式不正确！');
            this.flag=true;
            return false;
          }
          if (this.newPwd1 !== this.newPwd2) {
            TostUtil.tostTop('两次密码不一致！');
            this.flag=true;
            return false;
          }
          /*if (this.smsCode === '') {
           Toast({
           message: '请输入验证码！',
           position: 'top',
           duration: 1000,
           className: 'red'
           });
           return false;
           }*/
          Util.ajax.post("/api/member/security", {
            old_password: this.oldPwd,
            password: this.newPwd1
          },{
            sessionid:JSON.parse(localStorage.loginInfo).sessionId
          }).then(res=>{
            if(res.data.status===200){
              this.flag=true;
              this.$router.go('-1');

            }
            TostUtil.tostTop(res.data.message);
            this.flag=true;
          }).catch(err=>{
            this.flag=true;
            TostUtil.tostTop(err.response.message)
          })
        }

      }
    },
  }
</script>
<style scoped>
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  input {
    margin-top: -2px;
    border: none;
    outline: none;
    font-size: 14px;
  }

  .main-content-view2 {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 24px 20px;
    background: #fff;
    box-sizing:border-box;
    position: relative;
    border-bottom: 1px solid #d4d4d4;
  }

  .flex-box-center {
    display: flex;
    align-items: center;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .main-content-view {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 24px 20px;
    background: #fff;
    box-sizing:border-box;
    margin-bottom: 10px;
    position: relative;
  }

  .font13 {
    font-size: 14px !important;
  }

  .common-left-name {
    width: 20%;
  }

  .getyz {
    position: absolute;
    right: 15%;
    top: 10px;
    font-size: 14px;
    color: #5D0E13;
  }

  .btn-common-flex {
    width: 86%;
    text-align: center;
    margin-left: 7%;
    background: #5D0E13;
    color: #ECC489;
    margin-top: 30px;
    padding: 7px 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
</style>
