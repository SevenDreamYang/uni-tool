export const takeType = (data) => Object.prototype.toString.call(data).slice(8, -1); // Get the current data type

export const isDef = (data) => ['', null, undefined].indexOf(data) === -1; // Is the value defined

export const isArr = (data) => takeType(data) === 'Array'; // Is value an array

export const isObj = (data) => takeType(data) === 'Object'; // Is the value an object

export const isStr = (data) => typeof data === 'string'; // Is the value an String

export const isNum = (data) => typeof data === 'number'; // Is the value an Number

export const isBool = (data) => typeof data === 'boolean'; // Is the value an Boolean

export const isFunc = (data) => takeType(data) === 'Function'; // Is the value an Function

export const isUndef = (data) => ['', null, undefined].includes(data); // Is the value undefined

export const isPromise = (data) => typeof data === 'object' && typeof data.then === 'function'; // Is the value an Promise

export const isEmptyObj = (data) => isObj(data) && Object.keys(data).length === 0;

export const is_Object_or_Array = (data) => ['Array', 'Object'].includes(takeType(data));

export default { isDef, isArr, isObj, isStr, isNum, isBool, isFunc, isUndef, isPromise, is_Object_or_Array };
