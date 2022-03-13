import { IObjectGet, IStorageProvider } from "../../core/providers";

export class GetAllVideoUsecase {
  constructor(private storageProvider: IStorageProvider) {}

  async execute(object: IObjectGet): Promise<any> {
    return await this.storageProvider.getAll(object);
  }
}
