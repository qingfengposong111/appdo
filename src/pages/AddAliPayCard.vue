<template>
<div>
  <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
  <mt-header title="添加支付宝帐户" class="header">
      <mt-button @click="goBack" slot="left"  icon="back">返回</mt-button>
  </mt-header>
  <!-- 占位 -->
  <div style="width: 100%;height: 50px;"></div>
  <div class="head-zw"></div>
  <!-- main -->
  <div class="main-icon-flex">
    <div class="common-flex-view-this row flex-box-center">
      <div class="right-flex-view-common">姓名</div>
      <div>
        {{userName}}
      </div>
    </div>
    <!-- 银行名称 -->
    <div class="common-flex-view-this row flex-box-center">
      <div class="right-flex-view-common">支付宝账户</div>
      <div>
        <input v-model.trim="val" placeholder="请输入支付宝账户" type="text" id="picker"/>
      </div>

    </div>
    <!-- 提示信息 -->
    <!-- 开户行 -->
    <div class="common-flex-view-this row flex-box-center message-last-flex">
      *请务必确保支付宝信息正确,如因错误的支付宝信息导致收不到款,会员自行承担责任。
  </div>
    <!-- 提交按钮 -->
    <div class="common-flex-view-this row flex-box-center border-none">
      <div class="btn-this" @click="save">{{flag?'提交':'正在处理中...'}}</div>
    </div>
  </div>
</div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  import RegUtil from './../common/regUtil'
  export default{
    data(){
      return {
        userName:JSON.parse(localStorage.loginInfo).realName||'',//用户的真实姓名，用户登陆后获取或者填写
        flag:true,
        val:'', //支付宝帐户
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
      save () {//保存添加的支付宝帐户
        if(this.flag){
          this.flag=false;
          let user = /^([a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)|(1[3-9]\d{9})$/;//支付宝账号正则
          if(!user.test(this.val)){
            TostUtil.tostTop('请输入正确的支付宝帐号格式！');
            this.flag=true;
            return;
          }
          Util.ajax.post('/api/alipay/add',{
            accountName:this.userName,
            name:this.val,
            status:'yes'
          }).then(res=>{
            TostUtil.tostTop(res.data.message);
            if(res.data.status===200){
              this.flag=true;
              this.goBack();
            }else{
              this.$bus.$emit('loading', false);
              this.flag=true;
              TostUtil.tostTop(res.data.message)
            }
          }).catch(err=>{
            this.flag=true;
            this.$bus.$emit('loading', false);
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
  .main-icon-flex {
    width: 86%;
    height: auto;
    padding: 0 7%;
  }

  body, html {
    overflow: hidden;
    touch-action: none;
  }
  .border-none{
    border:none!important;
  }
  /* 公用部分 */
  .common-flex-view-this {
    width: 100%;
    padding: 15px 0;
    border-bottom: 1px solid #dcdcdc;
    font-size: 13px;
  }

  .right-flex-view-common {
    width: 70px;
  }

  input {
    -webkit-appearance: none;
    background: transparent;
    border:none;
    outline:none;
  }
  input{
    font-size:14px;
  }
  /* 提示信息 */
  .message-last-flex {
    color: #5D0E13;
    font-size: 13px;
    border: none;
  }

  /* 提交按钮 */
  .btn-this {
    width: 100%;
    background: #5D0E13;
    text-align: center;
    color: #ECC489;
    padding: 7px 0;
    border-radius: 5px;
    font-size: 16px;
  }
  .flex-box-center {
    display: flex;
    align-items: center;
  }
  .row {
    display: flex;
    flex-direction: row;
  }
</style>
