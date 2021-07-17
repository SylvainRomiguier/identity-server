import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserPayloadDto } from "../../domain/useCases/verifyToken";

export type Handler = (req: FastifyRequest, res: FastifyReply) => void;

export interface IRouter {
  instance: FastifyInstance;
  get: (route: string, handler: Handler) => void;
  post: (route: string, handler: Handler) => void;
  put: (route: string, handler: Handler) => void;
  delete: (route: string, handler: Handler) => void;
}
