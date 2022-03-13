import { RequestError } from "../errors/requestError";

const _handleError = async function (
  error: RequestError,
  req: any,
  res: any,
  _: any
) {
  if (error && error.statusCode)
    res.status(error.statusCode()).json(error.jsonResponse());
  else res.status(500).send();
  _log(res, req);
};

const _log = (res: any, req: any) => {
  let current_datetime = new Date();
  let formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();
  let method = req.method;
  let url = req.url;
  let status = res.statusCode;
  let log = `[${formatted_date}] - ${status} - ${method}:${url}`;
  console.log(log);
};
export const handleError = _handleError;