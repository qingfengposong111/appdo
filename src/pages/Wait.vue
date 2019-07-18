<template>
  <div style="width: 100%;height: 100%;box-sizing: border-box">
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="理财钱包" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <div class="hope-top" v-if="totalAssets>0">
      <div class="hope-top-number">{{totalAssets}}</div>
      <div class="hope-top-text">理财帐户余额（AP）</div>
    </div>
    <div class="weui-tab__bd-item" v-else>
      <div class="none-flex-view flex-justify-center column">
        <div class="none-icon-flex"></div>
        <div class="font13">暂无数据</div>
      </div>
    </div>
    <!--底部导航-->
    <div class="foot-black"></div>
    <div class="bot">
      <router-link to="/Financial">
        <img src="static/images/icon/hope/all.png" alt="">
        <div>总览</div>
      </router-link>
      <router-link to="/HopeWallet">
        <img src="static/images/icon/cwzx/hope.png" alt="">
        <div>希望钱包</div>
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
        <img src="static/images/icon/hope/wait01.png" alt="">
        <div class="selected">理财钱包</div>
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
        totalAssets:0
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
      Util.ajax.getByForm('/api/member/balance').then(res => {
        if (res.data.status === 200) {
          that.totalAssets =Number(res.data.data.temporary).toFixed(4);
          that.$bus.$emit('loading', false);
        }else{
          that.$bus.$emit('loading', false);
          TostUtil.tostTop(res.data.message);
        }
      }).catch(err=>{
        that.$bus.$emit('loading', false);
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
    height: 180px;
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
  .none-flex-view {
    width: 100%;
    height: 240px;
    text-align: center;
    position: absolute;
    left:0;
    right:0;
    bottom:0;
    top:0;
    margin:auto;
  }

  .none-icon-flex {
    width: 100px;
    height: 100px;
    background-image: url(./../../static/images/icon/djsc/none.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin: 0 auto 10px;
  }
  .main {
    width: 100%;
    height: 400px;
    overflow: hidden;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .weui-tab__bd-item{
    width:100%;
    height:100%;
    position: fixed;
    z-index:1;
  }
  /*底部导航*/
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
