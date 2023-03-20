import { useQuery } from "@tanstack/react-query";
import { fetchWithError } from "../helpers/fetchWithError";

export function useSearchQuery(searchValue) {
  return useQuery(
    ["issues", "search", searchValue],
    ({ signal }) =>
      fetchWithError(`/api/search/issues?q=${searchValue}`, { signal }),
    {
      enabled: searchValue.length > 0,
    }
  );
}
