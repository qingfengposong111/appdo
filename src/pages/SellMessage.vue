<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="AP详情" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <!--main-->
    <div class="main-content-flex">
      <div class="flex-box title-name-flex">
        <div class="flex-1">退租</div>
        <div class="flex-1 flex-right flex-box-center">
          <span class="one-span-flex">{{obj.number}}</span>
          <span class="two-span-flex">AP</span>
        </div>
      </div>
      <!-- 详细内容 -->
      <div class="flex-box font13 common-flex-view-this">
        <div class="flex-1">订单编号</div>
        <div class="flex-1 flex-right">
          {{obj.orderId}}

        </div>
      </div>
      <div class="flex-box font13 common-flex-view-this">
        <div class="flex-1">AP数量</div>
        <div class="flex-1 flex-right">
          {{obj.number}}

        </div>
      </div>
      <div class="flex-box font13 common-flex-view-this">
        <div class="flex-1">下单时间</div>
        <div class="flex-1 flex-right">
          {{obj.time | formatDate}}

        </div>
      </div>
      <div class="flex-box font13 common-flex-view-this">
        <div class="flex-1">匹配时间</div>
        <div class="flex-1 flex-right">
          {{obj.matchTime |formatDate}}

        </div>
      </div>
      <div class="flex-box font13 common-flex-view-this">
        <div class="flex-1">收款时间</div>
        <div class="flex-1 flex-right">
          {{obj.payTime|formatDate}}

        </div>
      </div>
      <div class="flex-box font13 common-flex-view-this">
        <div class="flex-1">完成时间</div>
        <div class="flex-1 flex-right">
          {{obj.finishTime |formatDate}}

        </div>
      </div>
      <div class="flex-box font13 common-flex-view-this">
        <div class="flex-1">打款者</div>
        <div class="flex-1 flex-right">
          {{obj.buyerUsername}}

        </div>
      </div>
      <div class="flex-box font13 common-flex-view-this">
        <div class="flex-1">获得评分</div>
        <div class="flex-1 flex-right">
          +5
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Util from './../common/util';
  import TostUtil from './../common/tostUtil';
  export default{
    data () {
      return {
        obj: {
        },
        id: ''
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
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      info(){
        Util.ajax.getByForm('/api/order/show', {
          params:{
            Id:Number(this.$route.params.id),
            type:'sell'
          }
        }).then(res => {
          if (res.data.status === 200) {
            this.obj=res.data.data;
            this.$bus.$emit('loading', false);
          }else{
            this.$bus.$emit('loading', false);
          }
        }).catch(err=>{
          TostUtil.tostTop(err.response.message);
          this.$bus.$emit('loading', false);
        })
      }//获取数据
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
      /*setTimeout(function(){
        that.$bus.$emit('loading', false);
      },600);*/
      that.info();
    }
  }
</script>
<style scoped>
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  body, html {
    overflow: hidden;
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

  /* main */
  .main-content-flex {
    width: 100%;
    height: auto;
    background: #fff;
  }

  .title-name-flex {
    padding: 15px 7%;
    width: 86%;
    border-bottom: 1px solid #efefef;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .one-span-flex {
    font-weight: bold;
    font-size: 20px !important;
  }

  .two-span-flex {
    font-size: 10px !important;
    margin-top: 7px;
  }

  /* 详细内容 */
  .common-flex-view-this {
    padding: 10px 7%;
    width: 86%;
    color: #666;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .color-red-this {
    color: red;
  }
</style>
