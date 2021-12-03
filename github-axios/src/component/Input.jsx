import { useState } from "react";
import Button from "./Button";

export default function Input({ title, onClick }) {
  const [text, setText] = useState("");
  const handleClick = () => onClick(text);
  return (
    <div>
      <input
        style={{ padding: "0.2rem", width: "80%" }}
        type="text"
        placeholder={title}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button title="Search" onClick={handleClick} />
    </div>
  );
}
