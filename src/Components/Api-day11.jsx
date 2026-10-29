
import { useEffect, useState } from "react";
import "./Api-day11.css";


function ApiDay11() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );

        //Error: Failed to fetch users//

        // const response = await fetch(
        //     "https://jsonplaceholder.typicode.com/invalid-url",
        //     { signal: controller.signal }
        // );

        // Check HTTP response
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);

        //No users found./
        
        // const data = [];
        // setUsers(data);

      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    // Cleanup: cancel request
    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <div className="api-container">Loading users...</div>;
  }

  if (error) {
    return <div className="api-container error">Error: {error}</div>;
  }

  if (users.length === 0) {
    return <div className="api-container">No users found.</div>;
  }

  return (
    <div className="api-container">
      <h1>Day 11: API Users</h1>

      <div className="api-user-list">
        {users.map((user) => (
          <div className="api-user-card" key={user.id}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>City: {user.address.city}</p>
            <p>Company: {user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApiDay11;
