import jsonwebtoken from "jsonwebtoken";
import { ITokenService } from "../ITokenService";

export const makeTokenService = (privateKey: string | undefined, publicKey:string | undefined) => ():ITokenService => {

    if(privateKey === undefined || publicKey === undefined) throw new Error("Private and public keys has to be defined.");

    const sign = (payload: object) => jsonwebtoken.sign(payload, privateKey, {algorithm: "RS256"});
    const verify = (token: string) => jsonwebtoken.verify(token, publicKey, {algorithms: ["RS256"]});

    return Object.freeze({
        sign,
        verify
    })
}