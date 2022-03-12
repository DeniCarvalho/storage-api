import { IStorageProvider, IObject } from "../storage_provider";
import S3 from "aws-sdk/clients/s3";

import { RequestError } from "../../../../errors/requestError";
require("dotenv-safe").config();

export class S3Provider implements IStorageProvider {
  private _s3: S3;
  constructor() {
    this._s3 = new S3({
      accessKeyId: process.env.AWS_S3_USER_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_KEY,
      httpOptions: {
        //agent: proxy('http://10.100.1.141:8080')
      },
    });
  }
  async upload(object: IObject): Promise<void> {
    try {
      const params = {
        Bucket: object.bucket,
        Key: object.key,
        Body: object.fileContent,
      };
      await this._s3.upload(params).promise();
    } catch (error) {
      throw new RequestError(error);
    }
  }
}
