type SaveImageSuccessesult = Record<'path' | 'errMsg', string>;
type failError = Record<'errMsg', string>;
interface SaveImageToPhotosAlbumOptions {
  filePath: string;
  success: (result: SaveImageSuccessesult) => void;
  fail?: (error: Error) => void;
  complete?: (comp: SaveImageSuccessesult | failError) => void;
}

type SaveImageToPhotosAlbumAsyncOptions = Record<'filePath', string>;

declare function saveImageToPhotosAlbum(options: SaveImageToPhotosAlbumOptions): void;

declare function saveImageToPhotosAlbum(options: SaveImageToPhotosAlbumAsyncOptions): Promise<Success>;
