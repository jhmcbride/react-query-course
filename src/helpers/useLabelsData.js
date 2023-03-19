import { useQuery } from "@tanstack/react-query";
import { fetchWithError } from "./fetchWithError";

export function useLabelsData() {
  const labelsQuery = useQuery(
    ["labels"],
    () => fetchWithError("/api/labels").then((res) => res.json()),
    {
      staleTime: 1000 * 60 * 60,
    }
  );
  return labelsQuery;
}
