import {
  AddUser,
  GetAllUsers,
  GetUserById,
  Login,
  RemoveUser,
  UpdateUser,
  VerifyToken,
} from "../../domain/useCases";
import { Handler } from "../../infrastructure/routers/IRouter";
import { IncomingLoginDto } from "../Dto/IncomingLoginDto";
import { IncomingUserDto } from "../Dto/IncomingUserDto";
import { OutGoingTokenDto } from "../Dto/OutgoingTokenDto";
import { toOutgoingUserDto } from "../Dto/OutgoingUserDto";

export const getUsers =
  (getAllUsers: GetAllUsers): Handler =>
  async (req, res) => {
    try {
      res.send((await getAllUsers()).map((user) => toOutgoingUserDto(user)));
    } catch (error) {
      res.status(500).send(`error in getUsers : ${error.message}`);
    }
  };

export const getUserById =
  (getUserById: GetUserById): Handler =>
  async (req, res) => {
    const { id } = req.params as { id: string };
    try {
      const user = await getUserById(id);
      if (user) {
        res.send(toOutgoingUserDto(user));
      } else {
        res.status(404).send("no user found with this id.");
      }
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

export const postNewUser =
  (addUser: AddUser): Handler =>
  async (req, res) => {
    try {
      const body = req.body as IncomingUserDto;
      const newUser = await addUser(
        body.firstName,
        body.lastName,
        body.userName,
        body.email,
        body.password,
        body.scopes
      );
      res.status(200).send(toOutgoingUserDto(newUser));
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  };

export const putUpdatedUser =
  (updateUser: UpdateUser): Handler =>
  async (req, res) => {
    try {
      const body = req.body as IncomingUserDto;
      const { id } = req.params as { id: string };
      const updatedUser = await updateUser(
        id,
        body.firstName,
        body.lastName,
        body.userName,
        body.email,
        body.password,
        body.scopes
      );
      res.status(200).send(toOutgoingUserDto(updatedUser));
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const deleteUser =
  (removeUser: RemoveUser): Handler =>
  async (req, res) => {
    try {
      const { id } = req.params as { id: string };
      await removeUser(id);
      res.status(200).send(`User with id: ${id} removed.`);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const login =
  (login: Login): Handler =>
  async (req, res) => {
    try {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", ["POST", "OPTIONS"]);
      const body = req.body as IncomingLoginDto;
      const token = await login(body.email, body.password);
      res.status(200).send({ token } as OutGoingTokenDto);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  };

export const verifyToken =
  (verifyToken: VerifyToken): Handler =>
  (req, res) => {
    try {
      const { authorization } = req.headers;
      const token = authorization?.split(" ")[1];
      if (token) {
        const user = verifyToken(token);
        if (user) {
          res.status(200).send(user);
        } else {
          res.status(401).send("you are not authorized.");
        }
      } else {
        res.status(401).send("you are not authorized.");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  };
