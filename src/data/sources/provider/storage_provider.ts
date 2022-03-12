export interface IObject {
  bucket: string;
  key: string;
  fileContent: Buffer;
}

export interface IStorageProvider {
  upload(object: IObject): Promise<void>;
}
