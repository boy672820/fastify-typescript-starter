import HttpException from './HttpException';

export default class BadRequestException extends HttpException {
  constructor(message = 'Bad Request', errors?: any[]) {
    super(400, message, errors);
  }
}
