<template>
  <div>
    <!--<div
      style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="订单详情" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  export default{
    data () {
      return {

      }
    },
    filters: {
      yuan: function (value) {
        return isNaN(value) ? 0.00 : parseFloat((value).toFixed(2)).toFixed(2);
      }
    },
    computed: {},
    methods: {
      goBack(){
        this.$router.go('-1')
      },
    },
    created(){
      this.$bus.$emit('loading', true);
      let that = this;
      setTimeout(function () {
        that.$bus.$emit('loading', false);
      }, 600);
      Util.ajax.getByForm('/api/order/show',{
          params:{
              Id:Number(this.$route.params.id),
              type:this.$route.params.type
          }
      }).then(res=>{
          console.log(res);
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


</style>
