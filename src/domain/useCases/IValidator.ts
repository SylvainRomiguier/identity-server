export type IValidator = (stringToValidate:string) => ({
    valid: boolean,
    errorMessage?: string
});