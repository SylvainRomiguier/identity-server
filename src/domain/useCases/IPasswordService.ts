import { Hash } from "../entities/user";
export interface IPasswordService {
  hash(password: string): Hash;
  isEqual(password: string, hash: Hash): boolean;
}
