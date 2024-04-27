export default class HttpException extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errors?: any[],
  ) {
    super(message);
  }
}
