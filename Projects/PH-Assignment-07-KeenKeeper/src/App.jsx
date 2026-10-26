import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import FriendDetails from './components/friendsDetails'
import Timeline from './components/Timeline'
import Stats from './components/stats'
import NotFound from './components/NotFound'
import { TimelineProvider } from './context/TimelineContext'

export default function App() {
  return (
    <TimelineProvider>
      <div className="min-h-screen flex flex-col bg-[#F0F4F2]">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/friend/:id" element={<FriendDetails />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </TimelineProvider>
  )
}