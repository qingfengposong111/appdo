<template>
  <div style="position: relative; width: 100%;height: 100%;">
    <!--<div style="width: 100%;height: 20px;background: #5D0E13;position:fixed;top:0;left:0;z-index:999998!important;"></div>-->
    <mt-header title="推广二维码" class="header">
      <mt-button @click="goBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <!-- 占位 -->
    <div style="width: 100%;height: 50px;"></div>
    <!--<div class="main">
      <div class="qrcodeContent">
        &lt;!&ndash;二维码&ndash;&gt;
        <div class="qrcodeCanvas">
          <img class="imgBox" src="static/images/icon/tgewm/1_03.png" v-show="had"/>
          <img class="imgCode" ref="imgCode" src="static/images/icon/tgewm/footer01.png" v-show="had"/>
          <div ref="code" id="qrcodeCanvas"></div>
        </div>
      </div>
    </div>-->
    <div class="main-comment-flex column flex-justify-center">
      <div class="none-icon-flex"></div>
      <div class="font13">暂无数据</div>
    </div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        had: false,
        arr: [{
          times: '2019-03-21',
          name: '承租',
          score: 1
        }]
      }
    },
    methods: {
      goBack(){
        this.$router.go('-1')
      },
    },
   /* created() {
      this.$bus.$emit('loading', true);
      let that =this;
      setTimeout(function(){
        that.$bus.$emit('loading', false);
      },600);
      // 此处发起ajax或者axios请求，获取海报背景与二维码
      //生成画布
      hecheng();
      function hecheng() {
        draw(function () {
          if (base64[0]) {
            that.had = false;
            document.getElementById('qrcodeCanvas').innerHTML =
              '<img src="' + base64[0] + '">';
          } else {
            that.had = true;
          }
        })
      }
      let base64 = [];
      function draw(fn) {
        let imgArr = [
          'http://ku.90sjimg.com/back_pic/05/11/09/76598fe8b036fe2.jpg%21/fwfh/804x1206/quality/90/unsharp/true/compress/true/watermark/text/OTDorr7orqE=/font/simkai/align/southeast/opacity/20/size/50',
          'static/images/icon/djsc/phoneCard.png'
        ]; //此处一定要使用远端地址，不能是本地图片
        let c = document.createElement('canvas'),
          ctx = c.getContext('2d'),
          len = imgArr.length;
        setTimeout(function () {
          c.width = that.$refs.code.offsetWidth;
          c.height = that.$refs.code.offsetHeight;
          ctx.rect(0, 0, c.width, c.height);
          ctx.fillStyle = '#ccc';
          ctx.fill();
          function drawing(n) {
            if (n < len) {
              let img = new Image;
              img.setAttribute("crossOrigin", 'Anonymous');
              img.src = imgArr[n];
              img.onload = function () {
                if (n == 1) {
                  ctx.drawImage(img, c.width - 75, 425, 60, 60);
                  drawing(n + 1);
                } else {
                  ctx.drawImage(img, 0, 0, c.width, c.height);
                  drawing(n + 1);
                }
              }
            } else {
              base64.push(c.toDataURL("image/jpeg", 0.8));
              fn();
            }
          }
          drawing(0);
        }, 300)
      }


    }*/
   created(){
     this.$bus.$emit('loading', true);
     let that =this;
     setTimeout(function(){
       that.$bus.$emit('loading', false);
     },600);
   }
  }
</script>
<style scoped>
  .header {
    background: #5D0E13;
    height: 50px !important;
    font-size: 18px !important;
  }

  /* 单独控制文字颜色 */
  .color-clone {
    color: #5D0E13;
  }

  /* main */
  body,
  html {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .imgBox {
    width: 100%;
    height: 100%;
  }

  .imgCode {
    width: 60px;
    height: 60px;
    position: absolute;
    bottom: 14px;
    right: 3%;
  }

  .qrcodeCanvas {
    width: 100%;
    margin: 0 auto;
    height: 500px;
    position: relative;
  }

  #qrcodeCanvas {
    height: 100%
  }

  #qrcodeCanvas > img {
    width: 100% !important;
    height: 100%;
  }



  .font13 {
    font-size: 14px !important;
    margin-top: 10px;
    color: #666;
  }

  /* main */
  .main-comment-flex {
    width: 100%;
    height: 80%;

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

  /* 没有数据的情况 */
  .none-icon-flex {
    width: 100px;
    height: 100px;
    background-image: url('./../../static/images/icon/djsc/none.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
</style>
