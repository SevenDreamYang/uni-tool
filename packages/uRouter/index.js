import { isObj, isStr, isDef, isNum } from '../../utils/index';
/**
 * 对uni中的路由跳转做vue-router 化
 * https://uniapp.dcloud.io/api/router.html#navigateto
 */

class UniToVueRouter {
  constructor({ debug = false }) {
    this.debug = debug;
  }

  /**
   * 对应 uni.navigateTo(OBJECT)
   * https://uniapp.dcloud.io/api/router.html#redirectto
   * todo：保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。。
   * todo: 页面大于10 无法继续跳转 navigateTo 将变换成 redirectTo
   */
  push(_params) {
    if (!isStr(_params) && !isObj(_params)) throw new TypeError('Please pass in string or param object');
    const config = {};
    if (isStr(_params)) config['url'] = _params;
    if (isObj(_params)) {
      const { path, params = {}, query = {}, events = {} } = _params;
      // #ifdef APP-PLUS
      const { animationType = 'pop-in', animationDuration = 300 } = _params;
      config['animationType'] = animationType;
      config['animationDuration'] = animationDuration;
      // #endif
      if (!isObj(params) && !isObj(query)) throw new TypeError('params or query incoming must be an object');
      config['url'] = getPath(path, params, query);
      config['events'] = events;
    }
    // todo : 页面大于10 无法继续跳转 navigateTo 将变换成 redirectTo
    const GOTYPE = getCurrentPages().length >= 10 ? 'redirectTo' : 'navigateTo';
    if (this.debug) console.warn('go to page:' + config['url']);
    return new Promise((success, fail) => uni[GOTYPE]({ ...config, success, fail }));
  }

  /**
   * 对应 uni.redirectTo(OBJECT)
   * https://uniapp.dcloud.io/api/router.html#redirectto
   * todo：url 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。
   * todo：关闭当前页面，跳转到应用内的某个页面。
   */
  replace(_params) {
    if (!isStr(_params) && !isObj(_params)) throw new TypeError('Please pass in string or param object');
    const config = {};
    if (isStr(_params)) config['url'] = _params;
    if (isObj(_params)) {
      const { path, params = {}, query = {} } = _params;
      if (!isObj(params) && !isObj(query)) throw new TypeError('params or query incoming must be an object');
      config['url'] = getPath(path, params, query);
    }
    if (this.debug) console.warn('go to page:' + config['url']);
    return new Promise((success, fail) => uni.redirectTo({ ...config, success, fail }));
  }

  /**
   * 对应 uni.navigateBack(OBJECT)
   * https://uniapp.dcloud.io/api/router.html#navigateBack
   * todo：关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层
   * todo：uni 中回退为正数 vue-router习惯为负数 如果是vue习惯就找绝对值 任何形式传入都可以
   */
  go(_params = 1) {
    if (!isNum(_params) && !isObj(_params)) throw new TypeError('Please pass in number or param object');
    const config = {};
    if (isNum(_params)) {
      // todo: uni 中回退为正数 vue-router习惯为负数 如果是vue习惯就找绝对值
      config['delta'] = Math.abs(params);
    }
    if (isObj(_params)) {
      const { delta } = _params;
      // todo: uni 中回退为正数 vue-router习惯为负数 如果是vue习惯就找绝对值
      config['delta'] = Math.abs(delta);
      // #ifdef APP-PLUS
      const { animationType = 'pop-out', animationDuration = 300 } = _params;
      config['animationType'] = animationType;
      config['animationDuration'] = animationDuration;
      // #endif
    }
    if (this.debug) console.warn('back page:' + config['delta']);
    return new Promise((success, fail) => uni.navigateBack({ ...config, success, fail }));
  }

  /**
   * 对应 uni.switchTab(OBJECT)
   * https://uniapp.dcloud.io/api/router.html#switchtab
   * todo：url 参数需要跳转的 tabBar 页面的路径（需在 pages.json 的 tabBar 字段定义的页面），路径后不能带参数
   * todo：跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
   */
  toTab(url) {
    if (!isStr(url)) throw new TypeError('Please pass in params string');
    if (this.debug) console.warn('back page:' + url);
    return new Promise((success, fail) => uni.switchTab({ url, success, fail }));
  }

  /**
   * 对应 uni.reLaunch(OBJECT)
   * https://uniapp.dcloud.io/api/router.html#reLaunch
   * todo：关闭所有页面，打开到应用内的某个页面。
   * todo：需要跳转的应用内页面路径 , 路径后可以带参数。如果跳转的页面路径是 tabBar 页面则不能带参数
   * todo：H5端调用uni.reLaunch之后之前页面栈会销毁，但是无法清空浏览器之前的历史记录
   */
  closeAllTo(_params) {
    if (!isNum(_params) && !isObj(_params)) throw new TypeError('Please pass in number or param object');
    const config = {};
    if (isStr(_params)) config['url'] = _params;
    if (isObj(_params)) {
      const { path, params = {}, query = {} } = _params;
      if (!isObj(params) && !isObj(query)) throw new TypeError('params or query incoming must be an object');
      config['url'] = getPath(path, params, query);
    }
    if (this.debug) console.warn('back page:' + config['url']);
    return new Promise((success, fail) => uni.reLaunch({ ...config, success, fail }));
  }
}

function ObjectToParams(params) {
  let ParamsSrt = '?';
  Object.entries(params).forEach(([key, value]) => {
    if (isDef(value)) ParamsSrt += `${key}=${value}&`;
  });
  ParamsSrt = ParamsSrt.substring(0, ParamsSrt.length - 1);
  return ParamsSrt;
}

function getPath(path, params, query) {
  const $params = ObjectToParams(params, query);
  return path + $params;
}

export default {
  install: (vue, option = {}) => {
    vue.prototype.$uRouter = new UniToVueRouter(option);
  },
};
