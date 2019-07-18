<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="会员级别" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <div class="head-zw"></div>
    <!-- 当前会员级 -->
    <div class="top-main-flex flex-justify-center">
      <div class="row">
        <div class="font-size-18">当前会员级</div>
        <div class="level-flex-view">{{title}}</div>
      </div>
    </div>
    <!-- 会员等级构成线 -->
    <div class="level-start-end">
      <div class="controller-flex row">
        <div :class="item.le == true?(index == 7?'common-circle-flex2':'common-circle-flex'):'none-level-style'"
             class="row" v-for="(item,index) in list" :key="index" v-cloak>
          <div class="clone-num-flex flex-justify-center">{{item.name}}</div>
          <div class="jt-flex-show" v-show="item.current == 1 && index != 7"></div>
        </div>
      </div>
    </div>
    <!-- 查看爱心会员 -->
    <div class="common-flex-view-setting row flex-box-center" @click="toLove">
      <!-- name -->
      <div class="font-name-title">查看爱心会员</div>
      <!-- 头像图标 -->
      <div class="had-right-common row">
        <!-- <div class="person-name-clone">小老鼠</div> -->
        <div class="right-common-flex"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        list: [
          {name: 'A1', le: false,current:0},
          {name: 'A2', le: false,current:0},
          {name: 'A3', le: false,current:0},
          {name: 'A4', le: false,current:0},
          {name: 'A5', le: false,current:0},
          {name: 'A6', le: false,current:0},
          {name: 'A7', le: false,current:0},
          {name: 'A8', le: false,current:0},
        ],
        level: JSON.parse(localStorage.loginInfo).levelId-1,
        title: 'A0',
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      toLove () {
        this.$router.push('/Love')
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
      setTimeout(function(){
        that.$bus.$emit('loading', false);
      },600);
      if(localStorage.loginInfo){
        this.title=JSON.parse(localStorage.loginInfo).levelName
      }else{
        this.title='A0'
      }
    },
    mounted () {
      // 假设此处做数据交互，代表会员等级的数据为 level = "num";
      let that = this;
      this.list.forEach(function (v, i) {
        if (i < (that.level)) {// 小于等于等级的话
          v.le = true;
        } else {
          v.le = false;
        }
        if (i < (that.level)) {//如果等级与当前的下标相等的话，证明在当前等级，则控制3角图标显示
          v.current = 1;
          that.title = v.name;
        }
      })
    }
  }
</script>
<style scoped>
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  /* 当前会员级 */
  .top-main-flex {
    width: 86%;
    padding: 15px 7%;
    background: #fff;
  }

  .font-size-18 {
    font-size: 18px;
  }

  .level-flex-view {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    background: #F2AA0A;
    padding: 5px;
    font-size: 14px;
    margin-left: 5px;
  }

  /* 会员等级构成线 */
  .level-start-end {
    width: 100%;
    padding: 30px 0;
    background: #984D4a;
    background-image: url('./../../static/images/icon/hyjb/dashed.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .controller-flex {
    width: 86%;
    padding: 0 7%;
  }

  .common-circle-flex {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    text-align: center;
    line-height: 1rem;
    background: #F2AA0A;
    color: #5D0E13;
    font-size: 13px;
    padding: 3px;
    margin-right: 5%;
    position: relative;
  }

  .common-circle-flex2 {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    text-align: center;
    line-height: 1rem;
    background: #F2AA0A;
    color: #5D0E13;
    font-size: 13px;
    padding: 3px;
    position: relative;
  }

  .clone-num-flex {
    width: 1rem;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
  }

  .jt-flex-show {
    width: 10px;
    height: 10px;
    background-image: url('./../../static/images/icon/hyjb/jt.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    position: absolute;
    right: -50%;
    top: 7px;
  }

  /* 未到达的会员等级样式 */
  .none-level-style {
    background: #F1CA8E !important;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    text-align: center;
    line-height: 1rem;
    color: #5D0E13;
    font-size: 13px;
    padding: 3px;
    margin-right: 5%;
    position: relative;
  }

  /* 爱心会员 */
  .common-flex-view-setting {
    width: 86%;
    height: auto;
    border-bottom: 1px solid #E6E6E6;
    position: relative;
    padding: 15px 7%;
    background: #fff;
  }

  .font-name-title {
    margin-left: 10px;
    font-size: 13px;
  }

  .right-common-flex {
    width: 15px;
    height: 15px;
    background-image: url('./../../static/images/icon/grzx/right.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .had-right-common {
    position: absolute;
    right: 7%;
    top: 20px;
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

  .font-size-18 {
    font-size: 18px;
  }
</style>
