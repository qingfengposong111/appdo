<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="激活会员" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div class="head-zw" style="width: 100%;height: 50px;"></div>
    <div class="imgInfo">
      <img src="static/images/icon/jhhy/icon01.png" alt="">
      <p>用户未激活，请联系推荐人</p>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import Util from './../common/util';
  export default{
    data () {
      return {
        userName: '',
        num: 2//激活数量
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
      setTimeout(function(){
        that.$bus.$emit('loading', false);
      },600);
    },
    methods: {
      goBack(){
        this.$router.go('-1')
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
  body,html{
    width:100%;
    height:100%;
    position:relative;
  }
  .imgInfo{
    width:100%;
    height:120px;
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin:auto;
    text-align: center;
  }
  .imgInfo img{
    width:80px;
    height:80px;
  }
  .imgInfo p{
    font-size:14px;
    color:#000;
    margin-top:10px;
  }
</style>
