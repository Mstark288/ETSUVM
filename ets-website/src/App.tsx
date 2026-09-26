// App.tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './components/layout/Mainlayout';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy load pages for optimal performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Programs = lazy(() => import('./pages/Programs'));
const ProgramDetails = lazy(() => import('./pages/ProgramDetails'));
const Faculty = lazy(() => import('./pages/Faculty'));
// const Admissions = lazy(() => import('./pages/Admissions'));
// const News = lazy(() => import('./pages/News'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ApplicationForm =lazy(() => import ('./pages/Apply'));

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <MainLayout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/:programId" element={<ProgramDetails />} />
              <Route path="/faculty" element={<Faculty />} />
              {/* <Route path="/admissions" element={<Admissions />} /> */}
              {/* <Route path="/news" element={<News />} /> */}
              <Route path="/contact" element={<Contact />} />
              <Route path='/apply' element = {<ApplicationForm/>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </MainLayout>
      </Router>
    </HelmetProvider>
  );
}