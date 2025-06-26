import type { CreateUserDto, User } from "../../types/user";
import { api } from "../api";

export const usersApi = {
  async load() {
    const response = await api.get<User[]>("/users");

    return response.data;
  },

  async create(user: CreateUserDto) {
    await api.post("/users", {
      ...user,
    });
  },

  async remove(userId: number) {
    await api.delete(`/users/${userId}`);
  },

  async generateApiKey(userId: number) {
    try {
      const response = await api.post<{ key: string }>(
        `/users/generate-api-key`,
        {
          userId,
        }
      );

      return response.data.key;
    } catch (error) {
      console.error("Error generating API key:", error);
      throw error;
    }
  },

  async login({ email, password }: { email: string; password: string }) {
    console.log("Logging in with:", { email, password });

    const response = await api.post<{ token: string }>("/login", {
      email,
      password,
    });

    return response.data.token;
  },
};
