interface BaseParams {
  path: string;
}

interface AppParams {
  animationType?: any;
  animationDuration?: any;
}

interface UParams extends BaseParams {
  params?: AnyObject;
  query?: AnyObject;
}

interface PushParams extends UParams {
  events?: AnyObject;
}

interface ReplaceParams extends UParams {}

import Vue from 'vue';
interface GoParams extends BaseParams {
  delta?: number;
}

interface CloseAllToParams extends UParams {}

declare class UniToVueRouter {
  push: (_params: string | (PushParams & AppParams)) => Promise<any>;
  replace: (_params: string | ReplaceParams) => Promise<any>;
  go: (_params: number | (GoParams & AppParams)) => Promise<any>;
  toTab: (url: string) => Promise<any>;
  closeAllTo: (_params: number | CloseAllToParams) => Promise<any>;
}

interface InstallationOptions {
  debug: boolean;
}

export declare function install(vue: typeof Vue, options?: InstallationOptions): void {
  vue.prototype.$uRouter = new UniToVueRouter(options);
};
