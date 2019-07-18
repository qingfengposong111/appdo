<template>
  <div>
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header :title="title+'收益'" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <!-- main -->
    <!--<div class="main">
      &lt;!&ndash; 自定义头部 &ndash;&gt;
      <div class="top-zd-flex row font13">
        <div class="common-flex-week" :class="choose == index?'color-clone':''" @click="toClick(index,item.name)"
             v-for="(item,index) in arr">
          {{item.name}}
        </div>
      </div>
      <div id="main" ref="mains"></div>
    </div>-->
    <div class="weui-tab__bd-item" >
      <div class="none-flex-view flex-justify-center column">
        <div class="none-icon-flex"></div>
        <div class="font13" style="color: #666;">暂无数据</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        choose: 0,
        title: '本周',
        arr: [
          {name: '本周'},
          {name: '上周'},
          {name: '本月'},
          {name: '上月'},
        ],
        xCoordinatesList: [],//X轴坐标值
        max: 1,
        min: 0,
        flag: false,
        space:0
      }
    },
    created(){
      this.$bus.$emit('loading', true);
      let that = this;
      setTimeout(function () {
        that.$bus.$emit('loading', false);
      }, 600);
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      /*mins(data){//数组 最小值
        return parseInt(data.sort((a, b) => {
            return a - b;
          })[0]) - 100;
      },
      maxs(data){//数组最大值
        return parseInt(data.sort((a, b) => {
            return b - a;
          })[0]) + 1000;
      },
      toClick (num, name) {
        this.choose = num;
        this.title = name;
        let data;
        if (num == 0) {
          data = [47800, 13200, 30100, 53400, 29000, 133000, 100020];
        } else if (num == 1) {
          data = [30000, 53002, 70001, 83004, 100090, 10020, 150020];
        } else if (num == 2) {
          data = [90034, 100090, 123000, 152000];
        } else if (num == 3) {
          data = [10004, 119000, 120030, 140020];
        }
        if (num > 1) {
          this.xCoordinatesList = ['第一周', '第二周', '第三周', '第四周'];
        } else {
          this.xCoordinatesList = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
        }
        let arr = [];
        data.forEach(item => {
          arr.push(parseFloat(item / 1000).toFixed(2));
        });
        this.max=Math.ceil(Math.max.apply(null, arr))+10;
        this.min=Math.floor(Math.min.apply(null, arr));
        this.space=parseInt(parseInt(this.max)/5);
        this.echart(arr)
      },
      echart (data) {
        let es = this.$echarts.init(this.$refs.mains);
        let option = {
          title: {
            text: '单位：(k)', left: '5px',top:'30px', textStyle: {
              fontWeight: 'normal',
              fontSize: 12
            }
          },
          backgroundColor: '#fff',
          xAxis: {
            type: 'category',
            data: this.xCoordinatesList
          },
          yAxis: {
            type: 'value',
            min: 0,
            max: this.max,
            axisLabel: {
              formatter: this.flag
            },
            interval: this.space
          },
          series: [{
            name: '上周收益',
            data: data,
            type: 'line',
            symbol: 'circle',
            // 设置为光滑曲线
            smooth: true
          }]
        };
        es.setOption(option)
      }*/
    },
    /*mounted (){
      let that = this;
      that.choose = that.$route.params.nums;
      that.title = that.$route.params.title;
      let data;
      if (that.$route.params.nums === '0') {
        this.xCoordinatesList = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
        data = [47800, 93200, 90001, 93400, 129000, 133000, 132000];

      } else if (that.$route.params.nums === '1') {
        this.xCoordinatesList = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
        data = [30000, 53200, 701, 83400, 109000, 123000, 152000];

      } else if (that.$route.params.nums === '2') {
        this.xCoordinatesList = ['第一周', '第二周', '第三周', '第四周'];
        data = [93400, 109000, 123000, 152000];

      } else if (that.$route.params.nums === '3') {
        this.xCoordinatesList = ['第一周', '第二周', '第三周', '第四周'];
        data = [10400, 119000, 123000, 142000];
      }
      let arr = [];
      data.forEach(item => {
        arr.push(parseFloat(item / 1000).toFixed(2));
      });
      that.max=Math.ceil(Math.max.apply(null, arr))+10;
      that.min=Math.floor(Math.min.apply(null, arr));
      that.space=parseInt(parseInt(that.max)/5);
      that.echart(arr);
    }*/
  }
</script>
<style scoped>
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  .font13 {
    font-size: 14px !important;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  /* main */
  .main {
    width: 100%;
    height: auto;
    background: #fff;
    position: relative;
  }

  #main {
    width: 100%;
    padding:0 3%;
    box-sizing:border-box;
    height: 250px;
  }

  .color-clone {
    color: #5D0E13;
  }

  .top-zd-flex {
    width: auto;
    background: #fff;
    position: absolute;
    right: 10%;
    top: 10px;
    z-index: 9999;
    border: 1px solid #4c4c4c;
    border-radius: 5px;
    padding: 0 5px;
  }

  .common-flex-week {
    padding: 5px;
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
