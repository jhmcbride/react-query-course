import { useQuery } from "@tanstack/react-query";
import { fetchWithError } from "./fetchWithError";

export function useUserData(userId) {
  const usersData = useQuery(
    ["users", userId],
    () => fetchWithError(`/api/users/${userId}`).then((res) => res.json()),
    {
      staleTime: 1000 * 60,
    }
  );

  return usersData;
}
