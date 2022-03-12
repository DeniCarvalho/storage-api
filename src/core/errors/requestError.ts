export class RequestError extends Error {
  status: number;
  data: any;
  constructor(message: string, status = 400, data = {}) {
    super(message), (this.name = this.constructor.name);
    Error.captureStackTrace(this, this.constructor);
    this.status = status;
    this.data = data;
  }

  statusCode() {
    return this.status;
  }

  messageError() {
    return (
      this.message ||
      "An internal error has occurred. Contact technical support."
    );
  }

  dataError() {
    return this.data;
  }

  jsonResponse() {
    return {
      status: this.statusCode(),
      message: this.messageError(),
      data: this.dataError(),
    };
  }
}
