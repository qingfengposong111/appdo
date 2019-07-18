<template>
  <div id="box">
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="支付宝帐户" class="header">
        <mt-button @click="goBack" slot="left"  icon="back">返回</mt-button>
      <div slot="right" class="right-btn-save" @click="save">+</div>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <div class="head-zw"></div>
    <!-- main -->
    <div class="none-card flex-justify-center column" v-show="list.length == 0">
      <div class="icon-none-flex"></div>
      <div>暂无账户</div>
    </div>
    <!-- 有卡的情况下 -->
    <div class="had-card column" v-show="list.length>0">
      <div class="icon-had-flex column" v-for="item in list" v-if="item.name!==''" :key="item.id" @click="reviseBankCard(item)">
        <div class="common-position-flex"><span>我的支付宝</span><span v-if="item.status==='no'">已停用</span></div>
        <div class="card-category-flex">姓名：{{userName}}</div>
        <div class="card-number-flex">{{item.name}}</div>
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
        list: [],
        userName:JSON.parse(localStorage.getItem('loginInfo')).realName
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      save () {
        this.$router.push('/AddAliPayCard');
      },
      reviseBankCard(item){//修改支付宝帐户
        this.$router.push('/ReviseAlipayCard/'+item.id+'/'+item.name+'/'+item.status+'/'+item.accountName);
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
      /*setTimeout(function(){
        that.$bus.$emit('loading', false);
      },600);*/
      Util.ajax.getByForm('/api/qrcode').then(res=>{
        if(res.data.status===200){
          let arr = res.data.data;
          arr.forEach(item=>{
            if(item.type='alipay'){
              that.list.push(item)
            }
          });
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

  body, html {
    overflow: hidden;
  }
  #box{
    position: relative;
    width: 100%;
    height: 100%;
  }
  /* 没有卡的时候 */
  .none-card {
    width: 100%;
    height: 80%;
    position: relative;
    text-align: center;
  }

  .icon-none-flex {
    width: 100px;
    height: 100px;
    background-image: url('./../../static/images/icon/bankCard/none.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin: 40% auto 0;
  }

  /* 有卡的时候 */
  .had-card {
    width: 100%;
    height: auto;
  }

  .icon-had-flex {
    width: 86%;
    height: 130px;
    margin-left: 7%;
    margin-top: 20px;
    background-image: url('./../../static/images/icon/bankCard/had.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    position: relative;
  }

  .common-position-flex {
    position: absolute;
    top: 20px;
    left: 20%;
    color: #fff;
  }

  .card-category-flex {
    position: absolute;
    top: 60px;
    left: 20%;
    color: #fff;
    font-size: 13px;
  }

  .card-number-flex {
    position: absolute;
    top: 90px;
    left: 20%;
    color: #fff;
    font-size: 16px;}
  input{
    font-size:14px;
  }
  .border-none{
    border:none!important;
  }
</style>
