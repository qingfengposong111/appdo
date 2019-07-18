<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="希望钱包明细" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <!-- main -->
    <div class="flex-box flex-justify-center top-title-flex">
      <div class="flex-1 font13 flex-justify-center">日期</div>
      <div class="flex-1 font13 flex-justify-center">交易类型</div>
      <div class="flex-1 font13 flex-justify-center">数量</div>
    </div>
    <div class="main" v-if="dataList.length>0">
      <MeScroll ref="mescroll" class="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="flex-box flex-justify-center main-title-flex" v-for="(item,index) in dataList" :key="index">
          <div class="flex-1 font13 flex-justify-center">{{item.harvestTime | formatDate}}</div>
          <div class="flex-1 font13 flex-justify-center">提取分红</div>
          <div class="flex-1 font13 flex-justify-center">{{item.total}}</div>
        </div>
      </MeScroll>
    </div>
    <div class="weui-tab__bd-item" v-if="dataList.length===0">
      <div class="none-flex-view column">
        <div class="none-icon-flex"></div>
        <div class="font13" style="color: #666;">暂无数据</div>
      </div>
    </div>
  </div>
</template>
<script>
  import TostUtil from './../common/tostUtil';
  import Util from './../common/util';
  import MeScroll from 'mescroll.js/mescroll.vue'
  import 'mescroll.js/mescroll.min.css'
  export default{
    components: {
      MeScroll
    },
    data () {
      return {
        pageSize: 50,
        mescroll: null,
        mescrollDown: {
          callback: this.downCallback,
        },
        mescrollUp: {
          callback: this.upCallback,
          page: {
            num: 0,
            size: 50
          },
          htmlNodata: '<p class="upwarp-nodata">-- 加载完成 --</p>'
        },
        dataList: [],
      }
    },
    filters: {
      formatDate: function (value) {
        let date = new Date(Number(value) * 1000);
        let YY = date.getFullYear();
        let MM = date.getMonth() + 1;
        let d = date.getDate();
        MM = MM < 10 ? ('0' + MM) : MM;
        d = d < 10 ? ('0' + d) : d;
        return YY + '-' + MM +'-' + d;
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      mescrollInit (mescroll) {// mescroll组件初始化的回调,可获取到mescroll对象
        this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },
      upCallback(page){
        let that = this;
        const currIndex = (page.num) * that.pageSize;
        Util.ajax.post('/api/seed', {
          start: currIndex,
          length: page.size
        }).then((res) => {
          if (res.data.status === 200) {
            that.$bus.$emit('loading', false);
            if (currIndex <= Number(res.data.data.pager.totalNum)) {
              let arr1 = res.data.data.data, arr = [];
              arr1.forEach(item => {
                if(item.status==='reward'){
                  if(!item.hasOwnProperty('total')){
                    item.total=(Number(item.number)+Number(item.harvestNumber)).toFixed(4);
                  }
                  arr.push(item);
                }
              });
              that.dataList = that.dataList.concat(arr);
              //隐藏下拉刷新的状态
              let nums = that.dataList.length / that.mescrollUp.page.size;
              let hasNext;
              if (nums < res.data.data.pager.totalNum) {
                hasNext = true;
              } else {
                hasNext = false;
              }
              that.$nextTick(() => {
                that.mescroll.endSuccess(arr.length, hasNext);
              })
            } else {
              that.mescroll.endSuccess(res.data.data.pager.totalNum, false);
            }
          }else{
            that.$bus.$emit('loading', false);
            TostUtil.tostTop(res.data.message);
          }
        }).catch(() =>{
          that.$bus.$emit('loading', false);
          that.mescroll.endErr();
        });

      },

      downCallback () {
        const pageStart = 0;
        let that = this;
        if (pageStart === 0 && that.dataList.length === 0) {
          Util.ajax.post('/api/seed', {
            start: pageStart,
            length: that.mescrollUp.page.size,
          }).then((res) => {
            this.$bus.$emit('loading', false);
            if (res.data.status === 200) {
              let arr1 = res.data.data.data, arr = [];
              arr1.forEach((item, index) => {
                if(item.status==='reward'){
                  if(!item.hasOwnProperty('total')){
                    item.total=(Number(item.number)+Number(item.harvestNumber)).toFixed(4);
                  }
                  arr.push(item);
                }
              });
              that.dataList = that.dataList.concat(arr);
              that.mescroll.endSuccess();
            }else{
              that.$bus.$emit('loading', false);
              TostUtil.tostTop(res.data.message);
            }
          }).catch(() =>{
            that.$bus.$emit('loading', false);
            that.mescroll.endErr();
          });

        } else {
          that.$bus.$emit('loading', false);
          that.mescroll.endSuccess();
        }
      },

    },
    created(){
      this.$bus.$emit('loading', true);
      this.downCallback()
    }
  }
</script>
<style scoped>
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  .flex-justify-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex-box {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  }

  .font13 {
    font-size: 14px !important;
  }

  .flex-1 {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    flex-wrap: wrap;
  }

  /* main */
  .main {
    width: 100%;
    background: #fff;
    height: auto;
  }

  .top-title-flex {
    padding: 10px 0;
    background: #fff;
  }

  .main-title-flex {
    border-top:1px solid #f7f7f7;
    padding: 15px 0;
  }

  [v-cloak] {
    display: none;
  }
  .none-flex-view {
    width: 100%;
    height: 80%;
    text-align: center;
    padding-top: 45%;
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
