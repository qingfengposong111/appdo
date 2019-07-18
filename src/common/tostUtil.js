import {Toast} from 'mint-ui';
const TostUtil = {
  tostTop:function(message){
    return Toast({
      message: message,
      position: 'top',
      duration: 1000,
      className: 'red'
    });
  }
}
export default TostUtil;
