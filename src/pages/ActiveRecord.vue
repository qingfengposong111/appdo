<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="激活码明细" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <!-- main -->
    <div class="main" v-if="arr.length>0">
      <div class="flex-box flex-justify-center top-title-flex">
        <div class="flex-1 font13 flex-justify-center">日期</div>
        <div class="flex-1 font13 flex-justify-center">交易类型</div>
        <div class="flex-1 font13 flex-justify-center">数量</div>
      </div>
      <div class="flex-box flex-justify-center main-title-flex" v-for="(item,index) in arr" :key="index">
        <div class="flex-1 font13 flex-justify-center">{{item.times}}</div>
        <div class="flex-1 font13 flex-justify-center">{{item.name}}</div>
        <div class="flex-1 font13 flex-justify-center">{{item.score}}</div>
      </div>
    </div>
    <div class="main-comment-flex column flex-justify-center" v-if="arr.length===0">
      <div class="none-icon-flex"></div>
      <div class="font13 marginTop">暂无数据</div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        arr: [
          /*{times: '2019-03-21', name: '承租', score: 1}*/
        ]
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      }
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
  .header{
    background: #5D0E13;
    height:50px!important;
    font-size:18px!important;
  }
  .flex-justify-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flex-box {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  }
  .font13 {
    font-size: 14px!important;
    color:#666;
  }
  .flex-1 {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    flex-wrap: wrap;
  }
  /* main */
  .main {
    width: 100%;
    height: auto;
  }

  .top-title-flex {
    padding: 10px 0;
    background: #fff;
  }

  .main-title-flex {
    padding: 10px 0;
  }
  .main-comment-flex {
    width: 100%;
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
    margin:50% auto 0;
  }
  .marginTop{
    margin-top:10px;
  }
</style>
