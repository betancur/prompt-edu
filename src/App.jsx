import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Library from './pages/Library';
import Frameworks from './pages/Frameworks';
import Resources from './pages/Resources';
import { Toaster } from "@/components/ui/toaster";
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="library" element={<Library />} />
          <Route path="frameworks" element={<Frameworks />} />
          <Route path="resources" element={<Resources />} />
        </Route>
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
