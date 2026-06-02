import { HashRouter, Routes, Route } from 'react-router-dom';
import MobileLayout from './components/layout/MobileLayout';
import OlleHome from './pages/OlleHome';
import OlleSchedule from './pages/OlleSchedule';
import OlleCourses from './pages/OlleCourses';
import OllePrep from './pages/OllePrep';
import OlleInfo from './pages/OlleInfo';
import OlleTracker from './pages/OlleTracker';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MobileLayout />}>
          <Route index element={<OlleHome />} />
          <Route path="schedule" element={<OlleSchedule />} />
          <Route path="courses" element={<OlleCourses />} />
          <Route path="prep" element={<OllePrep />} />
          <Route path="info" element={<OlleInfo />} />
          <Route path="tracker" element={<OlleTracker />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
