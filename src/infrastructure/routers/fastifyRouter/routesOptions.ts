export type Method = "GET" | "POST" | "PUT" | "DELETE";

export const routesOptions = [
  {
    method: "GET",
    route: "/users",
    schema: {
      description: "get all users",
    },
  },
  {
    method: "GET",
    route: "/users/:id",
    schema: {
      description: "retrieve a user by id",
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "user id",
          },
        },
      },
    },
  },
  {
    method: "PUT",
    route: "/users/:id",
    schema: {
      description: "update a user by id",
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "user id",
          },
        },
      },
      body: {
        type: "object",
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          userName: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
        },
      },
    },
  },
  {
    method: "DELETE",
    route: "/users/:id",
    schema: {
      description: "delete a user by id",
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "user id",
          },
        },
      },
    },
  },
  {
    method: "POST",
    route: "/users",
    schema: {
      description: "create a new user",
      body: {
        type: "object",
        required: ["firstName", "lastName", "userName", "password", "email"],
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          userName: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
        },
      },
    },
  },
  {
    method: "POST",
    route: "/users/login",
    schema: {
      description: "login",
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
    },
  },
];
