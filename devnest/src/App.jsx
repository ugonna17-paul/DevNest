import { useState } from 'react'
import { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
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
import { WelcomeModal } from './components/WelcomeModal';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { CoursePage } from './pages/CoursePage';
import { LessonPage } from './pages/LessonPage';
import { Playground } from './pages/Playground';
import { Projects } from './pages/Projects';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { AdminPayments } from './pages/AdminPayments';

function App() {

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <>
          <WelcomeModal />
          <Navbar />
          <Hero />
          <Technologies />
          <WhyDevNest />
          <LearningPaths />
          <InteractiveCode />
          <HowItWorks />
          <Footer />
        </>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/course/:courseId" element={<CoursePage />} />
      <Route path="/lesson/:lessonId" element={<LessonPage />} />
      <Route path="/playground" element={<Playground />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/admin/payments" element={<AdminPayments />} />
    </Routes>
  )
}

export default App
