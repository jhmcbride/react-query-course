import { useQuery } from "@tanstack/react-query";
import { fetchWithError } from "../helpers/fetchWithError";

export function useIssuesQuery(labels, status) {
  return useQuery(["issues", { labels, status }], async ({ signal }) => {
    const statusString = status ? `&status=${status}` : "";
    const labelString = labels.map((label) => `labels[]=${label}`).join("&");
    return fetchWithError(`/api/issues?${labelString}${statusString}`, {
      signal,
    });
  });
}
