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

  static OkWithData<T>(data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(ResponseStatus.Ok, '', data);
  }

  static Error(): ResponseEntity<null> {
    return new ResponseEntity<null>(ResponseStatus.Error, '', null);
  }

  static ErrorWithMessage(message: string): ResponseEntity<null> {
    return new ResponseEntity<null>(ResponseStatus.Error, message, null);
  }

  static ErrorWithData<T>(message: string, data: T): ResponseEntity<T> {
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
