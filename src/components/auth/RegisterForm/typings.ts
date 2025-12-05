export type VerificationFormValuesType = {
  code: string;
};

export enum RegisterStep {
  Register = 'Register',
  Verify = 'Verify',
}

export interface IRegisterFormValues {
  login: string;
  password: string;
  email: string;
  repeatPassword: string;
  agreement: boolean;
}
