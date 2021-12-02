import Button from "./Button";

export default function TodoItem({ title, status, id }) {
  return (
    <li>
      {title} - {status ? " Done" : " Pending"}
    </li>
  );
}
