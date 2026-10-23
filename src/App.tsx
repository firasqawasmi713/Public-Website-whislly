import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { PageType } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SocialMediaPage } from './pages/SocialMediaPage';
import { CareersPage } from './pages/CareersPage';
import { JobApplicationPage } from './pages/JobApplicationPage';
import { CreativeProductionPage } from './pages/CreativeProductionPage';
import { BusinessSolutionsPage } from './pages/BusinessSolutionsPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactModal } from './components/ContactModal';
import { LanguageProvider } from './context/LanguageContext';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Derive current page for header active state
  let currentPage: PageType = 'home';
  if (location.pathname.startsWith('/careers')) {
    currentPage = 'careers';
  } else if (location.pathname.startsWith('/social-media')) {
    currentPage = 'social-media';
  } else if (location.pathname.startsWith('/creative-production')) {
    currentPage = 'creative-production';
  } else if (location.pathname.startsWith('/business-solutions')) {
    currentPage = 'business-solutions';
  } else if (location.pathname.startsWith('/about')) {
    currentPage = 'about';
  }

  // Handle section scrolling on route/hash changes
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '') + '-section';
      const el = document.getElementById(elementId) || document.getElementById(location.hash.replace('#', ''));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  const handleNavigate = (page: PageType, hashSection?: string) => {
    if (page === 'home') {
      if (hashSection) {
        navigate(`/#${hashSection}`);
      } else {
        navigate('/');
      }
    } else if (page === 'social-media') {
      navigate('/social-media');
    } else if (page === 'creative-production') {
      navigate('/creative-production');
    } else if (page === 'business-solutions') {
      navigate('/business-solutions');
    } else if (page === 'careers') {
      navigate('/careers');
    } else if (page === 'about') {
      navigate('/about');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* Top Navigation Bar: Sticky */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onNavigate={handleNavigate}
                onOpenContact={() => setIsContactOpen(true)}
              />
            }
          />
          <Route
            path="/services"
            element={
              <HomePage
                onNavigate={handleNavigate}
                onOpenContact={() => setIsContactOpen(true)}
              />
            }
          />
          <Route
            path="/social-media"
            element={
              <SocialMediaPage
                onNavigate={handleNavigate}
                onOpenContact={() => setIsContactOpen(true)}
              />
            }
          />
          <Route
            path="/creative-production"
            element={
              <CreativeProductionPage
                onNavigate={handleNavigate}
                onOpenContact={() => setIsContactOpen(true)}
              />
            }
          />
          <Route
            path="/business-solutions"
            element={
              <BusinessSolutionsPage
                onNavigate={handleNavigate}
                onOpenContact={() => setIsContactOpen(true)}
              />
            }
          />
          <Route
            path="/about"
            element={
              <AboutUsPage
                onNavigate={handleNavigate}
                onOpenContact={() => setIsContactOpen(true)}
              />
            }
          />
          <Route
            path="/careers"
            element={<CareersPage onNavigate={handleNavigate} />}
          />
          {/* Route for job application requested: /careers/apply/:jobId */}
          <Route
            path="/careers/apply/:jobId"
            element={<JobApplicationPage />}
          />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Contact & Project Proposal Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </BrowserRouter>
  );
}
