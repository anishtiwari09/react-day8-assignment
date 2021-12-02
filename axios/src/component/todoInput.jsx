import { useState } from "react";
import Button from "./Button";

export default function TodoInput({ title, handleTaskCreate }) {
  const [text, setText] = useState("");
  const handleClick = () => handleTaskCreate(text);
  return (
    <div>
      <input
        type="text"
        placeholder={title}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button title="ADD" onClick={handleClick} />
    </div>
  );
}
