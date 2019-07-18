<template>
<div>
  <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
  <mt-header title="信用评分" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
  </mt-header>
  <!-- 占位 -->
  <div style="width: 100%;height:50px;"></div>
  <div class="head-zw"></div>
  <!-- main -->
  <div class="common-flex-this flex-justify-center column">
    <div class="score-icon-flex">
      {{integral}}
  </div>
    <div class="clone-color-pad font13">当前信用评分</div>
  </div>
  <!-- 图层区域 -->
  <div class="main-icon-font">
    <div class="common-flex-icon row flex-box-center" v-for="(item,index) in list" :key="index"
         @click="toNative(item.url)">
      <div class="icon-left-view" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
      <div class="font13">{{item.name}}</div>
      <div class="right-btn-view-img"></div>
    </div>
  </div>
</div>
</template>
<script>
  import Util from './../common/util';
    export default{
      data () {
        return {
          integral:0,
          list: [
            {img: 'static/images/icon/credit/icon01.png', name: '我的信用评分记录', url: '/CreditRecord'},
            {img: 'static/images/icon/credit/icon02.png', name: '信用评分制度', url: '/CreditSystem'},
            {img: 'static/images/icon/credit/icon03.png', name: '常见问题', url: '/CreditQuestion'},
          ],
        }
      },
      created(){
        this.$bus.$emit('loading', true);
        let that =this;
        setTimeout(function(){
          that.$bus.$emit('loading', false);
        },600);
        Util.ajax.getByForm('/api/member/balance').then(res=>{
          if(res.data.status===200){
            this.integral=parseFloat(res.data.data.integral).toFixed(2);//希望钱包
          }
        })
      },
      methods: {
        goBack(){
          this.$router.go('-1')
        },
        toNative (url) {
          if (url) {
            this.$router.push(url);
          }
        }
      },
    }
</script>
<style scoped>
  .header{
    background: #5D0E13;
    height:50px!important;
    font-size:18px!important;
  }

  /* main */
  .common-flex-this {
    width: 100%;
    height: auto;
    background-color: #984D4A;
    padding: 7% 0;
  }

  .score-icon-flex {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid #fff;
    text-align: center;
    line-height: 60px;
    color: #ECC489;
    background-color: #5D0E13;
  }

  .clone-color-pad {
    color: #fff;
    margin-top: 5px;
  }

  /* 单独控制文字颜色 */
  .color-clone {
    color: #5D0E13;
  }
  .font13 {
    font-size: 14px!important;
  }
  /* 图层区域 */
  .main-icon-font {
    width: 86%;
    padding: 10% 7%;

  }

  .common-flex-icon {
    width: 100%;
    position: relative;
    border-bottom: 1px solid #cecece;
    padding: 10px 0;
  }

  .icon-left-view {
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right: 5px;
  }

  .right-btn-view-img {
    width: 15px;
    height: 15px;
    background-image: url('./../../static/images/icon/grzx/right.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    position: absolute;
    right: 0;
  }
  .flex-justify-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .column {
    display: flex;
    flex-direction: column;
  }
  .flex-box-center {
    display: flex;
    align-items: center;
  }
  .row {
    display: flex;
    flex-direction: row;
  }
</style>
