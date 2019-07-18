<template>
  <div>
    <!--<div
      style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="客户服务" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <div class="head-zw"></div>
    <!-- main -->
    <div class="common-flex">
      <textarea style="font-size: 14px;" placeholder="请输入您的问题或建议" v-model.trim="textareaInput"></textarea>
    </div>
    <div class="btn-flex-view">
      <div class="btn-this-view font13" @click="submit">{{flag?'提交':'正在处理中...'}}</div>
    </div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import RegUtil from './../common/regUtil';
  import Util from './../common/util';
  export default{
    data(){
      return {
        textareaInput: '',
        flag:true
      }
    },
    created(){
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      submit () {
        if(this.flag){
          this.flag=false;
          let textareaInput = this.textareaInput;
          if (this.textareaInput === '') {
            TostUtil.tostTop('请输入您的问题或建议！');
            this.flag=true;
            return false;
          }
          Util.ajax.post('/api/message/send',{
            content:this.textareaInput
          }).then(res=>{
            if(res.data.status===200) {
              TostUtil.tostTop(res.data.message);
              this.textareaInput='';
              this.flag=true;
            }
          }).catch(err=>{
            this.flag=true;
            TostUtil.tostTop('网络出错,请稍后重试!')
          })
        }

      }
    },
  }
</script>
<style scoped>
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  /* main */
  .common-flex {
    width: 86%;
    height: auto;
    padding: 20px 7%;
    background: #fff;
    font-size: 13px;
  }

  .input-flex-view-to input {
    padding-left: 10px;
    color: #000;
    outline: none;
    border: none;
  }

  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #CDCDCD;
    /* placeholder字体大小  */
    font-size: 13px;
  }

  body, html {
    overflow: hidden;
  }

  input {
    font-size: 14px;
  }

  .common-flex textarea {
    width: 100%;
    height: 200px;
    border: none;
    outline: none;
    resize: none;
  }

  .btn-flex-view {
    width: 86%;
    padding: 20px 7%;
  }

  .btn-this-view {
    width: 100%;
    background: #5D0E13;
    color: #ECC489;
    text-align: center;
    padding: 7px 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .font13 {
    font-size: 14px !important;
  }
</style>
