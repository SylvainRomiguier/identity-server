export interface ITokenService  {
    sign(payload: string | object | Buffer): string;
    verify(token:string): any;
}