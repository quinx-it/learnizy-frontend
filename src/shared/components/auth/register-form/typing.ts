export type VerificationFormValues = {
  code: string;
};

export enum RegisterStep {
  REGISTER = 'register',
  VERIFY = 'verify',
}
