import { FastifyInstance } from "fastify";
import { IRouter, Handler } from "../IRouter";
import { routesOptions, Method } from "./routesOptions";

const findRouteOptions = (method: Method, route: string) => routesOptions.find(r => r.route === route && r.method === method) || {};

export const makeFastifyRouter = (
  fastifyInstance: FastifyInstance
): IRouter => {
  return Object.freeze({
    instance: fastifyInstance,
    get: (route: string, handler: Handler) =>
      fastifyInstance.get(route, findRouteOptions("GET", route), handler),
    post: (route: string, handler: Handler) =>
      fastifyInstance.post(route, findRouteOptions("POST", route), handler),
    put: (route: string, handler: Handler) =>
      fastifyInstance.put(route, findRouteOptions("PUT", route), handler),
    delete: (route: string, handler: Handler) =>
      fastifyInstance.delete(route, findRouteOptions("DELETE", route), handler),
  });
};
