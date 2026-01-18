import React, { useState } from 'react';
import LoadingScreen from './components/common/LoadingScreen';
import Navigation from './components/common/Navigation';
import ThreeBackground from './components/backgrounds/ThreeBackground';
// import SlinkyCursor from './components/backgrounds/SlinkyCursor';
import HomePage from './pages/HomePage';
import TechnicalPage from './pages/TechnicalPage';
import LocationPage from './pages/LocationPage';
import ContactPage from './pages/ContactPage';
import ProjectAutopsy from './pages/ProjectAutopsy/projectAutopsy';
import Dashboard from './pages/EventsPage/Dashboard'; // Ensure this path is correct based on where you saved Dashboard.js


const App = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'events':
        // CHANGE HERE: Render Dashboard instead of EventsPage
        return <Dashboard />;
      case 'technical':
        return <TechnicalPage />;
      case 'Location':
        return <LocationPage />;
      case 'contact':
        return <ContactPage />;
      case 'projectAutopsy':
        return <ProjectAutopsy onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {loading && <LoadingScreen onLoadComplete={() => setLoading(false)} />}
      {!loading && (
        <React.Fragment>
          {/* <SlinkyCursor /> 
          <ThreeBackground /> */}
          <div className="pb-24">
            {renderPage()}
          </div>
          <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        </React.Fragment>
      )}
    </div>
  );
};

export default App;