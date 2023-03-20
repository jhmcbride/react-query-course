import { useQuery } from "@tanstack/react-query";
import { fetchWithError } from "../helpers/fetchWithError";

export function useUserQuery(userId) {
  return useQuery(
    ["users", userId],
    ({ signal }) => fetchWithError(`/api/users/${userId}`, { signal }),
    {
      staleTime: 1000 * 60 * 5,
    }
  );
}
