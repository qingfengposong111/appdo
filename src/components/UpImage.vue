<template>
  <div @click.stop = "addPic" ref = "upload">
    <input type = "file"
           accept = "image/jpg,image/png,image/jpeg,image/gif"
           @change = "onFileChange"
           style = "display: none">
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui'//加载状态动画
  import lrz from 'lrz'//压缩库，需要通过 npm 安装下

  export default {
    name: 'UploadImg',
    data () {
      return {
        imgUrl: '',
      }
    },
    methods: {
      addPic () {
        let els = this.$refs.upload.querySelectorAll('input[type=file]')
        els[0].click()
        return false
      },
      onFileChange (e) {
        //获取图片文件
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        this.createImage(files, e)
      },
      createImage (file, e) {
        this.imgUrl = ''
        Indicator.open()

        lrz(file[0], {width: 77,height:77}).then((rst) => {
          this.imgUrl = rst.base64
          //在将图片压缩成功后，将信息传出去
          this.$emit('imgUrl', this.imgUrl)
        }).always(() => {
          //每次压缩完之后要将input内容清空，不然会出现传出去的内容不对的bug
          e.target.value = null
          this.imgUrl = ''
          Indicator.close()
        })
      },
    },
  }
</script>
