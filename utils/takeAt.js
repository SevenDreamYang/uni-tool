import { isArr, isObj, isNum, isStr, isUndef } from './assert.js';

/**
 * Object takes value by path
 * @param {any} source
 * @param {String|Number} path
 * @param {any} value
 * @returns
 */
export default function (source, path, value = undefined) {
  let target = source;
  let handlePath = path;

  // 如果是数字则转换为字符串
  if (isNum(path)) handlePath = isNaN(path) ? '' : path.toString();

  // 如果路径不是字符串则返回默认值
  if (!isStr(handlePath)) return value;

  // 判断是不是对象或数组，如果都不是就返回目标对象
  if (!isObj(source) && !isArr(source)) return source;

  // 将路径格式转数组
  const routes = handlePath.replace(/(\[|\])/g, (a) => (a === '[' ? '.' : '')).split('.');

  // 返回取得的结果
  for (let i = 0, len = routes.length; i < len; i++) {
    const field = routes[i];
    if (isUndef(target[field])) return (target = value);
    target = target[field];
  }

  return target;
}
