import { relativeDate } from "../helpers/relativeDate";
import { useUserQuery } from "../queries/useUserQuery";

export function Comment({ comment, createdBy, createdDate }) {
  const userQuery = useUserQuery(createdBy);

  if (userQuery.isLoading) {
    return (
      <div className="comment">
        <div>
          <div className="comment-header">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="comment">
      <img src={userQuery.data.profilePictureUrl} alt="Commenter avatar" />
      <div>
        <div className="comment-header">
          <span>{userQuery.data.name}</span> commented{" "}
          <span>{relativeDate(createdDate)}</span>
          <div className="comment-body">{comment}</div>
        </div>
      </div>
    </div>
  );
}
