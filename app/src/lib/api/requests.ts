import type { Request } from "../../types/request";
import { api } from "../api";

export const requestsApi = {
  async stats() {
    const response = await api.get<{
      total: number;
      success: number;
      error: number;
      avgTime: number;
    }>("/requests/stats");

    return response.data;
  },

  async load() {
    const response = await api.get<Request[]>("/requests");

    return response.data;
  },
};
