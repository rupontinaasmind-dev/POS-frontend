import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import DemoPage from './pages/DemoPage';
import ContactUs from './component/ContactUs';
import FloatingContact from './component/FloatingContact';
import Dashboard from './pages/Dashboard';
import ThankYou from './pages/ThankYou';
import Login from './pages/Login';
import PrivateRoute from './component/PrivateRoute';

function App() {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/thank-you" element={<ThankYou />} />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/login" element={<Login />} />

          </Routes>
          <FloatingContact />
          <Toaster position="top-right" />
        </Router>
      </AuthProvider>
  );
}

export default App;

