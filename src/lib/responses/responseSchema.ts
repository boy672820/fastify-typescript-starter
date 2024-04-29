import { z } from 'zod';
import { ResponseStatus } from '.';

export default <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    responseStatus: z.nativeEnum(ResponseStatus),
    message: z.string(),
    data,
  });
