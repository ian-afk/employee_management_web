import { apiClient } from "./apiClient";

import type { TasksResponse } from "../types/task-type";

export const getTask = async (query: {
  page: number;
  limit: number;
  query: string;
  signal?: AbortSignal;
}): Promise<TasksResponse> => {
  const res: TasksResponse = await apiClient.get("task-assignment/assigned", {
    params: {
      page: query.page,
      limit: query.limit,
      query: query.query,
    },
    signal: query.signal,
  });
  return res;
};
