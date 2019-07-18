<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="二维码收款" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
      <div slot="right" class="right-btn-save" @click="save">+</div>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <!-- main -->
    <div class="none-card flex-justify-center column" v-show="list.length === 0">
      <div class="icon-none-flex"></div>
      <div>暂无收款码</div>
    </div>
    <!-- 有卡的情况下 -->
    <div class="had-card column" v-show="list.length>0">
      <div class="bg-pay-code-wx flex-justify-center column" :class="item.type==='alipay'?'aplay-pay-color':''"
           v-for="(item,index) in list" v-if="item.images!=='http://api.wealth-point.com/'"  :key="index" @click="codeDetail(item.id)">
        <div class="wx-img-code">
          <img :src="item.images" alt="">
        </div>
        <div v-if="item.type==='alipay'&&item.status==='yes'">扫-扫支付宝付款</div>
        <div v-if="item.type==='wechat'&&item.status==='yes'">扫-扫微信付款</div>
        <div v-if="item.status==='no'">已停用</div>
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
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      codeDetail(id){
        this.$router.push('/CodeDetail/'+id)
      },
      save () {
        this.$router.push('/AddPayCode');
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
      /*setTimeout(function(){
        that.$bus.$emit('loading', false);
      },600);*/
      let as=[];
      Util.ajax.getByForm('/api/qrcode').then(res=>{
        if(res.data.status===200){
          let arr = res.data.data;
          arr.forEach(item=>{
            if(item.images!==''){
              item.images='http://api.wealth-point.com/'+item.images;
              as.push(item);
            }

          });
          that.list = as;
          that.$bus.$emit('loading', false);
        }else{
          that.$bus.$emit('loading', false);
          TostUtil.tostTop(res.data.message)
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

  /* 没有卡的时候 */
  .none-card {
    width: 100%;
    height: 200px;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .icon-none-flex {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    background-image: url('./../../static/images/icon/bankCard/none.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  /* 有卡的时候 */
  .had-card {
    width: 80%;
    padding: 0 10% 10px;
    height: auto;
    margin: 0 auto;
  }

  .bg-pay-code-wx {
    width: 250px;
    height: 300px;
    background: #00ad47;
    border-radius: 5px;
    color: #fff;
    padding: 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 20px auto 10px;
    text-align: center;
  }

  .bg-pay-code-wx img {
    width: 100%;
    height: 100%;
  }

  .aplay-pay-color {
    background: #0DA1E6;
  }

  .wx-img-code {
    width: 190px;
    height: 240px;
    margin: 0 auto 5px;
  }

  .bg-pay-code-wx {
    width: 250px;
    height: 270px;
    background: #00ad47;
    border-radius: 5px;
    color: #fff;
    padding: 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 20px auto 10px;
    text-align: center;
  }
  .bg-pay-code-wx img {
    width: 100%;
    height: 100%;
  }

  .aplay-pay-color {
    background: #0DA1E6;
  }

  .wx-img-code {
    width: 180px;
    height: 220px;
    margin: 0 auto 5px;
  }
</style>

