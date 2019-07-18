<template>
  <div id="app">
    <loading></loading>
    <router-view/>
  </div>
</template>

<script>
  import loading from '@/components/loading';
  import Util from './common/util';
export default {
  name: 'App',
  components:{
    loading
  },
  created(){
    /*Util.ajax.checkGetAuth();*/
  }
  }
</script>

<style>
body,html{
  background: #f4f4f4;
  width:100%;
  height:100%;
  box-sizing: border-box;
}
  #app{
    width:100%;
    height:100%;
    position:relative;
    box-sizing: border-box;
  }
</style>
