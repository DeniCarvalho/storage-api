const _handle404 = async function (req: any, res: any, next: any) {
  res.status("404").json({ status: 404, message: "URL não encontrada." });
  next();
};

export const handle404 = _handle404;
