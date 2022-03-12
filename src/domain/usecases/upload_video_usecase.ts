import { IObject, IStorageProvider } from "../../data/sources/provider";

export class UploadVideoUsecase {
  constructor(private storageProvider: IStorageProvider) {}

  async execute(object: IObject) {
    await this.storageProvider.upload(object);
  }
}
