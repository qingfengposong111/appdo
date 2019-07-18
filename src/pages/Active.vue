<template>
  <div>
    <!--<div
      style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="激活码" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
      <mt-button slot="right" class="single" @click="activeRecord">明细</mt-button>
    </mt-header>
    <div style="width: 100%;height: 45px;"></div>
    <div class="hope-top">
      <div class="active-code">
        {{activeNumber}}
      </div>
      <div class="active-txt">激活码数量</div>
    </div>
    <div class="main-icon-font">
      <div class="common-flex-icon row flex-box-center">
        <div class="icon-left-view"
             style="background: url(static/images/icon/jhm/icon01.png);background-size:100% 100%;"></div>
        <div class="font13 width-clone-input">会员用户名</div>
        <div>
          <input placeholder="请输入会员用户名" v-model.trim="memberName" type="text"/>
        </div>
        <div class="right-btn-view-img"></div>
      </div>
      <div class="common-flex-icon row flex-box-center">
        <div class="icon-left-view"
             style="background: url(static/images/icon/jhm/icon02.png);background-size:100% 100%;"></div>
        <div class="font13 width-clone-input">转码个数</div>
        <div>
          <input placeholder="请输入转码个数" @input="getActiveNumber" v-model.trim="memberNumber" type="text"/>
        </div>
        <div class="right-btn-view-img"></div>
      </div>
      <div class="common-flex-icon row flex-box-center">
        <div class="icon-left-view"
             style="background: url(static/images/icon/jhm/icon03.png);background-size:100% 100%;"></div>
        <div class="font13 width-clone-input">安全密码</div>
        <div>
          <input placeholder="请输入安全密码" v-model.trim="memberSafePwd" type="password"/>
        </div>
        <div class="right-btn-view-img"></div>
      </div>
      <div class="font13 color-clone" @click="getCode" style="font-size: 14px;">
        *激活码如何获得


      </div>
      <div class="btn-last-main flex-justify-center">
        <div class="btn-zm-flex" @click="transCoding">{{flag?'转码':'正在处理中...'}}</div>
      </div>
    </div>
    <!--底部导航-->
    <div class="foot-black"></div>
    <div class="bot"  v-show="hidshow">
      <router-link to="/Financial">
        <img src="static/images/icon/hope/all.png" alt="">
        <div>总览</div>
      </router-link>
      <router-link to="/HopeWallet">
        <img src="static/images/icon/cwzx/hope.png" alt="">
        <div>希望钱包</div>
      </router-link>
      <router-link to="/BonusWallet">
        <img src="static/images/icon/hope/money.png" alt="">
        <div>奖金钱包</div>
      </router-link>
      <router-link to="/Active">
        <img src="static/images/icon/hope/active01.png" alt="">
        <div class="selected">激活码</div>
      </router-link>
      <router-link to="/Wait">
        <img src="static/images/icon/hope/wait.png" alt="">
        <div>理财钱包</div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  import RegUtil from './../common/regUtil';
  export default{
    data () {
      return {
        memberName: '',//用户名
        memberNumber: '',//转码个数
        memberSafePwd: '',//安全密码
        activeNumber: 0,//激活码数量
        docmHeight: '0',  //默认屏幕高度
        flag:true,
        showHeight: '0',  //实时屏幕高度

        hidshow: true,  //显示或者隐藏footer,

        isResize: false //默认屏幕高度是否已获取
      }
    },
    mounted(){
      window.onresize = () => {

        return (() => {
          if (!this.isResize) {                               //默认屏幕高度 
            this.docmHeight = document.documentElement.clientHeight;
            this.isResize = true
          }
          this.showHeight = document.body.clientHeight
        })()
      }
    },
    watch:{
      showHeight:function(){
        if (this.docmHeight > this.showHeight) {
          this.hidshow = false
        } else {
          this.hidshow = true
        }
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that = this;
      that.smsCode();
    },
    methods: {
      getCode () {//如何获取验证码
        this.$router.push('/GetCode')
      },
      smsCode(){
        Util.ajax.getByForm('/api/member/balance').then(res3 => {
          if (res3.data.status === 200) {
            this.activeNumber = res3.data.data.code;//激活码数量
            this.$bus.$emit('loading', false);
          }else{
            TostUtil.tostTop(res3.data.message);
            this.$bus.$emit('loading', false);
          }
        }).catch(err=>{
          this.$bus.$emit('loading', false);
          TostUtil.tostTop('网络出错,请稍后重试!')
        })
      },
      toRecord () {//明细
        this.$router.push('/HadUse')
      },
      getActiveNumber(){//监控转码个数
        if (Number(this.memberNumber) > Number(this.activeNumber)) {
          TostUtil.tostTop('激活码数量不足！');
          this.memberNumber = '';
          return false;
        }
      },
      postNumber(){
        Util.ajax.post('/api/gift',{
          username:this.memberName,
          number:this.memberNumber
        }).then(res1=>{
          this.memberName='';
          this.memberNumber='';
          this.memberSafePwd='';
          TostUtil.tostTop(res1.data.message);
          this.smsCode();
        });
      },
      goBack(){
        this.$router.go('-1')
      },
      activeRecord(){
        this.$router.push('/ActiveRecord');
      },
      transCoding(){//转码提交
        if(this.flag){
          this.flag=false;
          if (Number(this.memberNumber) > Number(this.activeNumber)) {
            TostUtil.tostTop('激活码数量不足！');
            this.memberNumber = '';
            this.flag=true;
            return false;
          }
          if (!RegUtil.isMatchMix(this.memberName)) {
            TostUtil.tostTop('用户名格式不正确');
            this.flag=true;
            return false;
          }
          if (!RegUtil.isMatchNumber(Number(this.memberNumber))) {
            TostUtil.tostTop('请输入激活码数量（正整数）！');
            this.flag=true;
            return false;
          }
          if (!RegUtil.isMatchSafePwd(this.memberSafePwd)) {
            TostUtil.tostTop('安全密码格式不正确！');
            this.flag=true;
            return false;
          }
          Util.ajax.post('/api/member/verify_security', {
            password: this.memberSafePwd
          }).then(res => {
            if (res.data.status === 200) {
              this.postNumber();
              this.flag=true;
            } else {
              TostUtil.tostTop(res.data.message);
              this.flag=true;
            }
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

  .hope-top {
    width: 100%;
    height: 170px;
    background-image: url(./../../static/images/icon/jhm/1_02.png);
    background-repeat: no-repeat;
    background-position: center;
    padding: 40px 0 0;
    box-sizing: border-box;
  }

  .active-code {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid #fff;
    text-align: center;
    line-height: 60px;
    color: #ECC489;
    background-color: #822520;
    font-size: 30px;
    margin: 0 auto;
  }

  .active-txt {
    color: #fff;
    margin-top: 5px;
    font-size: 14px;
    text-align: center;
  }

  /* 单独控制文字颜色 */
  .color-clone {
    color: #5D0E13;
  }

  /* 图层区域 */
  .main-icon-font {
    width: 86%;
    padding: 5% 7%;

  }

  .common-flex-icon {
    width: 100%;
    position: relative;
    border-bottom: 1px solid #cecece;
    padding: 10px 0;
    display: flex;
    align-items: center;
  }

  .width-clone-input {
    width: 25%;
    font-size: 14px;
  }

  input {
    background: transparent;
    -webkit-appearance: none;
    border: none;
    outline: none;
  }

  input {
    font-size: 14px;
  }

  .icon-left-view {
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right: 5px;
  }

  .right-btn-view-img {
    width: 15px;
    height: 15px;
    background-image: url('./../../static/images/icon/grzx/right.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    position: absolute;
    right: 0;
  }

  /* 转码按钮 */
  .btn-last-main {
    width: 100%;
    padding: 10% 0;
  }

  .btn-zm-flex {
    width: 60%;
    padding: 7px 0;
    text-align: center;
    background: #5D0E13;
    margin: 0 auto;
    color: #ECC489;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .bot {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    font-size: 13px;
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 9;
    background: #f7f7fa;
    box-sizing: border-box;
    border-top: 1px solid #c0bfc4;
  }

  .bot a {
    padding: 5px 0 0;
    color: #999;
    text-align: center;
  }

  .bot div {
    margin: -4px 0 4px;
  }

  .bot img {
    width: 22px;
    height: 22px;
  }

  .selected {
    color: #81231f;
  }
</style>
