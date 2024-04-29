import { responseSchema } from '@lib/responses';
import { z } from 'zod';

// empty
export default responseSchema(z.string());
