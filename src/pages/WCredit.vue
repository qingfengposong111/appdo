<template>
  <div style="position: relative; width: 100%;height: 100%;">
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="W信用" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <!-- main -->
    <div class="main-comment-flex column flex-justify-center">
      <div class="none-icon-flex"></div>
      <div class="font13">暂无数据</div>
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
    margin-top: 10px;
    color: #666;
  }

  /* main */
  .main-comment-flex {
    width: 100%;
    height: 80%;

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

  /* 没有数据的情况 */
  .none-icon-flex {
    width: 100px;
    height: 100px;
    background-image: url('./../../static/images/icon/djsc/none.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
</style>
