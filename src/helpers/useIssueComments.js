import { useQuery } from "@tanstack/react-query";
import { fetchWithError } from "./fetchWithError";

export function useIssueComments(issueNumber) {
  return useQuery(["issue", issueNumber, "comments"], () =>
    fetchWithError(`/api/issues/${issueNumber}/comments`)
  );
}
