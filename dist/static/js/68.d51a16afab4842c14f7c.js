webpackJsonp([68],{"1Xw1":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o=e("buxQ"),i=e("s0MJ"),s=(e("HPco"),e("Au9i")),d={data:function(){return{text:"",img:"",obj:{}}},methods:{goBack:function(){this.$router.go("-1")},handleDelete:function(){var t=this;s.MessageBox.confirm("确认删除此二维码？","删除提示").then(function(a){i.a.ajax.getByForm("/api/qrcode/delete",{params:{Id:t.$route.params.id}}).then(function(a){200===a.data.status&&(o.a.tostTop(a.data.message),t.$router.go("-1"))})}).catch(function(t){o.a.tostTop("网络出错,请稍后重试!")})}},created:function(){var t=this;i.a.ajax.getByForm("/api/qrcode/show",{params:{Id:t.$route.params.id}}).then(function(a){var e=a.data.data;t.obj=a.data.data,"alipay"===e.type&&(t.text="支付宝"),"wechat"===e.type&&(t.text="微信"),t.img="http://api.wealth-point.com/"+e.images}).catch(function(a){t.$bus.$emit("loading",!1),o.a.tostTop("网络出错,请稍后再试!")})}},r={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("mt-header",{staticClass:"header",attrs:{title:"二维码详情"}},[e("mt-button",{attrs:{slot:"left",icon:"back"},on:{click:t.goBack},slot:"left"},[t._v("返回")]),t._v(" "),e("mt-button",{staticClass:"single",attrs:{slot:"right"},on:{click:t.handleDelete},slot:"right"},[t._v("删除")])],1),t._v(" "),e("div",{staticStyle:{width:"100%",height:"50px"}}),t._v(" "),t.obj!=={}?e("div",{staticClass:"had-card column"},[e("div",{staticClass:"bg-pay-code-wx flex-justify-center column",class:"alipay"===t.obj.type?"aplay-pay-color":""},[e("div",{staticClass:"wx-img-code"},[e("img",{attrs:{src:t.img,alt:""}})]),t._v(" "),"alipay"===t.obj.type&&"yes"===t.obj.status?e("div",[t._v("支付宝二维码")]):t._e(),t._v(" "),"wechat"===t.obj.type&&"yes"===t.obj.status?e("div",[t._v("微信二维码")]):t._e(),t._v(" "),"no"===t.obj.status?e("div",[t._v("已停用")]):t._e()])]):t._e()],1)},staticRenderFns:[]};var n=e("VU/8")(d,r,!1,function(t){e("vdcZ")},"data-v-22ef5141",null);a.default=n.exports},g0qA:function(t,a,e){(t.exports=e("FZ+f")(!1)).push([t.i,".header[data-v-22ef5141]{background:#5d0e13;height:50px!important;font-size:18px!important;position:fixed;width:100%;z-index:1900}.had-card[data-v-22ef5141]{width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;height:auto;margin:0 auto;margin-top:20px;overflow:hidden}.bg-pay-code-wx[data-v-22ef5141]{width:280px;height:380px;background:#00ad47;border-radius:5px;color:#fff;padding:10px;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0 auto 10px;text-align:center}.bg-pay-code-wx img[data-v-22ef5141]{width:100%;height:100%}.aplay-pay-color[data-v-22ef5141]{background:#0da1e6}.wx-img-code[data-v-22ef5141]{width:250px;height:330px;margin:0 auto 5px}",""])},vdcZ:function(t,a,e){var o=e("g0qA");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e("rjj0")("29cb7eaa",o,!0,{})}});
//# sourceMappingURL=68.d51a16afab4842c14f7c.js.map