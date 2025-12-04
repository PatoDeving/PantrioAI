import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import Hidden1 from './pages/Hidden1';

function AppContent() {
  const location = useLocation();
  const isHiddenPage = location.pathname === '/hidden1';

  return (
    <div className="App min-h-screen bg-dark-bg text-white">
      {!isHiddenPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hidden1" element={<Hidden1 />} />
      </Routes>
      {!isHiddenPage && <Footer />}
      {!isHiddenPage && <Chatbot />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
