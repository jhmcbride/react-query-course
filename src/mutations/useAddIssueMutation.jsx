import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { issueQueryKeyPrefix } from "../queries/useIssueQuery";

export function useAddIssueMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addIssue = useMutation(
    (issueBody) =>
      fetch("/api/issues", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(issueBody),
      }).then((res) => res.json()),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([issueQueryKeyPrefix]);
        queryClient.setQueryData([issueQueryKeyPrefix, data.number], data);
        navigate(`/issue/${data.number}`);
      },
    }
  );

  return addIssue;
}
