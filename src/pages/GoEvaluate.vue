<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="订单评价" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <div>
      <el-radio v-model="radio" label="1">1分</el-radio>
      <el-radio v-model="radio" label="2">2分</el-radio>
      <el-radio v-model="radio" label="3">3分</el-radio>
      <el-radio v-model="radio" label="4">4分</el-radio>
      <el-radio v-model="radio" label="5">5分</el-radio>
    </div>
    <div class="btn-last-view">
      <div class="btn-save-flex" @click="submit">提交</div>
    </div>
  </div>
</template>
<script>
  import Util from './../common/util';
  import TostUtil from './../common/tostUtil';
  import { Radio } from 'element-ui';
  export default{
    data(){
      return {
          value:'',
          radio:'5'
      }
    },
    created(){
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      submit(){
        let val = parseInt(this.radio);
        if(this.radio){
          Util.ajax.post('/api/order/evaluate',{
            Id:Number(this.$route.params.id),
            score:val
          }).then(res=>{
            TostUtil.tostTop(res.data.message);
            this.goBack();//返回上一页
          }).catch(err=>{
            TostUtil.tostTop('网络出错,请稍后重试!')
          })
        }else{
          TostUtil.tostTop('请对订单进行评价！')
        }
      }
    }
  }
</script>
<style scoped>
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }
  .btn-last-view {
    width: 86%;
    padding: 10px 7%;
  }

  .btn-save-flex {
    width: 100%;
    background: #5D0E13;
    color: #ECC489;
    text-align: center;
    padding: 7px 0;
    border-radius: 5px;
  }
  .mint-radiolist{
    display:block;
    background: #fff;
  }
  .mint-radiolist-label {
    display: block;
    padding: 15px 10px;
  }
  .mint-cell-wrapper {
    background-size: 0% 1px;
    color:#666!important;

  }
  .mint-cell-wrapper>>>.mint-cell {
    background: #fff;
    color: #666!important;
    padding:10px 0;
    font-size:16px;
    min-height: 22px;
  }
  .mint-radio-label{
    color:#666!important;
    font-size:16px;
  }
  .mint-radio-core {
    width: 20px;
    height: 20px;
  }
  .mint-radio-core::after {
    top: 5px;
    left: 5px;
    background: #5D0E13;
  }
  .mint-radio-input:checked + .mint-radio-core::after{
    background: #5D0E13;
  }
  .mint-cell-title {
    border-bottom: 1px solid #ccc;
  }

</style>
