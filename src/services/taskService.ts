import { apiClient } from "./apiClient";

import type { TasksResponse } from "../types/task-type";

export const getTask = async (
  url: string,
  query: {
    page: number;
    limit: number;
    query: string;
    assigned?: string;
    signal?: AbortSignal;
  },
): Promise<TasksResponse> => {
  const res: TasksResponse = await apiClient.get(url, {
    params: {
      page: query.page,
      limit: query.limit,
      query: query.query,
      assigned: query.assigned,
    },
    signal: query.signal,
  });
  return res;
};
