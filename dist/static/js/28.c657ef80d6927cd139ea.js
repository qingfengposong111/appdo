webpackJsonp([28],{dBGd:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("buxQ"),s=e("s0MJ"),o={data:function(){return{sellerName:"",sellerSignature:"",phone:"",list:[],list2:[],show:!1,flag:!0,timeOutEvent:0,longEnter:!1,url:"",alipayList:[]}},created:function(){this.$bus.$emit("loading",!0);var t=this;setTimeout(function(){t.$bus.$emit("loading",!1)},600),s.a.ajax.getByForm("/api/member",{params:{Id:this.$route.params.id}}).then(function(a){200===a.data.status&&(t.sellerName=a.data.data.username,t.phone=a.data.data.phone)}),s.a.ajax.getByForm("/api/bank/member",{params:{Id:this.$route.params.id}}).then(function(a){200===a.data.status&&(t.list=a.data.data)}),s.a.ajax.getByForm("/api/qrcode/member",{params:{Id:this.$route.params.id}}).then(function(a){var e=[];200===a.data.status&&(a.data.data.forEach(function(a){""!==a.images&&(a.images="http://api.wealth-point.com/"+a.images,e.push(a)),"alipay"===a.type&&t.alipayList.push(a)}),t.list2=e)})},methods:{goBack:function(){this.$router.go("-1")},outBox:function(t){"tk"!==t.target.className&&(this.longEnter=!1)},createDownload:function(){var t=this;t.flag&&(t.flag=!1,plus.downloader.createDownload(t.url,{},function(a,e){if(200===e){if(t.flag=!0,!window.plus)return;console.log(a.filename),plus.gallery.save(a.filename,function(){plus.nativeUI.alert("保存成功")},function(a){plus.nativeUI.alert("保存失败"),console.log(a.message,a.code),t.flag=!0})}}).start());t.longEnter=!1},gotouchstart:function(t){var a=this;clearTimeout(a.timeOutEvent),a.timeOutEvent=setTimeout(function(){a.url=t,a.longEnter=!0},600)},gotouchmove:function(){clearTimeout(this.timeOutEvent),this.timeOutEvent=0,this.longEnter=!1},complain:function(){this.$router.push("/SendComplaint/"+this.$route.params.orderId+"/"+this.$route.params.type)},cancel:function(){this.longEnter=!1},showOrHide:function(){this.show=!this.show},onCopy:function(t){i.a.tostTop("复制成功！")}}},n={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("mt-header",{staticClass:"header",attrs:{title:"详细资料"}},[e("mt-button",{attrs:{slot:"left",icon:"back"},on:{click:t.goBack},slot:"left"},[t._v("返回")])],1),t._v(" "),e("div",{staticStyle:{width:"100%",height:"50px"}}),t._v(" "),e("div",{staticClass:"main"},[e("div",{staticClass:"main-top"},[t._m(0),t._v(" "),e("div",{staticClass:"nick"},[e("p",[t._v("用户昵称："+t._s(t.sellerName))]),t._v(" "),e("p",[t._v("性别：保密")])])]),t._v(" "),e("div",{staticClass:"zw"}),t._v(" "),t._m(1),t._v(" "),e("div",{staticClass:"zw"}),t._v(" "),e("div",{staticClass:"bank"},[e("p",{on:{click:t.complain}},[t._v("帐户信息错误投诉")])]),t._v(" "),e("div",{staticClass:"zw"}),t._v(" "),e("div",[t._l(t.list,function(a,i){return"yes"===a.status?e("div",{key:i,staticClass:"aset"},[e("p",[t._v("银行信息")]),t._v(" "),e("div",[e("p",[e("span",[t._v("收款人")]),e("span",{domProps:{textContent:t._s(a.bankAccountName)}})]),e("span",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:a.bankAccountName,expression:"item.bankAccountName",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.onCopy,expression:"onCopy",arg:"success"}]},[t._v("复制")])]),t._v(" "),e("div",[e("p",[e("span",[t._v("银行名称")]),e("span",[t._v(t._s(a.bankName))])])]),t._v(" "),e("div",[e("p",[e("span",[t._v("银行帐号")]),e("span",{domProps:{textContent:t._s(a.bankNumber)}})]),e("span",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:a.bankNumber,expression:"item.bankNumber",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.onCopy,expression:"onCopy",arg:"success"}]},[t._v("复制")])]),t._v(" "),e("div",[e("p",[e("span",[t._v("开户行")]),e("span",{domProps:{textContent:t._s(a.bankAddress)}})]),e("span",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:a.bankAddress,expression:"item.bankAddress",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.onCopy,expression:"onCopy",arg:"success"}]},[t._v("复制")])]),t._v(" "),e("div",[e("p",[e("span",[t._v("联系电话")]),e("span",{domProps:{textContent:t._s(t.phone)}})]),e("span",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:t.phone,expression:"phone",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.onCopy,expression:"onCopy",arg:"success"}]},[t._v("复制")])])]):t._e()}),t._v(" "),t.alipayList.length>0?e("div",{staticClass:"aset"},[e("p",[t._v("支付宝信息")]),t._v(" "),t._l(t.alipayList,function(a,i){return""!==a.name?e("div",{key:i},[e("p",[e("span",[t._v("帐号")]),e("span",{domProps:{textContent:t._s(a.name)}})]),e("span",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:a.name,expression:"temp.name",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.onCopy,expression:"onCopy",arg:"success"}]},[t._v("复制")])]):t._e()})],2):t._e()],2),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.list2.length>0,expression:"list2.length>0"}],staticClass:"code"},[e("div",{staticClass:"code-title",on:{click:t.showOrHide}},[t._v("二维码信息")]),t._v(" "),t.show?e("div",{staticClass:"had-card column"},t._l(t.list2,function(a,i){return"yes"===a.status&&"http://api.wealth-point.com/"!==a.images?e("div",{key:i,staticClass:"bg-pay-code-wx flex-justify-center column",class:"alipay"===a.type?"aplay-pay-color":""},[e("div",{staticClass:"wx-img-code"},[e("img",{attrs:{src:a.images,alt:""},on:{touchstart:function(e){return t.gotouchstart(a.images)},touchmove:t.gotouchmove}})]),t._v(" "),"alipay"===a.type&&"yes"===a.status?e("div",[t._v("扫-扫支付宝付款")]):t._e(),t._v(" "),"wechat"===a.type&&"yes"===a.status?e("div",[t._v("扫-扫微信付款")]):t._e(),t._v(" "),"no"===a.status?e("div",[t._v("已停用")]):t._e()]):t._e()}),0):t._e()])]),t._v(" "),t.longEnter?e("div",{staticClass:"outbox",on:{click:function(a){return t.outBox(a)}}},[e("div",{staticClass:"tk"},[e("div",{staticClass:"ercode",on:{click:t.createDownload}},[t._v("保存二维码")]),t._v(" "),e("div",{staticStyle:{width:"100%",height:"10px",background:"rgba(0,0,0,0.3)"}}),t._v(" "),e("div",{staticClass:"cancel",on:{click:t.cancel}},[t._v("取消")])])]):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"img"},[a("img",{attrs:{src:"static/images/111.png",alt:""}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"sign"},[a("span",[this._v("个性签名")]),this._v(" "),a("span")])}]};var r=e("VU/8")(o,n,!1,function(t){e("wx2z")},"data-v-86b08870",null);a.default=r.exports},nRaI:function(t,a,e){(t.exports=e("FZ+f")(!1)).push([t.i,".code[data-v-86b08870]{border-top:10px solid #f7f7f7;padding:0 2% 10px}.outbox[data-v-86b08870]{background:rgba(0,0,0,.3);position:fixed;width:100%;height:100%;z-index:9999999999;left:0;bottom:0}.tk[data-v-86b08870]{position:absolute;width:80%;height:106px;background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;left:10%;bottom:2%;border-radius:6px}.ercode[data-v-86b08870]{color:#333;font-size:20px}.cancel[data-v-86b08870],.ercode[data-v-86b08870]{background:#fff;margin:0 auto;border-radius:6px;padding:10px 0;width:100%;text-align:center}.cancel[data-v-86b08870]{color:#666}.code-title[data-v-86b08870]{padding:10px 0;border-bottom:1px solid #f7f7f7;margin-bottom:10px;font-size:16px}.had-card[data-v-86b08870]{width:100%;padding:5px;height:auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin:0 auto;-ms-flex-wrap:wrap;flex-wrap:wrap}.hard-card>div[data-v-86b08870]{width:49%!important}.bg-pay-code-wx[data-v-86b08870]{width:49%!important;height:250px;background:#00ad47;border-radius:5px;color:#fff;padding:10px 0;margin-bottom:10px;-webkit-box-sizing:border-box;box-sizing:border-box;text-align:center}div.bg-pay-code-wx[data-v-86b08870]:nth-child(2n){margin-left:2%!important}.bg-pay-code-wx img[data-v-86b08870]{width:100%;height:100%}.aplay-pay-color[data-v-86b08870]{background:#0da1e6}.wx-img-code[data-v-86b08870]{width:150px;height:200px;margin:0 auto 5px}.aset>p[data-v-86b08870]{padding:10px 0;border-bottom:1px solid #f7f7f7}.aset+.aset[data-v-86b08870]{border-top:10px solid #f7f7f7}.aset>div[data-v-86b08870]{width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:8px 5px 8px 0}.aset>div>p[data-v-86b08870]{width:84%}.aset>div>p>span[data-v-86b08870]:first-child{margin-right:10px;font-size:14px;color:#000;font-weight:500;width:80px;display:inline-block}.aset>div>p>span[data-v-86b08870]:last-child{font-size:14px;display:inline-block;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;vertical-align:middle;width:66%;color:#333}.header[data-v-86b08870]{background:#5d0e13;height:50px!important;font-size:18px!important}.aset>div>span[data-v-86b08870]{border:1px solid #5d0e13;padding:3px 5px;color:#5d0e13;border-radius:4px;font-size:14px}.zw[data-v-86b08870]{width:100%;height:10px;background:#f7f7f7}.main[data-v-86b08870]{background:#fff;height:auto;padding:10px 0}.main-top[data-v-86b08870],.main[data-v-86b08870]{-webkit-box-sizing:border-box;box-sizing:border-box;width:100%}.main-top[data-v-86b08870]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;padding:5px 2%}.img[data-v-86b08870]{width:50px;height:50px;border-radius:50%;overflow:hidden;margin-right:10px}.img img[data-v-86b08870]{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.nick>p[data-v-86b08870]:first-child{font-size:14px;color:#000;font-weight:500}.nick>p[data-v-86b08870]:last-child{font-size:12px;color:#666}.aset[data-v-86b08870],.bank[data-v-86b08870],.sign[data-v-86b08870]{-webkit-box-sizing:border-box;box-sizing:border-box;padding:15px 2%;width:100%}.aset[data-v-86b08870]{padding:0 2% 10px}.sign[data-v-86b08870]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.sign>span[data-v-86b08870]:first-child{color:#000;font-weight:700;font-size:16px;margin-right:5px}.sign>span[data-v-86b08870]:last-child{font-size:14px;display:inline-block;width:70%;color:#333;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.bank[data-v-86b08870]{padding:10px 2%}.bank p[data-v-86b08870]{width:140px;height:30px;border:1px solid #5d0e13;border-radius:6px;line-height:30px;margin:0 auto;color:#5d0e13;text-align:center}",""])},wx2z:function(t,a,e){var i=e("nRaI");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("rjj0")("5efa3b34",i,!0,{})}});
//# sourceMappingURL=28.c657ef80d6927cd139ea.js.map