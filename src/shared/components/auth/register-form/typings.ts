export type VerificationFormValuesType = {
  code: string;
};

export enum RegisterStep {
  REGISTER = 'register',
  VERIFY = 'verify',
}

export interface IRegisterFormValues {
  login: string;
  password: string;
  email: string;
  repeatPassword: string;
  agreement: boolean;
}
