import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const EventList = () => {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/getdata")
        if (!res.ok) throw new Error("Failed to fetch events")

        const response = await res.json()
        console.log("Fetched data:", response)
        setEvents(response.data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading)
    return (
      <p className="text-center mt-6 text-gray-400">⏳ Loading events...</p>
    )
  if (error)
    return <p className="text-center mt-6 text-red-500">Error: {error}</p>

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 px-6">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-600 drop-shadow-lg">
          🎭 Upcoming Events
        </h1>
        <p className="text-gray-400 mt-3 text-sm sm:text-base">
          Discover, explore, and attend amazing events near you.
        </p>
      </div>

      {/* 🔍 Search Bar */}
      <motion.div
        className="flex justify-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="🔍 Search events by title or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 rounded-2xl text-gray-900 bg-white/20 backdrop-blur-lg border border-white/30 
                       focus:ring-2 focus:ring-pink-500 focus:outline-none placeholder-gray-200 shadow-lg"
          />
        </div>
      </motion.div>

      {/* Event Cards */}
      {filteredEvents.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">No events found</p>
      ) : (
        <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
            >
              <h2 className="text-2xl font-semibold text-pink-400 mb-2">
                {event.title}
              </h2>
              <p className="text-gray-300 text-sm mb-3">{event.description}</p>

              <p className="text-gray-400 text-sm mb-2">
                📍{" "}
                <span className="font-medium text-white">
                  {event.location}
                </span>
              </p>
              <p className="text-gray-400 text-sm mb-2">
                🗓️{" "}
                {new Date(event.date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              {/* 👥 Participants Info */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 mt-3 mb-4 text-sm flex justify-between">
                <p className="text-gray-300">
                  👥 <span className="font-semibold">Current:</span>{" "}
                  {event.currentParticipants ?? 0}
                </p>
                <p className="text-gray-300">
                  🎯 <span className="font-semibold">Max:</span>{" "}
                  {event.maxParticipants ?? "N/A"}
                </p>
              </div>

              <div className="mt-4 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate(`/events/${event._id}`)}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-pink-500/50 transition-all"
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EventList
