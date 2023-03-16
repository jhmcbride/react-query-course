import { useQuery } from "@tanstack/react-query";

export function useLabelsData() {
  console.log("hello");
  const labelsQuery = useQuery(["labels"], () => {
    return fetch("/api/labels").then((res) => res.json());
  });
  return labelsQuery;
}
