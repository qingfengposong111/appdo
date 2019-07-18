<template>
  <div class="box">
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="我的" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
      <mt-button slot="right" class="single" @click="hadUse">使用记录</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <div class="top-head-zw"></div>

    <!--有数据的时候-->
    <div class="card" >
      <ul class="card-list">
        <li class="card-item flex-justify-center" v-if="nameCardNumber>0" id="0">
          <div class="card-item-left"><img src="static/images/icon/djsc/nameCard.png" alt="" /></div>
          <div class="card-item-right">
            <div class="card-item-right-title">
              改姓名卡
            </div>
            <div class="card-item-right-main">拥有：<span style="color:#e4393c!important;font-size: 14px;">{{nameCardNumber}}<span style="font-size: 16px;">张</span></span></div>
          </div>
        </li>
        <li class="card-item flex-justify-center" v-if="phoneCardNumber>0" id="1">
          <div class="card-item-left"><img src="static/images/icon/djsc/phoneCard.png" alt="" /></div>
          <div class="card-item-right">
            <div class="card-item-right-title">
              改手机号码卡
            </div>
            <div class="card-item-right-main">拥有：<span style="color:#e4393c!important;font-size: 14px;">{{phoneCardNumber}}<span style="font-size: 16px;">张</span></span></div>
          </div>
        </li>
        <li class="card-item flex-justify-center" v-if="jfCardNumber>0" id="2">
          <div class="card-item-left"><img src="static/images/icon/djsc/unsealingCard.png" alt="" /></div>
          <div class="card-item-right">
            <div class="card-item-right-title">
              解封卡
            </div>
            <div class="card-item-right-main">拥有：<span style="color:#e4393c!important;font-size: 14px;">{{jfCardNumber}}<span style="font-size: 16px;">张</span></span></div>
          </div>
        </li>
        <li class="card-item flex-justify-center" v-if="cjfCardNumber>0" id="3">
          <div class="card-item-left"><img src="static/images/icon/djsc/superCard.png" alt="" /></div>
          <div class="card-item-right">
            <div class="card-item-right-title">
              超级解封卡
            </div>
            <div class="card-item-right-main">拥有：<span style="color:#e4393c!important;font-size: 14px;">{{cjfCardNumber}}<span style="font-size: 16px;">张</span></span></div>
          </div>
        </li>
      </ul>
    </div>
    <!-- main 无数据的时候-->
    <div class="main-comment-flex column flex-justify-center" v-if="flag">
      <div class="none-icon-flex"></div>
      <div class="font13 marginTop">暂无数据</div>
    </div>
    <!--底部导航-->
    <div class="foot-black"></div>
    <div class="tabbar">
      <router-link to="/ToolShop" class="tabbar-a">
        <div class="tabbar-bg"
             style="background: url(static/images/icon/djsc/tool02.png) no-repeat;background-size: 22px;"></div>
        <div class="tabbar-txt">道具</div>
      </router-link>
      <router-link to="/ToolMine" class="tabbar-a">
        <div class="tabbar-bg"

             style="background: url(static/images/icon/djsc/person01.png) no-repeat;background-size: 22px;"></div>
        <div class="tabbar-txt" style="color: #81231f;">我的</div>
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
        nameCardNumber:0,
        phoneCardNumber:0,
        jfCardNumber:0,
        cjfCardNumber:0,
        flag:false
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
      Util.ajax.getByForm('/api/member/balance').then(res=>{
        if(res.data.status===200){
          that.nameCardNumber=parseInt(res.data.data.name);
          that.phoneCardNumber=parseInt(res.data.data.phone);
          that.jfCardNumber=parseInt(res.data.data.unblock);
          that.cjfCardNumber=parseInt(res.data.data.super_unblock);
          if(that.nameCardNumber<=0&&that.phoneCardNumber<=0&&that.jfCardNumber<=0&&that.cjfCardNumber<=0){
              that.flag=true;
          }else{
              that.flag=false;
          }
          that.$bus.$emit('loading', false);
        }else{
          that.$bus.$emit('loading', false);
          that.flag=false;
          TostUtil.tostTop(res.data.message);
        }
      }).catch(err=>{
        that.flag=false;
        that.$bus.$emit('loading', false);
        TostUtil.tostTop('网络出错,请稍后重试!')
      })
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      hadUse(){
        this.$router.push('/HadUse');
      }
    }
  }
</script>
<style scoped>
  .box {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  .flex-justify-center {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .main-comment-flex {
    width: 100%;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  .font13{
    font-size:14px;
  }
  .marginTop{
    margin :10px auto;
    color:#666;
  }
  /* 没有数据的情况 */
  .none-icon-flex {
    width: 100px;
    height: 100px;
    background-image: url('./../../static/images/icon/djsc/none.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin:50% auto 0;
  }

  .tabbar {
    position: fixed;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    z-index: 999999;
    bottom: 0;
    width: 100%;
    background-color: #f7f7fa;
  }

  .tabbar-a {
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding: 5px 0 0;
    color: #999;
    position: relative;
    text-align: center;
    border-top: 1px solid #c0bfc4;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .tabbar-bg {
    width: 22px;
    height: 22px;
    margin: 5px auto;
  }

  .tabbar-txt {
    font-size: 14px;
  }

  .card, .card-list {
    width: 100%;
    height: auto;

  }

  .card-list, .card-item {
    width: 100%;
    box-sizing: border-box;
    padding: 0;

  }
  .card-item {
    background: #fff;
    padding: 20px 10px;
    margin-bottom:10px;
  }
  .card-item-left {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right:20px;
  }

  .card-item-left > img {
    width: 80px !important;
    height: 80px !important;
  }
</style>
