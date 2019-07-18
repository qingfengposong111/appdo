<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="道具商城" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <div style="width: 100%;height:50px;"></div>
    <div class="top-head-zw"></div>
    <!-- main -->
    <div style="">
      <div class="main-commmon-flex flex-justify-center column" v-for="(item,index) in list" :key="index"
           @click="toClick(index)">
        <div class="bg-img-common" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
        <div class="font13 color-view-flex">售价：{{item.price}}AP</div>
      </div>
    </div>
    <div style="width: 100%;height: 50px;"></div>
    <!--底部导航-->
    <div class="foot-black"></div>
    <div class="tabbar">
      <router-link to="/ToolShop" class="tabbar-a">
        <div class="tabbar-bg"
             style="background: url(static/images/icon/djsc/tool01.png) no-repeat;background-size: 22px;"></div>
        <div class="tabbar-txt" style="color: #81231f;">道具</div>
      </router-link>
      <router-link to="/ToolMine" class="tabbar-a">
        <div class="tabbar-bg"
             style="background: url(static/images/icon/djsc/person02.png) no-repeat;background-size: 22px;"></div>
        <div class="tabbar-txt">我的</div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  export default{
    data () {
      return {
        list: [
          {id: 1, img: 'static/images/icon/djsc/phoneCard.png', price: '0.2500', text: '改手机号卡'},
          {id: 2, img: 'static/images/icon/djsc/nameCard.png', price: '0.2500', text: '改姓名卡'},
          {id: 3, img: 'static/images/icon/djsc/unsealingCard.png', price: '0.2500', text: '解封卡'},
          {id: 4, img: 'static/images/icon/djsc/superCard.png', price: '1.0000', text: '超级解封卡'},
        ],
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      toClick (i) {
        this.$router.push('BuyTool/' + this.list[i].id + '/' + this.list[i].price + '/' + this.list[i].text+'/'+this.list[i].name)
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
      Util.ajax.getByForm('/api/gift/price').then(res=>{
        that.$bus.$emit('loading', false);
        if(res.data.status===200) {
          let arr = res.data.data.splice(0, 4);
          arr.forEach((item, index) => {
            that.list[index].price = item.value;
            that.list[index].name = item.key
          });
        }else{
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

  .flex-justify-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  /* main */
  .main-commmon-flex {
    width: 100%;
    padding: 10px 0;
    background: #fff;
    margin-bottom: 10px;
  }

  .main-commmon-flex:last-child {
    margin-bottom: 80px !important;
  }

  .bg-img-common {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .color-view-flex {
    margin-top: 5px;
    color: #4D4D4D;
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
</style>
