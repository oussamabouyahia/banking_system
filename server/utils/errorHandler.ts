import { Response } from "express";
const internalError = (res: Response, error: any) => {
  res
    .status(error.status || 500)
    .send(error.message || "internal server issue");
};
export default internalError;
