import { useQuery } from "@tanstack/react-query";
import { fetchWithError } from "../helpers/fetchWithError";
import { useState } from "react";
import { IssueItem } from "./IssueItem";

export default function IssuesList({ labels, status }) {
  const issuesQuery = useQuery(
    ["issues", { labels, status }],
    async () => {
      const statusString = status ? `&status=${status}` : "";
      const labelString = labels.map((label) => `labels[]=${label}`).join("&");
      return fetchWithError(`/api/issues?${labelString}${statusString}`);
    });

  const [searchValue, setSearchValue] = useState("");

  const searchQuery = useQuery(
    ["issues", "search", searchValue],
    () => fetchWithError(`/api/search/issues?q=${searchValue}`),
    {
      enabled: searchValue.length > 0,
    }
  );

  const isSearch = !(
    searchQuery.fetchStatus === "idle" && searchQuery.isLoading === true
  );
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSearchValue(event.target.elements.search.value);
        }}
      >
        <label htmlFor="search">Search Issues</label>
        <input
          type="text"
          placeholder="Search"
          id="search"
          name="search"
          onChange={(event) => {
            if (event.target.value.length === 0) {
              setSearchValue("");
            }
          }}
        />
      </form>

      <h2>{isSearch ? "Search Results" : "Issues List"}</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : issuesQuery.isError ? (
        <p>{issuesQuery.error.message}</p>
      ) : searchQuery.fetchStatus === "idle" &&
        searchQuery.isLoading === true ? (
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
              status={issue.status}
            />
          ))}
        </ul>
      ) : (
        <>
          {searchQuery.isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>{searchQuery.data.count} Results</p>
              <ul className="issues-list">
                {searchQuery.data.items.map((issue) => (
                  <IssueItem {...issue} />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
