import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch(console.error);
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
      <p>
        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Time:</strong> {event.time}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <p className="mt-4">{event.description}</p>
    </div>
  );
}
