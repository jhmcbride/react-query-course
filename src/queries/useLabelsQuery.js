import { useQuery } from "@tanstack/react-query";
import { fetchWithError } from "../helpers/fetchWithError";

export function useLabelsQuery() {
  return useQuery(["labels"], () => fetchWithError("/api/labels"), {
    staleTime: 1000 * 60 * 60,
  });
}
