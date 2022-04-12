type ReturnInfo = { code: number; msg: string; env: string; text?: string };

type SetClipboard<T> = (data: string, showToast?: boolean, successMsg?: string, failMsg?: string) => Promise<T>;

type SyncReturnReverse<F, S> = [F, S] | [S, F];

export declare const setClipboardData: SetClipboard<ReturnInfo>;

export declare function getClipboardData(): Promise<string>;

export declare const setClipboardDataSync: SetClipboard<SyncReturnReverse<null, ReturnInfo>>;

export declare function getClipboardDataSync(): Promise<SyncReturnReverse<null, string | ReturnInfo>>;
