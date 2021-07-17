import { IRouter, Handler } from "../IRouter";

export const makeExpressRouter = (
  expressInstance: any
): IRouter => {
  return Object.freeze({
    instance: expressInstance,
    get: (route: string, handler: Handler) =>
      expressInstance.get(route, handler),
    post: (route: string, handler: Handler) =>
      expressInstance.post(route, handler),
    put: (route: string, handler: Handler) =>
      expressInstance.put(route, handler),
    delete: (route: string, handler: Handler) =>
      expressInstance.delete(route, handler),
  });
};
