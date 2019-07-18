<template>
  <div class="box">
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="已使用" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <!-- main -->
    <!--有数据的时候-->
    <div class="card">
      <ul class="card-list">
        <li class="card-item flex-justify-center1" v-if="nameCardNumber>0" id="0"><!---->
          <div class="card-item-left"><img src="static/images/icon/djsc/nameCard.png" alt=""/></div>
          <div class="card-item-right">
            <div class="card-item-right-title">
              改姓名卡

            </div>
            <div class="card-item-right-main">已使用：<span style="color:#e4393c!important;font-size: 14px;">{{nameCardNumber}}<span
              style="font-size: 16px;">张</span></span></div>
          </div>
        </li>
        <li class="card-item flex-justify-center1" v-if="phoneCardNumber>0" id="1"><!---->
          <div class="card-item-left"><img src="static/images/icon/djsc/phoneCard.png" alt=""/></div>
          <div class="card-item-right">
            <div class="card-item-right-title">
              改手机号码卡

            </div>
            <div class="card-item-right-main">已使用：<span style="color:#e4393c!important;font-size: 14px;">{{phoneCardNumber}}<span
              style="font-size: 16px;">张</span></span></div>
          </div>
        </li>
        <li class="card-item flex-justify-center1" v-if="jfCardNumber>0" id="2"><!---->
          <div class="card-item-left"><img src="static/images/icon/djsc/unsealingCard.png" alt=""/></div>
          <div class="card-item-right">
            <div class="card-item-right-title">
              解封卡

            </div>
            <div class="card-item-right-main">已使用：<span style="color:#e4393c!important;font-size: 14px;">{{jfCardNumber}}<span
              style="font-size: 16px;">张</span></span></div>
          </div>
        </li>
        <li class="card-item flex-justify-center1" v-if="cjfCardNumber>0" id="3"><!---->
          <div class="card-item-left"><img src="static/images/icon/djsc/superCard.png" alt=""/></div>
          <div class="card-item-right">
            <div class="card-item-right-title">
              超级解封卡
            </div>
            <div class="card-item-right-main">已使用：<span style="color:#e4393c!important;font-size: 14px;">{{cjfCardNumber}}<span
              style="font-size: 16px;">张</span></span></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="main-comment-flex column flex-justify-center" v-if="flag">
      <div class="none-icon-flex"></div>
      <div class="font13 marginTop">暂无数据</div>
    </div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  export default{
    data () {
      return {
        nameCardNumber: 0,
        phoneCardNumber: 0,
        jfCardNumber: 0,
        cjfCardNumber: 0,
        flag:false
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
      Util.ajax.post('/api/gift/usage',{
        start:0,
        length:2000
      }).then(res=>{
          if(res.data.status===200){
            let arr = res.data.data.data;
            let arrPhone=[],arrName=[],arrJfeng=[],arrCjfeng=[];
            arr.forEach((item,index)=>{
              if(item.type==='phone'){
                arrPhone.push(item);
              }
              if(item.type==='name'){
                arrName.push(item);
              }
              if(item.type==='unblock'){
                arrJfeng.push(item);
              }
              if(item.type==='super_unblock'){
                arrCjfeng.push(item);
              }
            })
            that.phoneCardNumber=arrPhone.length;
            that.nameCardNumber=arrName.length;
            that.jfCardNumber=arrJfeng.length;
            that.cjfCardNumber=arrCjfeng.length;
            if (that.nameCardNumber <= 0 && that.phoneCardNumber <= 0 && that.jfCardNumber <= 0 && that.cjfCardNumber <= 0) {
              that.flag = true;
            } else {
              that.flag = false;
            }
            that.$bus.$emit('loading', false);
          }else{
            that.$bus.$emit('loading', false);
            TostUtil.tostTop(res.data.message);
          }

      }).catch(err=>{
        that.$bus.$emit('loading', false);
        TostUtil.tostTop('网络出错,请稍后重试!')
      })
    }
  }
</script>
<style scoped>
  .box{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .header{
    background: #5D0E13;
    height:50px!important;
    font-size:18px!important;
  }
  .flex-justify-center1 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .main-comment-flex {
    width: 100%;
    /* height: 500px;*/
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
  .font13{
    font-size:14px;
  }
  .marginTop{
    margin-top:10px;
    color:#666;
  }
  /* 没有数据的情况 */
  .none-icon-flex {
    width: 100px;
    height: 100px;
    background-image: url('./../../static/images/icon/djsc/none.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-top:50%;
  }
  .card, .card-list {
    width: 100%;
    height: auto;

  }

  .card-list, .card-item {
    width: 100%;
    box-sizing: border-box;
    padding: 0;

  }

  .card-item {
    background: #fff;
    padding: 20px 10px;
    margin-bottom: 10px;
  }

  .card-item-left {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right: 20px;
  }

  .card-item-left > img {
    width: 80px !important;
    height: 80px !important;
  }

</style>
