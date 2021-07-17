import jsonwebtoken from "jsonwebtoken";
import { ITokenService } from "../ITokenService";

export const makeTokenService = () => ():ITokenService => {

    const key = "myBeautifulKey";

    const sign = (payload: object) => jsonwebtoken.sign(payload, key);
    const verify = (token: string) => jsonwebtoken.verify(token, key);

    return Object.freeze({
        sign,
        verify
    })
}