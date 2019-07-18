<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="信用评分记录" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <div class="head-zw"></div>
    <!-- main -->
    <div class="main" v-show="dataList.length>0">
      <div class="flex-box flex-justify-center top-title-flex">
        <div class="flex-1 font13 flex-justify-center">日期</div>
        <div class="flex-1 font13 flex-justify-center">评分人</div>
        <div class="flex-1 font13 flex-justify-center">分数</div>
      </div>
      <div class="flex-box flex-justify-center main-title-flex" v-for="(item,index) in dataList" :key="index">
        <div class="flex-1 font13 flex-justify-center">{{item.times}}</div>
        <div class="flex-1 font13 flex-justify-center">{{item.name}}</div>
        <div class="flex-1 font13 flex-justify-center">{{item.score}}</div>
      </div>
    </div>
    <!-- main 没有的情况 -->
    <div class="main-none-flex column" v-show="dataList.length===0">
      <div class="none-icon-flex"></div>
      <div class="font13 marginTop">暂无记录</div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        dataList: [
          /*{times: '2019-03-21', name: 'kaixin', score: 5}*/
        ]
      }
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

  /* 单独控制文字颜色 */
  .color-clone {
    color: #5D0E13;
  }

  .flex-box {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  }

  .flex-1 {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    flex-wrap: wrap;
  }

  .flex-justify-center {
    display: flex;
    justify-content: center;
    align-items: center;
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

  .font13 {
    font-size: 14px !important;
  }

  .main-title-flex {
    padding: 10px 0;
  }
  /* 没有数据的情况 */
  .main-none-flex {
    width: 100%;
    height: 80%;
    margin: 50% auto 0;
  }

  .color-red-flex {
    color: red;
  }

  .none-icon-flex {
    width: 100px;
    height: 100px;
    background-image: url(./../../static/images/icon/djsc/none.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin: 0 auto;

  }
  .marginTop {
    margin: 10px auto;
    color: #666;
    text-align: center;
  }
</style>
