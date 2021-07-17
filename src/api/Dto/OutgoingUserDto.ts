import { User } from "../../domain/entities/user";

export interface OutgoingUserDto {
    id: string;
    lastName :string;
    firstName: string;
    email: string;
    userName: string;
}

export const toOutgoingUserDto = (user:User): OutgoingUserDto => ({
    id: user.id,
    lastName: user.lastName,
    firstName: user.firstName,
    email: user.email,
    userName: user.userName
})