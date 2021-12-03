import { useEffect, useState } from "react";
import Input from "./Input";

const UserCard = ({ id, avatar, name, url }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        border: "1px solid black",
        padding: "1rem"
      }}
    >
      <img src={avatar} style={{ width: 41, height: "40px" }} alt={id} />
      <div>
        <div>{name}</div>
        <div>{url}</div>
      </div>
    </div>
  );
};

const Pagination = ({ totalPage, currentPage, onClickPageChange }) => {
  const pages = new Array(totalPage).fill(0).map((a, i) =>
    i + 1 === currentPage ? (
      <button key={i} disabled style={{ background: "olive" }}>
        {i + 1}
      </button>
    ) : (
      <button onClick={() => onClickPageChange(i + 1)} key={i}>
        {i + 1}
      </button>
    )
  );

  return (
    <div style={{ display: "flex", gap: "1rem", margin: "2rem" }}>{pages}</div>
  );
};
export default function GitHubApi() {
  //* useEffect(callback,dependencey array)
  const [query, setQuery] = useState("masai");
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const getUsers = ({ page = 1, query }) => {
    return fetch(
      `https://api.github.com/search/users?q=${query}&page=${page}`
    ).then((res) => res.json());
  };
  useEffect(() => {
    handleGetData();
  }, [page, query]);

  const handleGetData = () => {
    console.log(page, query);
    getUsers({ page, query })
      .then((res) => {
        console.log(res.total_count);
        if (res.total_count) {
          const totalPage = Math.ceil(res.total_count / 30);

          setTotalPage(totalPage);
        }
        setState(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePageChange = async (value) => {
    setPage(value);
  };
  const handleSearch = async (value) => {
    try {
      await setIsLoading(true);
      if (!value) return;
      await setQuery(value);
      await setPage(1);
    } catch (err) {
      console.log(err);
    }
  };
  if (isLoading) return <h3>...Loading</h3>;

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <Input onClick={handleSearch} title="Search ......" />
      </div>
      {state?.items?.map((users) => {
        return (
          <UserCard
            key={users.id}
            id={users.id}
            url={users.html_url}
            name={users.login}
            avatar={users.avatar_url}
          />
        );
      })}
      <Pagination
        totalPage={totalPage}
        onClickPageChange={handlePageChange}
        currentPage={page}
      />
    </>
  );
}
