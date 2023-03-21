import { useParams } from "react-router-dom";
import { IssueHeader } from "./IssueHeader";
import { Comment } from "./Comment";
import { useIssueCommentsQuery } from "../queries/useIssueCommentsQuery";
import { useIssueQuery } from "../queries/useIssueQuery";

export default function IssueDetails() {
  const { number: issueNumberFromParams } = useParams();

  const issueNumber =  +issueNumberFromParams

  const issueQuery = useIssueQuery(issueNumber);
  const commentsQuery = useIssueCommentsQuery(issueNumber);

  return (
    <div className="issue-details">
      {issueQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <IssueHeader {...issueQuery.data} />

          <main>
            <section>
              {commentsQuery.isLoading ? (
                <p>Loading...</p>
              ) : (
                commentsQuery.data.map((comment) => (
                  <Comment key={comment.id} {...comment} />
                ))
              )}
            </section>
            <aside />
          </main>
        </>
      )}
    </div>
  );
}
