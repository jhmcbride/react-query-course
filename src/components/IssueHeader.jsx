import { possibleStatus } from "../helpers/defaultData";
import { GoIssueClosed, GoIssueOpened } from "react-icons/go";
import { relativeDate } from "../helpers/relativeDate";
import { useUserData } from "../helpers/useUserData";

export function IssueHeader({
  title,
  number,
  status = "todo",
  createdBy,
  createdDate,
  comments,
}) {
  const statusObj = possibleStatus.find(
    (possibleStatus) => possibleStatus.id === status
  );
  const createUser = useUserData(createdBy);
  return (
    <header>
      <h2>
        {title} <span>#{number}</span>
      </h2>
      <div>
        <span
          className={["done", "cancelled"].includes(status) ? "closed" : "open"}
        >
          {["done", "cancelled"].includes(status) ? (
            <GoIssueClosed />
          ) : (
            <GoIssueOpened />
          )}
          {statusObj.label}
        </span>
        <span className="created-by">
          {createUser?.isLoading ? "..." : createUser.data?.name}
        </span>{" "}
        opened this issue {relativeDate(createdDate)} • {comments.length}{" "}
        comments
      </div>
    </header>
  );
}
