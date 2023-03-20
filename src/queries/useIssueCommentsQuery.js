import { useQuery } from "@tanstack/react-query";
import { fetchWithError } from "../helpers/fetchWithError";

export function useIssueCommentsQuery(issueNumber) {
  return useQuery(["issue", issueNumber, "comments"], () =>
    fetchWithError(`/api/issues/${issueNumber}/comments`)
  );
}
