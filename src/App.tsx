import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { SymptomIntakePage } from './pages/SymptomIntakePage';
import { TriageResultPage } from './pages/TriageResultPage';
import { SymptomTrackerPage } from './pages/SymptomTrackerPage';
import { AboutPage } from './pages/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/triage" element={<SymptomIntakePage />} />
          <Route path="/result/:id" element={<TriageResultPage />} />
          <Route path="/tracker" element={<SymptomTrackerPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
