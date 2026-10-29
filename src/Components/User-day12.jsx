import { useEffect, useState } from "react";
import "./User-day12.css";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [editingId, setEditingId] = useState(null);

  // DAY 12: READ - Fetch users from API
  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    // Cancel request when component unmounts
    return () => controller.abort();
  }, []);

  // Clear the form
  function resetForm() {
    setName("");
    setEmail("");
    setEditingId(null);
  }

  // DAY 12: CREATE and UPDATE
  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      setError("Please enter both name and email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    const isEditing = editingId !== null;

    const userData = {
      name: trimmedName,
      email: trimmedEmail,
    };

    try {
      setSaving(true);

      const response = await fetch(
        isEditing ? `${API_URL}/${editingId}` : API_URL,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error(
          isEditing ? "Failed to update user." : "Failed to add user."
        );
      }

      const savedUser = await response.json();

      if (isEditing) {
        // Update the UI using React state
        setUsers((previous) =>
          previous.map((user) =>
            user.id === editingId
              ? { ...user, ...userData }
              : user
          )
        );

        setMessage("User updated successfully!");
      } else {
        // Demo API returns a new ID, usually 11.
        // Generate a unique UI ID to avoid duplicate IDs.
        const newUser = {
          ...userData,
          id: Date.now(),
          address: { city: "Not provided" },
          company: { name: "Not provided" },
        };

        setUsers((previous) => [...previous, newUser]);
        setMessage("User added successfully!");
      }

      resetForm();
    } catch (err) {
      setError(err.message || "Unable to save user.");
    } finally {
      setSaving(false);
    }
  }

  // Load existing user details into the form
  function handleEdit(user) {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
    setMessage("");
    setError("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // DAY 12: DELETE
  async function handleDelete(userId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      setSaving(true);

      const response = await fetch(`${API_URL}/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }

      // Update the visible list
      setUsers((previous) =>
        previous.filter((user) => user.id !== userId)
      );

      if (editingId === userId) {
        resetForm();
      }

      setMessage("User deleted successfully!");
    } catch (err) {
      setError(err.message || "Unable to delete user.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="crud-container">
      <h1>Day 12: User Management</h1>
      <p className="crud-subtitle"></p>

      {/* CREATE / UPDATE FORM */}
      <form className="crud-form" onSubmit={handleSubmit}>
        <h2>{editingId !== null ? "Edit User" : "Add New User"}</h2>

        <label htmlFor="user-name">Name</label>
        <input
          id="user-name"
          type="text"
          placeholder="Enter user name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label htmlFor="user-email">Email</label>
        <input
          id="user-email"
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <div className="crud-form-actions">
          <button type="submit" disabled={saving}>
            {saving
              ? "Please wait..."
              : editingId !== null
                ? "Update User"
                : "Add User"}
          </button>

          {editingId !== null && (
            <button
              type="button"
              className="cancel-button"
              onClick={resetForm}
              disabled={saving}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="crud-list-panel">
        {/* SUCCESS AND ERROR MESSAGES */}
        {message && (
          <p className="crud-message success-message" role="status">
            {message}
          </p>
        )}

        {error && (
          <p className="crud-message error-message" role="alert">
            {error}
          </p>
        )}

        {/* READ USERS */}
        <div className="crud-list-heading">
          <h2>Users List</h2>
          {!loading && <span>Total: {users.length}</span>}
        </div>

        {loading ? (
          <p className="crud-status">Loading users...</p>
        ) : error && users.length === 0 ? (
          <p className="crud-status">
            Could not load users. Please refresh the page and try again.
          </p>
        ) : users.length === 0 ? (
          <p className="crud-status">No users found.</p>
        ) : (
          <div className="crud-user-list">
            {users.map((user) => (
              <article className="crud-user-card" key={user.id}>
                <div className="crud-user-info">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <p>City: {user.address?.city || "Not provided"}</p>
                </div>

                <div className="crud-card-actions">
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => handleEdit(user)}
                    disabled={saving}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDelete(user.id)}
                    disabled={saving}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <p className="crud-note">
        Note: JSONPlaceholder is a demo API. Add, edit and delete requests are
        simulated; changes are not permanently saved on its server.
      </p>
    </div>
  );
}

export default UserManagement;