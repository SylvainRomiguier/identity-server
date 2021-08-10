import { User } from "../entities/user";

export interface IRepository {
    getAllUsers: () => Promise<User[]>;
    addUser: (user:User) => Promise<User>;
    updateUser: (user:User) => Promise<User>;
    removeUser: (id:string) => Promise<void>;
    getUserById: (id:string) => Promise<User | undefined>;
    getUserByEmail: (email:string) => Promise<User | undefined>;
}