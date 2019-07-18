<template>
  <div>
    <!--<div
      style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="详细资料" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
      <!--<mt-button slot="right" class="single" @click="save">保存</mt-button>-->
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <!--支付信息-->
    <div class="main">
      <!--头部-->
      <div class="main-top">
        <div class="img">
          <img src="static/images/111.png" alt="">
        </div>
        <div class="nick">
          <p>用户昵称：{{buyerName}}</p>
          <p>性别：保密</p>
        </div>
      </div>
      <div class="zw"></div>
      <!--个性签名-->
      <div class="sign">
        <span>个性签名</span>
        <span></span>
      </div>
      <div class="zw"></div>
      <!--错误投诉-->
      <!--<div class="bank" style="background: #f7f7f7;">
        <p style="margin-top:5px;"  @click="complain">收款信息投诉</p>
      </div>-->
      <div class="zw"></div>
      <!--收款信息-->
      <div class="aset">
        <p>联系信息</p>
        <div><p><span>收款人</span><span v-text="realName"></span></p><span v-clipboard:copy="realName" v-clipboard:success="onCopy">复制</span> </div>
        <div><p><span>联系电话</span><span v-text="phone"></span></p><span v-clipboard:copy="phone" v-clipboard:success="onCopy">复制</span> </div>
      </div>
    </div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  export default{
    data(){
      return {
        buyerName: '',//买方会员的名字或昵称
        buyerSignature: '',//买方会员的个性签名
        phone:'',
        realName:''
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      /*会员信息数据*/
      Util.ajax.getByForm('/api/member', {
        params: {
          Id: this.$route.params.id
        }
      }).then(res => {
        this.$bus.$emit('loading', false);
        if (res.data.status === 200) {
          this.buyerName=res.data.data.username;
          this.phone=res.data.data.phone;
          this.realName=res.data.data.realName;
        }else{
          TostUtil.tostTop(res.data.message);
        }
      }).catch(err=>{
        this.$bus.$emit('loading', false);
        TostUtil.tostTop('网络出错,请稍后重试!')
      });
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      complain(){
        this.$router.push('/SendComplaint/'+this.$route.params.orderId+'/'+this.$route.params.type);
      },
      onCopy(e){
        TostUtil.tostTop('复制成功！')
      },
    },
  }
</script>
<style scoped>
  .aset > p {
    padding: 10px 0;
    border-bottom: 1px solid #f7f7f7;
  }

  .aset > div {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 5px 8px 0;
  }

  .aset > div > p {
    width: 84%;
  }

  .aset > div > p > span:first-child {
    margin-right: 10px;
    font-size: 14px;
    color: #000;
    font-weight: 500;
    width: 80px;
    display: inline-block;
  }

  .aset > div > p > span:last-child {
    font-size: 14px;
    display: inline-block;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    vertical-align: middle;
    width: 66%;
    color: #333;
  }

  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  .aset > div > span {
    border: 1px solid #5D0E13;
    padding: 3px 5px;
    color: #5d0e13;
    border-radius: 4px;
    font-size: 14px;
  }

  .zw {
    width: 100%;
    height: 10px;
    background: #f7f7f7;
  }

  /* main */
  .main {
    background: #fff;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    padding: 10px 0;
  }

  .main-top {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 5px 2%;
  }

  .img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
  }

  .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .nick > p:first-child {
    font-size: 14px;
    color: #000;
    font-weight: 500;
  }

  .nick > p:last-child {
    font-size: 12px;
    color: #666;
  }

  .aset, .sign, .bank {
    box-sizing: border-box;
    padding: 15px 2%;
    width: 100%;
  }

  .aset {
    padding: 0 2% 10px;
  }

  .sign {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .sign > span:first-child {
    color: #000;
    font-weight: bold;
    font-size: 16px;
    margin-right: 5px;
  }

  .sign > span:last-child {
    font-size: 14px;
    display: inline-block;
    width: 70%;
    color: #333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .bank {
    padding: 10px 2%;
  }

  .bank p {
    width: 140px;
    height: 30px;
    font-size: 14px;
    border: 1px solid #5D0E13;
    border-radius: 6px;
    line-height: 30px;
    margin: 0 auto;
    color: #5D0E13;
    text-align: center;
  }
</style>
