webpackJsonp([58],{"0edc":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("s0MJ"),a=s("buxQ"),n={data:function(){return{obj:{},id:""}},filters:{formatDate:function(t){var e=new Date(1e3*Number(t)),s=e.getFullYear(),i=e.getMonth()+1,a=e.getDate(),n=e.getHours(),l=e.getMinutes(),o=e.getSeconds();return s+"-"+(i=i<10?"0"+i:i)+"-"+(a=a<10?"0"+a:a)+" "+(n=n<10?"0"+n:n)+":"+(l=l<10?"0"+l:l)+":"+(o=o<10?"0"+o:o)}},methods:{goBack:function(){this.$router.go("-1")},info:function(){var t=this;i.a.ajax.getByForm("/api/order/show",{params:{Id:Number(this.$route.params.id),type:"sell"}}).then(function(e){200===e.data.status?(t.obj=e.data.data,t.$bus.$emit("loading",!1)):t.$bus.$emit("loading",!1)}).catch(function(e){a.a.tostTop(e.response.message),t.$bus.$emit("loading",!1)})}},created:function(){this.$bus.$emit("loading",!0);this.info()}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("mt-header",{staticClass:"header",attrs:{title:"AP详情"}},[s("mt-button",{attrs:{slot:"left",icon:"back"},on:{click:t.goBack},slot:"left"},[t._v("返回")])],1),t._v(" "),s("div",{staticStyle:{width:"100%",height:"50px"}}),t._v(" "),s("div",{staticClass:"main-content-flex"},[s("div",{staticClass:"flex-box title-name-flex"},[s("div",{staticClass:"flex-1"},[t._v("退租")]),t._v(" "),s("div",{staticClass:"flex-1 flex-right flex-box-center"},[s("span",{staticClass:"one-span-flex"},[t._v(t._s(t.obj.number))]),t._v(" "),s("span",{staticClass:"two-span-flex"},[t._v("AP")])])]),t._v(" "),s("div",{staticClass:"flex-box font13 common-flex-view-this"},[s("div",{staticClass:"flex-1"},[t._v("订单编号")]),t._v(" "),s("div",{staticClass:"flex-1 flex-right"},[t._v("\n        "+t._s(t.obj.orderId)+"\n\n      ")])]),t._v(" "),s("div",{staticClass:"flex-box font13 common-flex-view-this"},[s("div",{staticClass:"flex-1"},[t._v("AP数量")]),t._v(" "),s("div",{staticClass:"flex-1 flex-right"},[t._v("\n        "+t._s(t.obj.number)+"\n\n      ")])]),t._v(" "),s("div",{staticClass:"flex-box font13 common-flex-view-this"},[s("div",{staticClass:"flex-1"},[t._v("下单时间")]),t._v(" "),s("div",{staticClass:"flex-1 flex-right"},[t._v("\n        "+t._s(t._f("formatDate")(t.obj.time))+"\n\n      ")])]),t._v(" "),s("div",{staticClass:"flex-box font13 common-flex-view-this"},[s("div",{staticClass:"flex-1"},[t._v("匹配时间")]),t._v(" "),s("div",{staticClass:"flex-1 flex-right"},[t._v("\n        "+t._s(t._f("formatDate")(t.obj.matchTime))+"\n\n      ")])]),t._v(" "),s("div",{staticClass:"flex-box font13 common-flex-view-this"},[s("div",{staticClass:"flex-1"},[t._v("收款时间")]),t._v(" "),s("div",{staticClass:"flex-1 flex-right"},[t._v("\n        "+t._s(t._f("formatDate")(t.obj.payTime))+"\n\n      ")])]),t._v(" "),s("div",{staticClass:"flex-box font13 common-flex-view-this"},[s("div",{staticClass:"flex-1"},[t._v("完成时间")]),t._v(" "),s("div",{staticClass:"flex-1 flex-right"},[t._v("\n        "+t._s(t._f("formatDate")(t.obj.finishTime))+"\n\n      ")])]),t._v(" "),s("div",{staticClass:"flex-box font13 common-flex-view-this"},[s("div",{staticClass:"flex-1"},[t._v("打款者")]),t._v(" "),s("div",{staticClass:"flex-1 flex-right"},[t._v("\n        "+t._s(t.obj.buyerUsername)+"\n\n      ")])]),t._v(" "),t._m(0)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"flex-box font13 common-flex-view-this"},[e("div",{staticClass:"flex-1"},[this._v("获得评分")]),this._v(" "),e("div",{staticClass:"flex-1 flex-right"},[this._v("\n        +5\n      ")])])}]};var o=s("VU/8")(n,l,!1,function(t){s("BY3L")},"data-v-3c002206",null);e.default=o.exports},BY3L:function(t,e,s){var i=s("HIpc");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);s("rjj0")("5f7188c5",i,!0,{})},HIpc:function(t,e,s){(t.exports=s("FZ+f")(!1)).push([t.i,".header[data-v-3c002206]{background:#5d0e13;height:50px!important;font-size:18px!important}body[data-v-3c002206],html[data-v-3c002206]{overflow:hidden}.flex-box[data-v-3c002206]{display:-webkit-box;display:-ms-flexbox;display:flex}.font13[data-v-3c002206]{font-size:14px!important}.main-content-flex[data-v-3c002206]{width:100%;height:auto;background:#fff}.title-name-flex[data-v-3c002206]{padding:15px 7%;width:86%;border-bottom:1px solid #efefef;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.one-span-flex[data-v-3c002206]{font-weight:700;font-size:20px!important}.two-span-flex[data-v-3c002206]{font-size:10px!important;margin-top:7px}.common-flex-view-this[data-v-3c002206]{padding:10px 7%;width:86%;color:#666;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.color-red-this[data-v-3c002206]{color:red}",""])}});
//# sourceMappingURL=58.e9ac25d6a1a82086035e.js.map