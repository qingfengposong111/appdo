<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="如何赚钱" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height:50px;"></div>
    <!-- main -->
    <div class="main-content">
      <!-- img -->
      <div class="img-bg-top-flex"></div>
      <!-- 如何赚钱 -->
      <div class="make-money-flex font13">
        如何赚钱...

      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {}
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
      setTimeout(function(){
        that.$bus.$emit('loading', false);
      },600);
    }
  }
</script>
<style scoped>
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  .font13 {
    font-size: 14px !important;
  }

  /* main */
  .main-content {
    width: 100%;
    height: auto;
  }

  .img-bg-top-flex {
    width: 100%;
    height: 140px;
    background-image: url('./../../static/images/icon/rhzq/1_02.png');
    background-repeat: no-repeat;
    background-size: contain;
  }

  /* 如何赚钱 */
  .make-money-flex {
    width: 86%;
    padding: 7%;
    color: #4c4c4c;
  }
</style>
