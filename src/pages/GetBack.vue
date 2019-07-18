<template>
  <div>
    <!--<div
      style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="解封会员" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div class="head-zw" style="width: 100%;height:50px;"></div>
    <!-- main -->
    <div class="top-view-flex flex-justify-center">
      您当前的解封卡数量是:{{num}}
    </div>
    <!-- 请输入用户名 -->
    <div class="input-name-flex">
      <div class="input-div-view">
        <input v-model="userName" placeholder="请输入用户名(汉字/英文/手机号/英文数字混合)"/>
      </div>
    </div>
    <!-- 说明 -->
    <div class="input-name-flex bg-tran-flex">
      解封会员需要消耗一张解封卡
    </div>
    <!-- btn -->
    <div class="btn-save-flex" @click="submit">{{flag?'提交':'正在处理中...'}}</div>
  </div>
</template>
<script>
  import Util from './../common/util';
  import TostUtil from './../common/tostUtil'
  export default{
    data () {
      return {
        userName: '',
        flag:true,
        num: 0//激活数量
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
      /*setTimeout(function(){
        that.$bus.$emit('loading', false);
      },600);*/
      that.jfk();
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      jfk(){
        Util.ajax.getByForm('/api/member/balance').then(res=>{
          if(res.data.status===200){
            this.num=res.data.data.unblock;//希望钱包
          }else{
            TostUtil.tostTop(res.data.message);
          }
          this.$bus.$emit('loading', false);
        }).catch(err=>{
          this.$bus.$emit('loading', false);
          TostUtil.tostTop('网络出错,请稍后重试!')
        })
      },
      toGetCode () {//如何获取激活码
        this.$router.push('/GetCode');
      },
      submit(){//提交
        if(this.flag){
          this.flag=false;
          let userSelfName = /^([\u4e00-\u9fa5]{3,8})|(1[3-9]\d{9})|([a-zA-Z]{6,18})|([0-9A-Za-z]{6,18})$/;//用户名：汉字/英文/手机号/英文数字混合；
          if (!userSelfName.test(this.userName)) {
            TostUtil.tostTop('用户名格式不正确!');
            this.flag=true;
            return false;
          }
          if (this.num <= 0) {
            TostUtil.tostTop('解封卡数量不足！');
            this.flag=true;
            return false;
          }
          Util.ajax.post('/api/member/unblock',{
            key:'username',
            value:this.userName
          }).then(res=>{
            TostUtil.tostTop(res.data.message);
            this.userName='';
            this.jfk();
            this.flag=true;
          }).catch(err=>{
            TostUtil.tostTop('网络出错,请稍后重试!')
          })
        }

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

  .top-view-flex {
    width: 100%;
    height: auto;
    /*background: #fff;*/
    padding: 10px 0;
    color: #666;
  }

  .flex-justify-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input-name-flex {
    width: 86%;
    padding: 20px 7%;
    background: #fff;
  }

  input {
    height: 20px;
    width: 100%;
    font-size: 13px;
    border: none;
    outline: none;
    color: #000;
    -webkit-appearance: none;
  }

  .bg-tran-flex {
    background: transparent;
    font-size: 13px;
  }

  .color-clone {
    color: #5D0E13;
  }

  .btn-save-flex {
    width: 70%;
    margin-left: 15%;
    text-align: center;
    background: #5D0E13;
    color: #ECC489;
    border-radius: 5px;
    padding: 7px 0;
    border: 1px solid #5D0E13;
  }
</style>
