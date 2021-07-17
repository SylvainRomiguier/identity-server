import { User } from "../../domain/entities/user";
import { UserDto } from "../Dto/UserDto";

export interface IRepository {
    getAllUsers: () => Promise<UserDto[]>;
    addUser: (user:UserDto) => Promise<User>;
    updateUser: (user:UserDto) => Promise<User>;
    removeUser: (id:string) => Promise<void>;
    getUserById: (id:string) => Promise<User | undefined>;
    getUserByEmail: (email:string) => Promise<User | undefined>;
}