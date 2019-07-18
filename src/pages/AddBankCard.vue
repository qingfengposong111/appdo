<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="添加银行帐户" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div class="head-zw" style="width: 100%;height: 50px;"></div>
    <!-- main -->
    <div class="main-icon-flex" v-cloak>
      <div class="common-flex-view-this row flex-box-center">
        <div class="right-flex-view-common">持卡人</div>
        <div style="width: 80%;">
          <input style="width: 100%;" placeholder="请输入开户姓名"  v-model.trim="userName" type="text">
        </div>
      </div>
      <!-- 银行名称 -->
      <div class="common-flex-view-this row flex-box-center">
        <div class="right-flex-view-common">银行名称</div>
        <div style="width: 80%;">
          <!--<input v-model.trim="val" placeholder="请输入银行名称" type="text" />-->
          <div @click="bankVisible = true">{{bankName}}</div>
        </div>
        <div class="right-jt-flex"></div>
      </div>
      <!-- 银行账户 -->
      <div class="common-flex-view-this row flex-box-center">
        <div class="right-flex-view-common">银行账户</div>
        <div>
          <input type="number" @input="getVal" v-model.trim="bankNumber" placeholder="请输入 16~19 位银行卡号"/>
        </div>
      </div>
      <!-- 开户行 -->
      <div class="common-flex-view-this row flex-box-center">
        <div class="right-flex-view-common">开户行</div>
        <div>
          <input type="text" v-model.trim="bankAddress" placeholder="请输入开户行"/>
        </div>
      </div>
      <!-- 提示信息 -->
      <!-- 开户行 -->
      <div class="common-flex-view-this row flex-box-center message-last-flex">
        *请务必确保银行信息正确,如因错误的银行信息导致收不到款,会员自行承担责任。

      </div>
      <!-- 提交按钮 -->
      <div class="common-flex-view-this row flex-box-center border-none">
        <div class="btn-this" @click="submit">{{flag?'提交':'正在处理中...'}}</div>
      </div>
    </div>
    <div class="sexPicker">
      <mt-popup
        v-model="bankVisible"
        position="bottom"
        closeOnClickModal="true"
      >
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </mt-popup>
    </div>
  </div>
</template>
<script>
  import RegUtil from './../common/regUtil';
  import Util from './../common/util';
  import TostUtil from './../common/tostUtil';
  export default{
    data(){
      return {
        list: [],
        bankAddress: '',//所属银行地方
        bankName: '',//开户行
        flag:true,
        bankNumber: '',//银行卡号
        userName: '',//开户人
        bankVisible: false,  //选择器的显示与影藏
        slots: [
          {
            flex: 1,
            values: [
              '中国银行',
              '中国建设银行',
              '中国农业银行',
              '中国工商银行',
              '交通银行',
              '广发银行',
              '上海浦东发展银行',
              '招商银行',
              '平安银行',
              '中国邮政储蓄银行',
              '兴业银行',
              '民生银行',
              '光大银行',
              '中信银行',
              '华夏银行',
              '上海银行',
              '北京银行',
              '花旗中国银行',
              '汇丰中国银行',
              '渣打中国银行',
              '香港汇丰银行',
              '其他银行'
            ],
            className: 'slot1',
            textAlign: 'center',
          }
        ],
      }
    },
    created(){
      if (localStorage.loginInfo) {
        this.userName = JSON.parse(localStorage.loginInfo).realName
      } else {
        this.userName = ''
      }
    },
    methods: {
      onValuesChange(picker, values) {
        this.bankName = values[0];
      },
      goBack(){
        this.$router.go('-1')
      },
      getVal(){//监控输入的银行帐号
        if (this.bankName === '') {
          TostUtil.tostTop('请选择所属银行！');
          return false;
        }
      },
      submit () {//确定提交
        if(this.flag){
          this.flag=false;
          if (!RegUtil.isMatchRealName(this.userName)) {
            TostUtil.tostTop('请输入开户人！');
            this.flag=true;
            return false;
          }

          if (!RegUtil.isMatchBankNumber(this.bankNumber)) {
            TostUtil.tostTop('请输入16~19位银行卡号！');
            this.flag=true;
            return false;
          }
          if (this.bankAddress === '') {
            TostUtil.tostTop('请输入开户行！');
            this.flag=true;
            return false;
          }
          Util.ajax.post('/api/bank/add',{
            bankName:this.bankName,
            bankNumber:this.bankNumber,
            bankAccountName:this.userName,
            bankAddress:this.bankAddress,
            status:'yes',
          }).then(res=>{
            if(res.data.status===406){
              TostUtil.tostTop(res.data.message);
              if(res.data.message==='请完善个人资料，填写真实姓名'){
                this.$router.push('/Perfict');
              }
              this.flag=true;
            }
            if(res.data.status===200){
              this.bankNumber='';
              TostUtil.tostTop(res.data.message);
              this.flag=true;
              this.$router.go('-1')
            }
          }).catch(err=>{
            TostUtil.tostTop('网络出错,请稍后重试!')
          })

        }

      },

    },
  }
</script>
<style scoped>
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  .border-none {
    border: none !important;
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

  /* 公用部分 */
  .common-flex-view-this {
    width: 100%;
    padding: 15px 0;
    border-bottom: 1px solid #dcdcdc;
    font-size: 13px;
  }

  .right-flex-view-common {
    width: 65px;
  }

  input {
    -webkit-appearance: none;
    background: transparent;
    width: 150%;
    position: relative;
    z-index: 99;
    color: #000;
    font-size: 13px;
    outline: none;
    border: none;
  }

  .right-jt-flex {
    width: 13px;
    height: 13px;
    background-image: url('./../../static/images/icon/grzx/right.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    position: absolute;
    right: 7%;
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

  /* 改变插件默认颜色 */
  .toolbar .picker-button {
    color: #5D0E13 !important;
  }
</style>
