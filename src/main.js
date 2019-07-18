import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import Mint from 'mint-ui';
import ElementUI from 'element-ui';
import VueClipboard  from 'vue-clipboard2'
Vue.use( VueClipboard )
Vue.use(Mint);
Vue.use(ElementUI);
import '../static/css/wui.css'
import '../static/css/jwui.css'
import 'element-ui/lib/theme-chalk/index.css';
import 'mint-ui/lib/style.css';

import '../static/css/commont.css'
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$bus = new Vue;
axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.timeout = 10000; //请求超时
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Authorization'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEifQ.rpPLzNRB1nK_N_Ch7eSvJCpwFKwEWyNozS67RE6eaUU';
let wgtVer = null;
let u = navigator.userAgent;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
function plusReady() {
  plus.navigator.setStatusBarStyle('light');//设置状态栏字体颜色为白色
  plus.navigator.setStatusBarBackground('#5D0E13');//设置状态栏背景为此颜色
  plus.webview.currentWebview().setStyle({scrollIndicator:'none'});//去除滚动条
  plus.runtime.getProperty(plus.runtime.appid, function (inf) {
    wgtVer = inf.version;// 获取本地应用资源版本号
    checkUpdate();//进来之后就检查版本
  });
}
if (window.plus) {
  plusReady();
} else {
  document.addEventListener('plusready', plusReady, false);
}
// 检测更新
let checkUrl= "http://download.wealth-point.com/update/GetVersion.php";//版本号所在服务器位置
function checkUpdate() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    switch (xhr.readyState) {
      case 4:
        plus.nativeUI.closeWaiting();
        if (xhr.status === 200) {//如果有最新版本则提示有最新版本
          let newVer = xhr.responseText;
          if (wgtVer && newVer && (wgtVer !== newVer)) {//如果存在本地版本与新版本，并且两个版本不一样则下载新版本
              downWgt();  // 下载升级包
          }
        }
        break;
      default:
        break;
    }
  };
  xhr.open('GET', checkUrl);
  xhr.send();
}
// 下载wgt文件
let wgtUrl=null;
function downWgt() {
  if(isAndroid){
    wgtUrl = "http://download.wealth-point.com/update/apk.wgt";//存在服务器上的wgt文件，提供给用户来下载所对就的安装包http://download.wealth-point.com/H59B47E00.wgt
    plus.downloader.createDownload(wgtUrl, {filename: "_doc/update/"}, function (d, status) {//更新所用的安装包所在的地址
      if (status === 200) {
        plus.nativeUI.confirm("-优化了用户体验\n-增加了新的功能",function(){
          installWgt(d.filename); // 安装wgt包
        }, "Wealth Point新版本发布！");
      }
      plus.nativeUI.closeWaiting();
    }).start();
  }else if(isiOS){
    wgtUrl = "http://download.wealth-point.com/update/ios.wgt";
    plus.downloader.createDownload(wgtUrl, {filename: "_doc/update/"}, function (d, status) {//更新所用的安装包所在的地址
      if (status === 200) {
        plus.nativeUI.confirm("-优化了用户体验\n-增加了新的功能",function(){
          installWgt(d.filename); // 安装wgt包
        }, "Wealth Point新版本发布！");
      }
      plus.nativeUI.closeWaiting();
    }).start();
  }
}
// 更新应用资源
function installWgt(path) {
  plus.nativeUI.showWaiting("安装文件...");
  plus.runtime.install(path, {force: true}, function () {
    plus.nativeUI.closeWaiting();
    plus.nativeUI.alert("应用资源更新完成！", function () {
      plus.runtime.restart();//应用重新运行
    });
  }, function (e) {
    plus.nativeUI.closeWaiting();
    plus.nativeUI.alert("安装失败");
  });
}
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
axios.interceptors.request.use(//请求拦截器
  config => {
    /* console.log(config)*/
    if (localStorage.getItem('sessionid')) {  // 判断是否存在sessionId，如果存在的话，则每个http header都加上sessionId
      config.headers.common['sessionid'] = `${localStorage.getItem('sessionid')}`;
    } else if (config.url.indexOf('/api/register/sms') >= 0 || config.url.indexOf('/api/news') >= 0 || config.url.indexOf('/api/login') >= 0 ||config.url.indexOf('/auth/token')>=0) {//发送验证码与登陆不需要添加sessionid
    } else {
      router.replace({
        path: '/Login',
        query: {redirect: router.currentRoute.fullPath}
      })
    }
    if (new Date().getTime() - localStorage.time > (1000 * 60 * 60 * 24 * 7)) {
      alert('登陆已过期，请重新登陆！');
      localStorage.clear();
      router.replace({
        path: '/Login',
        query: {redirect: router.currentRoute.fullPath}
      });
    }
    return config;
  },
  err => {
    /* alert(err);
     router.replace({
     path: '/Login',
     query: {redirect: router.currentRoute.fullPath}
     });
     return Promise.reject(err);*/
  });
//响应拦截器
axios.interceptors.response.use(function (res) {
  if(res.status===200){
    if(res.headers.version!==''){
      localStorage.setItem('version',res.headers.version)
    }
  }
  return res;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});


