import { Hash } from "../../domain/entities/user";
export interface IPasswordService {
  hash(password: string): Hash;
  isEqual(password: string, hash: Hash): boolean;
}
