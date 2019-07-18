<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="承租AP" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <!-- top -->
    <div class="top-flex-time ">
      <div class="font13 " style="width: 100%!important; text-align: center;">剩余时间</div>
      <div class="column time-abs-flex self">
        <div class="font30 self" style="width: 100%!important; text-align: center;padding-left:0;font-size: 40px;">
          <span>{{d}}</span>
          <span style="font-size: 12px!important;">天</span>
          <span>{{h}}</span>
          <span style="font-size: 12px!important;">小时</span>
          <span style="margin-left:10px!important;">{{m}}</span>
          <span style="font-size: 12px!important;">分</span>
        </div>
        <!--<div class="abso-font-flex row self_bottom itself"  style="width: 100%!important; text-align: center;display:block;">
          <span>D</span><span>H</span><span>M</span>
        </div>-->
      </div>
      <div class="two-self">
        <div>
          <p>承租AP</p>
          <p>{{count}}次</p>
        </div>
        <div>

        </div>
      </div>
    </div>
    <!-- 2 -->
    <div class="main-content-class">
      <!-- 承租AP -->
      <div class="row flex-box-center padding-top-view">
        <div>承租AP数量</div>
      </div>
      <div>
        <input style="width: 100%;"  @input="getAP" v-model.trim="APNumber" type="number" placeholder="您当前等级可承租AP数量为1个到10个"/>
      </div>
    </div>
    <!-- 3 -->
    <div class="main-content-class">
      <div class="row flex-box-center padding-top-view">
        <div>对应支付金额</div>
      </div>
      <div>
        ￥{{cash * APNumber | yuan}}
      </div>
    </div>
    <!-- 4 -->
    <div class="main-content-class">
      <div class="row flex-box-center padding-top-view">
        <div>输入安全密码</div>
      </div>
      <div>
        <input style="width: 100%;" type="password" v-model.trim="safePwd" placeholder=""/>
      </div>
    </div>
    <!-- btn -->
    <div class="btn-last-view">
      <div class="btn-save-flex" @click="submit">{{flag?"提交":"正在处理中..."}}</div>
    </div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  export default{
    data () {
      return {
        time: '00:00:00',//距离下次播种剩余时间
        APNumber: '',//AP数量
        cash: 2000,//AP价格
        count:0,
        h: '00',
        m: '00',
        flag:true,
        d: '00',
        safePwd: '',//安全密码
        endTime: '2019/04/15 12:00:00'//倒计时结束时间     //在ios中,ios不认‘-’，时间不能转化成毫秒，会显示 NAN，所以要用“/”代替
      }
    },
    filters: {
      yuan: function (value) {
        return isNaN(value) ? 0.00 : parseFloat((value).toFixed(2)).toFixed(2);
      }
    },
    computed: {},
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      num (n) {
        return n < 10 ? "0" + n : "" + n;
      },
      getAP(){
        if (this.APNumber < 1) {
          TostUtil.tostTop('最少承租1AP！');
          return false;
        }
        if (this.APNumber > 10) {
          TostUtil.tostTop('单次承租数量不能大于10个！');
          return false;
        }

      },
      buy(){
        let that = this;
        if (this.APNumber < 1) {
          TostUtil.tostTop('最少承租1AP！');
          that.flag=true;
          return;
        }
        if (this.APNumber > 10) {
          TostUtil.tostTop('单次承租数量不能大于10个！');
          that.flag=true;
          return;
        }
        Util.ajax.post('/api/order/buy',{
          number:Number(parseFloat(this.APNumber).toFixed(2))
        }).then(res1=>{
          this.APNumber='';
          TostUtil.tostTop(res1.data.message);
          that.flag=true;
        }).catch(err=>{
          this.APNumber='';
          that.flag=true;
          TostUtil.tostTop('网络出错,请稍后重试!')
        })
      },
      submit(){
        let that = this;
        if(this.flag){
          this.flag = false;
          if (this.safePwd === '') {
            TostUtil.tostTop('请输入安全密码！');
            this.flag=true;
            return;
          }
          if (this.APNumber > 10) {
            TostUtil.tostTop('单次承租数量不能大于10个！');
            this.flag=true;
            return;
          }
          if (((this.APNumber) % 0.25).toFixed(2) !== '0.00') {
            TostUtil.tostTop('单次承租数量必须为0.25的整数倍！');
            this.flag=true;
            return;
          }
          Util.ajax.post('/api/member/verify_security', {//校验安全密码
            password: this.safePwd
          }).then(res => {
            if (res.data.status === 200) {//安仔密码正确可以买入；
              that.buy();
            }else {//错误提示用户信息
              that.$bus.$emit('loading', false);
              TostUtil.tostTop(res.data.message);
              that.flag=true;
            }
          }).catch(err => {
            that.safePwd='';
            that.flag=true;
            that.$bus.$emit('loading', false);
            TostUtil.tostTop('网络出错,请稍后重试!')
          })
        }
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that = this;
      /*setTimeout(function () {
        that.$bus.$emit('loading', false);
      }, 600);*/
      let cycle=240*60*60;//周期时间
      let remain=0;
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
      Util.ajax.post('/api/order', {
        start: 0,
        length: 200,
        status: 'finish',
        type: 'buy'
      }).then(res => {
        if (res.data.status === 200) {
          let arr=res.data.data.data;
          let arr1=[];
          let n = Math.floor((endTime/cycle));//计算出过去了几个周期，在进行新一周期时，上一周期买入的次数都将清零
          //得到上最近一个周期结束时的时间
          let end = activeTime+cycle*n;
          //循环找到只要是在这个时间后买入buy的就放入arr1，从而计算出在本周期中买入了几次
          arr.forEach((item,index)=>{
            if(item.type==='buy'){
              if(Number(item.payTime)>Number(end)){
                arr1.push(item);
              }
            }
          });
          that.count=arr1.length;//从激活到现在已经买入成功次数//我要得到在一个周期的买入成功次数
          that.$bus.$emit('loading', false);
        }else{
          this.$bus.$emit('loading', false);
        }
      }).catch(err => {
        that.$bus.$emit('loading', false);
        TostUtil.tostTop('网络出错,请稍后重试!')
      })
    }
  }
</script>
<style scoped>
  .self>span:nth-child(1){
    margin-right: 10px;
  }
  /*.self>span:nth-child(2){
    margin:0 10px;
  }*/
  .self>span:nth-child(3){
    margin-left: 10px;
  }

  .itself>span:nth-child(2){
    margin:0 65px;
  }
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  .top-flex-time {
    width: 100%;
    padding: 10px 7%;
    background: #5D0E13;
    border-top: 1px solid #5D0E13;
    color: #fff;
    height: 200px;
    position: relative;
    box-sizing: border-box;
  }
  .two-self{
    width:100%;
    display:flex;
    margin-top:10px;
    justify-content: space-between;
    align-items:center;
  }
  .two-self>div:first-child{
    border-right:1px solid #fff;
  }
  .two-self p{
    text-align: center;
  }
  .two-self>div{
    width:50%;
    height:50px;
  }

  .flex-justify-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .width-flex-this {
    width: 34%;
    margin-bottom: 20px;
  }

  .font13 {
    font-size: 14px !important;
  }

  .time-abs-flex {
    position: relative;
  }

  .font30 {
    font-size: 30px;
    padding-left: 10%;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  .self > div {
    width: 130px;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  div.self_bottom > div:nth-child(1) {
    margin-left: 5px;
  }

  input {
    width: 100%;
    color: #000;
    font-size: 13px;
    -webkit-appearance: none;
    background: transparent;
    border: none;
    outline: none;
  }

  .elish-flex-view {
    margin-right: 36px;
  }

  .top-fixed-flex {
    width: 86%;
    padding: 10px 7%;
    background: #fff;
    color: #333;
    border-bottom:1px solid #f7f7f7;
  }

  .padding-top-view {
    padding-top: 10px;
  }

  .main-content-class {
    width: 86%;
    padding: 7px 7%;
    background: #fff;
    height: auto;
    position: relative;
    padding-bottom: 17px;
    border-bottom: 1px solid #e7e7e7;
  }

  .flex-box-center {
    display: flex;
    align-items: center;
  }

  .btn-last-view {
    width: 86%;
    padding: 10px 7%;
  }

  .btn-save-flex {
    width: 100%;
    background: #5D0E13;
    color: #ECC489;
    text-align: center;
    padding: 7px 0;
    border-radius: 5px;
  }
</style>
