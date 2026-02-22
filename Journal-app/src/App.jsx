import React, { useState } from 'react';
import JournalApp from './pages/JournalApp';
import LandingPage from './pages/LandingPage';

function App() {
    const [currentView, setCurrentView] = useState('home');

    const handleNavigate = (view) => {
        setCurrentView(view);
    };

    return (
        <div className="w-full min-h-screen bg-[#F9F8F6]">
            {currentView === 'home' && <LandingPage onNavigate={handleNavigate} />}
            {currentView === 'journal' && <JournalApp onNavigate={handleNavigate} />}
        </div>
    );
}

export default App;
