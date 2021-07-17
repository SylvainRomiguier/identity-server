import { IRepository } from "../../infrastructure/repositories/IRepository";
import { IPasswordService } from "../../infrastructure/services/IPasswordService";
import { ITokenService } from "../../infrastructure/services/ITokenService";

interface UserLoginDto {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  userName: string;
  scopes: string[];
}

export const makeLogin =
  (
    passwordService: IPasswordService,
    tokenService: ITokenService,
    repository: IRepository
  ) =>
  async (email: string, password: string): Promise<string> => {
    const user = await repository.getUserByEmail(email);
    if (!user) {
      throw new Error(`The user with email address ${email} does not exist.`);
    }

    if (!passwordService.isEqual(password, user.password)) {
      throw new Error(`The password is invalid for email address ${email}.`);
    }

    const userToEncode: UserLoginDto = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
      scopes: user.scopes,
    };
    try {
      return tokenService.sign(userToEncode);
    } catch (error) {
      throw new Error(`Unable to deliver a token in login : ${error.message}`);
    }
  };
