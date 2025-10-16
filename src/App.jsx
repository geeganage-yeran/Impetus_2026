import { useState } from 'react'
import './App.css'
import HeroSection from './components/HeroSection'
import NavBar from './components/NavBar'
import ThemeSection from './components/ThemeSection'
import TargetAudience from './components/TargetAudience'
import ImportantDates from './components/ImportantDates'
import SubmissionSection from './components/SubmissionSection'
import SpeakersSection from './components/SpeakersSection'
import SponsorsSection from './components/SponsorsSection'
import Footer from './components/Footer'
import VenueSection from './components/VenueSection'
import ContactSection from './components/ContactSection'

function App() {
  return (
    <>
    <NavBar/>
    <HeroSection/>
    <ThemeSection/>
    <TargetAudience/>
    <ImportantDates/>
    <SubmissionSection/>
    <SpeakersSection/>
    <SponsorsSection/>
    <VenueSection/>
    <ContactSection/>
    <Footer/>
    </>
  )
}

export default App
