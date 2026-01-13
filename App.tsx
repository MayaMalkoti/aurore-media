import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import LeadMagnet from './components/LeadMagnet';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-aurore-dark min-h-screen text-white selection:bg-yellow-500 selection:text-black">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <LeadMagnet />
      </main>
      <Footer />
    </div>
  );
}

export default App;