webpackJsonp([75],{HIuq:function(t,e,a){var i=a("lvRH");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("6d3e8b8a",i,!0,{})},QBQ6:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("HPco"),o=a("s0MJ"),s=a("buxQ"),n={data:function(){return{list:[],bankAddress:"",bankName:"",flag:!0,bankNumber:"",userName:"",bankVisible:!1,slots:[{flex:1,values:["中国银行","中国建设银行","中国农业银行","中国工商银行","交通银行","广发银行","上海浦东发展银行","招商银行","平安银行","中国邮政储蓄银行","兴业银行","民生银行","光大银行","中信银行","华夏银行","上海银行","北京银行","花旗中国银行","汇丰中国银行","渣打中国银行","香港汇丰银行","其他银行"],className:"slot1",textAlign:"center"}]}},created:function(){localStorage.loginInfo?this.userName=JSON.parse(localStorage.loginInfo).realName:this.userName=""},methods:{onValuesChange:function(t,e){this.bankName=e[0]},goBack:function(){this.$router.go("-1")},getVal:function(){if(""===this.bankName)return s.a.tostTop("请选择所属银行！"),!1},submit:function(){var t=this;if(this.flag){if(this.flag=!1,!i.a.isMatchRealName(this.userName))return s.a.tostTop("请输入开户人！"),this.flag=!0,!1;if(!i.a.isMatchBankNumber(this.bankNumber))return s.a.tostTop("请输入16~19位银行卡号！"),this.flag=!0,!1;if(""===this.bankAddress)return s.a.tostTop("请输入开户行！"),this.flag=!0,!1;o.a.ajax.post("/api/bank/add",{bankName:this.bankName,bankNumber:this.bankNumber,bankAccountName:this.userName,bankAddress:this.bankAddress,status:"yes"}).then(function(e){406===e.data.status&&(s.a.tostTop(e.data.message),"请完善个人资料，填写真实姓名"===e.data.message&&t.$router.push("/Perfict"),t.flag=!0),200===e.data.status&&(t.bankNumber="",s.a.tostTop(e.data.message),t.flag=!0,t.$router.go("-1"))}).catch(function(t){s.a.tostTop("网络出错,请稍后重试!")})}}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("mt-header",{staticClass:"header",attrs:{title:"添加银行帐户"}},[a("mt-button",{attrs:{slot:"left",icon:"back"},on:{click:t.goBack},slot:"left"},[t._v("返回")])],1),t._v(" "),a("div",{staticClass:"head-zw",staticStyle:{width:"100%",height:"50px"}}),t._v(" "),a("div",{staticClass:"main-icon-flex"},[a("div",{staticClass:"common-flex-view-this row flex-box-center"},[a("div",{staticClass:"right-flex-view-common"},[t._v("持卡人")]),t._v(" "),a("div",{staticStyle:{width:"80%"}},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.userName,expression:"userName",modifiers:{trim:!0}}],staticStyle:{width:"100%"},attrs:{placeholder:"请输入开户姓名",type:"text"},domProps:{value:t.userName},on:{input:function(e){e.target.composing||(t.userName=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),t._v(" "),a("div",{staticClass:"common-flex-view-this row flex-box-center"},[a("div",{staticClass:"right-flex-view-common"},[t._v("银行名称")]),t._v(" "),a("div",{staticStyle:{width:"80%"}},[a("div",{on:{click:function(e){t.bankVisible=!0}}},[t._v(t._s(t.bankName))])]),t._v(" "),a("div",{staticClass:"right-jt-flex"})]),t._v(" "),a("div",{staticClass:"common-flex-view-this row flex-box-center"},[a("div",{staticClass:"right-flex-view-common"},[t._v("银行账户")]),t._v(" "),a("div",[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.bankNumber,expression:"bankNumber",modifiers:{trim:!0}}],attrs:{type:"number",placeholder:"请输入 16~19 位银行卡号"},domProps:{value:t.bankNumber},on:{input:[function(e){e.target.composing||(t.bankNumber=e.target.value.trim())},t.getVal],blur:function(e){return t.$forceUpdate()}}})])]),t._v(" "),a("div",{staticClass:"common-flex-view-this row flex-box-center"},[a("div",{staticClass:"right-flex-view-common"},[t._v("开户行")]),t._v(" "),a("div",[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.bankAddress,expression:"bankAddress",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"请输入开户行"},domProps:{value:t.bankAddress},on:{input:function(e){e.target.composing||(t.bankAddress=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),t._v(" "),a("div",{staticClass:"common-flex-view-this row flex-box-center message-last-flex"},[t._v("\n      *请务必确保银行信息正确,如因错误的银行信息导致收不到款,会员自行承担责任。\n\n    ")]),t._v(" "),a("div",{staticClass:"common-flex-view-this row flex-box-center border-none"},[a("div",{staticClass:"btn-this",on:{click:t.submit}},[t._v(t._s(t.flag?"提交":"正在处理中..."))])])]),t._v(" "),a("div",{staticClass:"sexPicker"},[a("mt-popup",{attrs:{position:"bottom",closeOnClickModal:"true"},model:{value:t.bankVisible,callback:function(e){t.bankVisible=e},expression:"bankVisible"}},[a("mt-picker",{attrs:{slots:t.slots},on:{change:t.onValuesChange}})],1)],1)],1)},staticRenderFns:[]};var c=a("VU/8")(n,r,!1,function(t){a("HIuq")},"data-v-06fc2a4c",null);e.default=c.exports},lvRH:function(t,e,a){var i=a("kxFB");(t.exports=a("FZ+f")(!1)).push([t.i,".header[data-v-06fc2a4c]{background:#5d0e13;height:50px!important;font-size:18px!important}.border-none[data-v-06fc2a4c]{border:none!important}.main-icon-flex[data-v-06fc2a4c]{width:86%;height:auto;padding:0 7%}body[data-v-06fc2a4c],html[data-v-06fc2a4c]{overflow:hidden;-ms-touch-action:none;touch-action:none}.common-flex-view-this[data-v-06fc2a4c]{width:100%;padding:15px 0;border-bottom:1px solid #dcdcdc;font-size:13px}.right-flex-view-common[data-v-06fc2a4c]{width:65px}input[data-v-06fc2a4c]{-webkit-appearance:none;background:transparent;width:150%;position:relative;z-index:99;color:#000;font-size:13px;outline:none;border:none}.right-jt-flex[data-v-06fc2a4c]{width:13px;height:13px;background-image:url("+i(a("Qpe5"))+");background-repeat:no-repeat;background-position:50%;background-size:contain;position:absolute;right:7%}.message-last-flex[data-v-06fc2a4c]{color:#5d0e13;font-size:13px;border:none}.btn-this[data-v-06fc2a4c]{width:100%;background:#5d0e13;text-align:center;color:#ecc489;padding:7px 0;border-radius:5px;font-size:16px}.flex-box-center[data-v-06fc2a4c]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.row[data-v-06fc2a4c]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.toolbar .picker-button[data-v-06fc2a4c]{color:#5d0e13!important}",""])}});
//# sourceMappingURL=75.a3f387bf8cf0b438d356.js.map