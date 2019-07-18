<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="账户设置" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <!-- 内容图标部分 -->
    <div class="main-icon-flex">
      <!-- 占位 -->
      <div class="footprint"></div>
      <!-- 头像 -->
      <div class="common-flex-view-setting row flex-box-center">
        <!-- icon -->
        <div class="icon-view-common" style="background-image: url('static/images/icon/setting/icon01.png');">
        </div>
        <div class="font-name-title">头像</div>
        <!-- 头像图标 -->
        <div class="right-title-view" style="background-image:url('static/images/icon/setting/head.png')"></div>
      </div>
      <!-- 用户名 -->
      <div class="common-flex-view-setting row flex-box-center">
        <!-- icon -->
        <div class="icon-view-common" style="background-image: url('static/images/icon/setting/icon02.png');">
        </div>
        <div class="font-name-title">用户名</div>
        <div class="right-title-view">
          <span style="font-size: 13px;">{{userName}}</span>
        </div>
      </div>
      <!-- 真实姓名 -->
      <div class="common-flex-view-setting row flex-box-center" @click="toTrueName">
        <!-- icon -->
        <div class="icon-view-common" style="background-image: url('static/images/icon/setting/icon03.png');">
        </div>
        <div class="font-name-title">真实姓名</div>
        <div class="had-right-common row">
          <div class="person-name-clone">{{realName}}</div>
          <div class="right-common-flex"></div>
        </div>
      </div>
      <!-- 生日 -->
      <div class="common-flex-view-setting row flex-box-center">
        <!-- icon -->
        <div class="icon-view-common" style="background-image: url('static/images/icon/setting/icon04.png');">
        </div>
        <div class="font-name-title">生日</div>
        <!-- 点击选择日期 -->
        <div class="had-right-common row">
          <div class="person-name-clone birth-date-flex">
            <!--<input v-model.trim="val" class="weui-input" type="text" id="datetime-picker"/>-->
            <mt-button @click.native="open('picker')" size="large">{{value | formatDate}}</mt-button>
          </div>
          <div class="right-common-flex"></div>
        </div>
      </div>
      <!-- 手机号 -->
      <div class="common-flex-view-setting row flex-box-center" @click="toCheckPhone">
        <!-- icon -->
        <div class="icon-view-common" style="background-image: url('static/images/icon/setting/icon05.png');">
        </div>
        <div class="font-name-title">手机号</div>
        <div class="had-right-common row">
          <div class="person-name-clone">{{phone}}</div>
          <div class="right-common-flex"></div>
        </div>
      </div>
      <!-- 会员级别 -->
      <div class="common-flex-view-setting row flex-box-center">
        <!-- icon -->
        <div class="icon-view-common" style="background-image: url('static/images/icon/setting/icon06.png');">
        </div>
        <div class="font-name-title">会员级别</div>
        <div class="right-title-view">
          <span style="font-size: 13px;">{{levelName}}</span>
        </div>
      </div>
      <!-- 昵称 -->
      <div class="common-flex-view-setting row flex-box-center" @click="toNikName">
        <!-- icon -->
        <div class="icon-view-common" style="background-image: url('static/images/icon/setting/icon07.png');">
        </div>
        <div class="font-name-title">昵称</div>
        <div class="had-right-common row">
          <div class="person-name-clone"></div>
          <div class="right-common-flex"></div>
        </div>
      </div>
      <!-- 个性签名 -->
      <div class="common-flex-view-setting row flex-box-center" @click="toSignature">
        <!-- icon -->
        <div class="icon-view-common" style="background-image: url('static/images/icon/setting/icon08.png');">
        </div>
        <div class="font-name-title">个性签名</div>
        <div class="had-right-common row">
          <div class="right-common-flex"></div>
        </div>
      </div>
      <!-- 我的银行账户 -->
      <div class="common-flex-view-setting row flex-box-center" @click="toBankCard">
        <!-- icon -->
        <div class="icon-view-common" style="background-image: url('static/images/icon/setting/icon09.png');">
        </div>
        <div class="font-name-title">我的银行账户</div>
        <div class="had-right-common row">
          <div class="right-common-flex"></div>
        </div>
      </div>
      <!-- 支付宝管理 -->
      <div class="common-flex-view-setting row flex-box-center" @click="toAlipayCard">
        <!-- icon -->
        <div class="icon-view-common" style="background-image: url('static/images/icon/setting/icon10.png');">
        </div>
        <div class="font-name-title">支付宝管理</div>
        <div class="had-right-common row">
          <div class="right-common-flex"></div>
        </div>
      </div>
      <!-- 二维码付款 -->
      <div class="common-flex-view-setting row flex-box-center" @click="toCodePay">
        <!-- icon -->
        <div class="icon-view-common" style="background-image: url('static/images/icon/setting/erweima.png');">
        </div>
        <div class="font-name-title">二维码收款</div>
        <div class="had-right-common row">
          <div class="right-common-flex"></div>
        </div>
      </div>
      <!-- 密码管理 -->
      <div class="common-flex-view-setting row flex-box-center" @click="toUpdatePwd">
        <!-- icon -->
        <div class="icon-view-common" style="background-image: url('static/images/icon/setting/icon11.png');">
        </div>
        <div class="font-name-title">密码管理</div>
        <div class="had-right-common row">
          <div class="right-common-flex"></div>
        </div>
      </div>

      <!-- 两个按钮 -->
      <div class="two-btn-flex row">
        <div class="drop-btn-flex" @click="toLogin">登出</div>
        <div class="inspect-btn-flex" @click="toCheck()"> 检查更新</div>
      </div>
      <!-- ZHANWEI -->
      <!-- 占位 -->
      <div class="footprint"></div>
      <!-- 更新提示 -->
    </div>
    <mt-datetime-picker class="picker_show" ref="picker" type="date" v-model="value" :startDate="startDate"
                        :endDate="endDate"></mt-datetime-picker>
  </div>
</template>
<script>
  import {formatDate} from '../assets/date.js';//日期转换组件
  export default{
    data(){
      return {
        levelName:JSON.parse(localStorage.loginInfo).levelName||'A0',
        display: false,//更新提示显示与隐藏
        value: ''||new Date(),          //定义显示时间
        visible: false,
        startDate: new Date('1900-01-01'),      //设置开始时间
        endDate: new Date('3019-01-01'),   //设置结束时间
        val: '',//生日
        phone:'',
        userName:'',
        realName:'',
        renew:true
      }
    },
    filters: {                    //时间转换
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
      setTimeout(function(){
        that.$bus.$emit('loading', false);
      },600);
      if(localStorage.loginInfo){
        this.levelId=JSON.parse(localStorage.loginInfo).levelId;
        this.phone=JSON.parse(localStorage.loginInfo).phone;
        this.userName=JSON.parse(localStorage.loginInfo).username;
        this.realName=JSON.parse(localStorage.loginInfo).realName
      }else{
        this.levelId=1;
        this.phone='';
        this.userName='';
        this.realName='';
      }
    },
    methods: {
      toCheck () {//检查更新
        let that = this;
        if(that.renew){
            that.renew=false;
          let wgtVer=null;
          let u = navigator.userAgent;
          let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          function plusReady(){
            plus.runtime.getProperty(plus.runtime.appid,function(inf){
              wgtVer=inf.version;// 获取本地应用资源版本号
              checkUpdate();//进来之后就检查版本
            });
          }
          if(window.plus){
            plusReady();
          }else{
            document.addEventListener('plusready',plusReady,false);
          }
// 检测更新
          let checkUrl="http://download.wealth-point.com/update/GetVersion.php";//版本号所在服务器位置
          function checkUpdate() {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
              switch (xhr.readyState) {
                case 4:
                  plus.nativeUI.closeWaiting();
                  if (xhr.status === 200) {//如果有最新版本则提示有最新版本
                    let newVer = xhr.responseText;
                    if (wgtVer && newVer && (wgtVer !== newVer)) {//如果存在本地版本与新版本，并且两个版本不一样则下载新版本
                      plus.nativeUI.confirm("-优化了用户体验\n-增加了新的功能",function(){
                        that.renew=false;
                        downWgt();  // 下载升级包
                      }, "Wealth Point新版本发布！");

                    }else{
                      plus.nativeUI.confirm("已是最新版本！");
                      that.renew=true;
                    }
                  } else {
                    plus.nativeUI.confirm("检测更新失败！");
                  }
                  break;
                default:
                  break;
              }
            };
            xhr.open('GET', checkUrl);
            xhr.send();
          }
// 下载wgt文件
          let wgtUrl=null;
          function downWgt(){
            if(isAndroid){
              wgtUrl="http://download.wealth-point.com/update/apk.wgt";//存在服务器上的wgt文件，提供给用户来下载所对就的安装包http://download.wealth-point.com/H59B47E00.wgt
              plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){//更新所用的安装包所在的地址
                if ( status === 200 ) {
                  //confirm("下载成功");
                  installWgt(d.filename); // 安装wgt包
                } else {
                  plus.nativeUI.confirm("下载失败！");
                }
                plus.nativeUI.closeWaiting();
              }).start();
            }else if(isiOS){
              wgtUrl="http://download.wealth-point.com/update/ios.wgt";//存在服务器上的wgt文件，提供给用户来下载所对就的安装包http://download.wealth-point.com/H59B47E00.wgt
              plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){//更新所用的安装包所在的地址
                if ( status === 200 ) {
                  //confirm("下载成功");
                  installWgt(d.filename); // 安装wgt包
                } else {
                  plus.nativeUI.confirm("下载失败！");
                }
                plus.nativeUI.closeWaiting();
              }).start();
            }
          }
// 更新应用资源
          function installWgt(path){
            plus.nativeUI.showWaiting("安装文件...");
            plus.runtime.install(path,{force:true},function(){
              plus.nativeUI.closeWaiting();
              plus.nativeUI.alert("应用资源更新完成！",function(){
                that.renew=true;
                plus.runtime.restart();//应用重新运行
              });
            },function(e){
              plus.nativeUI.closeWaiting();
              console.log("安装失败");
              plus.nativeUI.alert("安装失败");
            });
          }
        }

      },
      toLogin () {//登陆
        localStorage.clear();
        this.$router.push('/Login');
      },
      toTrueName () {//真实姓名
        this.$router.push('/TrueName');
      },
      toCheckPhone () {//修改手机号码
        this.$router.push('/CheckPhone');
      },
      toNikName () {//修改昵称
        this.$router.push('/NickName');
      },
      toSignature () {//个性签名
        this.$router.push('/Signature');
      },
      toBankCard () {//我的银行帐户
        this.$router.push('/BankCard');
      },
      toAlipayCard () {//支付宝管理
        this.$router.push('/AliPayCard');
      },
      toUpdatePwd () {//修改密码
        this.$router.push('/UpdatePwd');
      },
      toCodePay () {//二维码收款
        this.$router.push('/CodePay');
      },
      goBack(){
        this.$router.go('-1')
      },
      open(picker) {
        this.$refs[picker].open();    //设置开始
      },
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

  .main-icon-flex {
    width: 86%;
    height: auto;
    padding: 0 7%;
    /* padding-top: 50px;*/
  }

  .right-common-flex {
    width: 15px;
    height: 15px;
    background-image: url(./../../static/images/icon/grzx/right.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  /* 公用样式 */
  .common-flex-view-setting {
    width: 100%;
    height: auto;
    border-bottom: 1px solid #E6E6E6;
    position: relative;
    padding: 15px 0;
  }

  .icon-view-common {
    width: 15px;
    height: 15px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .font-name-title {
    margin-left: 10px;
    font-size: 14px;
  }

  .had-right-common {
    position: absolute;
    right: 0;
    top: 20px;
  }

  /* 头像的单独样式 */
  .right-title-view {
    position: absolute;
    right: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  /* 用户名单独样式 */
  .right-title-view span {
    position: absolute;
    right: 10%;
    top: 5px;
  }

  /* 真实姓名单独样式 */
  .person-name-clone {
    margin-top: -3px;
    margin-right: 5px;
    font-size: 13px;
  }

  /* 两个按钮的单独样式 */
  .two-btn-flex {
    width: 100%;
    height: auto;
    padding: 30px 0;
  }

  .drop-btn-flex {
    width: 45%;
    height: 20px;
    text-align: center;
    line-height: 20px;
    background: #5D0E13;
    border: 1px solid #5D0E13;
    color: #ECC489;
    font-size: 13px;
    padding: 7px 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-right: 10%;
  }

  .inspect-btn-flex {
    width: 45%;
    height: 20px;
    text-align: center;
    line-height: 20px;
    background: transparent;
    color: #5D0E13;
    border: 1px solid #5D0E13;
    font-size: 13px;
    padding: 7px 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  /* 更新提示单独样式 */
  .popup-this {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3)
  }

  .update-clone-flex {
    width: 60%;
    height: auto;
    background: #5D0E13;
    position: absolute;
    left: 20%;
    top: 30%;
    border-radius: 5px;
    text-align: center;

  }

  .update-title-view {
    color: #fff;
    font-size: 20px;
    padding: 10px 0;
  }

  .version-flex-view {
    color: #fff;
    font-size: 13px;
    padding: 10px 0;
  }

  .update-btn-view {
    width: 100%;
    border-top: 1px solid #fff;
    padding: 10px 0;
  }

  .save-btn-view {
    width: 60px;
    margin: 0 auto;
    font-size: 13px;
    background: #F1CA8F;
    color: #5D0E13;
    padding: 5px 20px;
    border-radius: 5px;
  }

  .flex-box-center {
    display: flex;
    align-items: center;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .icon-view-common {
    width: 15px;
    height: 15px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
</style>
