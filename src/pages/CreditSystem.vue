<template>
<div>
  <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
  <mt-header title="信用评分制度" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
  </mt-header>
  <div style="width: 100%;height: 50px;"></div>
</div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
    export default{
        data () {
            return {}
        },
      created(){
        this.$bus.$emit('loading', true);
        let that =this;
        setTimeout(function(){
          that.$bus.$emit('loading', false);
        },600);
        TostUtil.tostTop('获取失败！');
      },
      methods:{
        goBack(){
          this.$router.go('-1')
        },
      }
    }
</script>
<style scoped>
  .header{
    background: #5D0E13;
    height:50px!important;
    font-size:18px!important;
  }
</style>
