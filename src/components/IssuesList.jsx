import { useQuery } from "@tanstack/react-query";
import { IssueItem } from "./IssueItem";

export default function IssuesList({ labels }) {
  const issuesQuery = useQuery(["issues", { labels }], () => {
    const labelString = labels.map((label) => `labels[]=${label}`).join("&");
    return fetch(`/api/issues?${labelString}`).then((res) => res.json());
  });

  return (
    <div>
      <h2>Issues List</h2>

      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="issues-list">
          {issuesQuery.data.map((issue) => (
            <IssueItem
              key={issue.id}
              title={issue.title}
              number={issue.number}
              assignee={issue.assignee}
              commentCount={issue.comments.length}
              createdBy={issue.createdBy}
              createdDate={issue.createdDate}
              labels={issue.labels}
              status={issuesQuery.status}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
