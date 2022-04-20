import { isDef, isStr, isFunc } from '../../utils/index';

//保存图片到系统相册。
function saveImageToPhotosAlbum(config) {
  if (!isDef(config.filePath) && !isStr(config.filePath)) throw new ReferenceError('Please pass in parameters：filePath');
  let promise;
  // #ifndef H5
  if (!isFunc(config.success)) promise = new Promise((resolve, reject) => ((config.success = resolve), (config.fail = reject)));
  uni.saveImageToPhotosAlbum(config);
  // #endif
  // #ifdef H5
  if (!isFunc(config.success) && window.Promise) promise = new Promise((resolve, reject) => ((config.success = resolve), (config.fail = reject)));
  const upload = async () => {
    const handleName = invoice.split('/');
    const fileName = handleName[handleName.length - 1];
    try {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', config.filePath, true);
      xhr.responseType = 'blob';
      xhr.onload = function () {
        if (this.status === 200) {
          var blob = this.response;
          var reader = new FileReader();
          reader.readAsDataURL(blob); // 转换为base64，可以直接放入a表情href
          reader.onload = function (e) {
            const a = document.createElement('a');
            a.href = e.target.result;
            a.download = fileName || '文件';
            a.click();
            a.remove();
            config.success();
          };
        }
      };
      xhr.send();
    } catch (error) {
      config.fail(error);
    }
    upload();
    // #endif
  };
}
