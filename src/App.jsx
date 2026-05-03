import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
// Pages
import Home from './pages/Home';
import Author from './pages/Author';
import RegistrationForm from './pages/RegistrationForm';
import Registration from './pages/Registration';
import ProgramDetails from './pages/ProgramDetails';
import Committee from './pages/Committe';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';

import './App.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/author" element={<Author />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/program" element={<ProgramDetails />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register-form" element={<RegistrationForm />} />
        </Routes>
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}

export default App;

