import { useQuery } from "@tanstack/react-query";
import { fetchWithError } from "../helpers/fetchWithError";

export function useIssueQuery(issueNumber) {
  return useQuery(["issue", issueNumber], () =>
    fetchWithError(`/api/issues/${issueNumber}`)
  );
}
