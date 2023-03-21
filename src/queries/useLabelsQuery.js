import { useQuery } from "@tanstack/react-query";
import { defaultLabels } from "../helpers/defaultData";
import { fetchWithError } from "../helpers/fetchWithError";

export function useLabelsQuery() {
  return useQuery(
    ["labels"],
    ({ signal }) => fetchWithError("/api/labels", { signal }),
    {
      staleTime: 1000 * 60 * 60,
      placeholderData: defaultLabels,
    }
  );
}
