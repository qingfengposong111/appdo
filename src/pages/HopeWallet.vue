<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="希望钱包" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
      <mt-button slot="right" class="single" @click="hopeRecord">明细</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <div class="hope-top">
      <div class="hope-top-number">{{APNumber}}</div>
      <div class="hope-top-text">总额(AP)</div>
    </div>
    <div class="btn-view-hope">
      <div class="btn-close-flex" @click="toHope">退租AP</div>
    </div>
    <!--底部导航-->
    <div class="foot-black"></div>
    <div class="bot">
      <router-link to="/Financial">
        <img src="static/images/icon/hope/all.png" alt="">
        <div>总览</div>
      </router-link>
      <router-link to="/HopeWallet">
        <img src="static/images/icon/hope/hope02.png" alt="">
        <div class="selected">希望钱包</div>
      </router-link>
      <router-link to="/BonusWallet">
        <img src="static/images/icon/hope/money.png" alt="">
        <div>奖金钱包</div>
      </router-link>
      <router-link to="/Active">
        <img src="static/images/icon/hope/active.png" alt="">
        <div>激活码</div>
      </router-link>
      <router-link to="/Wait">
        <img src="static/images/icon/hope/wait.png" alt="">
        <div>理财钱包</div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import Util from './../common/util';
  import TostUtil from './../common/tostUtil';
  export default{
    data () {
      return {
        APNumber: 0,
        flag: true,
        list: [],
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      toHope(){
        this.$router.push('/Sell')
      },
      hopeRecord(){
        this.$router.push('/HopeRecord')
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      Util.ajax.getByForm('/api/member/balance').then(res=>{
        if(res.data.status===200){
          this.APNumber=parseFloat(res.data.data.ecash).toFixed(4);//希望钱包
          this.$bus.$emit('loading', false);
        }else{
          this.$bus.$emit('loading', false);
          TostUtil.tostTop(res.data.message);
        }
      }).catch(err=>{
        this.$bus.$emit('loading', false);
        TostUtil.tostTop('网络出错,请稍后重试!')
      })
    }
  }
</script>
<style scoped>
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  .hope-top {
    width: 100%;
    height: 170px;
    background-image: url(./../../static/images/icon/hope/1_02.png);
    background-repeat: no-repeat;
    background-position: center;
  }

  .hope-top-number {
    font-size: 2rem;
    color: #fff;
    text-align: center;
    padding-top: 30px;
  }

  .hope-top-text {
    font-size: 16px;
    color: #fff;
    text-align: center;
  }

  .btn-view-hope {
    width: 100%;
    padding: 20% 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-close-flex {
    width: 50%;
    padding: 7px 0;
    text-align: center;
    background-color: #5D0E13;
    color: #ECC489;
    border-radius: 5px;
  }

  .bot {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    font-size: 13px;
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 999999;
    background: #f7f7fa;
    box-sizing: border-box;
    border-top: 1px solid #c0bfc4;
  }

  .bot a {
    padding: 5px 0 0;
    color: #999;
    text-align: center;
  }

  .bot div {
    margin: -4px 0 4px;
  }

  .bot img {
    width: 22px;
    height: 22px;
  }

  .selected {
    color: #81231f;
  }
</style>
