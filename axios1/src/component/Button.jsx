export default function Button({ onClick, title, disabled = false }) {
  return (
    <>
      <button disabled={disabled} onClick={onClick}>
        {title}
      </button>
    </>
  );
}
