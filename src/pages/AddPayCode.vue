<template>
  <div>
    <!--<div
      style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="添加收款码" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <!-- main -->
    <div class="main-icon-flex">
      <!--<div class="common-flex-view-this row flex-box-center">
        <div class="right-flex-view-common">账号:</div>
        <div style="width: 70%;"><input type="text" v-model.trim="account" placeholder="请输入支付宝或微信账号"></div>
      </div>-->
      <div class="common-flex-view-this row flex-box-center">
        <div class="right-flex-view-common">姓名</div>
        <div style="width: 70%;"><input type="text" v-model.trim="alipayName" placeholder="请输入支付宝账号的真实姓名"></div>
      </div>
      <!-- 选择收款方 -->
      <div class="common-flex-view-this row flex-box-center">
        <div class="right-flex-view-common">收款类别</div>
        <div style="width: 70%;" @click="toShow">{{val}}</div>
        <div class="right-jt-flex"></div>
      </div>
      <!-- 银行账户 -->
      <div class="common-flex-view-this row flex-box-center">
        <div class="right-flex-view-common">收款码</div>
        <div class="img-div">
          <div class="imgBox">
            <img :src="nowImg" alt="">
          </div>
          <input type="file" @change="onFile($event)">
        </div>
      </div>

      <!-- 提示信息 -->
      <!-- 开户行 -->
      <div class="common-flex-view-this row flex-box-center message-last-flex">
        *请务必确保收款码信息正确,如因错误的收款码信息导致收不到款,会员自行承担责任。


      </div>
      <!-- 提交按钮 -->
      <div class="common-flex-view-this row flex-box-center border-none">
        <div class="btn-this" @click="submit">{{doubleSubmit ? "提交" : "正在处理中..."}}</div>
      </div>
    </div>
    <!-- 自定义popup -->
    <div class="popup-bottom" v-show="choose" @click="outBox($event)">
      <div class="title-popup-view column flex-justify-center" ref="insidebox">
        <div class="font13 title-hope-font">请选择的收款码类别</div>
        <div class="color-clone title-hope-font" @click="toChoose(1)">微信收款</div>
        <div class="color-clone title-hope-font radius-cloe-bottom" @click="toChoose(2)">支付宝收款</div>
        <div class="footprint"></div>
        <div class="color-clone title-hope-font" @click="toShow">取消</div>
      </div>

    </div>
  </div>
</template>
<script>
  import Util from './../common/util';
  import TostUtil from './../common/tostUtil';
  export default{
    data () {
      return {
        choose: false,
        list: [],
        none: true,
        val: '请选择的收款码类别',//选择的收款码类别
        flag: 0,
        type: null,
        doubleSubmit: true,
        alipayName: '',//支付宝真实姓名
        account: '',//帐号
        files: '',//上传的路径
        nowImg: ''//显示图片
      }
    },
    created(){
      if (localStorage.loginInfo) {
        this.alipayName = JSON.parse(localStorage.loginInfo).realName
      } else {
        this.alipayName = ''
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      outBox(e){
        if (e.target.className !== 'title-popup-view') {
          this.choose = false;
        }
      },
      onFile(e){
        this.files = e.target.files[0];
        this.nowImg = window.URL.createObjectURL(e.target.files[0]);
      },
      toShow(){
        this.choose = !this.choose;
      },
      toChoose(index){
        let that = this;
        if (index === 1) {
          that.val = '微信收款';
          that.flag = 1;
          that.type = 'wechat'
        } else if (index === 2) {
          that.val = '支付宝收款';
          that.flag = 2;
          that.type = 'alipay'
        }
        that.choose = !that.choose;
      },
      submit(){//提交
        if (this.doubleSubmit) {
          this.doubleSubmit = false;
          if (this.val === '请选择的收款码类别') {
            TostUtil.tostTop('请选择收款类别！');
            this.doubleSubmit = true;
            return;
          }
          if (this.files === '') {
            TostUtil.tostTop('请上传收款码！');
            this.doubleSubmit = true;
            return;
          }
          if (this.alipayName === '') {
            TostUtil.tostTop('请输入支付宝真实姓名！');
            this.doubleSubmit = true;
            return;
          }
          let file = this.files;
          let param = new FormData(); //创建form对象
          param.append('qr_code_file', file, file.name);//通过append向form对象添加数据
          param.append('name', this.account);
          param.append('accountName', this.alipayName);
          param.append('type', this.type);
          param.append('status', 'yes');
          if (this.files) {
            Util.ajax.postForm('/api/qrcode/add', param).then(res => {
              if (res.data.status === 406) {
                TostUtil.tostTop(res.data.message);
                if (res.data.message === '请完善个人资料，填写真实姓名') {
                  this.$router.push('/Perfict');
                }
                this.doubleSubmit = true;
              }
              if (res.data.status === 200) {
                TostUtil.tostTop(res.data.message);
                this.doubleSubmit = true;
                this.$router.go('-1')
              }
            }).catch(err=>{
              this.doubleSubmit=true;
              TostUtil.tostTop('网络出错,请稍后重试!')
            })
          }
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
    position: fixed;
    width: 100%;
    z-index: 1900;
  }

  .imgBox {
    position: relative;
    width: 100px;
    height: 100px;
    border: 1px solid #d9d9d9;
    overflow: hidden;
    background-image: url('./../../static/images/icon/tgewm/tianjiadingyue.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .imgBox img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  input[type='file'] {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    color: #5d0e13;
    border-radius: 6px;
    font-size: 14px;
    left: 0;
    opacity: 0;
    top: 0;
  }

  .flex-box-center {
    display: flex;
    align-items: center;
  }

  .row {
    display: flex;
    flex-direction: row;
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
    /*width: 160%;*/
    position: relative;
    z-index: 99;
    border: none;
    outline: none;
  }

  input {
    color: #000;
    font-size: 13px;
    -webkit-appearance: none;
    background: transparent;
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

  /* 改变插件默认颜色 */
  .toolbar .picker-button {
    color: #5D0E13 !important;
  }

  .img-div {
    width: 100px;
    height: 100px;
    position: relative;
  }

  .img-div img {
    width: 100px;
    height: 100px;
    /* display: none;*/
  }

  .weui-uploader__input-box:after, .weui-uploader__input-box:before {
    background-color: transparent;
    content: none;
  }

  .weui-uploader__input {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .popup-bottom {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  .title-popup-view {
    position: absolute;
    bottom: 0;
    width: 86%;
    margin-left: 7%;
    background: #fff;
    height: auto;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .flex-justify-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  .title-hope-font {
    border-bottom: 1px solid #e7e7e7;
    padding: 7px 0;
    width: 100%;
    text-align: center;
  }

  .footprint {
    width: 100%;
    height: 10px;
    background: rgba(0, 0, 0, .3);
  }

  .font13 {
    font-size: 14px !important;
  }
</style>
