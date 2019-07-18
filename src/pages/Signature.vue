<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="个性签名" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
      <mt-button slot="right" class="single" @click="save">保存</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <div class="head-zw"></div>
    <!-- main -->
    <div class="common-flex">
      <textarea placeholder="这个人很懒,什么也没留下" v-model.trim="textareaInput"></textarea>
    </div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  export default{
    data(){
      return {
        textareaInput: ''
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
      setTimeout(function(){
        that.$bus.$emit('loading', false);
      },600);
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      save () {
        let textareaInput = this.textareaInput;
        if (this.textareaInput === '') {
          TostUtil.tostTop('请输入您的个性签名！');
          return false;
        }
        /*axios.post('',{

         },{
         headers:{
         'token':''
         }
         }).then(res=>{
         console.log(res);
         }).catch(err=>{
         console.log(err);
         });*/
        console.log(textareaInput)
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

  textarea {
    font-size: 14px;
  }

  .common-flex textarea {
    width: 100%;
    height: 200px;
    border: none;
    outline: none;
    resize: none;
  }
</style>
