import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWithError } from "../helpers/fetchWithError";

export function useIssuesQuery(labels, status) {
  const queryClient = useQueryClient();
  return useQuery(["issues", { labels, status }], async ({ signal }) => {
    const statusString = status ? `&status=${status}` : "";
    const labelString = labels.map((label) => `labels[]=${label}`).join("&");
    const results = await fetchWithError(
      `/api/issues?${labelString}${statusString}`,
      {
        signal,
      }
    );

    results.forEach((issue) => {
      console.log({ issue });
      queryClient.setQueryData(["issues", issue.number], issue);
    });

    return results;
  });
}
