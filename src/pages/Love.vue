<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="我的爱心" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <div style="width: 100%;height: 50px;"></div>
    <!--main-->
    <div class="main-content-flex flex-justify-center column">
      <div class="mylove-flex-view" @click="toLoveMember"></div>
      <div class="footprint3"></div>
      <!-- 2 -->
      <div class="color-view-flex flex-box ">
        <div class="flex-1 column flex-box-center border-right-flex">
          <div>我的会员等级</div>
          <div>{{levelName}}</div>
        </div>
        <div class="flex-1 column flex-box-center">
          <div>我的爱心分数</div>
          <div>{{lovePercent}}</div>
        </div>
      </div>
      <div class="mine">我的团队</div>
      <el-tree :data="dat" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
  </div>
</template>
<script>
  import Util from './../common/util';
  import {Tree} from 'element-ui'
  import TostUtil from './../common/tostUtil';
  export default{
    data () {
      return {
        levelName:JSON.parse(localStorage.loginInfo).levelName,
        lovePercent:0,
        dat:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      toLoveMember(){
        this.$router.push('/LoveMember');
      },
      handleNodeClick(){

      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that =this;
      if(localStorage.loginInfo){
        this.levelName=JSON.parse(localStorage.loginInfo).levelName
      }else{
        this.levelName='A0'
      }
      Util.ajax.getByForm('/api/member/balance').then(res => {
        if (res.data.status === 200) {
          this.num = res.data.data.phone;//激活卡
          this.$bus.$emit('loading', false);
        }
      });
      Util.ajax.getByForm('/api/network').then(res => {
        if (res.data.status === 200) {
          let arr = res.data.data;
          let as=JSON.stringify(arr).toString();
          that.lovePercent=((as.split('username')).length-1)-1;
          arr.username=arr.levelName+' '+arr.username/*+' ('+Number(arr.subData.length+Number(num))+'人)'*/;
          delete arr.levelName;
          delete arr.realName;
          delete arr.id;
          delete arr.levelId;
          arr.subData.forEach(item => {
            item.username=item.levelName+' '+item.username/*+' ('+[item.subData].length+'人)'*/;
            delete item.levelName;
            delete item.realName;
            delete item.id;
            delete item.levelId;
          });
          arr.subData.forEach(item => {
            delete item.subData.levelName;
            delete item.subData.realName;
            delete item.subData.id;
            delete item.subData.levelId;
            let ars=item.subData;
            ars.forEach(temp=>{
              temp.username = temp.levelName+' '+temp.username;
              delete temp.levelName;
              delete temp.realName;
              delete temp.id;
              delete temp.levelId;
            })
          });
          arr = JSON.stringify(arr);
          let arr2 = arr.replace(/username/g, 'label').replace(/subData/g, 'children');
          let arr3 = JSON.parse(arr2);
          that.dat.push(arr3);
          that.$bus.$emit('loading', false);
        }else{
          that.$bus.$emit('loading', false);
        }
      }).catch(err=>{
        that.$bus.$emit('loading', false);
        TostUtil.tostTop('网络出错,请稍后重试!')
      })
    },
  }
</script>
<style scoped>
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }
  .mine{
    width: 100%;
    background: #fff;
    padding: 10px 14px;
    box-sizing: border-box;
    border-bottom: 1px solid#eee;
    color: #666;
  }
  /* icon */
  .mylove-flex-view {
    width: 120px;
    height: 119px;
    background-image: url('./../../static/images/icon/love01/love-hos.png');
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .main-content-flex {
    width: 100%;
    height: auto;
    padding: 20px 0;
    padding-bottom: 0;
  }

  /* 2 */
  .color-view-flex {
    width: 86%;
    padding: 10px 7%;
    background: #984D4a;
    color: #fff;
    margin-top: 20px;
  }

  .border-right-flex {
    border-right: 1px solid #fff;
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

  .border-right-flex {
    border-right: 1px solid #fff;
  }

  .flex-1 {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    flex-wrap: wrap;
  }

  .flex-box-center {
    display: flex;
    align-items: center;
  }

  .column {
    display: flex;
    flex-direction: column;
  }
</style>
