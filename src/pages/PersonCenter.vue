<template>
  <div>
    <!--<div
      style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="个人中心" class="header">
      <mt-button slot="left" @click="goBack" icon="back">返回</mt-button>
      <mt-button @click="toUse" slot="right">
        <img width="28" style="margin-top:6px;" src="static/images/icon/grzx/set.png" alt="">
      </mt-button>
    </mt-header>
    <!-- 占位 -->

    <!--<div class="head-zw" style="height: 70px;"></div>-->
    <!-- 悬浮顶部的登录提示条 -->
    <div class="fix-top-login row flex-box-center" @click="toLogin">
      <div class="icon-head-img" :style="{backgroundImage: 'url(' + head + ')'}"></div>
      <div class="login-name-person">{{user ? user : '登录'}}</div>
    </div>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <!--<div class="head-zw2"></div>-->
    <!-- main -->
    <div class="main-common-flex-this">
      <div class="one-flex-view-this column">
        <div class="title-common-flex" v-for="(item,index) in list" :key="index">
          <div class="row flex-box-center posi-view-flex" @click="toRedict(item.url)">
            <div class="icon-img-flex-this" :style="{backgroundImage: 'url(' + item.icon + ')'}"></div>
            <div class="name-flex-common font14">{{item.name}}</div>
            <div class="num-flex-common small-text" v-show="item.num !== ''">{{item.num}}</div>
            <div class="head-had-common font8 flex-justify-center level-bg-flex" v-show="item.levelName">
              {{item.levelName}}
            </div>
            <div class="right-btn-view-img"></div>
          </div>
        </div>
      </div>
      <!-- zhanwei -->
      <div class="footprint"></div>
      <div class="one-flex-view-this column">
        <div class="title-common-flex" v-for="(item,index) in list2" :key="index">
          <div class="row flex-box-center posi-view-flex" @click="toRedict(item.url)">
            <div class="icon-img-flex-this" :style="{backgroundImage: 'url(' + item.icon + ')'}"></div>
            <div class="name-flex-common">{{item.name}}</div>
            <div class="right-btn-view-img"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Util from './../common/util';
  import TostUtil from './../common/tostUtil';
  export default{
    data() {
      return {
        levelName: JSON.parse(localStorage.loginInfo).levelName,
        integral: 0,
        ecash: 0,
        bonus: 0,
        code: 0,
        head: 'static/images/icon/setting/head.png',
        user: JSON.parse(localStorage.loginInfo).username,//登陆后获取用户名
        list: [//个人中心主项目
          {icon: 'static/images/icon/grzx/icon01.png', name: '会员级别', url: '/MemLevel', levelName: 'A0'},
          {icon: 'static/images/icon/grzx/icon02.png', name: '信用评分', url: '/CreditScore', num: 0 + '分'},
          {icon: 'static/images/icon/grzx/icon03.png', name: '希望钱包', url: '/HopeWallet', num: 0},//希望钱包
          {icon: 'static/images/icon/grzx/icon04.png', name: '奖金钱包', url: '/BonusWallet', num: 0},
          {icon: 'static/images/icon/grzx/icon05.png', name: '激活码', url: '/Active', num: 0 + '个'},
          {icon: 'static/images/icon/grzx/icon06.png', name: '道具商城', url: '/ToolShop', num: ''}
        ],
        list2: [//个人中心辅助项目
          {icon: 'static/images/icon/grzx/jsf.png', name: '解封会员', url: '/GetBack'},
        ]
      }
    },
    methods: {
      toLogin () {//登陆
        if (JSON.parse(localStorage.loginInfo).sessionId === 'undefined') {
          this.$router.push('/Login');
        } else {
          TostUtil.tostTop('您已登录！');
        }
      },
      goBack(){
        this.$router.go('-1')
      },
      toUse () {//设置
        this.$router.push('/Setting');
      },
      toRedict (url) {//每一项的详情
        if (url) {
          this.$router.push(url);
        } else {
          TostUtil.tostTop('功能暂未开放');
        }
      },
    },
    created(){
      this.$bus.$emit('loading', true);
      let that = this;
      Util.ajax.getByForm('/api/member/balance').then(res => {
        if (res.data.status === 200) {
          that.list = [//个人中心主项目
            {icon: 'static/images/icon/grzx/icon01.png', name: '会员级别', url: '/MemLevel', levelName: this.levelName},
            {
              icon: 'static/images/icon/grzx/icon02.png',
              name: '信用评分',
              url: '/CreditScore',
              num: res.data.data.integral + '分'
            },
            {
              icon: 'static/images/icon/grzx/icon03.png',
              name: '希望钱包',
              url: '/HopeWallet',
              num: parseFloat(res.data.data.ecash).toFixed(4) + 'AP'
            },//希望钱包
            {
              icon: 'static/images/icon/grzx/icon04.png',
              name: '奖金钱包',
              url: '/BonusWallet',
              num: parseFloat(res.data.data.bonus).toFixed(4) + 'AP'
            },
            {icon: 'static/images/icon/grzx/icon05.png', name: '激活码', url: '/Active', num: res.data.data.code + '个'},
            {icon: 'static/images/icon/grzx/icon06.png', name: '道具商城', url: '/ToolShop', num: ''}
          ];}
          that.$bus.$emit('loading', false);
        }).catch(err => {
        that.$bus.$emit('loading', false);
        if (localStorage.sessionid) {
          TostUtil.tostTop('网络出错,请稍后重试!')
        }
      });
    },
  }
</script>
<style scoped>
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  .right-btn-save {
    margin-top: -12px;
    color: #fff;
    position: absolute;
    right: 7%;
    width: 25px;
    height: 25px;
    /*background-image: url(static/images/icon/grzx/setting02.png);*/
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .flex-box-center {
    display: flex;
    align-items: center;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .font8 {
    font-size: 8px !important;
  }

  /* 悬浮顶部的登录提示条 */
  .fix-top-login {
    width: 86%;
    padding: 7px 7%;
    position: fixed;
    top: 50px;
    left: 0;
    /*background-color: #A07A3C;*/
  }

  .icon-head-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .login-name-person {
    color: #333;
    font-size: 18px;
    margin-left: 5px;
  }

  /* main */
  .main-common-flex-this {
    width: 100%;
    /*padding: 0 7%;*/
    margin-top: 60px;
    height: auto;
  }

  .head-zw2 {
    width: 100%;
    height: 54px;
  }

  .one-flex-view-this {
    width: 100%;
    background-color: #fff;
  }

  .title-common-flex {
    width: 92%;
    padding: 10px 4%;
    border-bottom: 1px solid #efefef;
  }

  /* icon */
  .icon-img-flex-this {
    width: 15px;
    height: 15px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .posi-view-flex {
    position: relative;
  }

  .name-flex-common {
    margin-left: 5px;
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

  .num-flex-common {
    position: absolute;
    right: 5%;
  }

  .head-had-common {
    width: 21px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    right: 5%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .level-bg-flex {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #F2AA0A;
    color: #fff;
    text-align: center;
    line-height: 20px;
  }

  .small-text {
    font-size: 12px !important;
    color: #aaa;
  }
</style>
