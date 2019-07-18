<template>
  <div>
    <!--<div
      style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="完善资料" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
      <mt-button slot="right" @click="goIndex">跳过</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <!-- main -->
    <div class="main-content column flex-justify-center">
      <div class="img-bg-flex"></div>
    </div>
    <!-- 请输入用户名 -->
    <div class="input-view-flex">
      <!-- 真实姓名 -->
      <div class="name-font-view-flex row flex-box-center">
        <div class="icon-img-flex"></div>
        <div style="width: 100%;">
          <input v-model.trim="userName" type="text" placeholder="请输入您真实姓名"/>
        </div>
      </div>
      <!-- zhanwei -->
      <div class="footprint3"></div>
      <div class="btn-save-this" @click="toSave">
        确定


      </div>
    </div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  import RegUtil from './../common/regUtil'
  export default{
    data(){
      return {
        userName: '',
        userBankNumber: '',
        userAlipay: ''
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
      goIndex () {//跳过
        this.$router.push('/');
      },
      goBack(){
        this.$router.go('-1')
      },
      toSave () {//确定
        let obj = JSON.parse(localStorage.getItem('loginInfo'));
        let nameReg = /^([\u4e00-\u9fa5]{1,5})|([a-zA-Z]{3,})$/;//真实名字 英文或中文
        if (!nameReg.test(this.userName)) {
          TostUtil.tostTop('格式不正确！');
          return;
        }
        Util.ajax.post('/api/member/update',{
          type:'realname',
          value:this.userName
        }).then(res=>{
          if(res.data.status===200){
            obj.realName=this.userName;
            localStorage.setItem('loginInfo',JSON.stringify(obj));
            TostUtil.tostTop(res.data.message);
            this.$router.push('/');
          }
        })
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

  .flex-justify-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  /* 单独控制文字颜色 */
  .color-clone {
    color: #5D0E13;
  }

  .main-content {
    padding-top: 20%;
    width: 100%;
    height: 160px;
  }

  /* img */
  .img-bg-flex {
    width: 100px;
    height: 100px;
    background-image: url('./../../static/images/icon/wszl/icon-head.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .input-view-flex {
    width: 76%;
    padding: 1% 12%;
  }

  .name-font-view-flex {
    width: 100%;
    height: 30px;
    border: 1px solid #040404;
    padding: 5px 0;
    border-radius: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  input {
    border: none;
    outline: none;
    background: #f4f4f4;
    margin-bottom: 8px;
    width: 80%;
  }

  .footprint3 {
    width: 100%;
    height: 20px;
  }

  .icon-img-flex {
    width: 15px;
    height: 15px;
    padding: 0 10px;
    background-image: url('./../../static/images/icon/wszl/icon01.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .icon-img-flex2 {
    width: 15px;
    height: 15px;
    padding: 0 10px;
    background-image: url('./../../static/images/icon/wszl/icon02.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .icon-img-flex3 {
    width: 15px;
    height: 15px;
    padding: 0 10px;
    background-image: url('./../../static/images/icon/wszl/icon03.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .btn-save-this {
    width: 100%;
    padding: 10px 0;
    background: #5D0E13;
    color: #ECC489;
    text-align: center;
    border-radius: 5px;
  }

  .footprint {
    width: 100%;
    height: 10px;
  }
</style>
