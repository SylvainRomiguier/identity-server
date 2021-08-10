import crypto from "crypto";
import { IPasswordService } from "../../../domain/useCases/IPasswordService";
import { Hash } from "../../../domain/entities/user";

const generateSalt = (rounds: number) => {
  if (rounds >= 15) {
    throw new Error(`${rounds} is greater than 15, must be less that 15`);
  }
  if (rounds == null) {
    rounds = 12;
  }
  return crypto
    .randomBytes(Math.ceil(rounds / 2))
    .toString("hex")
    .slice(0, rounds);
};

const _hasher = (password: string, salt: string) => {
  let hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  let value = hash.digest("hex");
  return {
    salt: salt,
    hashedPassword: value,
  };
};

const hash = (password: string) => _hasher(password, generateSalt(12));

const isEqual = (password:string, hash: Hash) => {
    let passwordData = _hasher(password, hash.salt);
    if (passwordData.hashedPassword === hash.hashedPassword) {
        return true;
    }
    return false
};

export const passwordService:IPasswordService = {hash, isEqual};
