import { useQuery } from "@tanstack/react-query";

export function useIssueComments(issueNumber) {
  return useQuery(["issue", issueNumber, "comments"], () => {
    return fetch(`/api/issues/${issueNumber}/comments`).then((res) =>
      res.json()
    );
  });
}
