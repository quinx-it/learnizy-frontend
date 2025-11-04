import * as yup from 'yup';
import { personalDataSchema } from './validations';

export type PersonalDataFormValuesType = yup.InferType<typeof personalDataSchema>;
