import { IObject, IStorageProvider } from "../../core/providers";

export class UploadVideoUsecase {
  constructor(private storageProvider: IStorageProvider) {}

  async execute(object: IObject) {
    await this.storageProvider.upload(object);
  }
}
