import { isDef, isUndef } from './assert';

export default {
  /**
   * @function 设置storage
   * @param {String} key 键值
   * @param { * } data 数据
   */
  set(key, data) {
    if (isUndef(key)) return console.warn('storage的key不能为空,type:set');
    try {
      uni.setStorageSync(key, data);
    } catch (err) {
      console.error(err);
    }
  },
  /**
   * @function 设置storage
   * @param {String} key 键值
   */
  get(key) {
    if (isUndef(key)) return console.warn('storage的key不能为空,type:get');
    const storage = uni.getStorageSync(key);
    return isDef(storage) ? storage : null;
  },
  /**
   * @function 清除所有storage
   */
  clear() {
    try {
      uni.clearStorageSync();
    } catch (err) {
      console.error(err);
    }
  },
  /**
   * @function 删除指定值
   * @param {String} key 键值
   */
  remove(key) {
    if (isUndef(key)) return console.warn('storage的key不能为空,type:remove');
    try {
      uni.removeStorageSync(key);
    } catch (err) {
      console.error(err);
    }
  },
};
