import { useLabelsQuery } from "../queries/useLabelsQuery";

export function Label({ label }) {
  const labelsQuery = useLabelsQuery();

  if (labelsQuery.isLoading) return null;

  const labelObj = labelsQuery?.data?.find(
    (queryLabel) => queryLabel.id === label
  );

  if (!labelObj) return null;

  return (
    <span key={label} className={`label ${labelObj.color}`}>
      {labelObj.name}
    </span>
  );
}
