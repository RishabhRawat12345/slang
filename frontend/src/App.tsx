import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./pages/Navbar/Navbar"
import EventList from "./pages/EventList/Eventlist"
import CreateEvent from "./pages/CreateEvent/CreateEvent"
import Eventdetails from "./pages/Eventdetails/Eventdetails"

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className=""> 
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/events/:id" element={<Eventdetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
