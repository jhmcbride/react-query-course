import { useQuery } from "@tanstack/react-query";
import { fetchWithError } from "./fetchWithError";

export function useIssueData(issueNumber) {
  return useQuery(
    ["issue", issueNumber],
    () =>
      fetchWithError(`/api/issues/${issueNumber}`).then((res) => res.json()),
    {
      staleTime: 1000 * 60,
    }
  );
}
