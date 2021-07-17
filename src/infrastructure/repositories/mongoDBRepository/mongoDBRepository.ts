import { UserDto, userDtoToDomain } from "../../Dto/UserDto";
import { IRepository } from "../IRepository";
import { Collection, MongoClient } from "mongodb";

export const makeMongoDBRepository =
  (connectionString: string | undefined) => async (): Promise<IRepository> => {
    if (connectionString === undefined) {
      throw new Error(
        "Unable to connect to mongoDB repository : no connection string."
      );
    }

    // TODO : implements methods for mongoDB
    const client = new MongoClient(connectionString);
    let users:Collection<UserDto>;

    const init = async () => {
      try {
        await client.connect();
        const database = client.db("users");
        users = database.collection("users");
      } catch (e) {
        await client.close();
        throw new Error("unable to connect to mongoDB cluster.");
      }
    };

    await init();

    const getAllUsers = async () => {
      const _users = await users.find().toArray();
      return _users.map((u) => userDtoToDomain(u));
    }
    const addUser = async (user: UserDto) => {
      const _user = await users.insertOne({...user});
      return userDtoToDomain(user);
    };
    const removeUser = async (id: string) => {
      await users.deleteOne({id});
    };
    const updateUser = async (user: UserDto) => {
      await users.findOneAndReplace({id:user.id}, user);
      return userDtoToDomain(user);
    };
    const getUserByEmail = async (email: string) => {
      const existingUser = await users.findOne({email});
      if (existingUser) {
        return userDtoToDomain(existingUser);
      }
      return undefined;
    };
    const getUserById = async (id: string) => {
      const existingUser = await users.findOne({id});
      if (existingUser) {
        return userDtoToDomain(existingUser);
      }
      return undefined;
    };

    return Object.freeze({
      getAllUsers,
      addUser,
      updateUser,
      removeUser,
      getUserByEmail,
      getUserById,
    });
  };
