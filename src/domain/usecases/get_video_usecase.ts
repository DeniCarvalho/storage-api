import { IObjectGet, IStorageProvider } from "../../core/providers";

export class GetVideoUsecase {
  constructor(private storageProvider: IStorageProvider) {}

  async execute(object: IObjectGet): Promise<string> {
    return await this.storageProvider.get(object);
  }
}
