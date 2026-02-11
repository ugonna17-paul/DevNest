import { useState } from 'react'
import { useEffect } from "react";
import AOS from "aos";
import './App.css'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Technologies } from './components/Technologis'
import { WhyDevNest } from './components/WhyDevNest';
import { LearningPaths } from './components/LearningPaths';
import { InteractiveCode } from './components/InteractiveCode';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';

function App() {

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Technologies />
      <WhyDevNest />
      <LearningPaths />
      <InteractiveCode />
      <HowItWorks />
      <Footer />
    </>
  )
}

export default App
