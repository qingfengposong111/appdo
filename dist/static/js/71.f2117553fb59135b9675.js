webpackJsonp([71],{"3eYH":function(t,e,a){var n=a("ZBlz");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("45cf1df9",n,!0,{})},N8uP:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("s0MJ"),i=a("buxQ"),s={data:function(){return{userName:"",flag:!0,num:0}},created:function(){this.$bus.$emit("loading",!0);this.jfk()},methods:{goBack:function(){this.$router.go("-1")},jfk:function(){var t=this;n.a.ajax.getByForm("/api/member/balance").then(function(e){200===e.data.status?t.num=e.data.data.unblock:i.a.tostTop(e.data.message),t.$bus.$emit("loading",!1)}).catch(function(e){t.$bus.$emit("loading",!1),i.a.tostTop("网络出错,请稍后重试!")})},toGetCode:function(){this.$router.push("/GetCode")},submit:function(){var t=this;if(this.flag){this.flag=!1;if(!/^([\u4e00-\u9fa5]{3,8})|(1[3-9]\d{9})|([a-zA-Z]{6,18})|([0-9A-Za-z]{6,18})$/.test(this.userName))return i.a.tostTop("用户名格式不正确!"),this.flag=!0,!1;if(this.num<=0)return i.a.tostTop("解封卡数量不足！"),this.flag=!0,!1;n.a.ajax.post("/api/member/unblock",{key:"username",value:this.userName}).then(function(e){i.a.tostTop(e.data.message),t.userName="",t.jfk(),t.flag=!0}).catch(function(t){i.a.tostTop("网络出错,请稍后重试!")})}}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("mt-header",{staticClass:"header",attrs:{title:"解封会员"}},[a("mt-button",{attrs:{slot:"left",icon:"back"},on:{click:t.goBack},slot:"left"},[t._v("返回")])],1),t._v(" "),a("div",{staticClass:"head-zw",staticStyle:{width:"100%",height:"50px"}}),t._v(" "),a("div",{staticClass:"top-view-flex flex-justify-center"},[t._v("\n    您当前的解封卡数量是:"+t._s(t.num)+"\n  ")]),t._v(" "),a("div",{staticClass:"input-name-flex"},[a("div",{staticClass:"input-div-view"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.userName,expression:"userName"}],attrs:{placeholder:"请输入用户名(汉字/英文/手机号/英文数字混合)"},domProps:{value:t.userName},on:{input:function(e){e.target.composing||(t.userName=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"input-name-flex bg-tran-flex"},[t._v("\n    解封会员需要消耗一张解封卡\n  ")]),t._v(" "),a("div",{staticClass:"btn-save-flex",on:{click:t.submit}},[t._v(t._s(t.flag?"提交":"正在处理中..."))])],1)},staticRenderFns:[]};var r=a("VU/8")(s,o,!1,function(t){a("3eYH")},"data-v-1b832118",null);e.default=r.exports},ZBlz:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,".header[data-v-1b832118]{background:#5d0e13;height:50px!important;font-size:18px!important}.top-view-flex[data-v-1b832118]{width:100%;height:auto;padding:10px 0;color:#666}.flex-justify-center[data-v-1b832118]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.input-name-flex[data-v-1b832118]{width:86%;padding:20px 7%;background:#fff}input[data-v-1b832118]{height:20px;width:100%;font-size:13px;border:none;outline:none;color:#000;-webkit-appearance:none}.bg-tran-flex[data-v-1b832118]{background:transparent;font-size:13px}.color-clone[data-v-1b832118]{color:#5d0e13}.btn-save-flex[data-v-1b832118]{width:70%;margin-left:15%;text-align:center;background:#5d0e13;color:#ecc489;border-radius:5px;padding:7px 0;border:1px solid #5d0e13}",""])}});
//# sourceMappingURL=71.f2117553fb59135b9675.js.map