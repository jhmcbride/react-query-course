import { useQuery } from "@tanstack/react-query";
import { fetchWithError } from "../helpers/fetchWithError";

export const issueQueryKeyPrefix = "issues";

export function fetchIssue({ queryKey, signal }) {
  const [path, issueNumber] = queryKey;
  return fetchWithError(`/api/${path}/${issueNumber}`, { signal });
}

export function useIssueQuery(issueNumber) {
  return useQuery([issueQueryKeyPrefix, issueNumber], fetchIssue);
}
