import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  mode: 'hash',
  routes: [
    {//首页
      path: '/',
      name: 'index',
      component: () =>
        import ('@/pages/Index')
    },
    {//商品
      path: '/Shop',
      name: 'shop',
      component: resolve => require(['@/pages/Shop'],resolve)
    },
    {//公益
      path: '/PublicWelfare',
      name: 'publicWelfare',
      component: resolve => require(['@/pages/PublicWelfare'],resolve)
    },
    {//我的
      path: '/Mine',
      name: 'mine',
      component: resolve => require(['@/pages/Mine'],resolve)
    },
    {//登陆Login
      path: '/Login',
      name: 'login',
      component: resolve => require(['@/pages/Login'],resolve)
    },
    {//注册
      path: '/Register',
      name: 'register',
      component: resolve => require(['@/pages/Register'],resolve)
    },
    {//完善资料
      path: '/Perfict',//
      name: 'perfict',
      component:resolve => require(['@/pages/Perfict'],resolve)
    },
    {//个人中心
      path: '/PersonCenter',
      name: 'personCenter',
      component:resolve => require(['@/pages/PersonCenter'],resolve)
    },
    {//希望钱包
      path: '/HopeWallet',
      name: 'hopeWallet',
      component: resolve => require(['@/pages/HopeWallet'],resolve)
    },
    {//奖金钱包
      path: '/BonusWallet',
      name: 'bonusWallet',
      component: resolve => require(['@/pages/BonusWallet'],resolve)
    },
    {//待定
      path: '/Wait',
      name: 'wait',
      component: resolve => require(['@/pages/Wait'],resolve)
    },
    {//总览
      path: '/Financial',
      name: 'financial',
      component: resolve => require(['@/pages/Financial'],resolve)
    },
    {//激活码
      path: '/Active',
      name: 'active',
      component: resolve => require(['@/pages/Active'],resolve)
    },
    {//承租记录
      path: '/BuyRecord',
      name: 'buyRecord',
      component: resolve => require(['@/pages/BuyRecord'],resolve)
    },
    {//承租单条明细
      path: '/BuyMessage/:id',
      name: 'buyMessage',
      component: resolve => require(['@/pages/BuyMessage'],resolve)
    },
    {//退租记录
      path: '/SellRecord',
      name: 'rellRecord',
      component: resolve => require(['@/pages/SellRecord'],resolve)
    },
    {//承租单条明细
      path: '/SellMessage/:id',
      name: 'sellMessage',
      component: resolve => require(['@/pages/SellMessage'],resolve)
    },
    {//我的爱心
      path: '/Love',
      name: 'love',
      component: resolve => require(['@/pages/Love'],resolve)
    },
    {//激活会员
      path: '/LoveMember',
      name: 'loveMember',
      component: resolve => require(['@/pages/LoveMember'],resolve)
    },
    {//如何激活会员
      path: '/GetCode',
      name: 'getCode',
      component: resolve => require(['@/pages/GetCode'],resolve)
    },
    {//承租
      path: '/Buy',
      name: 'buy',
      component: resolve => require(['@/pages/Buy'],resolve)
    },
    {//退租
      path: '/Sell',
      name: 'sell',
      component: resolve => require(['@/pages/Sell'],resolve)
    },
    {//承租状态
      path: '/BuyList/:num/:type',
      name: 'buyList',
      component:resolve => require(['@/pages/BuyList'],resolve)
    },
    {//退租状态
      path: '/SellList/:num/:type',
      name: 'sellList',
      component:resolve => require(['@/pages/SellList'],resolve)
    },
    {//退租状态
      path: '/BonusAp',
      name: 'bonusAp',
      component:resolve => require(['@/pages/BonusAp'],resolve)
    },
    {//会员级别MemLevel
      path: '/MemLevel',
      name: 'memLevel',
      component:resolve => require(['@/pages/MemLevel'],resolve)
    },
    {//信用评价
      path: '/CreditScore',
      name: 'creditScore',
      component:resolve => require(['@/pages/CreditScore'],resolve)
    },
    {//信用评分记录
      path: '/CreditRecord',
      name: 'creditRecord',
      component:resolve => require(['@/pages/CreditRecord'],resolve)
    },
    {//信用评分制度
      path: '/CreditSystem',
      name: 'creditSystem',
      component:resolve => require(['@/pages/CreditSystem'],resolve)
    },
    {//信用评分常见问题
      path: '/CreditQuestion',
      name: 'creditQuestion',
      component:resolve => require(['@/pages/CreditQuestion'],resolve)
    },
    {//道具商城
      path: '/ToolShop',
      name: 'toolShop',
      component:resolve => require(['@/pages/ToolShop'],resolve)
    },
    {//道具商城
      path: '/ToolMine',
      name: 'toolMine',
      component: resolve => require(['@/pages/ToolMine'],resolve)
    },
    {//道具商城我的 使用记录
      path: '/HadUse',
      name: 'hadUse',
      component:resolve => require(['@/pages/HadUse'],resolve)
    },
    {//道具商城购买
      path: '/BuyTool/:id/:price/:text/:name',
      name: 'buyTool',
      component: resolve => require(['@/pages/BuyTool'],resolve)
    },
    {//帐户设置Setting
      path: '/Setting',
      name: 'setting',
      component:resolve => require(['@/pages/Setting'],resolve)
    },
    {//真实姓名
      path: '/TrueName',
      name: 'trueName',
      component:resolve => require(['@/pages/TrueName'],resolve)
    },
    {//手机号码CheckPhone
      path: '/CheckPhone',
      name: 'checkPhone',
      component:resolve => require(['@/pages/CheckPhone'],resolve)
    },
    {//昵称
      path: '/NickName',
      name: 'nickName',
      component: resolve => require(['@/pages/NickName'],resolve)
    },
    {//修改签名
      path: '/Signature',
      name: 'signature',
      component:resolve => require(['@/pages/Signature'],resolve)
    },
    {//银行卡BankCard
      path: '/BankCard',
      name: 'bankCard',
      component:resolve => require(['@/pages/BankCard'],resolve)
    },
    {//添加AddBankCard银行卡BankCard
      path: '/AddBankCard',
      name: 'addBankCard',
      component:resolve => require(['@/pages/AddBankCard'],resolve)
    },
    {//修改银行卡BankCard
      path: '/ReviseBankCard/:id',
      name: 'reviseBankCard',
      component:resolve => require(['@/pages/ReviseBankCard'],resolve)
    },
    {//支付宝card
      path: '/AliPayCard',
      name: 'aliPayCard',
      component:resolve => require(['@/pages/AliPayCard'],resolve)
    },
    {//支付宝card reviseAlipayCard
      path: '/AddAliPayCard',
      name: 'addAliPayCard',
      component:resolve => require(['@/pages/AddAliPayCard'],resolve)
    },
    {//修改支付宝card reviseAlipayCard
      path: '/ReviseAlipayCard/:id/:name/:status/:accountName',
      name: 'reviseAlipayCard',
      component:resolve => require(['@/pages/ReviseAlipayCard'],resolve)
    },
    {//二维码收款
      path: '/CodePay',
      name: 'codePay',
      component:resolve => require(['@/pages/CodePay'],resolve)
    },
    {//密码管理UpdatePwd
      path: '/UpdatePwd',
      name: 'updatePwd',
      component:resolve => require(['@/pages/UpdatePwd'],resolve)
    },
    {//修改登录密码
      path: '/UpdateLoginPwd',
      name: 'updateLoginPwd',
      component:resolve => require(['@/pages/UpdateLoginPwd'],resolve)
    },
    {//修改安全密码
      path: '/UpdateSafePwd',
      name: 'updateSafePwd',
      component:resolve => require(['@/pages/UpdateSafePwd'],resolve)
    },
    {//意见反馈
      path: '/GetBack',
      name: 'getBack',
      component:resolve => require(['@/pages/GetBack'],resolve)
    },
    {//客户服务
      path: '/Service',
      name: 'service',
      component:resolve => require(['@/pages/Service'],resolve)
    },
    {//系统消息
      path: '/StytemMessage',
      name: 'tytemMessage',
      component:resolve => require(['@/pages/StytemMessage'],resolve)
    },
    {//订单消息
      path: '/OrderMessage',
      name: 'orderMessage',
      component:resolve => require(['@/pages/OrderMessage'],resolve)
    },
    {//系统消息
      path: '/Sys',
      name: 'sys',
      component:resolve => require(['@/pages/Sys'],resolve)
    },
    {//系统消息详情
      path: '/SysDetail/:id',
      name: 'sysDetail',
      component:resolve => require(['@/pages/SysDetail'],resolve)
    },
    {//如何赚钱
      path: '/MakeMoney',
      name: 'makeMoney',
      component:resolve => require(['@/pages/MakeMoney'],resolve)
    },
    {//推广二维码ErCode
      path: '/ErCode',
      name: 'erCode',
      component:resolve => require(['@/pages/ErCode'],resolve)
    },
    {//W信用WCredit
      path: '/WCredit',
      name: 'cCredit',
      component:resolve => require(['@/pages/WCredit'],resolve)
    },
    {//W钱包
      path: '/Wallet',
      name: 'wallet',
      component:resolve => require(['@/pages/Wallet'],resolve)
    },
    {//W股权
      path: '/Wstock',
      name: 'Wstock',
      component:resolve => require(['@/pages/Wstock'],resolve)
    },
    {//希望钱包明细HopeRecord
      path: '/HopeRecord',
      name: 'hopeRecord',
      component:resolve => require(['@/pages/HopeRecord'],resolve)
    },
    {//奖金钱包明细HopeRecord
      path: '/BonusRecord',
      name: 'bonusRecord',
      component:resolve => require(['@/pages/BonusRecord'],resolve)
    },
    {//激活码包明细HopeRecord
      path: '/ActiveRecord',
      name: 'activeRecord',
      component:resolve => require(['@/pages/ActiveRecord'],resolve)
    },
    {//添加收款码
      path: '/AddPayCode',
      name: 'addPayCode',
      component:resolve => require(['@/pages/AddPayCode'],resolve)
    },
    {//图表
      path: '/MyCharts/:nums/:title',
      name: 'myCharts',
      component:resolve => require(['@/pages/MyCharts'],resolve)
    },
    {//激活提示
      path: '/GoActive',
      name: 'goActive',
      component:resolve => require(['@/pages/GoActive'],resolve)
    },
    {//留言页面LeavDetail
      path: '/LeavMessage',
      name: 'leavMessage',
      component:resolve => require(['@/pages/LeavMessage'],resolve)
    },
    {//留言详情
      path: '/LeavDetail/:id',
      name: 'leavDetail',
      component:resolve => require(['@/pages/LeavDetail'],resolve)
    },
    {//订单详情
      path: '/OrderDetail/:id/:type',
      name: 'orderDetail',
      component:resolve => require(['@/pages/OrderDetail'],resolve)
    },
    {//联系会员
      path: '/ConnectMember/:orderId/:id/:type',
      name: 'connectMember',
      component:resolve => require(['@/pages/ConnectMember'],resolve)
    },
    {//卖出联系会员
      path: '/SellConnect/:orderId/:id/:type',
      name: 'SellConnect',
      component:resolve => require(['@/pages/SellConnect'],resolve)
    },
    {//支付订单详情GoEvaluate
      path: '/OrderConfirm/:id',
      name: 'OrderConfirm',
      component:resolve => require(['@/pages/OrderConfirm'],resolve)
    },
    {//去评价
      path: '/GoEvaluate/:id',
      name: 'GoEvaluate',
      component:resolve => require(['@/pages/GoEvaluate'],resolve)
    },
    {//二维码详情
      path: '/CodeDetail/:id',
      name: 'CodeDetail',
      component:resolve => require(['@/pages/CodeDetail'],resolve)
    },
    {//投诉列表
      path: '/Complaint',
      name: 'complaint',
      component:resolve => require(['@/pages/Complaint'],resolve)
    },
    {//投诉详情
      path: '/ComplaintDetail/:id',
      name: 'complaintDetail',
      component:resolve => require(['@/pages/ComplaintDetail'],resolve)
    },
    {//发送投诉
      path: '/SendComplaint/:id/:type',
      name: 'SendComplaint',
      component:resolve => require(['@/pages/SendComplaint'],resolve)
    },
    {//订单消息详情
      path: '/OrderMessageDetail/:id',
      name: 'OrderMessageDetail',
      component:resolve => require(['@/pages/OrderMessageDetail'],resolve)
    }
  ]
})
