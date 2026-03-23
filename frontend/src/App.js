import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ContractAnalyser from './pages/ContractAnalyser';
import SituationAdvisor from './pages/SituationAdvisor';
import ReviewDecoder from './pages/ReviewDecoder';
import SalaryIntelligence from './pages/SalaryIntelligence';
import BurnoutTracker from './pages/BurnoutTracker';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ContractAnalyser />} />
        <Route path="/situation" element={<SituationAdvisor />} />
        <Route path="/review" element={<ReviewDecoder />} />
        <Route path="/salary" element={<SalaryIntelligence />} />
        <Route path="/burnout" element={<BurnoutTracker />} />
      </Routes>
    </Router>
  );
}

export default App;