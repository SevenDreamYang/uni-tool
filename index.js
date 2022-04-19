import * as clipboardData from './packages/clipboardData';
import uRouter from './packages/uRouter';
import storage from './packages/storage';
/* #ifdef H5 */
import wxjssdk from './packages/wxjssdk';
/* #endif */
export {
  clipboardData,
  uRouter,
  storage,
  /* #ifdef H5 */
  wxjssdk,
  /* #endif */
};
