webpackJsonp([21],{JCrt:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("buxQ"),o=a("s0MJ"),n=(a("HPco"),{data:function(){return{userName:JSON.parse(localStorage.loginInfo).realName||"",flag:!0,val:""}},created:function(){this.$bus.$emit("loading",!0);var t=this;setTimeout(function(){t.$bus.$emit("loading",!1)},600)},methods:{goBack:function(){this.$router.go("-1")},save:function(){var t=this;if(this.flag){this.flag=!1;if(!/^([a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)|(1[3-9]\d{9})$/.test(this.val))return i.a.tostTop("请输入正确的支付宝帐号格式！"),void(this.flag=!0);o.a.ajax.post("/api/alipay/add",{accountName:this.userName,name:this.val,status:"yes"}).then(function(e){i.a.tostTop(e.data.message),200===e.data.status?(t.flag=!0,t.goBack()):(t.$bus.$emit("loading",!1),t.flag=!0,i.a.tostTop(e.data.message))}).catch(function(e){t.flag=!0,t.$bus.$emit("loading",!1),i.a.tostTop("网络出错,请稍后重试!")})}}}}),s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("mt-header",{staticClass:"header",attrs:{title:"添加支付宝帐户"}},[a("mt-button",{attrs:{slot:"left",icon:"back"},on:{click:t.goBack},slot:"left"},[t._v("返回")])],1),t._v(" "),a("div",{staticStyle:{width:"100%",height:"50px"}}),t._v(" "),a("div",{staticClass:"head-zw"}),t._v(" "),a("div",{staticClass:"main-icon-flex"},[a("div",{staticClass:"common-flex-view-this row flex-box-center"},[a("div",{staticClass:"right-flex-view-common"},[t._v("姓名")]),t._v(" "),a("div",[t._v("\n        "+t._s(t.userName)+"\n      ")])]),t._v(" "),a("div",{staticClass:"common-flex-view-this row flex-box-center"},[a("div",{staticClass:"right-flex-view-common"},[t._v("支付宝账户")]),t._v(" "),a("div",[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.val,expression:"val",modifiers:{trim:!0}}],attrs:{placeholder:"请输入支付宝账户",type:"text",id:"picker"},domProps:{value:t.val},on:{input:function(e){e.target.composing||(t.val=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),t._v(" "),a("div",{staticClass:"common-flex-view-this row flex-box-center message-last-flex"},[t._v("\n      *请务必确保支付宝信息正确,如因错误的支付宝信息导致收不到款,会员自行承担责任。\n  ")]),t._v(" "),a("div",{staticClass:"common-flex-view-this row flex-box-center border-none"},[a("div",{staticClass:"btn-this",on:{click:t.save}},[t._v(t._s(t.flag?"提交":"正在处理中..."))])])])],1)},staticRenderFns:[]};var r=a("VU/8")(n,s,!1,function(t){a("wCy4")},"data-v-b4817b4a",null);e.default=r.exports},bkeF:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,".header[data-v-b4817b4a]{background:#5d0e13;height:50px!important;font-size:18px!important}.main-icon-flex[data-v-b4817b4a]{width:86%;height:auto;padding:0 7%}body[data-v-b4817b4a],html[data-v-b4817b4a]{overflow:hidden;-ms-touch-action:none;touch-action:none}.border-none[data-v-b4817b4a]{border:none!important}.common-flex-view-this[data-v-b4817b4a]{width:100%;padding:15px 0;border-bottom:1px solid #dcdcdc;font-size:13px}.right-flex-view-common[data-v-b4817b4a]{width:70px}input[data-v-b4817b4a]{-webkit-appearance:none;background:transparent;border:none;outline:none;font-size:14px}.message-last-flex[data-v-b4817b4a]{color:#5d0e13;font-size:13px;border:none}.btn-this[data-v-b4817b4a]{width:100%;background:#5d0e13;text-align:center;color:#ecc489;padding:7px 0;border-radius:5px;font-size:16px}.flex-box-center[data-v-b4817b4a]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.row[data-v-b4817b4a]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}",""])},wCy4:function(t,e,a){var i=a("bkeF");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("886187f8",i,!0,{})}});
//# sourceMappingURL=21.bc7ac8c06d27102b96c5.js.map