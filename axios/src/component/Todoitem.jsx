import Button from "./Button";

export default function TodoItem({ title, status, id, handleDelete }) {
  const handleClick = () => handleDelete(id);

  return (
    <li>
      {title} - {status ? " Done" : " Pending"}
      <span>
        <Button title="X" onClick={handleClick} />
      </span>
    </li>
  );
}
