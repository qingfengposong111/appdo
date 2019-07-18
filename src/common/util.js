import axios from 'axios'
const Util ={
  ajax:{
    /*checkGetAuth:function(success,fail){
      //判断是否就是获得Auth
      if(!axios.defaults.headers.common['Authorization']){
        //这里可以这样用
        Util.ajax.post('/auth/token',{
          username:'admin',
          password:'admin'
        }).then(res=>{
          axios.defaults.headers.common['Authorization']=res.data.token;
          localStorage.setItem("Authorization",res.data.token);
          if(success){
            success();
          }
        }).catch(()=>{
          if(fail){
            fail();
          }
        })
      }else{
        if(success){
          success();
        }
      };
    },*/
    postForm: function(url,param){//post请求form-data
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      };  //添加请求头
      return axios.post(url+"?t="+Date.now(),param,config)
    },
    post: function(url,data,headers){//post请求
      return axios({
        method:"post",
        url:url+"?t="+Date.now(),
        headers:{
          'Content-type': 'application/x-www-form-urlencoded',
          ...headers
        },
        data:data,
        transformRequest: [function (data) {
          let ret = '';
          for (let item in data) {
            ret += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&'
          }
          return ret
        }],
      });
    },
    getByForm: function(url,cfg={},headers){//get请求
      return axios({
        method:"get",
        url:url,
        headers:{
          'Content-type': 'application/x-www-form-urlencoded',
          ...headers
        },
        data: cfg.data,
        params: Object.assign({
          t:Date.now(),
        },cfg.params),
      });
    }
  }
};
export  default  Util;
