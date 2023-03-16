import { useQuery } from "@tanstack/react-query";

export function useIssueData(issueNumber) {
  return useQuery(["issue", issueNumber], () => {
    return fetch(`/api/issues/${issueNumber}`).then((res) => res.json());
  });
}
