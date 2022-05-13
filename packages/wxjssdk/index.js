import jweixin from 'jweixin-module';
import { isFunc } from '../../utils/index';
class WxSdk {
  constructor(option) {
    // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    // appId: '', // 必填，公众号的唯一标识
    // timestamp: , // 必填，生成签名的时间戳
    // nonceStr: '', // 必填，生成签名的随机串
    // signature: '',// 必填，签名
    // jsApiList: [] // 必填，需要使用的JS接口列表
    this.config = option;
  }

  wxAuthorize(config, isJump = () => false, callback) {
    if (this.isDevLocation() || !this.isWechat()) return false;
    const code = getUrlParam('code');
    const { appId, redirect_url } = config;
    if (isJump && isJump(code)) {
      const handleRedirectUrl = encodeURIComponent(redirect_url);
      const authURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${handleRedirectUrl}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
      window.location.href = authURL;
    } else {
      callback && callback();
    }
  }

  ready(success) {
    jweixin.config(this.config);
    let promise;
    if (!isFunc(success) && window.Promise) {
      promise = new Promise((resolve, reject) => {
        success = function ({ code, error }) {
          code === 1 ? resolve({ code: 1 }) : reject({ code: 0, error });
        };
      });
    }
    jweixin.ready(() => success && success({ code: 1, jweixin }));
    jweixin.error((error) => success && success({ code: 0, error }));
    if (promise) return promise;
  }

  // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
  updateAppMessageShareData(config = {}, success, fail) {
    let promise;
    if (!isFunc(success) && window.Promise) promise = new Promise((resolve, reject) => ((success = resolve), (fail = reject)));
    this.ready((state) => (state.code === 1 ? jweixin.updateAppMessageShareData({ ...config, success, fail }) : fail && fail(state)));
    if (promise) return promise;
  }

  //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
  updateTimelineShareData(config = {}, success, fail) {
    let promise;
    if (!isFunc(success) && window.Promise) promise = new Promise((resolve, reject) => ((success = resolve), (fail = reject)));
    this.ready((state) => (state.code === 1 ? jweixin.updateTimelineShareData({ ...config, success, fail }) : fail && fail(state)));
    if (promise) return promise;
  }

  //微信支付
  chooseWXPay(config = {}, success, fail) {
    let promise;
    if (!isFunc(success) && window.Promise) promise = new Promise((resolve, reject) => ((success = resolve), (fail = reject)));
    this.ready((state) => (state.code === 1 ? jweixin.chooseWXPay({ ...config, success, fail }) : fail && fail(state)));
  }

  /**
   * 地理位置
   * 使用微信内置地图查看位置接口
   */
  openLocation(config = {}, success, fail) {
    let promise;
    if (!isFunc(success) && window.Promise) promise = new Promise((resolve, reject) => ((success = resolve), (fail = reject)));
    this.ready((state) => (state.code === 1 ? jweixin.openLocation({ ...config, success, fail }) : fail && fail(state)));
    if (promise) return promise;
  }

  /**
   * 地理位置
   * 获取地理位置接口
   */
  getLocation(type = 'wgs84', success, fail) {
    let promise;
    if (!isFunc(success) && window.Promise) promise = new Promise((resolve, reject) => ((success = resolve), (fail = reject)));
    this.ready((state) => (state.code === 1 ? jweixin.getLocation({ type, success, fail }) : fail && fail(state)));
    if (promise) return promise;
  }

  // 关闭当前网页窗口接口
  closeWindow(fail) {
    this.ready((state) => (state.code === 1 ? jweixin.closeWindow() : fail && fail(state)));
  }

  // 批量隐藏功能按钮接口
  hideMenuItems(menuList = [], fail) {
    this.ready((state) => (state.code === 1 ? jweixin.hideMenuItems({ menuList }) : fail && fail(state)));
  }

  // 批量隐藏功能按钮接口
  showMenuItems(menuList = [], fail) {
    this.ready((state) => (state.code === 1 ? jweixin.showMenuItems({ menuList }) : fail && fail(state)));
  }

  // 显示所有功能按钮接口 和 隐藏所有非基础按钮接口 共用
  // hideAllNonBaseMenuItem 和 showAllNonBaseMenuItem 共用
  showAllNonBaseMenuItem(show = true) {
    show ? wx.showAllNonBaseMenuItem() : wx.hideAllNonBaseMenuItem();
  }

  // 共享收货地址接口
  openAddress(success, fail) {
    let promise;
    if (!isFunc(success) && window.Promise) promise = new Promise((resolve, reject) => ((success = resolve), (fail = reject)));
    this.ready((state) => (state.code === 1 ? jweixin.openAddress({ success, fail }) : fail && fail(state)));
    if (promise) return promise;
  }

  // 调起微信扫一扫接口
  scanQRCode(config = {}, success, fail) {
    let promise;
    if (!isFunc(success) && window.Promise) promise = new Promise((resolve, reject) => ((success = resolve), (fail = reject)));
    this.ready((state) => (state.code === 1 ? jweixin.scanQRCode({ ...config, success, fail }) : fail && fail(state)));
    if (promise) return promise;
  }

  // 预览图片接口
  previewImage(config, fail) {
    this.ready((state) => (state.code === 1 ? jweixin.previewImage(config) : fail && fail(state)));
  }

  // 拍照或从手机相册中选图接口
  chooseImage(config = {}, success, fail) {
    let promise;
    if (!isFunc(success) && window.Promise) promise = new Promise((resolve, reject) => ((success = resolve), (fail = reject)));
    this.ready((state) => (state.code === 1 ? jweixin.chooseImage({ ...config, success, fail }) : fail && fail(state)));
    if (promise) return promise;
  }

  uploadImage(config = {}, success, fail) {
    let promise;
    if (!isFunc(success) && window.Promise) promise = new Promise((resolve, reject) => ((success = resolve), (fail = reject)));
    this.ready((state) => (state.code === 1 ? jweixin.uploadImage({ ...config, success, fail }) : fail && fail(state)));
    if (promise) return promise;
  }

  isDevLocation() {
    return /localhost/i.test(window.location.host);
  }

  isWechat() {
    return /MicroMessenger/i.test(window.navigator.userAgent);
  }
}
function getUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  let url = window.location.href.split('#')[0];
  let search = url.split('?')[1];
  if (search) {
    var r = search.substr(0).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
  }
  return null;
}
