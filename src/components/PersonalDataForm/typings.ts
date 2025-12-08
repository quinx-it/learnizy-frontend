import * as yup from 'yup';

import { createPersonalDataSchema } from './validations';

export type PersonalDataFormValuesType = yup.InferType<ReturnType<typeof createPersonalDataSchema>>;
