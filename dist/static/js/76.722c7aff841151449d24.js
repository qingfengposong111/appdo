webpackJsonp([76],{Bq3f:function(t,e,a){var i=a("kxFB");(t.exports=a("FZ+f")(!1)).push([t.i,".header[data-v-051a56bc]{background:#5d0e13;height:50px!important;font-size:18px!important}.flex-justify-center[data-v-051a56bc]{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.flex-box[data-v-051a56bc],.flex-justify-center[data-v-051a56bc]{display:-webkit-box;display:-ms-flexbox;display:flex}.font13[data-v-051a56bc]{font-size:14px!important;color:#666}.flex-1[data-v-051a56bc]{-webkit-box-flex:1;-ms-flex:1;flex:1;-ms-flex-wrap:wrap;flex-wrap:wrap}.main[data-v-051a56bc]{width:100%;height:auto}.top-title-flex[data-v-051a56bc]{padding:10px 0;background:#fff}.main-title-flex[data-v-051a56bc]{padding:10px 0}.main-comment-flex[data-v-051a56bc]{width:100%}.column[data-v-051a56bc]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.none-icon-flex[data-v-051a56bc]{width:100px;height:100px;background-image:url("+i(a("9kcH"))+");background-repeat:no-repeat;background-position:50%;background-size:contain;margin:50% auto 0}.marginTop[data-v-051a56bc]{margin-top:10px}",""])},"SJw/":function(t,e,a){var i=a("Bq3f");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("625df86e",i,!0,{})},vxQF:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={data:function(){return{arr:[]}},methods:{goBack:function(){this.$router.go("-1")}},created:function(){this.$bus.$emit("loading",!0);var t=this;setTimeout(function(){t.$bus.$emit("loading",!1)},600)}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("mt-header",{staticClass:"header",attrs:{title:"激活码明细"}},[a("mt-button",{attrs:{slot:"left",icon:"back"},on:{click:t.goBack},slot:"left"},[t._v("返回")])],1),t._v(" "),a("div",{staticStyle:{width:"100%",height:"50px"}}),t._v(" "),t.arr.length>0?a("div",{staticClass:"main"},[t._m(0),t._v(" "),t._l(t.arr,function(e,i){return a("div",{key:i,staticClass:"flex-box flex-justify-center main-title-flex"},[a("div",{staticClass:"flex-1 font13 flex-justify-center"},[t._v(t._s(e.times))]),t._v(" "),a("div",{staticClass:"flex-1 font13 flex-justify-center"},[t._v(t._s(e.name))]),t._v(" "),a("div",{staticClass:"flex-1 font13 flex-justify-center"},[t._v(t._s(e.score))])])})],2):t._e(),t._v(" "),0===t.arr.length?a("div",{staticClass:"main-comment-flex column flex-justify-center"},[a("div",{staticClass:"none-icon-flex"}),t._v(" "),a("div",{staticClass:"font13 marginTop"},[t._v("暂无数据")])]):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"flex-box flex-justify-center top-title-flex"},[e("div",{staticClass:"flex-1 font13 flex-justify-center"},[this._v("日期")]),this._v(" "),e("div",{staticClass:"flex-1 font13 flex-justify-center"},[this._v("交易类型")]),this._v(" "),e("div",{staticClass:"flex-1 font13 flex-justify-center"},[this._v("数量")])])}]};var s=a("VU/8")(i,n,!1,function(t){a("SJw/")},"data-v-051a56bc",null);e.default=s.exports}});
//# sourceMappingURL=76.722c7aff841151449d24.js.map