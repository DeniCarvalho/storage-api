export interface IObject {
  bucket: string;
  key: string;
  fileContent: Buffer;
}

export interface IObjectGet {
  bucket: string;
  key: string;
}

export interface IStorageProvider {
  upload(object: IObject): Promise<void>;
  get(object: IObjectGet): Promise<string>;
  getAll(object: IObjectGet): Promise<any>;
  delete(object: IObjectGet): Promise<void>;
}
