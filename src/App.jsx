import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import CallForPapers from './pages/CallForPapers';
import Registration from './pages/Registration';
import Committee from './pages/Committe';
import Contact from './pages/Contact';

import './App.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cfp" element={<CallForPapers />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;