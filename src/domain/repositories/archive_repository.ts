import { Archive } from "../entities/archive";

export interface IArchiveRepository {
  upload(bucket: string, path: string): Promise<void>;
  find(path: string): Promise<Archive>;
  findAll(directory: string): Promise<Array<Archive>>;
  delete(path: string): Promise<null>;
}
