import fastify from "fastify";
import { usersRoutes } from "@/http/controllers/users/routes";

export const app = fastify()

app.register(usersRoutes)
