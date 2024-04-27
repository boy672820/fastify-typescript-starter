import HttpException from './HttpException';

export default class ConflictException extends HttpException {
  constructor(message = 'Conflict') {
    super(409, message);
  }
}
