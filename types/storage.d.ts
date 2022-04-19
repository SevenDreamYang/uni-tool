export declare interface storage {
  set: (key: string, data: any) => void;
  get: (key: string) => any;
  clear: (key: string) => void;
  remove: (key: string) => void;
}
