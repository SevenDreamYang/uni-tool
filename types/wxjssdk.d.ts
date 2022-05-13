type Jweixin = unknown;

interface WxSdkOption {
  debug: boolean;
  appId: string;
  timestamp: number | string;
  nonceStr: string;
  signature: string;
  jsApiList: string[];
}
type WxAuthorizeConfig = { appId: string; redirect_url: string };
interface Success {
  (result: { code: number; jweixin: Jweixin; error: Error }): void;
}
type SuccessResult = { code: number; jweixin: Jweixin };
type UpdateAppMessageShareDataConfig = Record<'title' | 'desc' | 'link' | 'imgUrl', string>;
type UpdateTimelineShareDataConfig = Omit<UpdateAppMessageShareDataConfig, 'desc'>;
type ChooseWXPayConfig = { timestamp: number } & Record<'nonceStr' | 'package' | 'signType' | 'paySign', string>;
type GetLocationType = 'gcj02' | 'wgs84';
type OpenLocationConfig = Record<'latitude' | 'longitude' | 'scale', number> & Record<'name' | 'address' | 'infoUrl', string>;
type ScanType = 'qrCode' | 'barCode';
type ScanQRCodeConfig = { needResult: 0 | 1; ScanType: ScanType[] };
type PreviewImageConfig = { current: string; urls: string[] };
type SizeType = 'original' | 'compressed';
type SourceType = 'album' | 'camera';
type ChooseImageConfig = { count: number; sizeType: SizeType[]; sourceType: SourceType[] };
type UploadImageConfig = { localId: string; isShowProgressTips: number };
interface CallbackFunction<T, R = unknown, E = unknown> {
  (config: T): Promise<unknown>;
  (config: T, success: (result: R) => void, fail?: (error: E) => void): void;
}

declare class WxSdk {
  option: WxSdkOption;
  constructor(option: WxSdkOption);
  wxAuthorize(config: WxAuthorizeConfig, isJump: (code: string) => boolean, callback: () => void): void;
  ready(success: Success): void;
  ready(): Promise<SuccessResult>;
  updateAppMessageShareData: CallbackFunction<UpdateAppMessageShareDataConfig>;
  updateTimelineShareData: CallbackFunction<UpdateTimelineShareDataConfig>;
  chooseWXPay: CallbackFunction<ChooseWXPayConfig>;
  openLocation: CallbackFunction<OpenLocationConfig>;
  getLocation(type: GetLocationType, success: (result: unknown) => void, fail?: (error: unknown) => void): void;
  getLocation(type: GetLocationType): Promise<unknown>;
  closeWindowL(fail?: (error: unknown) => void): void;
  hideMenuItems(menuList: string[]): void;
  showMenuItems(menuList: string[]): void;
  showAllNonBaseMenuItem(show: boolean): void;
  openAddress(success: (result: unknown) => void, fail?: (error: unknown) => void): void;
  openAddress(): Promise<unknown>;
  scanQRCode: CallbackFunction<ScanQRCodeConfig>;
  previewImage(config: PreviewImageConfig, fail?: (error: unknown) => void): void;
  chooseImage: CallbackFunction<ChooseImageConfig>;
  uploadImage: CallbackFunction<UploadImageConfig>;
}
