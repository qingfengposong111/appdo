<template>
  <div>
    <!--<div
      style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="二维码详情" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
      <mt-button slot="right" class="single" @click="handleDelete">删除</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <!-- main -->

    <!-- 有卡的情况下 -->
    <div class="had-card column" v-if="obj!=={}">
      <div class="bg-pay-code-wx flex-justify-center column" :class="obj.type==='alipay'?'aplay-pay-color':''">
        <div class="wx-img-code">
          <img :src="img" alt="">
        </div>
        <div v-if="obj.type==='alipay'&&obj.status==='yes'">支付宝二维码</div>
        <div v-if="obj.type==='wechat'&&obj.status==='yes'">微信二维码</div>
        <div v-if="obj.status==='no'">已停用</div>
      </div>
    </div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  import RegUtil from './../common/regUtil';
  import {MessageBox} from 'mint-ui';
  export default{
    data () {
      return {
        text: '',
        img: '',
        obj: {}
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      handleDelete(){//删除帐户
        MessageBox.confirm("确认删除此二维码？", '删除提示').then(action => {
          Util.ajax.getByForm('/api/qrcode/delete', {
            params: {
              Id: this.$route.params.id
            }
          }).then(res => {
            if (res.data.status === 200) {
              TostUtil.tostTop(res.data.message);
              this.$router.go('-1');
            }
          })
        }).catch(err => {
          TostUtil.tostTop('网络出错,请稍后重试!')
        })
      },
    },
    created(){
      let that = this;
      Util.ajax.getByForm('/api/qrcode/show', {
        params: {
          Id: that.$route.params.id
        }
      }).then(res => {
        let obj = res.data.data;
        that.obj = res.data.data;
        if (obj.type === 'alipay') {
          that.text = '支付宝';
        }
        if (obj.type === 'wechat') {
          that.text = '微信';
        }
        that.img = 'http://api.wealth-point.com/' + obj.images;
      }).catch(err => {
        that.$bus.$emit('loading', false);
        TostUtil.tostTop('网络出错,请稍后再试!')
      })
    }
  }
</script>
<style scoped>
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
    position: fixed;
    width: 100%;
    z-index: 1900;
  }

  /* 有卡的时候 */
  .had-card {
    width: 100%;
    /* padding: 0 20%; */
    box-sizing: border-box;
    height: auto;
    margin: 0 auto;
    margin-top: 20px;
    overflow: hidden;
  }

  .bg-pay-code-wx {
    width: 280px;
    height: 380px;
    background: #00AD47;
    border-radius: 5px;
    color: #fff;
    padding: 10px;
    box-sizing: border-box;
    margin: 0 auto 10px;
    text-align: center;
  }

  .bg-pay-code-wx img {
    width: 100%;
    height: 100%;
  }

  .aplay-pay-color {
    background: #0DA1E6;
  }

  .wx-img-code {
    width: 250px;
    height: 330px;
    margin: 0px auto 5px;
  }
</style>
