import { User } from "@/features/auth/domain/models/Auth";
import { createServer, Model, Registry, Response, Server } from "miragejs";
import { ModelDefinition } from "miragejs/-types";

const UserModel: ModelDefinition<User> = Model.extend({});

export const makeServer = ({ environment = "development" } = {}) => {
  const serverInstances = createServer({
    environment,
    models: {
      user: UserModel,
    },

    seeds(server) {
      server.create("user", {
        name: 'khalil',
        email: "khalil@gmail.com",
        password: "khalil123",
      });
    },

    routes() {
      this.namespace = "api"

      this.post("/auth/login", (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);

        const user = schema.db.users.findBy({ email });

        if (!user) {
          return new Response(401, {}, { message: "Invalid credentials" });
        }

        if (user.password !== password) {
          return new Response(401, {}, { message: "Invalid credentials" });
        }

        return {
          message: "Login successful",
          user: {
            id: user.id,
            email: user.email,
            name: user.name
          },
          accessToken: user.id,
        };
      })

      this.post("/auth/register", (schema, request) => {
        const { name, email, password } = JSON.parse(request.requestBody);

        const existingUser = schema.db.users.findBy({ email });

        if (existingUser) {
          return new Response(409, {}, { message: "Credentials Already Taken" });
        }

        const newUser = schema.db.users.insert({ name, email, password });

        return {
          message: "Registration successful",
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name
          },
          accessToken: newUser.id,
        };
      })

      this.post("/auth/logout", (_schema, _request) => {
        return {
          message: "Logout successful",
        };
      })

      this.post('/auth/requestOtp', (schema, request) => {
        const { email } = JSON.parse(request.requestBody) as { email: string };

        const user = schema.db.users.findBy({ email });

        if (!user) {
          return new Response(401, {}, { message: "Invalid credentials" });
        }

        return {
          message: "OTP sent to your email",
        };
      })

      this.post("/auth/verifyOtp", (schema, request) => {
        const { email, otp } = JSON.parse(request.requestBody) as {
          email: string;
          otp: string;
        };

        const user = schema.db.users.findBy({ email });

        if (!user) {
          return new Response(201, {}, { message: "Invalid credentials" });
        }

        if (otp !== "123456") {
          return new Response(400, {}, { message: "Invalid OTP" });
        }

        return {
          message: "PIN code set successfully",
          resetKey: 'my-key'
        };
      })

      this.post("/auth/reset-password", (schema, request) => {
        const { email, resetKey, newPassword } = JSON.parse(request.requestBody) as {
          email: string;
          resetKey: string;
          newPassword: string;
        };

        const user = schema.db.users.findBy({ email });

        if (!user) {
          return new Response(404, {}, { message: "User not found" });
        }

        if (resetKey !== 'my-key') {
          return new Response(401, {}, { message: "Invalid Reset Key" });
        }

        user.password = newPassword;

        return {
          message: "Password updated successfully",
        };
      });

    },
  }) as Server<Registry<{ user: typeof UserModel }, {}>>

  return serverInstances
}
