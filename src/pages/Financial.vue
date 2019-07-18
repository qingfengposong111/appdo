<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="账务中心" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <div class="hope-top">
      <div class="hope-top-number">{{totalAssets}}</div>
      <div class="hope-top-text">总资产(AP)</div>
    </div>
    <!--中间导航-->
    <div class="middle-nav">
      <router-link to="/HopeWallet">
        <div>希望钱包</div>
        <div>{{hopeWallet}}</div>
      </router-link>
      <router-link to="/BonusWallet">
        <div>奖金钱包</div>
        <div>{{bonusWallet}}</div>
      </router-link>
      <router-link to="/Active">
        <div>激活码</div>
        <div>{{activeNumber}}</div>
      </router-link>
      <router-link to="/Wait">
        <div>理财钱包</div>
        <div>{{waitNumber}}</div>
      </router-link>
    </div>
    <div class="buy-and-sell">
      <router-link to="/BuyRecord" class="flex-1">
        <img src="../../static/images/icon/cwzx/buy.png" alt="">
        <div class="font13">承租记录</div>
      </router-link>
      <router-link to="/SellRecord" class="flex-1 ">
        <img src="../../static/images/icon/cwzx/sell.png" alt="">
        <div class="font13">退租记录</div>
      </router-link>
    </div>
    <!--收益专区-->
    <div class="profit">
      <div class="profit-title">
        <img src="../../static/images/icon/cwzx/make.png" alt="">
        <span>收益专区</span>
      </div>
      <div class="profit-main">
        <div class="profit-main-left">
          <div class="profit-number">{{totalRevenue}}</div>
          <div>我的总收益</div>
        </div>
        <div class="profit-main-right">
          <div style="font-size: 20px;color:#5D0E13;height: 20px;position:absolute;left:5px;top:-5px;">*</div>
          <div>
            <div>AP每天的收益分红</div>
            <!--<div>{{buyNumber}}&lt;!&ndash;<span class="txt">AP</span>&ndash;&gt;</div>-->
          </div>
          <div>
            <div>系统赠送</div>
            <!--<div>{{sellNumber}}&lt;!&ndash;<span class="txt">AP</span>&ndash;&gt;</div>-->
          </div>
          <div>
            <div>奖励</div>
            <!--<div>{{forSell}}&lt;!&ndash;<span class="txt">AP</span>&ndash;&gt;</div>-->
          </div>
        </div>
      </div>
      <!--概览-->
      <div style="width: 100%;height: 1px;background: #ddd;"></div>
      <div class="gengral">
        <div class="gengral-title">概览</div>
        <div id="main2" ref="main2" style="height: 340px;"></div>
      </div>
    </div>
    <!--底部导航-->
    <div class="foot-black"></div>
    <div class="bot">
      <router-link to="/Financial">
        <img src="static/images/icon/cwzx/all01.png" alt="">
        <div class="selected">总览</div>
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
        <img src="static/images/icon/hope/active.png" alt="">
        <div>激活码</div>
      </router-link>
      <router-link to="/Wait">
        <img src="static/images/icon/hope/wait.png" alt="">
        <div>理财钱包</div>
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
        totalAssets: 0,//总资产
        hopeWallet: 0,//希望钱包
        bonusWallet: 0,//奖金钱包
        activeNumber: 0,//激活码
        waitNumber: 0,//待定
        totalRevenue: 0,//总收益
        buyNumber: 0,//买入AP总数
        sellNumber: 0,//已卖出AP总数
        forSell: 0,//待卖出AP总数
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
      Util.ajax.getByForm('/api/member/balance').then(res => {
        if (res.data.status === 200) {
          that.totalAssets = (parseFloat(res.data.data.ecash) + parseFloat(res.data.data.bonus)+parseFloat(res.data.data.harvestNumber)+parseFloat(res.data.data.orderNumber)).toFixed(4);//总资产
          that.hopeWallet = parseFloat(res.data.data.ecash).toFixed(4);//希望钱包
          that.bonusWallet = parseFloat(res.data.data.bonus).toFixed(4);//奖金钱包
          that.activeNumber = res.data.data.code;//激活码
          that.waitNumber=Number(res.data.data.temporary).toFixed(4);
          that.$bus.$emit('loading', false);
        }else{
          that.$bus.$emit('loading', false);
          TostUtil.tostTop(res.data.message);
        }
      }).catch(err=>{
        that.$bus.$emit('loading', false);
        TostUtil.tostTop('网络出错,请稍后重试!')
      });
      Util.ajax.getByForm('/api/statistics/index').then(res=>{
        if(res.data.status===200){
          that.totalRevenue=(parseFloat(res.data.data.growingSeedTotal)+parseFloat(res.data.data.rewardSeedTotal)).toFixed(4);
        }
      });
    },
    mounted(){
      let x,y,z;
      Util.ajax.getByForm('/api/member/balance').then(res => {
        if (res.data.status === 200) {
          z = (parseFloat(res.data.data.ecash) + parseFloat(res.data.data.bonus)).toFixed(4);//总资产
          Util.ajax.getByForm('/api/statistics/index').then(res2=>{
            if(res2.data.status===200){
              x=res2.data.data.buyOrderTotal;
              y=res2.data.data.sellOrderTotal;
            }
            let das=[
              {value:y, name:'总卖出'},
              {value:z, name:'待卖出'},
              {value:x,name:'总买入'}
            ];
            let es = this.$echarts.init(this.$refs.main2);
            let option = {
              title :'',
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              color:['#60281e','#984D4a', '#ccc'],
              legend: {
                orient: 'vertical',
                left: 'right',
                top:'top',
                data: ['总卖出','待卖出','总买入']
              },
              series: [{
                name: '来源',
                data:das,
                radius:'55%',
                type: 'pie',
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }]
            };
            es.setOption(option)
          });
        }
      });



    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
    }
  }
</script>
<style scoped>
  .gengral{
    color: #565656;
    width: 96%;
    padding: 10px 2%;
  }
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  .hope-top {
    width: 100%;
    height: 180px;
    background-image: url(./../../static/images/icon/hope/1_02.png);
    background-repeat: no-repeat;
    background-position: center;
  }

  .hope-top-number {
    font-size: 2rem;
    color: #fff;
    text-align: center;
    padding-top: 30px;
  }

  .hope-top-text {
    font-size: 16px;
    color: #fff;
    text-align: center;
  }

  .middle-nav {
    width: 100%;
    height: 80px;
    /*background: rgba(160, 104, 29, 1);*/
    /*margin-top: -15px;*/
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .middle-nav > a > div{
    font-size: 16px;
    text-align: center;
    color: #333;
  }

  /*.middle-nav > a > div:last-child {
    font-size: 12px;
    text-align: center;
    color: #fff;
  }
*/
  /*买卖*/
  .buy-and-sell {
    width: 100%;
    height: auto;
    background: #fff;
    /*margin-top: 25px;*/
    padding: 15px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .profit-number {
    color: #5D0E13;
    font-size: 20px;
  }

  .buy-and-sell > a {
    width: 50%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #333;
  }

  .buy-and-sell > a:first-child {
    border-right: 1px solid #ccc;
  }

  .buy-and-sell > a img {
    width: 20px;
    height: 19px;
    margin-right: 5px;
  }
  .middle-nav>a{
    width:25%;
    display:block;
    text-align: center;
  }
  .middle-nav>a+a{
    border-left:1px solid #ddd;
  }
  /*
  收益专区*/
  .profit {
    padding: 5px 0;
    width: 100%;
    margin-top: 10px;
    height: auto;
    background: #fff;
  }

  .profit-title {
    border-bottom: 1px solid #f2f2f2;
    width: 86%;
    padding: 15px 7%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .profit-title img {
    width: 20px;
    height: 19px;
    margin-right: 5px;
  }

  .profit-main {
    color: #565656;
    width: 86%;
    padding: 10px 7%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .profit-main > div {
    width: 40%;
    font-size: 14px;
  }

  .profit-main > div:last-child {
    width: 60%;
    border-left: 1px solid #f2f2f2;
    padding-left: 10px;
    position:relative;
  }

  .profit-main-right > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /*底部导航*/
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
    z-index: 999999;
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
