<template>
<div class="box">
  <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
  <mt-header title="订单支付详情" class="header">
    <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
  </mt-header>
  <div style="width: 100%;height: 50px;"></div>
  <div class="ul-main">
    <ul>
      <!--<li><span>订单编号：</span><span>{{record.orderNumber}}</span></li>-->
      <li><span>会员名：</span><span>{{record.username}}</span></li>
      <li><span>支付时间：</span><span>{{record.time | formatDate}}</span></li>
      <!--<li><span>支付确认时间：</span><span>{{record.statusTime | formatDate}}</span></li>-->
      <li><span>订单状态:</span>
        <span v-if="record.status==='wait'">待确认</span>
        <span v-if="record.status==='yes'">支付成功</span>
        <span v-if="record.status==='no'">支付未通过</span>
      </li>
      <li>
        <span>支付凭证：</span>
        <div class="img">
          <img :src="'http://api.wealth-point.com'+record.images" alt="">
        </div>
      </li>

    </ul>
  </div>
</div>
</template>
<script>
  import Util from './../common/util';
  import TostUtil from './../common/tostUtil';
    export default{
      data(){
        return {
            record:{}
        }
      },
      filters: {
        formatDate: function (value) {
          let date = new Date(Number(value) * 1000);
          let YY = date.getFullYear();
          let MM = date.getMonth() + 1;
          let d = date.getDate();
          let h = date.getHours();
          let m = date.getMinutes();
          let s = date.getSeconds();
          MM = MM < 10 ? ('0' + MM) : MM;
          d = d < 10 ? ('0' + d) : d;
          h = h < 10 ? ('0' + h) : h;
          m = m < 10 ? ('0' + m) : m;
          s = s < 10 ? ('0' + s) : s;
          return YY + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
        }
      },
      created(){
        this.$bus.$emit('loading', true);
        let that =this;
        Util.ajax.getByForm('/api/payment/show',{
          params:{
            Id:that.$route.params.id,
            type:'order'
          }}).then(res=>{
          that.$bus.$emit('loading', false);
          if(res.data.status===200){
            that.record=res.data.data;
          }else{
            TostUtil.tostTop(res.data.message);
          }
        }).catch(err=>{
          that.$bus.$emit('loading', false);
          TostUtil.tostTop('网络出错,请稍后重试!')
        })
      },
      methods: {
        goBack(){
          this.$router.go('-1')
        },

      }
    }
</script>
<style scoped>
  body,html{
    width:100%;
    height:100%;
    position:relative;
    background: #fff!important;
  }
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }
  .box{
    width: 100%;
    height: 100%;
    background: #fff;

    box-sizing: border-box;
  }
  .ul-main{
    padding:10px 20px;
    font-size:14px;
    color:#666;
  }
  ul,li{
    list-style:none;
  }
  li{
    padding:10px 0;
  }
  li>span:first-child{
    display:inline-block;
    width:100px;
  }
  .img{
    width:100%;
    height:100%;
    overflow:hidden;
    margin-top:10px;
  }
  .img img{
    width:100%;
    height:auto;
  }
</style>
