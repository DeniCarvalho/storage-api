import { IObjectGet, IStorageProvider } from "../../core/providers";

export class DeleteVideoUsecase {
  constructor(private storageProvider: IStorageProvider) {}

  async execute(object: IObjectGet): Promise<void> {
    await this.storageProvider.delete(object);
  }
}
