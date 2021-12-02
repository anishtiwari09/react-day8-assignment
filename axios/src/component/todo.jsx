import axios from "axios";
import { useEffect, useState } from "react";
import Button from "./Button";
import Pagination from "./pagination";
import TodoInput from "./todoInput";
import TodoItem from "./Todoitem";

export default function Todo() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const getTodo = (page, limit = 5) => {
    const config = {
      url: `https://thawing-oasis-54179.herokuapp.com/posts?_page=${page}&_limit=${limit}`,
      method: "get"
    };
    return axios(config);
  };
  useEffect(() => {
    handleGetData(page);
  }, [page]);
  const handleGetData = async (page) => {
    await getTodo(page)
      .then((res) => {
        setDatas(res.data);

        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const handlePagination = (value) => {
    setPage(value);
  };

  if (isLoading) return <h3>...Loading</h3>;
  const onTaskCreate = (value) => {
    const payload = {
      title: value,
      status: datas.length % 2 == 0 ? true : false
    };
    const config = {
      url: "https://thawing-oasis-54179.herokuapp.com/posts",
      method: "post",
      data: payload
    };
    return axios(config);
  };
  const handleTaskCreate = async (value) => {
    try {
      if (!value) return;
      setIsLoading(true);
      await onTaskCreate(value);
      await handleGetData();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteTodo = (id) => {
    const config = {
      url: `https://thawing-oasis-54179.herokuapp.com/posts/${id}`,
      method: "delete"
    };
    return axios(config);
  };
  const toggleTodo = (id, status) => {
    const config = {
      url: `https://thawing-oasis-54179.herokuapp.com/posts//${id}`,
      method: "patch",
      data: {
        status: status
      }
    };
    return axios(config);
  };
  console.log("datas", datas);
  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await deleteTodo(id);
      await handleGetData();
    } catch (err) {
      console.log(err);
    }
  };
  const handleAllComplete = async () => {
    try {
      setIsLoading(true);
      for (const ids of datas) await toggleTodo(ids.id, true);
      await handleGetData(page);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2>Todo</h2>
      <TodoInput title={"Add Task..."} handleTaskCreate={handleTaskCreate} />

      <div>
        <ul>
          {datas.map((item) => (
            <TodoItem
              key={item.id}
              title={item.title}
              status={item.status}
              id={item.id}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
        <div style={{ margin: "1rem", padding: "1rem" }}>
          <Pagination value={page} handlePagination={handlePagination} />
        </div>
      </div>
      <div>
        <Button title={"Marks All Complete"} onClick={handleAllComplete} />
      </div>
    </>
  );
}
