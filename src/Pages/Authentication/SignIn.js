export default function SignIn() {
  return (
    <div className="header button">
      <button
        className="button complete"
        onClick={() => console.log("clicked")}
      >
        Sign in
      </button>
      <button className="button delete" onClick={() => console.log("clicked")}>
        Sign up
      </button>
    </div>
  );
}
