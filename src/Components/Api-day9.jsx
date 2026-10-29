
import { useEffect, useRef, useState } from "react";
import "./Api-day9.css";

function Day9() {
  // DAY 9: Window width state
  const [width, setWidth] = useState(window.innerWidth);

  // DAY 9: API data state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // DAY 9: DOM reference
  const inputRef = useRef(null);

  // DAY 9: Window resize event and cleanup
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // DAY 9: Fetch users when component mounts
  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    return () => controller.abort();
  }, []);

  // DAY 9: Focus input using useRef
  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <div>
      <h1>Day 9: useEffect and useRef</h1>

      <section>
        <h2>Window Width</h2>
        <p>Current width: {width}px</p>
      </section>

      <section>
        <h2>useRef Example</h2>

        <input
          ref={inputRef}
          placeholder="Enter your name"
        />

        <button onClick={focusInput}>Focus Input</button>
      </section>

      <ul className="user-list">
           {users.map((user) => (
    <li className="user-card" key={user.id}>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>City: {user.address.city}</p>
    </li>
  ))}
      </ul>
    </div>
  );
}

export default Day9;
