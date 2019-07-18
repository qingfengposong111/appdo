<template>
  <div>
      <!--头部-->
      <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
      <mt-header fixed title="" class="header">
        <router-link to="/PersonCenter" slot="left">
          <div class="login-class">
            <img src="static/images/icon/setting/head.png"/>
            <div class="level-common-flex font8 flex-justify-center">{{levelName}}</div>
          </div>
        </router-link>
        <div slot="right">
          <img src="static/images/icon/sy/china.png"/>
          <img @click="toStytemMessage" src="static/images/icon/sy/message.png"/>
        </div>
      </mt-header>
      <div style="width: 100%;height:50px;"></div>
      <!--轮播图-->
      <mt-swipe :show-indicators="true" class="swiperContainer" :speed="800">
        <mt-swipe-item v-for="(item , index1) in list" :key="item.id">
          <img class="inside" :src="item.src" alt="">
        </mt-swipe-item>
      </mt-swipe>
      <!--系统公告部分  -->
    <div class="rollDiv">
      <div style="width: 140px;"><span style="color:rgb(134,20,20);font-size: 16px;font-weight: 500;">AP租赁</span> <span style="color:#333;font-size: 14px;margin-left:5px;" >头条</span></div>
      <ul style="" v-if="news.length>0">
        <li  ref="rollul" v-for="(temp , index) in news" :key="index" :class="animate&&index===0?'anim fm':'zero'">
          <span style="color:rgb(45,51,15);font-size: 12px;" @click="toSys">{{temp}}</span>
        </li>
      </ul>
    </div>
      <!--导航-->
      <div class="homeNav">
        <div class="home" style="position:relative;z-index:9999;">
          <div>
            <router-link to="/MakeMoney">
              <div class="img"><img src="static/images/icon/sy/to01.png"></div>
              <div>如何赚钱</div>
            </router-link>
          </div>
          <div>
            <router-link to="/ErCode">
              <div class="img"><img src="static/images/icon/sy/to02.png"></div>
              <div>推广二维码</div>
            </router-link>
          </div>
          <div>
            <router-link to="/Service">
              <div class="img"><img src="static/images/icon/sy/to03.png"></div>
              <div>客户服务</div>
            </router-link>
          </div>
        </div>
        <div class="home">
          <div>
            <router-link to="/WCredit">
              <div class="img"><img src="static/images/icon/sy/to04.png"></div>
              <div>W信用</div>
            </router-link>
          </div>
          <div>
            <router-link to="/Wallet">
              <div class="img"><img src="static/images/icon/sy/to05.png"></div>
              <div>W钱包</div>
            </router-link>
          </div>
          <div>
            <router-link to="/Wstock">
              <div class="img"><img src="static/images/icon/sy/to06.png"></div>
              <div>W股权</div>
            </router-link>
          </div>
        </div>
      </div>
      <!--平均收益-->
      <div class="pj-class-view">
        <div class="title-view-flex row">
          <div class="syl-class">
            <img src="static/images/icon/sy/syl.png">
          </div>
          <div class="font-class-view flex-box-center">平均收益率</div>
        </div>
        <div class="title-view-flex row">
          <div class="left-view-port">
            <img src="static/images/icon/sy/2_04.png">
          </div>
          <div class="right-view-port column">
            <div class="nu-common-flex row" @click="toProfit(3,'上月')">
              <div>上月平均收益率</div>
              <div class="icon-flex-view">
                <img src="static/images/icon/sy/add.png">
              </div>
            </div>
            <div class="nu-common-flex row" @click="toProfit(1,'上周')">
              <div>上周平均收益率</div>
              <div class="icon-flex-view">
                <img src="static/images/icon/sy/add.png">
              </div>
            </div>
            <div class="nu-common-flex row border-none" @click="toProfit(0,'本周')">
              <div>本周平均收益率</div>
              <div class="icon-flex-view">
                <img src="static/images/icon/sy/add.png">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-tabbar wy-foot-menu">
        <router-link to="/" class="weui-tabbar__item weui-bar__item--on">
          <img src="static/images/icon/sy/index.png" alt="">
          <p class="weui-tabbar__label selected-color">首页</p>
        </router-link>
        <router-link to="/Shop" class="weui-tabbar__item">
          <img src="static/images/icon/sy/shoping.png" alt="">
          <p class="weui-tabbar__label">商城</p>
        </router-link>
        <router-link to="/PublicWelfare" class="weui-tabbar__item">
          <img src="static/images/icon/sy/love.png" alt="">
          <p class="weui-tabbar__label">公益</p>
        </router-link>
        <router-link to="/Mine" class="weui-tabbar__item">
          <img src="static/images/icon/sy/person.png" alt="">
          <p class="weui-tabbar__label">我</p>
        </router-link>
      </div>


  </div>
</template>
<script>
  import Util from './../common/util';
  import TostUtil from './../common/tostUtil';
  export default{
    data () {
      return {
        levelName:null,
        slist:[
          'static/images/1.jpg','static/images/2.jpg'
        ],
        list: [//baner轮播图
          {
            id: 1,
            src: 'static/images/3.jpg'
          },
          {
            id: 2,
            src: 'static/images/4.jpg'
          },
          {
            id: 3,
            src: 'static/images/5.jpg'
          }],
        news: [],//系统公告轮播标题
        selected: true,
        animate: false,
        flag:false
      }
    },
    computed: {},
    methods: {
      scroll(){
        this.flag=true;
        this.animate=!this.animate;
        let that = this;
        setTimeout(function(){
          that.news.push(that.news[0]);
          that.news.shift();
          that.flag=false;
          that.animate=!that.animate;
        },3000)
      },
      goBack(){
        this.$router.go('-1')
      },
      toSys(){
        this.$router.push('/Sys');
      },
      toProfit (num, title){
        this.$router.push('/MyCharts/' + num + '/' + title);
      },
      toStytemMessage(){
        this.$router.push('/StytemMessage');
      }
    },
    created(){
      setInterval(this.scroll,4000);
      this.$bus.$emit('loading', true);
      let that =this;
      setTimeout(function(){
        that.$bus.$emit('loading', false);
      },600);
      if(localStorage.loginInfo){
          that.levelName=JSON.parse(localStorage.loginInfo).levelName
      }else{
          that.levelName='A0'
      }
      Util.ajax.post('/api/news',{
        start:0,
        length:200
      }).then(res=>{
        if(res.data.status===200){
          let arr=res.data.data.data;
          if(arr.length>0){
            arr.forEach((item,index)=>{
              that.news.push(item.title);
            })
          }
        }
      }).catch(err=>{
        TostUtil.tostTop('网络出错,请稍后重试!')
      });
    }
  }
</script>
<style scoped>
  .rollDiv{
    width:100%;
    box-sizing:border-box;
    overflow:hidden;
    height:40px;
    display:flex;
    justify-content: flex-start;
    align-items:center;
    padding:0 20px;
  }
  .rollDiv>ul{
    height:40px;
    width:100%;
    box-sizing:border-box;
    overflow:hidden;
    list-style:none;
    line-height: 40px;
    margin-top:-3px;
    padding-right:5px;
  }
  .rollDiv>ul>li{
    width:100%;
    height:40px;
    overflow:hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  .fm{
    margin-top:-40px;
  }
  .zero{
    margin-top:0;
  }
  .anim{
    transition: all 4s;
  }
  .weui-tabbar.wy-foot-menu {
    position: fixed;
  }

  .weui-tabbar {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: absolute;
    z-index: 999999;
    bottom: 0;
    width: 100%;
    background-color: #f7f7fa;
  }

  .weui-tabbar__label {
    color: #666;
  }

  .weui-tabbar__label {
    text-align: center;
    color: #999;
    font-size: 14px !important;
    line-height: 1.8 !important;
  }

  .selected-color {
    color: #81231f !important;
  }

  .weui-tabbar__item img {
    width: 22px;
    height: 22px;
  }

  .login-class {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    position: relative;
    top: 0;
    left: 10%;
    border: 1px solid #fff;
  }

  .login-class img {
    width: 28px;
    height: 28px;
  }

  .level-common-flex {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #F2AA0A;
    position: absolute;
    top: 15px;
    left: 75%;
    color: #fff;
    border: 1px solid #fff;
    font-size: 10px;
    text-align: center;
    line-height: 15px;
  }

  .homeNav {
    margin-bottom: 10px;
  }

  .home {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding: 0 10px;
    overflow: hidden;
  }

  .home > div {
    width: 30%;
    text-align: center;
    padding: 10px 0;
  }

  .home > div a {
    display: block;
    width: 100%;
  }

  .home img {
    width: 60px;
    height: 60px;
  }

  .home > div > a > div:last-child {
    color: #454545;
    margin-top: 5px;
    font-size: 14px;
  }

  .header {
    background: #5D0E13;
    height: 50px;
  }

  .header > div:last-child img {
    width: 20px;
    height: 15px;
  }

  .header img + img {
    margin-left: 10px;
  }

  .swiperContainer {
    width: 100%;
    height: 180px;
    /*margin-top: 40px;*/
    overflow: hidden;
  }

  .pj-class-view {
    width: 100%;
    height: 200px;
    background: #fff;
    margin-top: 10px;
    padding-bottom: 80px;
  }

  .title-view-flex {
    padding: 10px 20px;
    border-bottom: 1px solid #f4f4f4;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .syl-class img {
    width: 30px;
    height: 28px;
  }

  .left-view-port {
    width: 40%;
    height: 96px;
    margin-right: 5%;
  }

  .left-view-port img {
    width: 100%;
    height: 96px;
  }

  .right-view-port {
    width: 55%;
    height: 96px;
    background: #f1ca8f;
    border-radius: 6px;
  }

  .nu-common-flex {
    height: 32px;
    width: 80%;
    line-height: 32px;
    padding: 0 10%;
    font-size: 12px;
    color: #6F5445;
    border-bottom: 1px solid #fff;
    position: relative;
  }

  .icon-flex-view {
    position: absolute;
    right: 10%;
    top: 4px;
  }

</style>
