webpackJsonp([43],{"78W+":function(t,e,i){var a=i("JLao");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("2348e648",a,!0,{})},JLao:function(t,e,i){var a=i("kxFB");(t.exports=i("FZ+f")(!1)).push([t.i,".header[data-v-624c69fa]{background:#5d0e13;height:50px!important;font-size:18px!important;position:fixed;width:100%;z-index:1900}.main-icon-flex[data-v-624c69fa]{width:86%;height:auto;padding:0 7%}.right-common-flex[data-v-624c69fa]{width:15px;height:15px;background-image:url("+a(i("Qpe5"))+");background-repeat:no-repeat;background-position:50%;background-size:contain}.common-flex-view-setting[data-v-624c69fa]{width:100%;height:auto;border-bottom:1px solid #e6e6e6;position:relative;padding:15px 0}.font-name-title[data-v-624c69fa]{margin-left:10px;font-size:14px}.had-right-common[data-v-624c69fa]{position:absolute;right:0;top:20px}.right-title-view[data-v-624c69fa]{position:absolute;right:0;width:30px;height:30px;border-radius:50%;background-repeat:no-repeat;background-position:50%;background-size:contain}.right-title-view span[data-v-624c69fa]{position:absolute;right:10%;top:5px}.person-name-clone[data-v-624c69fa]{margin-top:-3px;margin-right:5px;font-size:13px}.two-btn-flex[data-v-624c69fa]{width:100%;height:auto;padding:30px 0}.drop-btn-flex[data-v-624c69fa]{background:#5d0e13;color:#ecc489;margin-right:10%}.drop-btn-flex[data-v-624c69fa],.inspect-btn-flex[data-v-624c69fa]{width:45%;height:20px;text-align:center;line-height:20px;border:1px solid #5d0e13;font-size:13px;padding:7px 0;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-left-radius:5px;border-bottom-right-radius:5px}.inspect-btn-flex[data-v-624c69fa]{background:transparent;color:#5d0e13}.popup-this[data-v-624c69fa]{width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.3)}.update-clone-flex[data-v-624c69fa]{width:60%;height:auto;background:#5d0e13;position:absolute;left:20%;top:30%;border-radius:5px;text-align:center}.update-title-view[data-v-624c69fa]{color:#fff;font-size:20px;padding:10px 0}.version-flex-view[data-v-624c69fa]{color:#fff;font-size:13px;padding:10px 0}.update-btn-view[data-v-624c69fa]{width:100%;border-top:1px solid #fff;padding:10px 0}.save-btn-view[data-v-624c69fa]{width:60px;margin:0 auto;font-size:13px;background:#f1ca8f;color:#5d0e13;padding:5px 20px;border-radius:5px}.flex-box-center[data-v-624c69fa]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.row[data-v-624c69fa]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.icon-view-common[data-v-624c69fa]{width:15px;height:15px;background-repeat:no-repeat;background-position:50%;background-size:contain}",""])},XiTZ:function(t,e,i){"use strict";function a(t){return("00"+t).substr(t.length)}Object.defineProperty(e,"__esModule",{value:!0});var n={data:function(){return{levelName:JSON.parse(localStorage.loginInfo).levelName||"A0",display:!1,value:new Date,visible:!1,startDate:new Date("1900-01-01"),endDate:new Date("3019-01-01"),val:"",phone:"",userName:"",realName:"",renew:!0}},filters:{formatDate:function(t){return function(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var i={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var n in i)if(new RegExp("("+n+")").test(e)){var o=i[n]+"";e=e.replace(RegExp.$1,1===RegExp.$1.length?o:a(o))}return e}(new Date(t),"yyyy-MM-dd")}},created:function(){this.$bus.$emit("loading",!0);var t=this;setTimeout(function(){t.$bus.$emit("loading",!1)},600),localStorage.loginInfo?(this.levelId=JSON.parse(localStorage.loginInfo).levelId,this.phone=JSON.parse(localStorage.loginInfo).phone,this.userName=JSON.parse(localStorage.loginInfo).username,this.realName=JSON.parse(localStorage.loginInfo).realName):(this.levelId=1,this.phone="",this.userName="",this.realName="")},methods:{toCheck:function(){var t=this;if(t.renew){var e=function(){plus.runtime.getProperty(plus.runtime.appid,function(t){o=t.version,i()})},i=function(){var e=new XMLHttpRequest;e.onreadystatechange=function(){switch(e.readyState){case 4:if(plus.nativeUI.closeWaiting(),200===e.status){var i=e.responseText;o&&i&&o!==i?plus.nativeUI.confirm("-优化了用户体验\n-增加了新的功能",function(){t.renew=!1,a()},"Wealth Point新版本发布！"):(plus.nativeUI.confirm("已是最新版本！"),t.renew=!0)}else plus.nativeUI.confirm("检测更新失败！")}},e.open("GET",l),e.send()},a=function(){c?(d="http://download.wealth-point.com/update/apk.wgt",plus.downloader.createDownload(d,{filename:"_doc/update/"},function(t,e){200===e?n(t.filename):plus.nativeUI.confirm("下载失败！"),plus.nativeUI.closeWaiting()}).start()):r&&(d="http://download.wealth-point.com/update/ios.wgt",plus.downloader.createDownload(d,{filename:"_doc/update/"},function(t,e){200===e?n(t.filename):plus.nativeUI.confirm("下载失败！"),plus.nativeUI.closeWaiting()}).start())},n=function(e){plus.nativeUI.showWaiting("安装文件..."),plus.runtime.install(e,{force:!0},function(){plus.nativeUI.closeWaiting(),plus.nativeUI.alert("应用资源更新完成！",function(){t.renew=!0,plus.runtime.restart()})},function(t){plus.nativeUI.closeWaiting(),console.log("安装失败"),plus.nativeUI.alert("安装失败")})};t.renew=!1;var o=null,s=navigator.userAgent,c=s.indexOf("Android")>-1||s.indexOf("Adr")>-1,r=!!s.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);window.plus?e():document.addEventListener("plusready",e,!1);var l="http://download.wealth-point.com/update/GetVersion.php",d=null}},toLogin:function(){localStorage.clear(),this.$router.push("/Login")},toTrueName:function(){this.$router.push("/TrueName")},toCheckPhone:function(){this.$router.push("/CheckPhone")},toNikName:function(){this.$router.push("/NickName")},toSignature:function(){this.$router.push("/Signature")},toBankCard:function(){this.$router.push("/BankCard")},toAlipayCard:function(){this.$router.push("/AliPayCard")},toUpdatePwd:function(){this.$router.push("/UpdatePwd")},toCodePay:function(){this.$router.push("/CodePay")},goBack:function(){this.$router.go("-1")},open:function(t){this.$refs[t].open()}}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("mt-header",{staticClass:"header",attrs:{title:"账户设置"}},[i("mt-button",{attrs:{slot:"left",icon:"back"},on:{click:t.goBack},slot:"left"},[t._v("返回")])],1),t._v(" "),i("div",{staticStyle:{width:"100%",height:"50px"}}),t._v(" "),i("div",{staticClass:"main-icon-flex"},[i("div",{staticClass:"footprint"}),t._v(" "),t._m(0),t._v(" "),i("div",{staticClass:"common-flex-view-setting row flex-box-center"},[i("div",{staticClass:"icon-view-common",staticStyle:{"background-image":"url('static/images/icon/setting/icon02.png')"}}),t._v(" "),i("div",{staticClass:"font-name-title"},[t._v("用户名")]),t._v(" "),i("div",{staticClass:"right-title-view"},[i("span",{staticStyle:{"font-size":"13px"}},[t._v(t._s(t.userName))])])]),t._v(" "),i("div",{staticClass:"common-flex-view-setting row flex-box-center",on:{click:t.toTrueName}},[i("div",{staticClass:"icon-view-common",staticStyle:{"background-image":"url('static/images/icon/setting/icon03.png')"}}),t._v(" "),i("div",{staticClass:"font-name-title"},[t._v("真实姓名")]),t._v(" "),i("div",{staticClass:"had-right-common row"},[i("div",{staticClass:"person-name-clone"},[t._v(t._s(t.realName))]),t._v(" "),i("div",{staticClass:"right-common-flex"})])]),t._v(" "),i("div",{staticClass:"common-flex-view-setting row flex-box-center"},[i("div",{staticClass:"icon-view-common",staticStyle:{"background-image":"url('static/images/icon/setting/icon04.png')"}}),t._v(" "),i("div",{staticClass:"font-name-title"},[t._v("生日")]),t._v(" "),i("div",{staticClass:"had-right-common row"},[i("div",{staticClass:"person-name-clone birth-date-flex"},[i("mt-button",{attrs:{size:"large"},nativeOn:{click:function(e){return t.open("picker")}}},[t._v(t._s(t._f("formatDate")(t.value)))])],1),t._v(" "),i("div",{staticClass:"right-common-flex"})])]),t._v(" "),i("div",{staticClass:"common-flex-view-setting row flex-box-center",on:{click:t.toCheckPhone}},[i("div",{staticClass:"icon-view-common",staticStyle:{"background-image":"url('static/images/icon/setting/icon05.png')"}}),t._v(" "),i("div",{staticClass:"font-name-title"},[t._v("手机号")]),t._v(" "),i("div",{staticClass:"had-right-common row"},[i("div",{staticClass:"person-name-clone"},[t._v(t._s(t.phone))]),t._v(" "),i("div",{staticClass:"right-common-flex"})])]),t._v(" "),i("div",{staticClass:"common-flex-view-setting row flex-box-center"},[i("div",{staticClass:"icon-view-common",staticStyle:{"background-image":"url('static/images/icon/setting/icon06.png')"}}),t._v(" "),i("div",{staticClass:"font-name-title"},[t._v("会员级别")]),t._v(" "),i("div",{staticClass:"right-title-view"},[i("span",{staticStyle:{"font-size":"13px"}},[t._v(t._s(t.levelName))])])]),t._v(" "),i("div",{staticClass:"common-flex-view-setting row flex-box-center",on:{click:t.toNikName}},[i("div",{staticClass:"icon-view-common",staticStyle:{"background-image":"url('static/images/icon/setting/icon07.png')"}}),t._v(" "),i("div",{staticClass:"font-name-title"},[t._v("昵称")]),t._v(" "),t._m(1)]),t._v(" "),i("div",{staticClass:"common-flex-view-setting row flex-box-center",on:{click:t.toSignature}},[i("div",{staticClass:"icon-view-common",staticStyle:{"background-image":"url('static/images/icon/setting/icon08.png')"}}),t._v(" "),i("div",{staticClass:"font-name-title"},[t._v("个性签名")]),t._v(" "),t._m(2)]),t._v(" "),i("div",{staticClass:"common-flex-view-setting row flex-box-center",on:{click:t.toBankCard}},[i("div",{staticClass:"icon-view-common",staticStyle:{"background-image":"url('static/images/icon/setting/icon09.png')"}}),t._v(" "),i("div",{staticClass:"font-name-title"},[t._v("我的银行账户")]),t._v(" "),t._m(3)]),t._v(" "),i("div",{staticClass:"common-flex-view-setting row flex-box-center",on:{click:t.toAlipayCard}},[i("div",{staticClass:"icon-view-common",staticStyle:{"background-image":"url('static/images/icon/setting/icon10.png')"}}),t._v(" "),i("div",{staticClass:"font-name-title"},[t._v("支付宝管理")]),t._v(" "),t._m(4)]),t._v(" "),i("div",{staticClass:"common-flex-view-setting row flex-box-center",on:{click:t.toCodePay}},[i("div",{staticClass:"icon-view-common",staticStyle:{"background-image":"url('static/images/icon/setting/erweima.png')"}}),t._v(" "),i("div",{staticClass:"font-name-title"},[t._v("二维码收款")]),t._v(" "),t._m(5)]),t._v(" "),i("div",{staticClass:"common-flex-view-setting row flex-box-center",on:{click:t.toUpdatePwd}},[i("div",{staticClass:"icon-view-common",staticStyle:{"background-image":"url('static/images/icon/setting/icon11.png')"}}),t._v(" "),i("div",{staticClass:"font-name-title"},[t._v("密码管理")]),t._v(" "),t._m(6)]),t._v(" "),i("div",{staticClass:"two-btn-flex row"},[i("div",{staticClass:"drop-btn-flex",on:{click:t.toLogin}},[t._v("登出")]),t._v(" "),i("div",{staticClass:"inspect-btn-flex",on:{click:function(e){return t.toCheck()}}},[t._v(" 检查更新")])]),t._v(" "),i("div",{staticClass:"footprint"})]),t._v(" "),i("mt-datetime-picker",{ref:"picker",staticClass:"picker_show",attrs:{type:"date",startDate:t.startDate,endDate:t.endDate},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"common-flex-view-setting row flex-box-center"},[e("div",{staticClass:"icon-view-common",staticStyle:{"background-image":"url('static/images/icon/setting/icon01.png')"}}),this._v(" "),e("div",{staticClass:"font-name-title"},[this._v("头像")]),this._v(" "),e("div",{staticClass:"right-title-view",staticStyle:{"background-image":"url('static/images/icon/setting/head.png')"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"had-right-common row"},[e("div",{staticClass:"person-name-clone"}),this._v(" "),e("div",{staticClass:"right-common-flex"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"had-right-common row"},[e("div",{staticClass:"right-common-flex"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"had-right-common row"},[e("div",{staticClass:"right-common-flex"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"had-right-common row"},[e("div",{staticClass:"right-common-flex"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"had-right-common row"},[e("div",{staticClass:"right-common-flex"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"had-right-common row"},[e("div",{staticClass:"right-common-flex"})])}]};var s=i("VU/8")(n,o,!1,function(t){i("78W+")},"data-v-624c69fa",null);e.default=s.exports}});
//# sourceMappingURL=43.c5084833a4f7b39f9706.js.map