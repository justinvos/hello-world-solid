import { createEffect, createResource, createSignal } from 'solid-js';
import './App.css';

export function App() {
  const [count, setCount] = createSignal(0);
  const [userId, setUserId] = createSignal();
  const [user] = createResource(userId, fetchUser);

  function handleInput(e) {
    setUserId(e.currentTarget.value);
  }

  createEffect(() => {
    console.log("The count is now", user());
  });

  return (
    <>
      <h1>Hello World</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count()}
      </button>
      <input type="number" onInput={handleInput} />
      {user.state === 'ready' ? <p>User name: {user().name}</p> : null}
    </>
  )
}

const fetchUser = async (id) =>
  (await fetch(`https://swapi.dev/api/people/${id}/`)).json();
