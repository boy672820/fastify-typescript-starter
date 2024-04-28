import { z } from 'zod';

export enum ResponseStatus {
  Ok = 'OK',
  Error = 'ERROR',
}

export const responseSchema = z.object({
  responseStatus: z.nativeEnum(ResponseStatus),
  message: z.string(),
  data: z.any(),
});

export default class ResponseEntity<T>
  implements z.infer<typeof responseSchema>
{
  private constructor(
    private readonly _responseStatus: ResponseStatus,
    private readonly _message: string,
    private readonly _data: T,
  ) {}

  static Ok(): ResponseEntity<null> {
    return new ResponseEntity<null>(ResponseStatus.Ok, '', null);
  }

  static OK_WITH_MESSAGE(message: string): ResponseEntity<null> {
    return new ResponseEntity<null>(ResponseStatus.Ok, message, null);
  }

  static OK_WITH_DATA<T>(message: string, data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(ResponseStatus.Ok, message, data);
  }

  static ERROR(): ResponseEntity<null> {
    return new ResponseEntity<null>(ResponseStatus.Error, '', null);
  }

  static ERROR_WITH_MESSAGE(message: string): ResponseEntity<null> {
    return new ResponseEntity<null>(ResponseStatus.Error, message, null);
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
