import HttpException from './HttpException';

export default class InternalServerErrorException extends HttpException {
  constructor(message = 'Internal Server Error') {
    super(500, message);
  }
}
