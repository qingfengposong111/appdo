webpackJsonp([66],{"50Ou":function(t,a,e){var i=e("aV5T");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("rjj0")("6c36370d",i,!0,{})},B2k2:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("s0MJ"),s=e("buxQ"),o={data:function(){return{record:{}}},filters:{formatDate:function(t){var a=new Date(1e3*Number(t)),e=a.getFullYear(),i=a.getMonth()+1,s=a.getDate(),o=a.getHours(),d=a.getMinutes(),n=a.getSeconds();return e+"-"+(i=i<10?"0"+i:i)+"-"+(s=s<10?"0"+s:s)+" "+(o=o<10?"0"+o:o)+":"+(d=d<10?"0"+d:d)+":"+(n=n<10?"0"+n:n)}},created:function(){this.$bus.$emit("loading",!0);var t=this;i.a.ajax.getByForm("/api/payment/show",{params:{Id:t.$route.params.id,type:"order"}}).then(function(a){t.$bus.$emit("loading",!1),200===a.data.status?t.record=a.data.data:s.a.tostTop(a.data.message)}).catch(function(a){t.$bus.$emit("loading",!1),s.a.tostTop("网络出错,请稍后重试!")})},methods:{goBack:function(){this.$router.go("-1")}}},d={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"box"},[e("mt-header",{staticClass:"header",attrs:{title:"订单支付详情"}},[e("mt-button",{attrs:{slot:"left",icon:"back"},on:{click:t.goBack},slot:"left"},[t._v("返回")])],1),t._v(" "),e("div",{staticStyle:{width:"100%",height:"50px"}}),t._v(" "),e("div",{staticClass:"ul-main"},[e("ul",[e("li",[e("span",[t._v("会员名：")]),e("span",[t._v(t._s(t.record.username))])]),t._v(" "),e("li",[e("span",[t._v("支付时间：")]),e("span",[t._v(t._s(t._f("formatDate")(t.record.time)))])]),t._v(" "),e("li",[e("span",[t._v("订单状态:")]),t._v(" "),"wait"===t.record.status?e("span",[t._v("待确认")]):t._e(),t._v(" "),"yes"===t.record.status?e("span",[t._v("支付成功")]):t._e(),t._v(" "),"no"===t.record.status?e("span",[t._v("支付未通过")]):t._e()]),t._v(" "),e("li",[e("span",[t._v("支付凭证：")]),t._v(" "),e("div",{staticClass:"img"},[e("img",{attrs:{src:"http://api.wealth-point.com"+t.record.images,alt:""}})])])])])],1)},staticRenderFns:[]};var n=e("VU/8")(o,d,!1,function(t){e("50Ou")},"data-v-268df592",null);a.default=n.exports},aV5T:function(t,a,e){(t.exports=e("FZ+f")(!1)).push([t.i,"body[data-v-268df592],html[data-v-268df592]{width:100%;height:100%;position:relative;background:#fff!important}.header[data-v-268df592]{background:#5d0e13;height:50px!important;font-size:18px!important}.box[data-v-268df592]{width:100%;height:100%;background:#fff;-webkit-box-sizing:border-box;box-sizing:border-box}.ul-main[data-v-268df592]{padding:10px 20px;font-size:14px;color:#666}li[data-v-268df592],ul[data-v-268df592]{list-style:none}li[data-v-268df592]{padding:10px 0}li>span[data-v-268df592]:first-child{display:inline-block;width:100px}.img[data-v-268df592]{width:100%;height:100%;overflow:hidden;margin-top:10px}.img img[data-v-268df592]{width:100%;height:auto}",""])}});
//# sourceMappingURL=66.12ddcf48f242d6e15dcc.js.map