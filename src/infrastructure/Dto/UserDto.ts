import {User, Hash} from "../../domain/entities/user";
export interface UserDto {
    id: string;
    lastName :string;
    firstName: string;
    email: string;
    userName: string;
    password: Hash;
    scopes: string[]
}

export const userDtoFromDomain = (user:User):UserDto => Object.freeze({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userName: user.userName,
    password: user.password,
    scopes: user.scopes
});

export const userDtoToDomain = (user:UserDto):User => Object.freeze({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userName: user.userName,
    password: user.password,
    scopes: user.scopes
});