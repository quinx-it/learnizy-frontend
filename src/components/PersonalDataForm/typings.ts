import { type createPersonalDataSchema } from './const';

import type * as yup from 'yup';

export type PersonalDataFormValuesType = yup.InferType<ReturnType<typeof createPersonalDataSchema>>;
