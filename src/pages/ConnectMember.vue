<template>
  <div>
    <!--<div
      style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="详细资料" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
      <!--<mt-button slot="right" class="single" @click="save">保存</mt-button>-->
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height:50px;"></div>
    <!--支付信息-->
    <div class="main">
      <!--头部-->
      <div class="main-top">
        <div class="img">
          <img src="static/images/111.png" alt="">
        </div>
        <div class="nick">
          <p>用户昵称：{{sellerName}}</p>
          <p>性别：保密</p>
        </div>
      </div>
      <div class="zw"></div>
      <!--个性签名-->
      <div class="sign">
        <span>个性签名</span>
        <span></span>
      </div>
      <div class="zw"></div>
      <!--错误投诉-->
      <div class="bank">
        <p @click="complain">帐户信息错误投诉</p>
      </div>
      <div class="zw"></div>
      <!--收款信息-->
      <div>
        <div class="aset" v-for="(item,index) in list" :key="index" v-if="item.status==='yes'">
          <p>银行信息</p>
          <div><p><span>收款人</span><span v-text="item.bankAccountName"></span></p><span
            v-clipboard:copy="item.bankAccountName" v-clipboard:success="onCopy">复制</span></div>
          <div><p><span>银行名称</span><span>{{item.bankName}}</span></p></div>
          <div><p><span>银行帐号</span><span v-text="item.bankNumber"></span></p><span v-clipboard:copy="item.bankNumber"
                                                                                   v-clipboard:success="onCopy">复制</span>
          </div>
          <div><p><span>开户行</span><span v-text="item.bankAddress"></span></p><span v-clipboard:copy="item.bankAddress"
                                                                                   v-clipboard:success="onCopy">复制</span>
          </div>
          <div><p><span>联系电话</span><span v-text="phone"></span></p><span v-clipboard:copy="phone" v-clipboard:success="onCopy">复制</span></div>
        </div>
        <div class="aset" v-if="alipayList.length>0"><!--支付宝-->
          <p>支付宝信息</p>
          <div v-for="(temp,index) in alipayList" :key="index" v-if="temp.name!==''">
            <p><span>帐号</span><span v-text="temp.name"></span></p><span v-clipboard:copy="temp.name" v-clipboard:success="onCopy">复制</span>
          </div>
        </div>
      </div>
      <div class="code" v-show="list2.length>0">
        <div class="code-title" @click="showOrHide">二维码信息</div>
        <div class="had-card column" v-if="show">
          <div class="bg-pay-code-wx flex-justify-center column" :class="item.type==='alipay'?'aplay-pay-color':''"
               v-for="(item,index) in list2" :key="index" v-if="(item.status==='yes')&&(item.images!=='http://api.wealth-point.com/')">
            <div class="wx-img-code">
              <img :src="item.images" @touchstart="gotouchstart(item.images)" @touchmove="gotouchmove" alt="">
            </div>
            <div v-if="item.type==='alipay'&&item.status==='yes'">扫-扫支付宝付款</div>
            <div v-if="item.type==='wechat'&&item.status==='yes'">扫-扫微信付款</div>
            <div v-if="item.status==='no'">已停用</div>
          </div>
        </div>
      </div>
    </div>
    <!--弹框-->
    <div class="outbox" v-if="longEnter" @click="outBox($event)">
      <div class="tk">
        <div class="ercode" @click="createDownload">保存二维码</div>
        <div style="width: 100%;height: 10px;background:rgba(0,0,0,0.3);"></div>
        <div class="cancel" @click="cancel">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  export default{
    data(){
      return {
        sellerName: '',//卖方会员的名字或昵称
        sellerSignature: '',//卖方会员的个性签名
        phone: '',
        list: [],
        list2: [],
        show: false,
        flag:true,
        timeOutEvent:0,
        longEnter:false,
        url:'',
        alipayList:[]

      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that = this;
      setTimeout(function () {
        that.$bus.$emit('loading', false);
      }, 600);
      /*会员信息数据*/
      Util.ajax.getByForm('/api/member', {
        params: {
          Id: this.$route.params.id
        }
      }).then(res => {
        if (res.data.status === 200) {
          that.sellerName = res.data.data.username;
          that.phone = res.data.data.phone;
        }
      })
      /*卖方会员的银行卡列表*/
      Util.ajax.getByForm('/api/bank/member', {
        params: {
          Id: this.$route.params.id
        }
      }).then(res2 => {
        if (res2.data.status === 200) {
          that.list = res2.data.data;
        }
      });
      //二维码
      Util.ajax.getByForm('/api/qrcode/member',{
        params:{
          Id:this.$route.params.id
        }
      }).then(res=>{
        let as=[];
        if(res.data.status===200){
          let arr = res.data.data;
          arr.forEach(item=>{
            if(item.images!==''){
              item.images='http://api.wealth-point.com/'+item.images;
              as.push(item);
            }
            if(item.type==='alipay'){
              that.alipayList.push(item);
            }
          });
          that.list2 = as;
        }
      })
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      outBox(e){
        if (e.target.className !== 'tk') {
          this.longEnter = false;
        }
      },
      createDownload() {
          let that=this;
          if(that.flag){
              that.flag=false;
            let dtask = plus.downloader.createDownload(that.url, {}, function(d, status){
              // 下载完成
              if(status === 200){
                  that.flag=true;
                if (!window.plus) return;
                console.log(d.filename);
                plus.gallery.save(d.filename, function () {
                  plus.nativeUI.alert("保存成功");
                }, function (err) {
                  plus.nativeUI.alert("保存失败");
                  console.log(err.message,err.code);
                  that.flag=true;
                })
              }
            });
            dtask.start();
          }
          that.longEnter=false;
      },
      gotouchstart(url){
        let that = this;
        clearTimeout(that.timeOutEvent);//清除定时器
        that.timeOutEvent = setTimeout(function(){
          that.url=url;
          that.longEnter=true;
        },600);//这里设置定时
      },
      gotouchmove(){//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
          let that=this;
        clearTimeout(that.timeOutEvent);//清除定时器
        that.timeOutEvent = 0;
        that.longEnter=false;
      },
      complain(){
        this.$router.push('/SendComplaint/'+this.$route.params.orderId+'/'+this.$route.params.type);
      },
      cancel(){
          this.longEnter=false;
      },
      showOrHide(){
        this.show = !this.show
      },
      onCopy(e){
        TostUtil.tostTop('复制成功！')
      }
    },
  }
</script>
<style scoped>
  .code {
    border-top: 10px solid #f7f7f7;
    padding: 0 2% 10px;
  }
  .outbox{
    background: rgba(0,0,0,.3);
    position:fixed;
    width:100%;
    height:100%;
    z-index:9999999999;
    left: 0;
    bottom: 0;
  }
.tk{
  position: absolute;
  width: 80%;
  height: 106px;
  background: transparent;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  left: 10%;
  bottom: 2%;
  border-radius: 6px;
}
.ercode{
  background: #fff;
  margin: 0px auto 0;
  color:#333;
  border-radius: 6px;
  padding: 10px 0 10px;
  width: 100%;
  text-align: center;
  font-size: 20px;
}
.cancel{
  background: #fff;
  padding: 10px 0;
  border-radius: 6px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  color: #666;
}

  .code-title {
    padding: 10px 0;
    border-bottom: 1px solid #f7f7f7;
    margin-bottom: 10px;
    font-size: 16px;
  }

  /* 有卡的时候 */
  .had-card {
    width: 100%;
    padding: 5px;
    height: auto;
    display: flex;
    box-sizing: border-box;
    justify-content: flex-start;
    align-items: center;
    margin: 0 auto;
    flex-wrap: wrap;
  }

  .hard-card > div {
    width: 49% !important;
  }

  .bg-pay-code-wx {
    width: 49% !important;
    height: 250px;
    background: #00AD47;
    border-radius: 5px;
    color: #fff;
    padding: 10px 0;
    margin-bottom: 10px;
    box-sizing: border-box;
    text-align: center;
  }

  div.bg-pay-code-wx:nth-child(2n) {
    margin-left: 2% !important;
  }

  .bg-pay-code-wx img {
    width: 100%;
    height: 100%;
  }

  .aplay-pay-color {
    background: #0DA1E6;
  }

  .wx-img-code {
    width: 150px;
    height: 200px;
    margin: 0 auto 5px;
  }

  .aset > p {
    padding: 10px 0;
    border-bottom: 1px solid #f7f7f7;
  }

  .aset + .aset {
    border-top: 10px solid #f7f7f7;
  }

  .aset > div {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 5px 8px 0;
  }

  .aset > div > p {
    width: 84%;
  }

  .aset > div > p > span:first-child {
    margin-right: 10px;
    font-size: 14px;
    color: #000;
    font-weight: 500;
    width: 80px;
    display: inline-block;
  }

  .aset > div > p > span:last-child {
    font-size: 14px;
    display: inline-block;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    vertical-align: middle;
    width: 66%;
    color: #333;
  }

  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  .aset > div > span {
    border: 1px solid #5D0E13;
    padding: 3px 5px;
    color: #5d0e13;
    border-radius: 4px;
    font-size: 14px;
  }

  .zw {
    width: 100%;
    height: 10px;
    background: #f7f7f7;
  }

  /* main */
  .main {
    background: #fff;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    padding: 10px 0;
  }

  .main-top {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 5px 2%;
  }

  .img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
  }

  .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .nick > p:first-child {
    font-size: 14px;
    color: #000;
    font-weight: 500;
  }

  .nick > p:last-child {
    font-size: 12px;
    color: #666;
  }

  .aset, .sign, .bank {
    box-sizing: border-box;
    padding: 15px 2%;
    width: 100%;
  }

  .aset {
    padding: 0 2% 10px;
  }

  .sign {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .sign > span:first-child {
    color: #000;
    font-weight: bold;
    font-size: 16px;
    margin-right: 5px;
  }

  .sign > span:last-child {
    font-size: 14px;
    display: inline-block;
    width: 70%;
    color: #333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .bank {
    padding: 10px 2%;
  }

  .bank p {
    width: 140px;
    height: 30px;
    border: 1px solid #5D0E13;
    border-radius: 6px;
    line-height: 30px;
    margin: 0 auto;
    color: #5D0E13;
    text-align: center;
  }
</style>
