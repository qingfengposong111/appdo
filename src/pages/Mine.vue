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
        <img @click="toMsg" src="static/images/icon/sy/message.png"/>
      </div>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <!---->
    <div class="common-flex-view">
      <div class="main-top-img flex-justify-center column">
        <div class="font35">{{totalAssets}}</div>
        <div class="font13">资产总额(AP)</div>
      </div>
      <div class="opcity-top-flex">
        <div class="mamamam  flex-box">
          <div class="flex-1 flex-justify-center column common-font-size common-border-right" @click="toHope">
            <div>{{hopeWallet}}</div>
            <div>希望钱包</div>
          </div>
          <div class="flex-1 flex-justify-center column common-font-size common-border-right" @click="toBonus">
            <div>{{bonusWallet}}</div>
            <div>奖金钱包</div>
          </div>
          <div class="flex-1 flex-justify-center column common-font-size">
            <div>{{d + ':' + h + ':' + m}}</div>
            <div>周期剩余时间</div>
          </div>
        </div>
      </div>
    </div>
    <!--图标分类-->
    <div class="weui-flex wy-iconlist-box">
      <router-link :to="temp.url" class="weui-flex__item" v-for="(temp ,index1) in financeList" :key="index1">
        <div class="wy-links-iconlist">
          <div class="img">
            <img :src="temp.icon" style="width: 40px;height:40px;" alt=""/>
          </div>
          <p class="weui-tabbar__label">{{temp.text}}</p>
        </div>
      </router-link>
    </div>

    <!--承租栏图标-->
    <div class="zw-print"></div>
    <div class="weui-flex wy-iconlist-box2 column">
      <div class="cz-flex-view" @click="toMore(1,'match')">
        <div class="btn-none-flex"></div>
      </div>
      <div class="weui-flex wy-iconlist-box">
        <div class="weui-flex__item" v-for="(item,index1) in lesseeList" :key="index1">
          <router-link :to="'/BuyList/1/'+item.type" class="wy-links-iconlist clone-class-links">
            <div class="img">
              <img :src="item.icon" alt="" />
              <div class="tipNumber" v-if="item.num>0">{{item.num}}</div>
            </div>
            <p class="weui-tabbar__label">{{item.text}}</p>
          </router-link>
        </div>
      </div>
    </div>
    <!--退租栏图标-->
    <div class="zw-print"></div>
    <div class="weui-flex wy-iconlist-box2 column">
      <div class="cz-flex-view2" @click="toMore(2,'match')">
        <div class="btn-none-flex"></div>
      </div>
      <div class="weui-flex wy-iconlist-box">
        <div class="weui-flex__item" v-for="(temp,index) in lesseeList2" :key="index">
          <router-link :to="'/SellList/2/'+temp.type" class="wy-links-iconlist clone-class-links">
            <div class="img">
              <img :src="temp.icon" alt="" />
              <div class="tipNumber" v-if="temp.num>0">{{temp.num}}</div>
            </div>
            <p class="weui-tabbar__label">{{temp.text}}</p>
          </router-link>
        </div>
      </div>
    </div>
    <!--收益专区-->
    <div class="zw-print"></div>
    <div class="weui-flex wy-iconlist-box2 column">
      <div class="cz-flex-view3">
        <div class="btn-none-flex"></div>
      </div>
      <div class="weui-flex wy-iconlist-box row" @click="toBunusAP" style="margin-bottom:50px;">
        <div class="left-bottom-view row">
          <div class="icon-bottom-view"></div>
          <div class="column">
            <div class="one-flex-view">分红中的AP</div>
            <div class="two-flex-view">轻松实现小目标</div>
          </div>
        </div>
        <div class="bottom-img-flex">

        </div>
      </div>
    </div>
    <!--底部导航-->
    <div class="weui-tabbar wy-foot-menu" style="position: fixed;z-index:999999">
      <router-link to="/" class="weui-tabbar__item">
        <img src="static/images/icon/gy/gray-index.png" alt="">
        <p class="weui-tabbar__label">首页</p>
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
        <img src="static/images/icon/me/native-person.png" alt="">
        <p class="weui-tabbar__label selected-color">我</p>
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
        levelName: null,
        count:0,
        selected: true,
        totalAssets: 0,//总资产
        hopeWallet: 0,//希望钱包
        bonusWallet: 0,//奖金钱包
        unReadMessage: 2,//未读消息，此处应为登陆后，若有，则显示，若无，则不显示
        h: '00',
        m: '00',
        d: '00',
        isEnd: false,//倒计时是否结束
        endTime: '2019/04/15 12:00:00',//应为接口获取到的结束时间//在ios中,ios不认‘-’，所以要用“/”代替
        financeList: [
          {
            url: '/Financial',
            icon: 'static/images/icon/me/icon01.png',
            text: '财务中心',
            type: ''
          },
          {
            url: '/Love',
            icon: 'static/images/icon/me/icon02.png',
            text: '我的爱心'
          },
          {
            url: '/Buy',
            icon: 'static/images/icon/me/icon03.png',
            text: '承租AP'
          },
          {
            url: '/Sell',
            icon: 'static/images/icon/me/icon04.png',
            text: '退租AP'
          }
        ],//财务那一行图标
        lesseeList: [
          {
            icon: 'static/images/icon/me/icon05.png',
            text: '待匹配',
            type: 'match',
            num: 0
          },
          {
            icon: 'static/images/icon/me/icon06.png',
            text: '待付款',
            type: 'pay',
            num: 0
          },
          {
            icon: 'static/images/icon/me/icon07.png',
            text: '待确认',
            type: 'confirm',
            num: 0
          },
          {
            icon: 'static/images/icon/me/icon08.png',
            text: '待评价',
            type: 'evaluate',
            num: 0
          }
        ],//承租/退租图标
        lesseeList2: [
          {
            icon: 'static/images/icon/me/icon05.png',
            text: '待匹配',
            type: 'match',
            num: 0
          },
          {
            icon: 'static/images/icon/me/icon06.png',
            text: '待收款',
            type: 'pay',
            num: 0
          },
          {
            icon: 'static/images/icon/me/icon07.png',
            text: '待确认',
            type: 'confirm',
            num: 0
          },
          {
            icon: 'static/images/icon/me/icon08.png',
            text: '待评价',
            type: 'evaluate',
            num: 0
          }
        ],//承租/退租图标
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that = this;
      /*setTimeout(function () {
        that.$bus.$emit('loading', false);
      }, 600);*/
      if (localStorage.loginInfo) {
        this.levelName = JSON.parse(localStorage.loginInfo).levelName
      } else {
        this.levelName = 'A0'
      }
      Util.ajax.getByForm('/api/member/balance').then(res => {
        if (res.data.status === 200) {
          this.totalAssets = (parseFloat(res.data.data.ecash) + parseFloat(res.data.data.bonus)+parseFloat(res.data.data.harvestNumber)+parseFloat(res.data.data.orderNumber)).toFixed(4);//总资产
          this.hopeWallet = parseFloat(res.data.data.ecash).toFixed(4);//希望钱包
          this.bonusWallet = parseFloat(res.data.data.bonus).toFixed(4);//奖金钱包
          this.$bus.$emit('loading', false);
        }else{
          if(localStorage.sessionid){
            TostUtil.tostTop(res.data.message)
          }else{
            that.$route.push('/Login');
          }
        }
        that.$bus.$emit('loading', false);
      }).catch(err=>{
        that.$bus.$emit('loading', false);
        if(localStorage.sessionid){
          TostUtil.tostTop('网络出错,请稍后重试!')
        }
      });
      that.info('match');
      that.info('pay');
      that.info('confirm');
      that.info('evaluate');
      that.info2('match');
      that.info2('pay');
      that.info2('confirm');
      that.info2('evaluate');
      let cycle=240*60*60;//周期时间
      let remain=0;//剩余时间
      let activeTime = Number(JSON.parse(localStorage.loginInfo).activationTime);//激活时间
      let endTime=((new Date().getTime())/1000-activeTime);//当前减去激活时间，得出到现在为止已经过去了多久时间；
      if(endTime>cycle){
        remain=cycle-endTime%cycle;
      }else{
        remain = cycle-endTime;
      }
      let d = Math.floor(remain / (60 * 60 * 24));
      let h = Math.floor((remain - d * 24 * 60 * 60) / 3600);
      let m = Math.floor((remain - d * 24 * 60 * 60 - h * 3600) / 60);
      let dd=d.toString().split('');
      dd=dd[dd.length-1];
      if(h<10){
        h='0'+h;
      }
      if(m<10){
        m='0'+m;
      }
      that.d=dd;
      that.h=h;
      that.m=m;
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      info(idx){
        Util.ajax.post('/api/order', {
          start: 0,
          length: 20,
          status: idx,
          type: 'buy'
        }).then(res => {
          if (res.data.status === 200) {
            let arr = res.data.data.data;
            let ars=[];
            this.lesseeList.forEach((item, index) => {
              if (idx === item.type) {
                arr.forEach(temp=>{
                  if(temp.type==='buy'){
                    ars.push(temp);
                  }
                });
                item.num = ars.length;
              }
            });
          }
        })
      },
      info2(idx){
        Util.ajax.post('/api/order', {
          start: 0,
          length: 20,
          status: idx,
          type: 'sell'
        }).then(res => {
          if (res.data.status === 200) {
            let arr= res.data.data.data;
            let ars=[];
            this.lesseeList2.forEach((item, index) => {
              if (idx === item.type) {
                arr.forEach(temp=>{
                  if(temp.type==='sell'){
                    ars.push(temp);
                  }
                });
                item.num = ars.length;
              }
            });
          }
        })
      },
      toMore (num, order) {
        if (num == 1) {
          this.$router.push('/BuyList/' + num + '/' + order);
        } else {
          this.$router.push('/SellList/' + num + '/' + order);
        }

      },
      toBunusAP () {
        this.$router.push('/BonusAp');
      },
      toList (num, order) {
        if (num === 1) {
          return '/BuyList/' + 1 + '/' + order;
        } else {
          return '/SellList/' + 2 + '/' + order;
        }

      },
      toHope () {
        this.$router.push('/HopeWallet')
      },
      toBonus () {
        this.$router.push('/BonusWallet')
      },
      toMsg () {
        this.$router.push('/StytemMessage');
      }
    }
  }
</script>
<style scoped>
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

  .font35 {
    font-size: 40px !important;
  }

  .font13 {
    font-size: 16px !important;
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

  /*顶部数字*/
  .main-top-img {
    width: 100%;
    height: 170px;
    /*margin-top: 25px;*/
    background-image: url("./../../static/images/icon/me/104.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    color: #fff;
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

  .opcity-top-flex {
    width: 100%;
    height: 70px;
   /* background: rgba(160, 104, 29, 1);*/
    /*margin-top: -18px;*/
  }

  .flex-box {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  }

  .common-border-right {
    border-right: 1px solid #ddd;
  }

  .common-font-size {
    font-size: 16px;
    color: #333;
    margin-top: 10px;
  }

  .flex-1 {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    flex-wrap: wrap;
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

  .wy-links-iconlist {
    text-align: center;
  }

  .wy-links-iconlist img {

    height: 100%;
  }

  .wy-iconlist-box {
    padding: 15px !important;
    background: #fff;
  }

  .cz-flex-view {
    width: 100%;
    height: 40px;
    background-image: url("./../../static/images/icon/me/01.png");
    background-color: #822420;
    /* background-repeat: no-repeat; */
    background-position: center;
    background-size: 100%;
    position: relative;
  }

  .cz-flex-view2 {
    width: 100%;
    height: 40px;
    background-image: url("./../../static/images/icon/me/02.png");
    background-color: #822420;
    /* background-repeat: no-repeat; */
    background-position: center;
    background-size: 100%;
    position: relative;
  }

  .zw-print {
    width: 100%;
    height: 10px;
  }

  .cz-flex-view3 {
    width: 100%;
    height: 40px;
    background-image: url("./../../static/images/icon/me/03.png");
    background-color: #822420;
    /* background-repeat: no-repeat; */
    background-position: center;
    background-size: 100%;
    position: relative;
  }

  .left-bottom-view {
    margin-right: 15%;
    margin-top: 5px;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .one-flex-view {
    font-size: 13px;
    padding-left: 5%;
  }

  .two-flex-view {
    font-size: 11px;
    color: #b9b9b9;
    width: 120%;
    margin-left: 3px;
  }

  .bottom-img-flex {
    width: 60%;
    height: 70px;
    background-image: url("./../../static/images/icon/me/1_07.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  .img{
    position:relative;
  }
  .tipNumber{
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    background: #5D0E13;
    color: #fff;
    border-radius: 50%;
    font-size: 8px;
    position: absolute;
    right: 20px;
    top: -5px;
  }
</style>
