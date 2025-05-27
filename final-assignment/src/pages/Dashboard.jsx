import React, { useEffect, useState } from "react";
import useStore from "../store/useStore";

export default function Dashboard() {
  const { user, token, logout } = useStore();
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:5000/api/events/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch(console.error);
  }, [user, token]);

  if (!user) {
    return <p>You must be logged in to access the dashboard.</p>;
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Create event failed");
      setEvents((prev) => [...prev, data]);
      setForm({ name: "", date: "", time: "", location: "", description: "" });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <h2 className="text-xl mb-2">Create Event</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleCreate} className="mb-6 max-w-lg">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Event Name"
          required
          className="border p-2 mb-2 w-full"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="border p-2 mb-2 w-full"
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
          className="border p-2 mb-2 w-full"
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="border p-2 mb-2 w-full"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="border p-2 mb-2 w-full"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>

      <h2 className="text-xl mb-2">Your Events</h2>
      {events.length === 0 && <p>No events created yet.</p>}
      <ul>
        {events.map((event) => (
          <li key={event._id} className="border-b py-2 flex justify-between">
            <div>
              <div className="font-semibold">{event.name}</div>
              <div>
                {new Date(event.date).toLocaleDateString()} at {event.time}
              </div>
              <div>{event.location}</div>
            </div>
            <button
              onClick={() => handleDelete(event._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
