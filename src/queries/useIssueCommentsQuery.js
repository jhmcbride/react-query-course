import { useQuery } from "@tanstack/react-query";
import { fetchWithError } from "../helpers/fetchWithError";
import { issueQueryKeyPrefix } from "./useIssueQuery";

export const issueCommentsQueryKey = "comments";

export function fetchIssueComments({ queryKey, signal }) {
  const [path, issueNumber, queryKeyPostfix] = queryKey;
  return fetchWithError(`/api/${path}/${issueNumber}/${queryKeyPostfix}`, {
    signal,
  });
}

export function useIssueCommentsQuery(issueNumber) {
  return useQuery(
    [issueQueryKeyPrefix, issueNumber, issueCommentsQueryKey],
    fetchIssueComments
  );
}
