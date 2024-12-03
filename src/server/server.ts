import { Assignment, STATUS } from "@/features/assignment/domain/models/Assignment";
import { User } from "@/features/auth/domain/models/Auth";
import { belongsTo, createServer, Factory, hasMany, Model, Response } from "miragejs";
import { ModelDefinition } from "miragejs/-types";

const UserModel: ModelDefinition<User> = Model.extend({
  assignments: hasMany('assignment')
});
const AssignmentModel: ModelDefinition<Assignment> = Model.extend({
  author: belongsTo('user')
});

export const makeServer = ({ environment = "development" } = {}) => {
  const serverInstances = createServer({
    environment,
    models: {
      user: UserModel,
      assignment: AssignmentModel
    },

    factories: {
      assignment: Factory.extend({
        title(i) {
          return `Assignment ${i}`
        },
        description(i) {
          return `This is a assignment ${i + 1}`
        },
        status() {
          return ['pending', 'progress', 'completed'][Math.floor(Math.random() * 3)]
        },
        createdAt() {
          return new Date().toISOString()
        },
        updatedAt() {
          return new Date().toISOString()
        }
      })
    },
    seeds(server) {
      const user = server.create("user", {
        name: 'khalil',
        email: "khalil@gmail.com",
        password: "khalil123",
      });
      server.createList('assignment', 25, { author: user })
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

      this.get("/assignments", (schema, request) => {
        const page = parseInt(request.queryParams.page as string) || 1
        const pageSize = parseInt(request.queryParams.limit as string) || 10
        const sort = request.queryParams.sort || "desc"
        const search = (request.queryParams.search || "") as string
        const status = (request.queryParams.status || "") as string

        const assignments = schema.db.assignments
          .filter(assignment => (
            (!search || new RegExp(search, 'i').test(assignment.title)) &&
            (!status || assignment.status === status)
          ))
          .sort((a, b) => {
            if (sort === 'asc') {
              return a.title.localeCompare(b.title);
            } else {
              return b.title.localeCompare(a.title);
            }
          }).map(assignment => {
            const author = schema.db.users.find(assignment.authorId);
            return {
              ...assignment,
              author: author ? { id: author.id, name: author.name, email: author.email } : null
            };
          });

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const totalAssignments = assignments.length

        const totalPages = Math.ceil(totalAssignments / pageSize)

        return {
          message: 'Fetch assignments successful',
          data: {
            assignments: assignments.slice(startIndex, endIndex),
            pagination: {
              page,
              pageSize,
              total: totalAssignments,
              totalPages
            }
          }
        }
      });

      this.post('/assignments', (schema, request) => {
        const userId = request.requestHeaders['x-auth-id'];
        let attrs = JSON.parse(request.requestBody);
        attrs.createdAt = new Date().toISOString()
        attrs.updatedAt = new Date().toISOString();
        return (schema as any).assignments.create({ ...attrs, status: STATUS.PENDING, authorId: userId });
      });

      this.delete('/assignments/:id', (schema, request) => {
        const id = request.params.id;
        console.log("typeof", typeof schema)
        const assignment = (schema as any).assignments.find(id);

        if (assignment) {
          assignment.destroy();
          return { message: 'Assignment deleted successfully' };
        } else {
          return new Response(404, {}, { error: 'Assignment not found' });
        }
      });

      this.put('/assignments/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const assignment = (schema as any).assignments.find(id);

        if (assignment) {
          assignment.update({
            ...attrs,
            updatedAt: new Date().toISOString(),
          });
          return assignment;
        } else {
          return new Response(404, {}, { error: 'Assignment not found' });
        }
      });

    },
  })

  return serverInstances
}
