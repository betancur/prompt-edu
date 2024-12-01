import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import Library from './pages/Library';
import Frameworks from './pages/Frameworks';
import Resources from './pages/Resources';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DocumentLibrary from './pages/DocumentLibrary';
import NotFound from './pages/NotFound';
import { Toaster } from "@/components/ui/toaster";
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <ScrollToTop /> {/* Añade ScrollToTop aquí */}
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="library" element={<Library />} />
            <Route path="frameworks" element={<Frameworks />} />
            <Route path="resources" element={<Resources />} />
            <Route path="documents" element={<DocumentLibrary />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </div>
    </HelmetProvider>
  );
}

export default App;
