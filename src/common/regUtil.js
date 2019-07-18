  let regChinese = /^[\u4e00-\u9fa5]{3,8}$/;//中文
  let phoneNumber = /^1[3-9]\d{9}$/;//电话号码
  let regEnglish = /^[a-zA-Z]{6,18}$/;//英文
  let regEnglishNumber = /^[0-9A-Za-z]{6,18}$/;//英文数字组合
  let regPwd= /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,18}$/;//密码8-16位
  let numReg = /^\d{1,}$/;//转码个数
  let safePwdReg = /^\d{6}$/;//六位数字安全密码
  let bankReg = /^\d{16,19}$/;
  let userName = /^([\u4e00-\u9fa5]{2,5})|([a-zA-Z]{3,})$/;//真实名字 英文或中文
  const RegUtil={
    isMatchChinese: function (words) {//中文验证
      return regChinese.test(words);
    },
    isMatchPhoneNumber: function (words) {//手机验证
      return phoneNumber.test(words);
    },
    isMatchEnglish: function (words) {//英文验证
      return regEnglish.test(words);
    },
    isMatchEnlishNumber: function (words) {//英文数字验证
      return regEnglishNumber.test(words);
    },
    isMatchPwd: function (words) {//密码验证，6-18位
      return regPwd.test(words);
    },
    isMatchNumber: function (words) {//转码个数
      return numReg.test(words);
    },
    isMatchSafePwd: function (words) {//六位数字安全密码
      return safePwdReg.test(words);
    },
    isMatchBankNumber: function (words) {//16到19位银行卡号
      return bankReg.test(words);
    },
    isMatchRealName: function (words) {//真实姓名，英文或口中文
      return userName.test(words);
    },
    isMatchMix: function (words) {//前四个的组合
      return (
        this.isMatchChinese(words) || this.isMatchPhoneNumber(words) || this.isMatchEnlishNumber(words) || this.isMatchEnglish(words)
        );
    },

  };
  export default RegUtil;
