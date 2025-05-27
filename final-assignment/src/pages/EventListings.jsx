import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EventListings() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Event Listings</h1>
      {events.length === 0 && <p>No events found.</p>}
      <ul>
        {events.map((event) => (
          <li key={event._id} className="mb-3 border-b pb-2">
            <Link
              to={`/events/${event._id}`}
              className="text-blue-600 hover:underline"
            >
              {event.name}
            </Link>
            <div>
              {new Date(event.date).toLocaleDateString()} at {event.time}
            </div>
            <div>{event.location}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
