<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="修改登陆密码" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <div class="main">
      <div class="main-content-view2 row flex-box-center">
        <div class="font13 common-left-name ">原密码</div>
        <input type="password" v-model.trim="originalPwd" placeholder="请输入原密码"/>
      </div>
      <div class="main-content-view2 row flex-box-center">
        <div class="font13 common-left-name">新密码</div>
        <input type="password" v-model.trim="newPwd1" placeholder="请输入新密码"/>
      </div>
      <div class="main-content-view row flex-box-center">
        <div class="font13 common-left-name">确认密码</div>
        <input type="password" v-model.trim="newPwd2" placeholder="再次输入新密码"/>
      </div>
      <!--<div class="main-content-view row flex-box-center">
        <div class="font13 common-left-name">手机验证码</div>
        <input type="number" v-model.trim="verificationCode" placeholder="请输入验证码"/>
        <div class="getyz" @click="getyz" v-show="show">获取验证码</div>
        <div class="getyz" v-show="!show">重新发送({{count}})</div>
      </div>-->
    </div>
    <div class="btn-common-flex" @click="ensure">{{flag?'确认':'正在处理中...'}}</div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import RegUtil from './../common/regUtil';
  import Util from './../common/util';
  export default{
    data () {
      return {
        show: true,
        count: '',
        timer: null,
        flag:true,
        originalPwd: '',//原始密码
        newPwd1: '',//第一次新密码
        newPwd2: '',//第二次新密码
        verificationCode: ''//验证码
      }
    },
    created(){
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      ensure(){
        let that= this;
        if(that.flag){
          that.flag=false;
          if (!RegUtil.isMatchPwd(that.newPwd1) || !RegUtil.isMatchPwd(that.newPwd2)) {
            TostUtil.tostTop('新密码格式不正确！');
            that.flag=true;
            return;
          }
          if (that.newPwd1 !== that.newPwd2) {
            TostUtil.tostTop('两次输入的新密码不一致！');
            that.flag=true;
            return;
          }
          Util.ajax.post('/api/member/password',{
            old_password:that.originalPwd,
            password:that.newPwd1,
            re_password:that.newPwd2
          }).then(res=>{
            if(res.data.status===200){
              localStorage.clear();
              that.flag=true;
              that.$router.push('/Login');
            }
            TostUtil.tostTop(res.data.message);
            that.flag=true;
          }).catch(err=>{
            that.flag=true;
            TostUtil.tostTop('网络出错,请稍后重试!')
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
