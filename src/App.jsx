import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Seksiyalarni import qilish
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

// Komponentlarni import qilish
import Header from './components/Header';
import Footer from './components/Footer';

// Sahifalar o'rtasidagi silliq o'tish animatsiyasi
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Asosiy sahifa: Hamma narsa bitta sahifada bo'lishi uchun */}
        <Route 
          path="/" 
          element={
            <PageWrapper>
              <Hero />
              <About />
              <Projects />
              <Contact />
            </PageWrapper>
          } 
        />
        
        {/* Alohida sahifalar (Navigatsiya uchun) */}
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#030014] text-white selection:bg-purple-500/30 overflow-x-hidden">
        
        {/* Fon effektlari */}
        <div className="fixed inset-0 z-[-1]">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        </div>

        <Header />
        
        <main className="pt-20">
          <AnimatedRoutes />
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;