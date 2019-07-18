<template>
  <div>
    <!--<div
      style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="退租AP" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <div class="top-fixed-flex flex-box">
      <div class="flex-1 column flex-justify-center border-right-view">
        <div>希望钱包</div>
        <div>{{hopeWallet}}</div>
      </div>
      <div class="flex-1 column flex-justify-center">
        <div>奖金钱包</div>
        <div>{{bonusWallet}}</div>
      </div>
    </div>
    <!-- 2 -->
    <div class="main-content-class">
      <div class="row flex-box-center" @click="toChoose"
           style="justify-content: space-between;height: 55px;padding:7px 7%;border-bottom: 1px solid #e7e7e7;">
        <div>选择钱包</div>
        <div class="row flex-box-center width-guding-flex">
          <div class="color-clone font13" style="margin-right: 20px;">{{name}}</div>
          <div class="right-jt-view"></div>
        </div>
      </div>

      <!-- 退租AP -->
      <div class="row flex-box-center padding-top-view" style="padding:10px 7% 5px;">
        <div>退租AP数量</div>
      </div>
      <div style="padding:0 7%;">
        <input type="number" @input="getChange" v-model.trim="APNumber" placeholder=""/>
      </div>
    </div>
    <!-- 3 -->
    <div class="main-content-class" style="padding:7px 7%;">
      <!--  -->
      <div class="row flex-box-center padding-top-view">
        <div>对应支付金额</div>
      </div>
      <div>
        ￥{{cash * APNumber | yuan}}


      </div>
    </div>
    <!-- 4 -->
    <div class="main-content-class">
      <!--  -->
      <div class="row flex-box-center padding-top-view" style="padding:10px 7% 5px;">
        <div>输入安全密码</div>
      </div>
      <div style="padding:0 7%;">
        <input type="password" v-model.trim="safePwd" placeholder=""/>
      </div>
    </div>
    <!-- btn -->
    <div class="btn-last-view">
      <div class="btn-save-flex" @click="visibi(APNumber,cash*APNumber)">提交</div>
    </div>
    <!-- 自定义popup -->
    <div class="popup-bottom" v-show="choose" @click="outBox($event)">
      <div class="title-popup-view column flex-justify-center" ref="insidebox">
        <div class="font13 title-hope-font">选择钱包</div>
        <div class="color-clone title-hope-font" @click="toChoose(1)">希望钱包</div>
        <div class="color-clone title-hope-font radius-cloe-bottom" @click="toChoose(2)">奖金钱包</div>
        <div class="footprint"></div>
        <div class="color-clone title-hope-font" @click="toChoose">取消</div>
      </div>
    </div>
    <div class="popup-preview-flex column flex-box-center" v-if="show">
      <div class="update-title-view">是否确认提交</div>
      <div class="version-flex-view">
        提交退租的AP数量为{{sellNum}}个 ,将会收到的金额为{{sellyuan}}元，提交后将无法取消，系统48小时内会为您匹配。
       </div>
      <div class="update-btn-view flex-box">
        <div class="flex-1 font13" @click="submit">
          <div class="save-flex-btn">{{sellFlag?'提交':'处理中'}}</div>
        </div>
        <div class="flex-1 font13 flex-right" @click="toDel">
          <div class="del-flex-btn">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  import RegUtil from './../common/regUtil'
  export default{
    data () {
      return {
        choose: false,
        name: '',//所选钱包
        APNumber: '',//所选钱包的AP数量
        hopeWallet: 0,//希望钱包
        bonusWallet: 0,//奖金钱包
        flag: 0,//用来判断选择的是哪个钱包，后面进行所选钱包中数量的判断
        safePwd: '',//安全密码
        cash: 2000,//1个AP的单价
        block1: null,
        block2: null,
        sellFlag: true,
        show:false,
        sellNum:0,
        sellyuan:0

      }
    },
    filters: {
      yuan: function (value) {
        return isNaN(value) ? 0.00 : parseFloat((value).toFixed(2)).toFixed(2);
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      /*let that = this;
      setTimeout(function () {
        that.$bus.$emit('loading', false);
      }, 600);*/
      this.getInfo();
    },
    methods: {
      outBox(e){
        if (e.target.className !== 'title-popup-view') {
          this.choose = false;
        }
      },
      toDel(){
        this.show=!this.show;
      },
      visibi(num,yan){
        this.sellNum=num;
        this.sellyuan=yan;
        if (this.name.length === 0) {//是否选择钱包
          TostUtil.tostTop('请选择钱包！');
          this.APNumber = '';
          return false;
        }else if (this.APNumber === '') {//是否输入数量
          TostUtil.tostTop('请输入AP数量！');
          return false;
        }else if (!RegUtil.isMatchSafePwd(this.safePwd)) {//安全密码格式是否正确
          TostUtil.tostTop('请输入6位数字安全密码！');
          return false;
        }else {
          this.show = !this.show;
        }
      },
      goBack(){
        this.$router.go('-1')
      },
      getInfo(){//卖出后重新获取数据
        this.$bus.$emit('loading', true);
        Util.ajax.getByForm('/api/member/balance').then(res => {
          if (res.data.status === 200) {
            this.hopeWallet = parseFloat(res.data.data.ecash).toFixed(4);//希望钱包
            this.bonusWallet = parseFloat(res.data.data.bonus).toFixed(4);//奖金钱包
            this.block1 = res.data.data.ecashLock;//希望钱包中是否锁定
            this.block2 = res.data.data.bonusLock;//奖金钱包中是否锁定
            this.$bus.$emit('loading', false);
          }else{
            this.$bus.$emit('loading', false);
            TostUtil.tostTop(res.data.message);
          }
        }).catch(err=>{
          this.$bus.$emit('loading', false);
          TostUtil.tostTop('网络出错,请稍后重试!')
        })
      },
      sells(){//卖出
        let source;

        if (this.flag === 1) {
          source = 'ecash';
        } else if (this.flag === 2) {
          source = 'bonus';
        }
        let that = this;
        Util.ajax.post('/api/order/sell', {
          source: source,
          number: Number(parseFloat(this.APNumber).toFixed(2))
        }).then(res => {
          this.APNumber = '';
          that.getInfo();//卖出后重新获取最新数据
          TostUtil.tostTop(res.data.message);
          if(res.data.status===406){
            TostUtil.tostTop(res.data.message);
          }
          that.sellFlag = true;
        }).catch(err => {
          that.sellFlag = true;
          TostUtil.tostTop('网络出错,请稍后重试!')
        })
      },
      toChoose (name){//钱包切换
        if (name == 1) {
          this.name = '希望钱包';
          this.flag = 1;
        }
        if (name == 2) {
          this.name = '奖金钱包';
          this.flag = 2
        }
        this.choose = !this.choose;
      },
      getChange(){//输入AP数量并判断钱包中是否有足够的AP
        if (this.name.length === 0) {
          TostUtil.tostTop('请选择钱包！');
          this.APNumber = '';
          return false;
        }
        if (this.flag === 1) {
          if (parseFloat(this.APNumber) > parseFloat(this.hopeWallet)) {
            TostUtil.tostTop('希望钱包中AP数量不足！');
            this.APNumber = '';
            return false;
          }
          if (parseFloat(this.APNumber) > 20) {
            TostUtil.tostTop('单次退租数量不能大于20个！');
            this.APNumber = '';
            return;
          }
          if (parseFloat(this.APNumber) < 1) {
            TostUtil.tostTop('希望钱包中最少退租1个！');
            this.APNumber = '';
            return false;
          }
        }
        if (this.flag === 2) {
          if (parseFloat(this.APNumber) > parseFloat(this.bonusWallet)) {
            TostUtil.tostTop('希望钱包中AP数量不足！');
            this.APNumber = '';
            return false;
          }
        }
      },
      submit(){//提交
        let num;
        let that = this;
        if (that.sellFlag) {
          that.sellFlag = false;
          if (this.flag === 1) {//选择希望钱包
            num = ((this.APNumber) % 0.25).toFixed(2);
            if (num !== '0.00') {
              TostUtil.tostTop('希望钱包退租数量必须为0.25的整数倍！');
              this.sellFlag = true;
              this.show=false;
              return false;
            }
            if (this.block1 !== 'no') {//希望钱包是否被锁定
              TostUtil.tostTop('希望钱包中AP已被锁定，不能卖出！');
              this.sellFlag = true;
              this.show=false;
              return false;
            }
          }
          if (this.flag === 2) {//选择奖金钱包
            num = ((this.APNumber) % 0.5).toFixed(2);
            if (num !== '0.00') {
              TostUtil.tostTop('奖金钱包退租数量必须为0.5的整数倍！');
              this.sellFlag = true;
              this.show=false;
              return false;
            }
            if (parseFloat(this.APNumber) < 0.5) {
              TostUtil.tostTop('奖金钱包中最少退租0.5个！');
              this.sellFlag = true;
              this.show=false;
              return ;
            }
            if (this.block2 !== 'no') {//奖金钱包是否被锁定
              TostUtil.tostTop('奖金钱包中AP已被锁定，不能卖出！');
              this.sellFlag = true;
              this.show=false;
              return false;
            }
          }
          Util.ajax.post('/api/member/verify_security', {
            password: this.safePwd
          }).then(res => {
            if (res.data.status === 200) {//安仔密码正确可以卖出；
              this.show=!this.show;
              that.sells();
            } else {//错误提示用户信息
              TostUtil.tostTop(res.data.message);
              this.$router.push('/UpdateSafePwd');
              this.sellFlag = true;
              this.show=!this.show;
              return false;
            }

          }).catch(err => {
            that.sellFlag = true;
            this.show=!this.show;
            that.safePwd = '';
            TostUtil.tostTop('网络出错,请稍后重试!')
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

  .top-fixed-flex {
    width: 86%;
    padding: 10px 7%;
    /*background: #A07A3C;*/
    color: #333;
  }

  .flex-box {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  }

  .border-right-view {
    border-right: 1px solid #999;
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

  .main-content-class {
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    height: auto;
    position: relative;
    padding: 5px 0;
    border-bottom: 1px solid #e7e7e7;
  }

  .flex-box-center {
    display: flex;
    align-items: center;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .width-guding-flex {
    height: 10px;
  }

  .color-clone {
    color: #333;
  }

  .padding-top-view {
    padding-top: 10px;
  }

  .right-jt-view {
    width: 15px;
    height: 15px;
    background-image: url(./../../static/images/icon/grzx/right.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    position: absolute;
    right: 7%;
  }

  input {
    color: #000;
    font-size: 13px;
    -webkit-appearance: none;
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
  }

  .popup-bottom {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  .title-popup-view {
    position: absolute;
    bottom: 0;
    overflow: hidden;
    width: 86%;
    margin-left: 7%;
    background: #fff;
    height: auto;
    border-radius: 5px;
    margin-bottom: 10px;
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

  .title-hope-font {
    border-bottom: 1px solid #e7e7e7;
    padding: 7px 0;
    width: 100%;
    text-align: center;
    font-size: 20px;
  }

  .footprint {
    width: 100%;
    height: 10px;
    background: rgba(0, 0, 0, .3);
  }

  .font13 {
    font-size: 14px !important;
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
  /* 确认购买悬浮框 */
  .popup-preview-flex {
    width: 60%;
    height: auto;
    background: #5D0E13;
    position: fixed;
    left: 20%;
    padding: 5px 0;
    top: 30%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .update-title-view {
    color: #fff;
    font-size: 14px;
    padding: 5px 0;
  }

  .version-flex-view {
    color: #fff;
    font-size: 13px;
    padding: 2px 7%;
  }

  .update-btn-view {
    width: 90%;
    padding: 3px 5% 5px;
  }

  .save-flex-btn {
    background: #F1CA8F;
    color: #5D0E13;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    width: 50%;
    padding: 2px 0;
    text-align: center;
    margin:0 auto;
  }

  .del-flex-btn {
    background: #4D4D4D;
    color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    width: 50%;
    padding: 2px 0;
    text-align: center;
    margin:0 auto;
  }
</style>
