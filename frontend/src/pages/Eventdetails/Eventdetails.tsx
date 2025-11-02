import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Event = {
  _id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  maxParticipants: number;
  currentParticipants: number;
};

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        console.log("the id is", id);
        const res = await fetch(` https://slang-14j1.onrender.com/api/getbyid/${id}`);
        const data = await res.json();
        console.log(data);
        setEvent(data.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Loading event details...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-20 px-6">
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-pink-400 mb-4">{event.title}</h1>
        <p className="text-gray-300 mb-4">{event.description}</p>
        <p className="text-gray-400 mb-2">📍 {event.location}</p>
        <p className="text-gray-400 mb-4">
          🗓️ {new Date(event.date).toLocaleString("en-IN")}
        </p>
        <div className="flex items-center justify-between bg-white/5 rounded-xl p-4 mb-4 border border-white/10">
          <p className="text-gray-300">
            👥 <span className="font-semibold">Current Participants:</span>{" "}
            {event.currentParticipants}
          </p>
          <p className="text-gray-300">
            🎯 <span className="font-semibold">Max Participants:</span>{" "}
            {event.maxParticipants}
          </p>
        </div>

        <button
          onClick={() => alert(`You are interested in ${event.title}`)}
          className="mt-4 w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all"
        >
          Register Interest
        </button>
      </div>
    </div>
  );
}
