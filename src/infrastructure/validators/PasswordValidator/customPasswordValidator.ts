import { IValidator } from "../../../domain/useCases/IValidator";

export const customPasswordValidator: IValidator = (password: string) => {
  const oneNumberRule = "^.*[0-9].*$";
  const oneCapRule = "^.*[A-Z].*$";
  const oneSpecialCharacterRule = "^.*[#$%&*+/=?_-].*$";

  const validOneNumberRule = !!password.match(oneNumberRule);
  const validOneCapRule = !!password.match(oneCapRule);
  const validOneSpecialCharacterRule = !!password.match(
    oneSpecialCharacterRule
  );
  const valid =
    password.length >= 6 &&
    validOneNumberRule &&
    validOneCapRule &&
    validOneSpecialCharacterRule;

  return valid
    ? { valid: true }
    : {
        valid: false,
        errorMessage: `the password should be at least 6 characters, contains at leat 1 number, 1 upper case letter and 1 special character : #$%&*+/=?_-`,
      };
};
