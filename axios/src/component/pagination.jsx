import Button from "./Button";

export default function Pagination({ value, handlePagination }) {
  return (
    <div>
      <Button
        disabled={value === 1 ? true : false}
        title={"prev"}
        onClick={() => handlePagination(value - 1)}
      />
      <Button
        disabled={false}
        title={"next"}
        onClick={() => handlePagination(value + 1)}
      />
    </div>
  );
}
