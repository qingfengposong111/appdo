<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header :title="title+'-'+order" class="header">
      <router-link slot="left" to="/Mine">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <!--<div style="width: 100%;height: 50px;"></div>-->
    <div class="weui-navbar">
      <a class="weui-navbar__item" v-for="(temp,index) in titleList" @click="getList(temp.type)"
         :class="idx==temp.type?'weui-bar__item--on':''">
        <div class=" column ">
          <div class="icon-flex-view" :style="{backgroundImage:'url('+temp.icon+')'}">
            <div class="circle-num-flex" v-if="temp.number>0">{{temp.number}}</div>
          </div>
          <div class="font13 font-margin-top">{{temp.text}}</div>
        </div>
      </a>
    </div>
    <div v-if="list.length>0" class="weui-tab__bd-item" style="margin-top:70px!important;">
      <!-- zhanwei -->
      <div class="footprint"></div>
      <!-- copy -->
      <div class="main-copy-flex" v-for="(temp,index) in list" :key="index" v-if="temp.type==='buy'"><!---->
        <div class="could-copy-flex">
          <div class="font13">
            订单编号:{{temp.orderId}}

          </div>
        </div>
        <div class="tra-bg-main row font13 flex-box-center">
          <div class="font20 color-clone">{{temp.num}}</div>
          <div class="font8 color-clone AP-view-flex" style="margin-top:0;"><span
            style="font-size: 20px!important;">{{temp.number}}</span> <span> AP</span></div>
          <!--待匹配-->
          <div class="sq-time-flex" style="margin-left:10px;" v-if="idx==='match'">申请时间：{{temp.time | formatDate}}</div>
          <!--match-->
          <!--待付款-->
          <div style="margin-left:10px;" v-if="idx==='pay'">
            <div class="sq-time-flex">匹配时间：{{temp.matchTime | formatDate}}</div>
            <div style="font-size: 12px;color:#666;">卖方会员：{{temp.sellerUsername}}</div>
          </div>
          <!--待确认-->
          <div style="margin-left:10px;" v-if="idx==='confirm'">
            <div class="sq-time-flex">付款时间：{{temp.payTime | formatDate}}</div>
            <div style="font-size: 12px;color:#666;">卖方会员：{{temp.sellerUsername}}</div>
          </div>
          <!--待评价-->
          <div style="margin-left:10px;" v-if="idx==='evaluate'">
            <div class="sq-time-flex">确认时间：{{temp.confirmTime | formatDate}}</div>
            <div style="font-size: 12px;color:#666;">卖方会员：{{temp.sellerUsername}}</div>
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
            <div class="price-view-flex font13 color-clone" style="font-size: 20px!important;">￥{{temp.number * 2000}}

            </div>
          </div>
        </div>
        <!--待付款-->
        <div class="contect" v-if="idx==='pay'"><!---->
          <div @click="connect(temp)">联系会员</div>
          <div @click="showOrHid(temp.id)">上传付款凭证</div>
        </div>
        <!--待确认-->
        <div class="contect" v-if="idx==='confirm'"><!---->
          <div @click="connect(temp)">联系会员</div>
          <div @click="checkPic(temp.id)">查看付款凭证</div>
        </div>
        <!--待评价-->
        <div class="contect" v-if="idx==='evaluate'"><!---->
          <div @click="connect(temp)">联系会员</div>
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
    <div class="update" v-show="showOrHide"><!--上传付款凭证弹框-->
      <form action="">
        <div class="updata-main">
          <div class="up-title">请上传付款凭证</div>
          <div class="upMain">
            <div class="img-div flex-justify-center">
              <!--<img v-if = "newAvatar" :src = "newAvatar" alt = "">-->
              <img v-if="files&&!sucs" width="24" src="static/images/loading.gif">
              <div v-if="proof" class="add-hide-flex upImg" id="aa">{{text}}</div>
              <div class="tx" v-if="sucs">已选择</div>
              <input type="file" @change="onFile($event)" ref="files" >
            </div>
          </div>
          <div class="upBtns">
            <div @click="submit">{{flag?'提交':'处理中'}}</div>
            <div @click="cancel">取消</div>
          </div>
        </div>
      </form>

    </div>

  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  import Exif from 'exif-js'
  export default{
    data () {
      return {
        title: '承租AP',
        order: '待匹配',
        idx: 'match',
        orderId: '',
        text: '请点击上传付款凭证',
        showOrHide: false,//是否显示上传图片弹出框
        proof: true,//是否显示 text
        sucs: false,//是否显示‘上传成功提示’
        checkFlag: false,//是否显示查看付款凭证弹框
        checkImg: '',//查看付款凭证的图片
        titleList: [
          {
            text: '待匹配',
            number: 0,
            icon: 'static/images/icon/tzAP/icon01.png',
            type: 'match'
          },
          {
            text: '待付款',
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
        list: [],
        files: '',
        id: 0,
        flag:true
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
      connect(item){//联系会员
        if (item.id > 0) {
          this.$router.push('/ConnectMember/' + item.id + '/' + item.sellerMemberId + '/' + item.type);
        }
      },
      evaluate(id){
        this.$router.push('/GoEvaluate/' + id);
      },
      onFile(e){
        this.files = e.target.files[0];
        this.proof = !this.proof;
        this.imgPreview(this.files);
      },
      imgPreview (file) {
        let self = this;
        let Orientation;
        //去获取拍照时的信息，解决拍出来的照片旋转问题
        Exif.getData(file, function () {
          Orientation = Exif.getTag(this, 'Orientation');
        });

        // 看支持不支持FileReader
        if (!file || !window.FileReader) return;
        if (/^image/.test(file.type)) {
          // 创建一个reader
          let reader = new FileReader();
          // 将图片2将转成 base64 格式
          reader.readAsDataURL(file);
          // 读取成功后的回调
          reader.onloadend = function () {
            let result = this.result;
            let img = new Image();
            img.src = result;
            //判断图片是否大于100K,是就直接上传，反之压缩图片
            if (this.result.length <= (100* 1024)) {
              self.sucs=!self.sucs;
            } else {
              img.onload = function () {
                self.compress(img, Orientation);
              }
            }
          }
        }
      },
      compress(img, Orientation) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d');
        //瓦片canvas
        let tCanvas = document.createElement("canvas");
        let tctx = tCanvas.getContext("2d");
        let initSize = img.src.length;
        let width = img.width;
        let height = img.height;
        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio;
        if ((ratio = width * height / 4000000) > 1) {
          ratio = Math.sqrt(ratio);
          width /= ratio;
          height /= ratio;
        } else {
          ratio = 1;
        }
        canvas.width = width;
        canvas.height = height;
        //        铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //如果图片像素大于100万则使用瓦片绘制
        let count;
        if ((count = width * height / 1000000) > 1) {
          count = (Math.sqrt(count) + 1); //计算要分成多少块瓦片
          // 计算每块瓦片的宽和高
          let nw = (width / count);
          let nh = (height / count);
          tCanvas.width = nw;
          tCanvas.height = nh;
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
          }
        } else {
          ctx.drawImage(img, 0, 0, width, height);
        }
        //进行最小压缩
        let ndata = canvas.toDataURL('image/jpeg', 0.1);
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        this.files = this.blobToFile(this.dataURLtoBlob(ndata), 'ds.jpg');
        this.sucs = !this.sucs;
        return ndata;
      },
      dataURLtoBlob: function (dataurl) {
        let arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
      },
      //将blob转换为file
      blobToFile: function (theBlob, fileName) {
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
      },
      checkPic(id){//confirm待确认中的查看凭证按钮
        this.$router.push('/OrderConfirm/' + id);
      },
      cancel(){//取消上传
        this.showOrHide = !this.showOrHide;
        this.text = '请点击上传付款凭证';
        this.files = '';
        this.proof = true;
        this.sucs = false;
        this.flag=true;
        this.$refs.files.value=null;
      },
      showOrHid(id){//点击上传凭证按钮
        this.showOrHide = !this.showOrHide;
        this.id = id;
      },
      submit(){//提交
        if(this.flag){
            this.flag=false;
          let file = this.files;
          let param = new FormData(); //创建form对象
          param.append('payment_file', file, file.name);//通过append向form对象添加数据
          param.append('Id', this.id);
          if (this.files) {
            Util.ajax.postForm('/api/order/payment', param).then(res => {
              TostUtil.tostTop(res.data.message);
              this.cancel();
              this.info(this.$route.params.type);
              this.flag=true;
            }).catch(err=>{
              TostUtil.tostTop('网络出错,请稍后重试!');
              this.flag=true;
            })
          } else {
            TostUtil.tostTop('请上传凭证！');
            this.flag=true;
          }
        }

      },
      info(idx){
        this.list = [];
        this.$bus.$emit('loading', true);
        Util.ajax.post('/api/order', {
          start: 0,
          length: 50,
          status: idx,
          type: 'buy'
        }).then(res => {
          let that = this;

          if (res.data.status === 200) {
            let arr = res.data.data.data;
            let time24ms = 24 * 3600 * 1000;
            if (this.orderTimer != null) {
              clearInterval(this.orderTimer);
            }
            this.orderTimer = setInterval(() => {
              for (let i = 0; i < arr.length; i++) {
                let curOrder = arr[i];
                let orderTime
                if (idx === 'match') {
                  orderTime = Number(curOrder.time) * 1000;//订单时间
                } else if (idx === 'pay') {
                  orderTime = Number(curOrder.matchTime) * 1000;//匹配时间
                } else if (idx === 'confirm') {
                  orderTime = Number(curOrder.payTime) * 1000;//付款时间
                } else if (idx === 'evaluate') {
                  orderTime = Number(curOrder.confirmTime) * 1000//确认时间
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
          } else {//错误提示用户信息
            that.$bus.$emit('loading', false);
            TostUtil.tostTop(res.data.message);
          }
        }).catch(err=>{
          this.$bus.$emit('loading', false);
          TostUtil.tostTop('网络出错,请稍后重试!')
        })
      },//获取数据
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
          this.order = "待付款"
        } else if (this.idx == 'confirm') {
          this.order = "待确认"
        } else if (this.idx == 'evaluate') {
          this.order = "待评价"
        }

        this.$router.push('/BuyList/1/' + this.idx);
        this.info(this.idx);
      }

    },
    created () {
      let that = this;
      that.idx = that.$route.params.type;
      that.getList(that.idx);
      /*that.info(that.idx); */
    }
  }
</script>
<style scoped>
  .img-div {
    width: 46%;
    height: 34px;
    margin: 0 auto;
  }

  .up-title {
    padding: 5px;
  }

  .upMain {
    width: 100%;
    position: relative;
    top: 5px;
    margin-bottom: 10px;
  }

  input[type='file'] {
    position: absolute;
    width: 35%;
    margin: 0 auto;
    padding: 5px 10px;
    color: #5d0e13;
    border-radius: 6px;
    font-size: 14px;
    left: 25%;
    opacity: 0;
    top: 0;
  }

  .upImg {
    width: 96%;
    margin: 0 auto;
    padding: 5px 10px;
    border: 1px solid #5d0e13;
    color: #5d0e13;
    border-radius: 6px;
    font-size: 14px;
  }

  .update, .check {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    background: rgba(0, 0, 0, .1);
    z-index: 99999999999;

  }

  .update {
    position: fixed;
  }

  .check img {
    width: auto;
    height: auto;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
  }

  .updata-main > div {
    text-align: center;
  }

  .updata-main {
    position: absolute;
    width: 80%;
    height: 130px;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #fff;
    border-radius: 5px;
    margin: auto;
  }

  .upBtns {
    width: 100%;
    display: flex;
    justify-content: center;
    color: #fff;
  }

  .upBtns > div {
    width: 50px;
    padding: 5px 10px;
    font-size: 14px;
    margin-top: 8px;
  }

  .upBtns > div:first-child {
    background: #5d0e13;
    border-radius: 5px;
    margin-right: 40px;
  }

  .upBtns > div:last-child {
    background: #ccc;
    border-radius: 5px;
  }

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

  .contect > div:first-child {
    padding: 2px 5px;
    border: 1px solid #666;
    border-radius: 6px;
    color: #000;
    font-weight: 500;
    margin-right: 20px;
  }

  .contect > div:last-child {
    padding: 2px 5px;
    border: 1px solid #5D0E13;
    border-radius: 6px;
    color: #5D0E13;
    font-weight: 500;
    margin-right: 20px;
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
    transition: all .3s linear;
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
    font-size: 8px;
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
    padding-top: 70%;
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
