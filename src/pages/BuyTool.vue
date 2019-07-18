<template>
  <div>
    <!--<div
      style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="确认购买" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <!-- 内容图标部分 -->
    <div class="main-icon-flex">
      <!-- 占位 -->
      <div class="footprint"></div>
      <!-- 01 -->
      <div class="common-flex-view-setting row flex-box-center">
        <div class="font13">道具：{{id==1?'改手机号卡':id==2?'改姓名卡':id==3?'解封卡':'超级解封卡'}}</div>
      </div>
      <!-- 02 -->
      <div class="common-flex-view-setting row flex-box-center">
        <div class="font13">售价：{{price}}AP</div>
      </div>
      <!-- 03 -->
      <div class="common-flex-view-setting row flex-box-center">
        <div class="font13">购买数量：1张</div>
      </div>
      <!-- 使用说明 -->
      <!-- 占位 -->
      <div class="footprint"></div>
      <!-- 01 -->
      <div class="common-flex-view-setting column ">
        <div class="font13 color-view">*使用说明</div>
        <div class="font10 clone-this-flex" v-if="id==1">
          1.只适用于本账号<br>
          2.有交易中的承租或退租订单都不能改。如果是为了方便和对方联系，可在个性签名处备注常用电话<br>
        </div>
        <div class="font10 clone-this-flex" v-if="id==2">
          1.只适用于本账号<br>
          2. 账号如果有待匹配或未完成的退租订单，不能使用<br>
          3.使用后，银行账号和支付宝 二维码会被清空，需要完善后才可以退租AP
        </div>
        <div class="font10 clone-this-flex" v-if="id==3">
          1.适用于领导人为伞下会员解封<br>
          2.适用于一个计时周期未排单被封号的账号<br>
        </div>
        <div class="font10 clone-this-flex" v-if="id==4">
          1.适用于领导人为伞下会员解封<br>
          2.适用于超时不打款和上传假凭证被封的账号 <br>
        </div>
      </div>
    </div>
    <!-- 悬浮底部部分 -->
    <div class="popup row flex-box">
      <div class="font13 flex-1 flex-box-center">合计:{{price}}AP</div>
      <div class="font13 flex-1 flex-justify-center" style="justify-content: flex-end;">
        <div class="btn-buy-save font-13" @click="toBuy">确认购买</div><!---->
      </div>
    </div>
    <!-- 悬浮框 -->
    <div class="popup-preview-flex column flex-box-center" v-show="show">
      <div class="update-title-view">购买确认</div>
      <div class="version-flex-view">
        您将要购买一张{{id==1?'改手机号卡':id==2?'改姓名卡':id==3?'解封卡':'超级解封卡'}}，售价为{{price}}AP,购买后将从您选择的钱包中扣除对应AP。
        </div>
      <mt-radio
        v-model="value"
        :options="['希望钱包', '奖金钱包']">
      </mt-radio>
      <div class="update-btn-view flex-box">
        <div class="flex-1 font13" @click="toSave()">
          <div class="save-flex-btn">{{flag?"提交":"处理中"}}</div>
        </div>
        <div class="flex-1 font13 flex-right" @click="toDel()">
          <div class="del-flex-btn">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  import { Radio } from 'mint-ui';
  export default{
    data(){
      return {
        id: '',
        price:'',
        text:'',
        show: false,
        value:'',
        wallet:'',
        flag:true
      }
    },
    methods: {
      toBuy () {//点击确认购买
        this.show = true
      },
      goBack(){
        this.$router.go('-1')
      },
      toSave () {//购买
        if(this.flag){
          this.flag=false;
          if(this.value===''){
            TostUtil.tostTop('请选择扣除帐户');
            this.flag=true;
            return;
          }
          if(this.value==='希望钱包'){
            this.wallet='ecash'
          }
          if(this.value==='奖金钱包'){
            this.wallet='bonus'
          }
          Util.ajax.post('/api/gift/buy',{
            name:this.$route.params.name,
            source:this.wallet,
            quantity:1
          }).then(res=>{
            TostUtil.tostTop(res.data.message);
            if(res.data.status===200){
              this.flag=true;
              this.$router.push('/ToolMine');
              this.show=!this.show;
            }else{
              this.flag=true;
              this.show=!this.show;
            }
          }).catch(err=>{
            TostUtil.tostTop('网络出错,请稍后重试!')
          })
        }

        /*this.show = !this.show*/
      },
      toDel () {//取消
        TostUtil.tostTop('已取消！');
        this.value='';
        this.show = !this.show
      }
    },
    created () {
      this.id=this.$route.params.id;
      this.price=this.$route.params.price;
      this.text=this.$route.params.text;
    }
  }
</script>
<style scoped>
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  .font13 {
    font-size: 14px !important;
  }

  .main-icon-flex {
    width: 86%;
    height: auto;
    padding: 0 7%;
    background: #fff;
  }

  .flex-box-center {
    display: flex;
    align-items: center;
  }

  .flex-justify-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex-box {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .flex-1 {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    flex-wrap: wrap;
  }

  .flex-right {
    display: flex;
    justify-content: flex-end;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  .font10 {
    font-size: 10px;
  }

  /* 公用样式 */
  .common-flex-view-setting {
    width: 100%;
    height: auto;
    border-bottom: 1px solid #E6E6E6;
    position: relative;
    padding: 10px 0;
  }

  .icon-view-common {
    width: 15px;
    height: 15px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .had-right-common {
    position: absolute;
    right: 0;
    top: 20px;
  }

  .color-view {
    color: #5D0E13;
  }

  .clone-this-flex {
    color: #4E4E4E;
    padding: 5px 0px;
  }

  /* 悬浮底部部分 */
  .popup {
    width: 86%;
    padding: 10px 7%;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
  }

  /* 确认购买 */
  .btn-buy-save {
    width: 60%;
    padding: 5px 0;
    text-align: center;
    background: #5D0E13;
    color: #ECC489;
    border-radius: 5px;
  }

  /* 确认购买悬浮框 */
  .popup-preview-flex {
    width: 70%;
    height: auto;
    background: #5D0E13;
    position: fixed;
    left: 15%;
    top: 30%;
    border-radius: 5px;
  }

  .update-title-view {
    color: #fff;
    font-size: 14px;
    padding: 5px 0;
  }

  .version-flex-view {
    color: #fff;
    font-size: 12px;
    padding: 5px 7%;
  }

  .update-btn-view {
    width: 90%;
    padding: 10px 5%;
  }

  .save-flex-btn {
    background: #F1CA8F;
    color: #5D0E13;
    border-radius: 5px;
    width: 50%;
    padding: 2px 0;
    text-align: center;
  }

  .del-flex-btn {
    background: #4D4D4D;
    color: #fff;
    border-radius: 5px;
    width: 50%;
    padding: 2px 0;
    text-align: center;
  }
</style>
