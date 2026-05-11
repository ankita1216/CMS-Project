import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

// Lazy loaded admin pages
const AdminLogin = lazy(() => import('./admin/AdminLogin'))
const Dashboard = lazy(() => import('./admin/Dashboard'))
const ManageProjects = lazy(() => import('./admin/ManageProjects'))
const Inquiries = lazy(() => import('./admin/Inquiries'))

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { session, loading } = useAuth()

  if (loading) return <Loader fullScreen />
  
  if (!session) {
    return <Navigate to="/admin" replace />
  }

  return children
}

import ScrollToTop from './components/ScrollToTop'
import WhatsAppButton from './components/WhatsAppButton'
import SEOHead from './components/SEOHead'

function App() {
  return (
    <Router>
      <SEOHead />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Suspense fallback={<Loader fullScreen />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/projects" 
                element={
                  <ProtectedRoute>
                    <ManageProjects />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/inquiries" 
                element={
                  <ProtectedRoute>
                    <Inquiries />
                  </ProtectedRoute>
                } 
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <ScrollToTop />
        <WhatsAppButton />
      </div>
    </Router>
  )
}

export default App
