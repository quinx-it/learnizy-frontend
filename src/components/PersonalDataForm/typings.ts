import * as yup from 'yup';

import { createPersonalDataSchema } from './const';

export type PersonalDataFormValuesType = yup.InferType<ReturnType<typeof createPersonalDataSchema>>;
