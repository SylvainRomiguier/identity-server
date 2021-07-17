import { ITokenService } from "../../infrastructure/services/ITokenService";

export interface UserPayloadDto {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  userName: string;
  scopes: string[];
  iat: number;
}

export const makeVerifyToken =
  (tokenService: ITokenService) =>
  (token: string): UserPayloadDto => {
    try {
      return (tokenService.verify(token) as unknown) as UserPayloadDto;
    } catch (error) {
      throw new Error(`Error in verifyToken : ${error.message}`);
    }
  };
