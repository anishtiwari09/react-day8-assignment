import axios from "axios";
import { useEffect, useState } from "react";
import Button from "./Button";
import TodoInput from "./todoInput";
import TodoItem from "./TodoItem";

export default function Todo() {
  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const getTodo = () => {
    const config = {
      url: `https://thawing-oasis-54179.herokuapp.com/posts`,
      method: "get"
    };
    return axios(config);
  };
  useEffect(() => {
    handleGetData();
  }, []);
  const handleGetData = async () => {
    await getTodo()
      .then((res) => {
        setDatas(res.data);

        setIsLoading(false);
      })
      .catch((err) => console.log(err));
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
            />
          ))}
        </ul>
      </div>
    </>
  );
}
