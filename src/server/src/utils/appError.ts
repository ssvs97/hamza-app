export default class AppError extends Error {
  status: string;
  isOperational: boolean;
  constructor(message: string, public statusCode: number) {
    super(message);
    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";
    // types of error ['programming' or 'operational']
    this.isOperational = true;

    // line in that error occurs
    Error.captureStackTrace(this, this.constructor);
  }
}
