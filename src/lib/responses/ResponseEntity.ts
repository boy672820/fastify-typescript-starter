import { z } from 'zod';
import { ResponseStatus } from '.';
import responseSchema from './responseSchema';

const responseEntitySchema = responseSchema(z.unknown());

export default class ResponseEntity<T>
  implements z.infer<typeof responseEntitySchema>
{
  private constructor(
    private readonly _responseStatus: ResponseStatus,
    private readonly _message: string,
    private readonly _data: T,
  ) {}

  static OK(): ResponseEntity<''> {
    return new ResponseEntity<''>(ResponseStatus.Ok, '', '');
  }

  static OK_WITH_DATA<T>(message: string, data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(ResponseStatus.Ok, message, data);
  }

  static ERROR(): ResponseEntity<''> {
    return new ResponseEntity<''>(ResponseStatus.Error, '', '');
  }

  static ERROR_WITH_MESSAGE(message: string): ResponseEntity<''> {
    return new ResponseEntity<''>(ResponseStatus.Error, message, '');
  }

  static ERROR_WITH_DATA<T>(message: string, data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(ResponseStatus.Error, message, data);
  }

  get responseStatus(): ResponseStatus {
    return this._responseStatus;
  }

  get message(): string {
    return this._message;
  }

  get data(): T {
    return this._data;
  }
}
