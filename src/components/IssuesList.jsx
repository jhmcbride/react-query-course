import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IssueItem } from "./IssueItem";

export default function IssuesList({ labels, status }) {
  const issuesQuery = useQuery(["issues", { labels, status }], () => {
    const statusString = status ? `&status=${status}` : "";
    const labelString = labels.map((label) => `labels[]=${label}`).join("&");
    return fetch(`/api/issues?${labelString}${statusString}`).then((res) =>
      res.json()
    );
  });

  const [searchValue, setSearchValue] = useState("");

  const searchQuery = useQuery(
    ["issues", "search", searchValue],
    () =>
      fetch(`/api/search/issues?q=${searchValue}`).then((res) => res.json()),
    {
      enabled: searchValue.length > 0,
    }
  );
  console.log({ searchQuery });

  const isSearch = !(
    searchQuery.fetchStatus === "idle" && searchQuery.isLoading === true
  );
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          // @ts-ignore
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
