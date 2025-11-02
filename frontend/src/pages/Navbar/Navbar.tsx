import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

const Navbar = () => {
  const location = useLocation()

  const links = [
    { name: "Home", path: "/" },
    { name: "Create Event", path: "/create" },
  ]

  return (
    <nav className="bg-black text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-extrabold tracking-wide"
        >
          🎭 EventSphere
        </motion.h1>

        <div className="flex space-x-8">
          {links.map((link) => {
            const active = location.pathname === link.path
            return (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.path}
                  className={`relative text-lg font-medium transition-colors ${
                    active ? "text-pink-400" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-pink-400 rounded-full"
                    />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
