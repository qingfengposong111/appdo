webpackJsonp([38],{NRZn:function(t,a,e){var i=e("kxFB");(t.exports=e("FZ+f")(!1)).push([t.i,".mescroll[data-v-6ba11956]{position:fixed;top:50px;bottom:0;height:auto;background:#ffff!important}.header[data-v-6ba11956]{background:#5d0e13;height:50px!important;font-size:18px!important}.font14[data-v-6ba11956]{font-size:14px!important}.column[data-v-6ba11956]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.wrap-row[data-v-6ba11956]{width:100%;word-wrap:break-word;word-break:break-all;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.footprint[data-v-6ba11956]{width:100%;height:10px}.main-this-galley[data-v-6ba11956]{width:100%;height:auto}.copy-this-flex-view[data-v-6ba11956]{width:100%;background:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;padding:15px 2%;border-bottom:1px solid #d4d4d4}.color-and-padding[data-v-6ba11956]{color:#999;margin:10px 0}.main-none-flex[data-v-6ba11956]{width:100%;height:80%}.color-red-flex[data-v-6ba11956]{color:red}.none-icon-flex[data-v-6ba11956]{width:100px;height:100px;background-image:url("+i(e("9kcH"))+");background-repeat:no-repeat;background-position:50%;background-size:contain;margin:50% auto 0}.marginTop[data-v-6ba11956]{margin:10px auto;color:#666}",""])},YsaX:function(t,a,e){var i=e("NRZn");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("rjj0")("5392b480",i,!0,{})},y4j2:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("s0MJ"),o=e("p0f0"),s=(e("GdEX"),{components:{MeScroll:o.a},data:function(){return{pageSize:10,mescroll:null,mescrollDown:{callback:this.downCallback},mescrollUp:{callback:this.upCallback,page:{num:0,size:7},htmlNodata:'<p class="upwarp-nodata">-- 加载完成 --</p>'},dataList:[],memberList:[]}},filters:{formatDate:function(t){var a=JSON.parse(t),e=new Date(a),i=e.getFullYear(),o=e.getMonth()+1,s=e.getDate(),n=e.getHours(),r=e.getMinutes(),l=e.getSeconds();return i+"-"+(o=o<10?"0"+o:o)+"-"+(s=s<10?"0"+s:s)+":"+(n=n<10?"0"+n:n)+":"+(r=r<10?"0"+r:r)+":"+(l=l<10?"0"+l:l)},yuan:function(t){return isNaN(t)?0:parseFloat((t/100).toFixed(2)).toFixed(2)}},methods:{mescrollInit:function(t){this.mescroll=t},upCallback:function(t){var a=this,e=t.num*this.pageSize;i.a.ajax.post("/api/message",{start:e,length:t.size}).then(function(t){if(200===t.data.status)if(t.data.data.data.forEach(function(t){"order"!==t.type&&"seed"!==t.type||a.memberList.push(t)}),e<a.memberList.length){a.dataList=a.dataList.concat(a.memberList);var i=a.dataList.length<a.memberList.length;a.$nextTick(function(){a.mescroll.endSuccess(a.memberList.length,i)})}else a.mescroll.endSuccess(a.memberList.length,!1)}).catch(function(){return a.mescroll.endErr()})},downCallback:function(){var t=this;0==this.memberList.length?i.a.ajax.post("/api/message",{start:0,length:this.mescrollUp.page.size}).then(function(a){200===a.data.status&&(a.data.data.data.forEach(function(a){"order"!==a.type&&"seed"!==a.type||t.memberList.push(a)}),t.dataList=t.dataList.concat(t.memberList),t.mescroll.endSuccess())}).catch(function(){return t.mescroll.endErr()}):this.mescroll.endSuccess()},goBack:function(){this.$router.go("-1")},detail:function(t){this.$router.push("/OrderMessageDetail/"+t)}},created:function(){this.$bus.$emit("loading",!0);var t=this;setTimeout(function(){t.$bus.$emit("loading",!1)},600)}}),n={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("mt-header",{staticClass:"header",attrs:{title:"订单消息"}},[e("mt-button",{attrs:{slot:"left",icon:"back"},on:{click:t.goBack},slot:"left"},[t._v("返回")])],1),t._v(" "),e("div",{staticStyle:{width:"100%",height:"50px"}}),t._v(" "),e("div",{staticClass:"head-zw"}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.dataList.length>0,expression:"dataList.length>0"}],staticClass:"main-this-galley"},[e("div",{staticClass:"footprint"}),t._v(" "),e("MeScroll",{ref:"mescroll",staticClass:"mescroll",attrs:{down:t.mescrollDown,up:t.mescrollUp},on:{init:t.mescrollInit}},t._l(t.dataList,function(a,i){return e("div",{key:i,staticClass:"copy-this-flex-view column font14",on:{click:function(e){return t.detail(a.id)}}},[e("div",{staticClass:"wrap-row"},[e("span",{staticStyle:{color:"#333"}},[t._v(t._s(a.content))])])])}),0)],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:0===t.dataList.length,expression:"dataList.length === 0"}],staticClass:"main-none-flex column flex-justify-center"},[e("div",{staticClass:"none-icon-flex"}),t._v(" "),e("div",{staticClass:"font13 marginTop"},[t._v("暂无消息")])])],1)},staticRenderFns:[]};var r=e("VU/8")(s,n,!1,function(t){e("YsaX")},"data-v-6ba11956",null);a.default=r.exports}});
//# sourceMappingURL=38.dbf35d15d667015191cd.js.map