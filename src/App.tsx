import { HashRouter, Routes, Route } from 'react-router-dom';
import MobileLayout from './components/layout/MobileLayout';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Reservations from './pages/Reservations';
import Guide from './pages/Guide';
import Records from './pages/Records';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MobileLayout />}>
          <Route index element={<Home />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="guide" element={<Guide />} />
          <Route path="records" element={<Records />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
