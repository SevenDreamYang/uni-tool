import { isDef } from '../../utils/index';

function setClipboardData(data, showToast = false, successMsg = '复制成功', failMsg = '复制失败') {
  const text = isDef(data) ? String(data) : '';
  return new Promise((success, fail) => {
    // #ifdef APP-PLUS
    const os = plus.os.name;
    try {
      if ('iOS' == os) {
        let pasteboard = plus.ios.invoke('UIPasteboard', 'generalPasteboard');
        plus.ios.invoke(pasteboard, 'setValue:forPasteboardType:', text, 'public.utf8-plain-text');
        const result = { code: 1, env: 'ios', msg: 'setClipboardData:ok', text };
        showToast && uni.showToast({ icon: 'success', title: successMsg });
        success(result);
      } else {
        let main = plus.android.runtimeMainActivity();
        let clip = main.getSystemService('clipboard');
        plus.android.invoke(clip, 'setText', text);
        const result = { code: 1, env: 'android', msg: 'setClipboardData:ok', text };
        showToast && uni.showToast({ icon: 'success', title: successMsg });
        success(result);
      }
    } catch (err) {
      showToast && uni.showToast({ icon: 'error', title: failMsg });
      fail({ code: 0, env: os, msg: 'setClipboardData:fail', text });
    }
    // #endif

    // #ifdef H5
    if (!document.queryCommandSupported('copy')) {
      fail({ code: 0, env: 'H5', msg: 'setClipboardData:The current browser does not support copying', text });
    }
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.readOnly = true;
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      const isok = document.execCommand('copy');
      if (!isok) throw new Error();
      textarea.remove();
      const result = { code: 1, env: 'H5', msg: 'setClipboardData:ok', text };
      showToast && uni.showToast({ icon: 'success', title: successMsg });
      success(result);
    } catch (error) {
      showToast && uni.showToast({ icon: 'error', title: failMsg });
      fail({ code: 0, env: 'H5', msg: 'setClipboardData:fail', text });
    }
    // #endif

    // #ifndef H5 || APP-PLUS
    uni.setClipboardData({
      data: text,
      success: function () {
        !showToast && uni.hideToast();
        success({ code: 1, env: 'MP', msg: 'setClipboardData:ok', text });
      },
      fail: function () {
        showToast && uni.showToast({ icon: 'error', title: failMsg });
        fail({ code: 0, env: 'MP', msg: 'setClipboardData:fail', text });
      },
    });
    // #endif
  });
}

function getClipboardData() {
  return new Promise((success, fail) => {
    // #ifdef APP-PLUS
    const os = plus.os.name;
    try {
      let value = '';
      if ('iOS' == os) {
        let pasteboard = plus.ios.invoke('UIPasteboard', 'generalPasteboard');
        value = plus.ios.invoke(pasteboard, 'valueForPasteboardType:', 'public.utf8-plain-text');
        success(value);
      } else {
        let main = plus.android.runtimeMainActivity();
        let clip = main.getSystemService('clipboard');
        value = plus.android.invoke(clip, 'getText');
        success(value);
      }
    } catch (e) {
      fail({ code: 0, env: os, msg: 'getClipboardData:fail' });
    }
    // #endif

    // #ifdef H5
    try {
      if (!window.navigator.clipboard) {
        fail({
          code: 0,
          env: 'H5',
          msg: 'getClipboardData:The current browser does not support getting clipboard information, or the user does not authorize clipboard information. Please in HTTPS environment or http://localhost Use in environment',
        });
      }
      window.navigator.clipboard
        .readText()
        .then(success)
        .catch((err) => fail({ code: 0, env: 'H5', msg: 'getClipboardData:' + err.message }));
    } catch (error) {
      fail(error);
    }

    // #endif

    // #ifndef H5 || APP-PLUS
    uni.getClipboardData({
      success: ({ data }) => success(data),
      fail: () => fail({ code: 0, env: 'MP', msg: 'getClipboardData:fail' }),
    });
    // #endif
  });
}

function sync(fn, ...arg) {
  return new Promise((resolve) =>
    fn
      .apply(null, arg)
      .then((result) => [null, result])
      .catch((result) => [result, null]),
  );
}

const setClipboardDataSync = (...arg) => sync(setClipboardData, ...arg);

const getClipboardDataSync = () => sync(setClipboardData);

export { setClipboardData, getClipboardData, setClipboardDataSync, getClipboardDataSync };
