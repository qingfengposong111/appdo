<template>
  <div>
    <!--<div
      style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="手机号码" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <!-- main -->
    <div class="common-flex flex-box">
      <div class="flex-1" style="width: 82%;display: flex; justify-content: flex-start; align-items: center;">
        <span style="width: 30%;">手机号码：</span>
        <span  style="margin-left:10px;width: 70%;" v-show="!disabled">{{userPhone}}</span>
        <div v-show="disabled" style="margin-left:10px;width: 70%;border-bottom: 1px solid #f7f7f7;">
          <input ref="changePhone" v-model.trim="userPhone" placeholder="请输入手机号码"/>
        </div>
      </div>
      <div class="flex-right color-clone" style="padding:0 10px;" @click="toUpdate">{{!disabled ? '修改' : '确认'}}

      </div>
    </div>
    <!-- 占位 -->
    <div class="footprint"></div>
    <div class="common-flex flex-box">
      <div class="flex-1">已有改手机号码卡: {{num}} 张</div>
      <div class="flex-1 flex-right color-clone" @click="toTool">去购买</div>
    </div>
    <div class="color-clone div-width-view">
      *如需要更改手机号码,请先到道具商城购买手机号码卡

    </div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  import RegUtil from './../common/regUtil'
  export default{
    data () {
      return {
        disabled: false,
        num: 0,
        userPhone: '',
        smsCode: '',
        smsCode2:'',
        timer: null,
        count: '',
        show: true
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that = this;
      if (localStorage.loginInfo) {
        that.userPhone = JSON.parse(localStorage.loginInfo).phone
      } else {
        that.userPhone = ''
      }
      Util.ajax.getByForm('/api/member/balance').then(res => {
        if (res.data.status === 200) {
          that.$bus.$emit('loading', false);
          that.num = res.data.data.phone;//激活卡
        }else{
          that.$bus.$emit('loading', false);
          TostUtil.tostTop(res.data.message);
        }
      }).catch(err=>{
        TostUtil.tostTop('网络出错,请稍后重试!')
      })
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      toTool () {//去购买
        this.$router.push('/ToolShop');
      },
      toUpdate () {
        let obj = JSON.parse(localStorage.getItem('loginInfo'));
        if (!this.disabled) {
          this.$refs.changePhone.focus();
          this.disabled = !this.disabled;
        } else {
          if (this.num < 1) {
            TostUtil.tostTop('改手机号码卡不足,请去购买！');
            return false;
          }
          if (!RegUtil.isMatchPhoneNumber(this.userPhone)) {
            TostUtil.tostTop('手机号码格式不正确！');
            this.$refs.changePhone.focus();
            return false;
          }

          Util.ajax.post('/api/member/update',{
            type:'phone',
            value:this.userPhone
          }).then(res=>{
            TostUtil.tostTop(res.data.message);
            if(res.data.status===200){
              obj.phone=this.userPhone;
              localStorage.setItem('loginInfo',JSON.stringify(obj));
            }
            this.goBack();
          }).catch(err=>{
            TostUtil.tostTop('网络出错,请稍后重试!')
          })
        }
      }
    }
  }
</script>
<style scoped>
  body, html {
    overflow: hidden;
  }

  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  /* main */
  .common-flex {
    width: 86%;
    height: auto;
    padding: 20px 7%;
    background: #fff;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* 单独控制文字颜色 */
  .color-clone {
    color: #5D0E13;
  }

  .div-width-view {
    width: 100%;
    font-size: 13px;
    text-align: center;
    padding-top: 10px;
  }

  input {
    color: #000000;
    border: none;
    outline: none;
  }

  input {
    font-size: 14px;
  }

  input[disabled] {
    color: #000000;
    opacity: 1
  }

</style>
