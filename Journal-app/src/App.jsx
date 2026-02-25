import React, { useState } from 'react';
import JournalApp from './pages/JournalApp';
import LandingPage from './pages/LandingPage';
import GuidelinesApp from './pages/GuidelinesApp';
import TreatmentGuidelinesApp from './pages/TreatmentGuidelinesApp';
import ScoringToolsApp from './pages/ScoringToolsApp';
import SubstanceAbuseApp from './pages/SubstanceAbuseApp';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, info: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, info) {
        this.setState({ info });
    }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: 20, color: 'red', background: '#ffebee' }}>
                    <h1>Something went wrong.</h1>
                    <pre>{this.state.error?.toString()}</pre>
                    <pre>{this.state.info?.componentStack}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}

function App() {
    const [currentView, setCurrentView] = useState('home');

    const handleNavigate = (view) => {
        setCurrentView(view);
    };

    return (
        <ErrorBoundary>
            <div className="w-full min-h-screen bg-[#F9F8F6]">
                {currentView === 'home' && <LandingPage onNavigate={handleNavigate} />}
                {currentView === 'journal' && <JournalApp onNavigate={handleNavigate} />}
                {currentView === 'guidelines' && <GuidelinesApp onNavigate={handleNavigate} />}
                {currentView === 'treatment' && <TreatmentGuidelinesApp onNavigate={handleNavigate} />}
                {currentView === 'scoring' && <ScoringToolsApp onNavigate={handleNavigate} />}
                {currentView === 'substance' && <SubstanceAbuseApp onNavigate={handleNavigate} />}
            </div>
        </ErrorBoundary>
    );
}

export default App;
