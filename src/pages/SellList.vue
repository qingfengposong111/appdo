<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header :title="title+'-'+order" class="header">
      <router-link slot="left" to="/Mine">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="weui-navbar">
      <a class="weui-navbar__item" v-for="(temp,index) in titleList" @click="getList(temp.type)"
         :class="idx===temp.type?'weui-bar__item--on':''">
        <div class=" column ">
          <div class="icon-flex-view" :style="{backgroundImage:'url('+temp.icon+')'}">
            <div class="circle-num-flex"  v-if="temp.number>0">{{temp.number}}</div>
          </div>
          <div class="font13 font-margin-top">{{temp.text}}</div>
        </div>
      </a>
    </div>
    <div v-if="list.length>0" class="weui-tab__bd-item"  style="padding-top:115px!important;">
      <!-- zhanwei -->
      <div class="footprint"></div>
      <!-- copy -->
      <div class="main-copy-flex" v-for="(temp,index) in list" :key="index" v-if="temp.type==='sell'">
        <div class="could-copy-flex">
          <div class="font13">
            订单编号:{{temp.orderId}}
          </div>
        </div>
        <div class="tra-bg-main row font13 flex-box-center">
          <div class="font20 color-clone">{{temp.num}}</div>
          <div class="font8 color-clone AP-view-flex" style="margin-top:0;"><span style="font-size: 20px!important;">{{temp.number}}</span> <span> AP</span></div>
          <!--待匹配-->
          <div class="sq-time-flex" style="margin-left:10px;" v-if="idx==='match'">申请时间：{{temp.time | formatDate}}</div>  <!--match-->
          <!--待付款-->
          <div class="sq-time-flex" style="margin-left:10px;" v-if="idx==='pay'"><!--pay--><!---->
            <div>匹配时间：{{temp.matchTime | formatDate}}</div>
            <div>购买会员：{{temp.buyerUsername}}</div>
          </div>
          <!--待确认-->
          <div class="sq-time-flex" style="margin-left:10px;" v-if="idx==='confirm'"><!--confirm-->
            <div>付款时间：{{temp.payTime | formatDate}}</div>
            <div>购买会员：{{temp.buyerUsername}}</div>
          </div>
          <!--待评价-->
          <div  style="margin-left:10px;" v-if="idx==='evaluate'">
            <div class="sq-time-flex">确认时间：{{temp.confirmTime | formatDate}}</div>
            <div style="font-size: 12px;color:#666;">购买会员：{{temp.buyerUsername}}</div>
          </div>
          <div class="div-view-flex"></div>
        </div>
        <div class="time-copy-flex flex-box-center">
          <div class="font13 color-clone">
            剩余时间：
          </div>
          <div class="font13 color-clone" style="font-size: 20px;">
            {{temp.rever | formatLeftDate}}
          </div>
          <div class="right-abs-flex row">
            <div class="font13 color-clone AP-view-flex" style="margin-top:5px!important;">合计：</div>
            <div class="price-view-flex font13 color-clone" style="font-size: 20px!important;">￥{{temp.number * 2000}}</div>
          </div>
        </div>
        <!--待支付-->
        <div class="contect" v-if="idx==='pay'"><!-- -->
          <div @click="connect(temp)" class="member">联系会员</div>
        </div>
        <!--待确认-->
        <div class="contect" v-if="idx==='confirm'"><!---->
          <div @click="connect(temp)" class="member">联系会员</div>
          <div @click="toCheck(temp.matchId)">查看凭证</div>
          <div @click="complain(temp)">未收到款投诉</div>
          <div @click="confirmPay(temp.id)">确认收款</div>
        </div>
        <!--待评价-->
        <div class="contect" v-if="idx==='evaluate'"><!---->
          <div @click="connect(temp)" class="member">联系会员</div>
          <div @click="evaluate(temp.id)">去评价</div>
        </div>
      </div>
    </div>
    <div class="weui-tab__bd-item" v-else>
      <div class="none-flex-view flex-justify-center column">
        <div class="none-icon-flex"></div>
        <div class="font13" style="color: #666;">暂无数据</div>
      </div>
    </div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  export default{
    data () {
      return {
        title: '退租AP',
        order: '待匹配',
        idx: 'match',
        reverseTime: 0,
        times: null,
        arr: [],
        titleList: [
          {
            text: '待匹配',
            number: 0,
            icon: 'static/images/icon/tzAP/icon01.png',
            type: 'match'
          },
          {
            text: '待收款',
            number: 0,
            icon: 'static/images/icon/tzAP/icon02.png',
            type: 'pay'
          },
          {
            text: '待确认',
            number: 0,
            icon: 'static/images/icon/tzAP/icon03.png',
            type: 'confirm'
          },
          {
            text: '待评价',
            number: 0,
            icon: 'static/images/icon/tzAP/icon04.png',
            type: 'evaluate'
          }
        ],
        list: [

        ]
      }
    },
    filters: {
      formatDate: function (value) {
        let date = new Date(Number(value) * 1000);
        let YY = date.getFullYear();
        let MM = date.getMonth() + 1;
        let d = date.getDate();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        MM = MM < 10 ? ('0' + MM) : MM;
        d = d < 10 ? ('0' + d) : d;
        h = h < 10 ? ('0' + h) : h;
        m = m < 10 ? ('0' + m) : m;
        s = s < 10 ? ('0' + s) : s;
        return YY + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
      },

      formatLeftDate: function (leftMs) {
        let totalSeconds = leftMs / 1000;
        let h = Math.floor(totalSeconds / (60 * 60));
        totalSeconds = totalSeconds - h * 60 * 60;
        let m = Math.floor(totalSeconds / 60);
        totalSeconds = totalSeconds - m * 60;
        let s = Math.floor(totalSeconds);

        h = h < 10 ? ('0' + h) : h;
        m = m < 10 ? ('0' + m) : m;
        s = s < 10 ? ('0' + s) : s;
        return ' ' + h + ':' + m + ':' + s
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      toCheck(id){
        this.$router.push('/OrderConfirm/'+id);
      },
      connect(item){//联系会员
        if(item.id>0){
          this.$router.push('/SellConnect/'+item.id+'/'+item.buyerMemberId+'/'+item.type);
        }
      },
      complain(item){//未收到款投诉
        this.$router.push('/SendComplaint/'+item.id+'/'+item.type);
      },
      confirmPay(id){//确认收款
        Util.ajax.post('/api/order/confirm',{
          Id:id,
          status:'success'
        }).then(res=>{
          TostUtil.tostTop(res.data.message);
          this.info(this.$route.params.type);
        })
      },
      evaluate(id){
        this.$router.push('/GoEvaluate/'+id);
      },
      getList(index){//点击导航，获取数据
        let num = this.$route.params.num;
        this.idx = index;
        if (num == 1) {
          this.title = '承租AP'
        }
        if (num == 2) {
          this.title = '退租AP'
        }
        if (this.idx == 'match') {
          this.order = "待匹配"
        } else if (this.idx == 'pay') {
          this.order = "待收款"
        } else if (this.idx == 'confirm') {
          this.order = "待确认"
        } else if (this.idx == 'evaluate') {
          this.order = "待评价"
        }
        this.info(this.idx);
        this.$router.push('/SellList/2/' + this.idx);

      },
      info(idx){//获取订单列表信息
        this.list=[];
        Util.ajax.post('/api/order', {
          start: 0,
          length: 50,
          status: idx,
          type: 'sell'
        }).then(res => {
          this.$bus.$emit('loading', true);
          let that = this;
          /*setTimeout(function () {
            that.$bus.$emit('loading', false);
          }, 600);*/
          if (res.data.status === 200) {
            let arr = res.data.data.data;
            let time24ms;//到期时间
            if(idx==='match'){
              time24ms = 48 * 3600 * 1000;
            }else{
              time24ms = 24 * 3600 * 1000;
            }
            if (this.orderTimer != null) {
              clearInterval(this.orderTimer);
            }
            this.orderTimer = setInterval(() => {
              for (let i = 0; i < arr.length; i++) {
                let curOrder = arr[i];
                let orderTime
                if(idx==='match'){
                  orderTime = Number(curOrder.time) * 1000;//订单时间
                }else if(idx==='pay'){
                  orderTime = Number(curOrder.matchTime) * 1000;//匹配时间
                }else if(idx==='confirm'){
                  orderTime = Number(curOrder.payTime) * 1000;//付款时间
                }else if(idx==='evaluate'){
                  orderTime = Number(curOrder.confirmTime)*1000//确认时间
                }
                if (!curOrder.hasOwnProperty("rever")) {
                  let orderOffsetTime = (Date.now() - orderTime) % time24ms;
                  let orderStart = time24ms - orderOffsetTime;
                  curOrder.rever = orderStart;
                }
                curOrder.rever -= 1000;
                if (curOrder.rever <= 0) {
                  curOrder.rever = time24ms;
                }
              }
              this.list = arr;
              that.$bus.$emit('loading', false);
            }, 1000)
          }else{
            that.$bus.$emit('loading', false);
            TostUtil.tostTop(res.data.message);
          }
        }).catch(err=>{
          this.$bus.$emit('loading', false);
          TostUtil.tostTop('网络出错,请稍后重试!')
        })
      },
    },
    created () {
      let that =this;
      that.idx = this.$route.params.type;
      that.getList(that.idx);
    }
  }
</script>
<style scoped>
  .contect {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 2%;
    background: #fff;
    font-size: 14px;
    border-top: 1px solid #f3f3f3;
  }

  .contect > div:first-child.member {
    padding: 2px 5px;
    border: 1px solid #666;
    border-radius: 6px;
    color: #000;
    font-weight: 500;
    margin-right: 10px;
  }

  .contect > div:last-child,.contect > div:nth-child(2),.contect > div:nth-child(3) {
    padding: 2px 5px;
    border: 1px solid #5D0E13;
    border-radius: 6px;
    color: #5D0E13;
    font-weight: 500;
    margin-right: 10px;
  }
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  .weui-navbar {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: fixed;
    z-index: 500;
    top: 50px;
    width: 100%;
    background-color: #fafafa;
  }

  .weui-navbar__item {
    padding-top: 20px;
    background: #fff;
  }

  .weui-navbar__item {
    position: relative;
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding: 13px 0;
    text-align: center;
    font-size: 15px;
    border-bottom: 3px solid transparent;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .weui-navbar__item {
    color: #888;
  }

  .weui-navbar__item.weui-bar__item--on {
    border-bottom: 3px solid #5D0E13;
    color: #5c5c5c !important;
    font-size: 13px !important;
    transition:all .3s linear;
  }

  .icon-flex-view {
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    position: absolute;
    top: 14%;
    right: 40%;
  }

  .font-margin-top {
    padding-top: 15px;
  }

  .tra-bg-main {
    width: 86%;
    padding: 20px 7%;
    position: relative;
  }

  .font13 {
    font-size: 14px !important;
  }

  .flex-box-center {
    display: flex;
    align-items: center;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .circle-num-flex {
    width: 10px;
    height: 10px;
    line-height: 10px;
    text-align: center;
    background: #5D0E13;
    color: #fff;
    border-radius: 50%;
    font-size: 8px;
    position: absolute;
    right: -5px;
    top: -5px;
  }

  .could-copy-flex {
    width: 86%;
    padding: 7px 7%;
    background: #fff;

  }

  div.main-copy-flex:first-child {
    margin-top: 70px !important;
  }

  .main-copy-flex + .main-copy-flex {
    margin-top: 10px;
  }

  .color-clone {
    color: #5D0E13;
  }

  .font20 {
    font-size: 20px !important;
  }

  .div-view-flex {
    width: 10px;
    height: 10px;
    background: #A07A3C;
    position: absolute;
    left: 7.5%;
    bottom: 0;
  }

  .time-copy-flex {
    width: 86%;
    padding: 20px 7%; /*///////////////////////////*/
    background: #fff;
    position: relative;
  }

  .font8 {
    font-size: 8px !important;
  }

  .right-abs-flex {
    position: absolute;
    right: 7%;
  }

  .AP-view-flex {
    margin-top: 5px;
  }

  .none-flex-view {
    width: 100%;
    height: 80%;
    text-align: center;
    padding-top:70%;
  }

  .none-icon-flex {
    width: 100px;
    height: 100px;
    background-image: url(./../../static/images/icon/djsc/none.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin: 0 auto 10px;
  }
</style>
