<template>
  <div>
    <!--<div
      style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="真实姓名" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <div class="head-zw"></div>
    <!-- main -->
    <div class="common-flex flex-box">
      <div class="flex-1" style="width: 80%;" v-show="!disabled">
        <span style="margin-right:10px;">真实姓名:</span>{{trueName}}


      </div>
      <div class="flex-1" style="    display: flex; justify-content: flex-start; align-items: center;" v-show="disabled"><!--v-show="disabled"-->
        <span>真实姓名:</span>
        <div style="margin-left:10px;width: 70%;border-bottom: 1px solid #f7f7f7;">
          <input v-model.trim="trueName" ref="tName" type="text"
                 placeholder="请输入真实姓名"/>
        </div>
      </div>
      <div class=" flex-right color-clone" @click="toUpdate">{{!disabled ? '修改' : '确认'}}</div>
    </div>
    <!-- 占位 -->
    <div class="footprint"></div>
    <div class="common-flex flex-box">
      <div class="flex-1">已有改名卡:{{cardNumber}}张</div>
      <div class="flex-1 flex-right color-clone" @click="toTool">去购买</div>
    </div>
    <div class="color-clone div-width-view">
      *如需要更改账号姓名,请先到道具商城购买改名卡


    </div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  import RegUtil from './../common/regUtil'
  export default{
    data () {
      return {
        trueName: JSON.parse(localStorage.loginInfo).realName,
        disabled: false,
        cardNumber: 0
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
      Util.ajax.getByForm('/api/member/balance').then(res=>{
        that.$bus.$emit('loading', false);
        if(res.data.status===200){
          this.cardNumber=res.data.data.name;
        }else{
          TostUtil.tostTop(res.data.message);
        }
      }).catch(err=>{
        that.$bus.$emit('loading', false);
        TostUtil.tostTop('网络出错,请稍后重试!')
      })
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      toTool () {//购买
        this.$router.push('/ToolShop');
      },
      toUpdate () {//修改确认
        let that = this;
        let obj = JSON.parse(localStorage.getItem('loginInfo'));
        if (!that.disabled) {
          that.$refs.tName.focus();
          that.disabled = !that.disabled;
        } else {
          if (!RegUtil.isMatchRealName(that.trueName)) {
            TostUtil.tostTop('请输入您的真实姓名！');
            that.trueName = '';
            that.$refs.tName.focus();
            return false;
          }

          if (that.cardNumber < 1) {
            TostUtil.tostTop('改名卡不足,请去购买！');
            return false;
          }
          Util.ajax.post('/api/member/update',{
            value:that.trueName,
            type:'realname'

          }).then(res=>{
            if(res.data.status===200){
              obj.realName=that.trueName;
              localStorage.setItem('loginInfo',JSON.stringify(obj));
              TostUtil.tostTop(res.data.message);
              this.goBack();
            }
          }).catch(err=>{
            TostUtil.tostTop('网络出错,请稍后重试!')
          })
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

  /* main */
  .common-flex {
    width: 86%;
    height: 60px;
    padding: 0 7%;
    background: #fff;
    font-size: 13px;
  }

  /* 单独控制文字颜色 */
  .color-clone {
    color: #5D0E13;
  }

  .div-width-view {
    width: 100%;
    font-size: 13px;
    text-align: center;
    padding-top: 10px;
  }

  input {
    color: #000000;
    border: none;
    outline: none;
    font-size: 14px;
    padding: 5px 0;
    margin-top: -5px;
  }

  .div-width-view {
    width: 100%;
    font-size: 13px;
    text-align: center;
    padding-top: 10px;
  }

  .color-clone {
    color: #5D0E13;
  }

  .flex-right {
    display: flex;
    justify-content: flex-end;
  }

  input[disabled] {
    color: #000000;
    opacity: 1
  }

  .flex-box {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .flex-1 {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    flex-wrap: wrap;
  }
</style>
