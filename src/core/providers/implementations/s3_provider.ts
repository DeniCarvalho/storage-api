import { IStorageProvider, IObject } from "../storage_provider";
import S3 from "aws-sdk/clients/s3";

import { RequestError } from "../../errors/requestError";
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

  async get(object: IObject): Promise<string> {
    try {
      const params = {
        Bucket: object.bucket,
        Key: `${object.key}${process.env.OUTPUT_EXTENSION}`,
      };
      const url = await this._s3.getSignedUrlPromise("getObject", params);
      return url;
    } catch (error) {
      throw new RequestError(error);
    }
  }

  async getAll(object: IObject): Promise<any> {
    try {
      const params = {
        Bucket: object.bucket,
        Prefix: object.key,
      };
      const data = await this._s3.listObjects(params).promise();
      return data;
    } catch (error) {
      throw new RequestError(error);
    }
  }

  async delete(object: IObject): Promise<void> {
    try {
      const params = {
        Bucket: object.bucket,
        Key: `${object.key}${process.env.OUTPUT_EXTENSION}`,
      };
      await this._s3.deleteObject(params).promise();
    } catch (error) {
      throw new RequestError(error);
    }
  }
}
