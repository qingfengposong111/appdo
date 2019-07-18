<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="银行帐户" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
      <div slot="right" class="right-btn-save" @click="save">+</div>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <div class="head-zw"></div>
    <!-- main -->
    <!-- 有卡的情况下 -->
    <div class="had-card column" v-if="list.length>0">
      <div class="icon-had-flex column" v-for="item in list" :key="item.id" @click="reviseBankCard(item.id)">
        <div class="common-position-flex">{{item.bankName}}</div>
        <div class="card-category-flex">借记卡</div>
        <div class="card-number-flex">{{item.bankNumber}}</div>
      </div>
    </div>
    <div class="none-card flex-justify-center column" v-else>
      <div class="icon-none-flex"></div>
      <div>暂无账户</div>
    </div>
  </div>
</template>
<script>
  import Util from './../common/util';
  import TostUtil from './../common/tostUtil';
  export default{
    data(){
      return {
        list: []
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      save () {
        this.$router.push('/AddBankCard');
      },
      reviseBankCard(id){//修改银行帐户
        this.$router.push('/ReviseBankCard/' + id);
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
        Util.ajax.getByForm('/api/bank').then(res => {
          if (res.data.status === 200) {
            this.list = res.data.data;
            that.$bus.$emit('loading', false);
          } else {
            that.$bus.$emit('loading', false);
            TostUtil.tostTop(res.data.message);
          }

        }).catch(err => {
          that.$bus.$emit('loading', false);
          TostUtil.tostTop('网络出错,请稍后重试!')
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

  body, html {
    overflow: hidden;
  }

  /* 没有卡的时候 */
  .none-card {
    width: 100%;
    height: 80%;
    position: relative;
    text-align: center;
  }

  .icon-none-flex {
    width: 100px;
    height: 100px;
    background-image: url('./../../static/images/icon/bankCard/none.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin: 40% auto 0;
  }

  /* 有卡的时候 */
  .had-card {
    width: 100%;
    height: auto;
  }

  .icon-had-flex {
    width: 86%;
    height: 130px;
    margin-left: 7%;
    margin-top: 20px;
    background-image: url('./../../static/images/icon/bankCard/had.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    position: relative;
  }

  .common-position-flex {
    position: absolute;
    top: 20px;
    left: 20%;
    color: #fff;
  }

  .card-category-flex {
    position: absolute;
    top: 60px;
    left: 20%;
    color: #fff;
    font-size: 13px;
  }

  .card-number-flex {
    position: absolute;
    top: 90px;
    left: 20%;
    color: #fff;
    font-size: 16px;
  }
</style>
