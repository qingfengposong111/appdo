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
        <div class="flex-1">获得的AP</div>
        <div class="flex-1 flex-right flex-box-center">
          <span class="one-span-flex">{{obj.total}}</span>
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
          {{obj.matchTime | formatDate}}
        </div>
      </div>
      <div class="flex-box font13 common-flex-view-this">
        <div class="flex-1">打款时间</div>
        <div class="flex-1 flex-right">
          {{obj.payTime | formatDate}}
        </div>
      </div>
      <div class="flex-box font13 common-flex-view-this">
        <div class="flex-1">完成时间</div>
        <div class="flex-1 flex-right">
          {{obj.finishTime | formatDate}}
        </div>
      </div>
      <div class="flex-box font13 common-flex-view-this">
        <div class="flex-1">收款者</div>
        <div class="flex-1 flex-right">
          {{obj.sellerUsername}}
        </div>
      </div>
      <div class="flex-box font13 common-flex-view-this">
        <div class="flex-1">获得评分</div>
        <div class="flex-1 flex-right">
          +5
        </div>
      </div>
      <!-- 成长zhuangt -->
      <div class="flex-box title-name-flex" v-if="obj.harvestStatus">
        <div class="flex-1">分红状态</div>
        <div class="flex-1 flex-right flex-box-center font13 color-red-this" v-if="obj.harvestStatus==='growing'">
          分红中(收益率{{obj.harvestSpeed}}%每天)
        </div>
        <div class="flex-1 flex-right flex-box-center font13 color-red-this" v-if="obj.harvestStatus==='reward'">
          已收割
        </div>
      </div>
      <!-- 成长天数 -->
      <div class="flex-box title-name-flex" v-if="obj.harvestStatus==='growing'">
        <div class="flex-1">分红天数</div>
        <div class="flex-1 flex-right flex-box-center font13 color-red-this">
          {{grow}}天
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
        obj: { },
        grow:0
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
            type:'buy'
          }
        }).then(res => {
          if (res.data.status === 200) {
            this.obj= res.data.data;
            let start = res.data.data.finishTime*1000;
            this.grow = parseInt((Date.now()-start)/(3600*1000*24));
            if(this.obj.hasOwnProperty('harvestNumber')){
              if(!this.obj.hasOwnProperty('total')){
                this.obj.total=(Number(this.obj.number)+Number(this.obj.harvestNumber)).toFixed(2);
              }
            }else{
              this.obj.total=Number(this.obj.number).toFixed(2)
            }
            this.$bus.$emit('loading', false);
          }else{
            this.$bus.$emit('loading', false);
            TostUtil.tostTop(res.data.message);
          }
        }).catch(err=>{
          this.$bus.$emit('loading', false);
          TostUtil.tostTop('网络出错,请稍后重试!')
        })
      }//获取数据
    },
    created(){
      this.$bus.$emit('loading', true);
      /*let that =this;
      setTimeout(function(){
        that.$bus.$emit('loading', false);
      },600);*/
      this.info();
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
