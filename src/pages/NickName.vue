<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="昵称" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
      <mt-button slot="right" @click="save">保存</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <div class="head-zw"></div>
    <!-- main -->
    <div class="common-flex flex-box">
      <div class="flex-1 row right-flex-1">
        <div>昵称</div>
        <div class="input-flex-view-to" style="width: 88%;">
          <input placeholder="请输入昵称" type="text" v-model.trim="inputText"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  export default{
    data(){
      return {
        inputText: ''
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      save () {
        if (this.inputText.length === 0) {
          TostUtil.tostTop('请输入您的昵称！');
          return false;
        } else {
          /*this.$axios.post('', {}).then(res => {
            console.log(this.inputText)
          }).catch(err => {
            console.log(err);
          })*/
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

  .flex-1 {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    flex-wrap: wrap;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  /* main */
  .common-flex {
    width: 86%;
    height: auto;
    padding: 20px 7%;
    background: #fff;
    font-size: 16px;
  }

  .right-flex-1 {
    width: 90%;
  }

  .input-flex-view-to input {
    padding: 4px 0 4px 10px;
    color: #000;
    line-height: 15px;
    outline: none;
    border: none;
    width: 100%;
  }

  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #CDCDCD;
    /* placeholder字体大小  */
    font-size: 14px;
  }

  body, html {
    overflow: hidden;
  }
</style>
