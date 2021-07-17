import { IValidator } from "../IValidator";

export const customEmailValidator: IValidator = (email: string) => {
  const regex =
    "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$";
    return !!email.match(regex) ? ({ valid: true}) : ({valid: false, errorMessage: `the email ${email} is not valid.`});
};
