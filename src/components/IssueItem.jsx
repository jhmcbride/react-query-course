import { Link } from "react-router-dom";
import { GoIssueOpened, GoIssueClosed, GoComment } from "react-icons/go";
import { relativeDate } from "../helpers/relativeDate";
import { Label } from "./Label";
import { useUserQuery } from "../queries/useUserQuery";
import { useQueryClient } from "@tanstack/react-query";
import { fetchIssue, issueQueryKeyPrefix } from "../queries/useIssueQuery";
import {
  fetchIssueComments,
  issueCommentsQueryKey,
} from "../queries/useIssueCommentsQuery";

export function IssueItem({
  title,
  number,
  assignee,
  commentCount,
  createdBy,
  createdDate,
  labels,
  status,
}) {
  const assigneeUser = useUserQuery(assignee);
  const createdByUser = useUserQuery(createdBy);

  const queryClient = useQueryClient();

  console.log({ issueQueryKeyPrefix, number });
  return (
    <li
      onMouseEnter={() => {
        queryClient.prefetchQuery([issueQueryKeyPrefix, number], fetchIssue);
        queryClient.prefetchQuery(
          [issueQueryKeyPrefix, number, issueCommentsQueryKey],
          fetchIssueComments
        );
      }}
    >
      <div>
        {["done", "cancelled"].includes(status) ? (
          <GoIssueClosed style={{ color: "red" }} />
        ) : (
          <GoIssueOpened style={{ color: "green" }} />
        )}
      </div>
      <div className="issue-content">
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>
          {labels.map((label) => (
            <Label key={label} label={label} />
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)}{" "}
          {createdByUser.isSuccess ? `by ${createdByUser.data.name}` : null}
        </small>
      </div>
      {assignee ? (
        <img
          src={
            assigneeUser.isSuccess ? assigneeUser.data.profilePictureUrl : ""
          }
          className="assigned-to"
          alt={`assigned to ${
            assigneeUser.isSuccess ? assigneeUser.data.name : ""
          }`}
        />
      ) : null}
      <span className="comment-count">
        {commentCount > 0 ? (
          <>
            <GoComment />
            {commentCount}
          </>
        ) : null}
      </span>
    </li>
  );
}
