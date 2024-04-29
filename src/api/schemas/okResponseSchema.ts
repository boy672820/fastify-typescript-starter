import { z } from 'zod';
import { responseSchema } from '../../lib/responses';

export default responseSchema(z.string());
