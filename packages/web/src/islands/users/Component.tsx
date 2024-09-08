import React from "react";

export default function Counter() {
  const [state, setState] = React.useState(0);
  return (
    <div>
      <h2>Hello</h2>
      <pre>{state}</pre>
      <button onClick={setState.bind(null, (s) => s + 1)}>inc</button>
    </div>
  );
}
