import React from 'react'
import Navbar from '../components/Navbar'
import MediaCards from "../components/MediaCards"

const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Navbar/>
        
        {/* Main content with proper padding */}
        <main className="pt-20 pb-24 md:pb-8">
          <MediaCards/>
        </main>
      </div>
    </>
  )
}

export default Home