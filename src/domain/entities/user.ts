export interface User {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  userName: string;
  password: Hash;
  scopes: string[];
}

export interface Hash {
  salt: string;
  hashedPassword: string;
}

export const makeUser =
  () =>
  (
    id: string,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: Hash,
    scopes: string[]
  ): User =>
    Object.freeze({
      id,
      firstName,
      lastName,
      userName,
      email,
      password,
      scopes,
    });
