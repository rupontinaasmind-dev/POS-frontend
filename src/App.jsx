import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import DemoPage from './pages/DemoPage';
import ContactUs from './component/ContactUs';
import FloatingContact from './component/FloatingContact';
import Dashboard from './pages/Dashboard';
import DashboardBang from './pages/DashboardBang';
import ThankYou from './pages/ThankYou';
import Login from './pages/Login';
import PrivateRoute from './component/PrivateRoute';
import HomeBang from './pages/HomeBang';
import DemoPageBang from './pages/DemoPageBang';
import ThankYouBang from './pages/ThankYouBang';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicyBang from './pages/PrivacyPolicyBang';
import TermsOfServiceBang from './pages/TermsOfServiceBang';
import LoginBang from './pages/LoginBang';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          {/* Bangla route */}
          <Route path="/bn" element={<HomeBang />} />
          <Route path="/bn/demo" element={<DemoPageBang />} />
          <Route path="/bn/thank-you" element={<ThankYouBang />} />
          <Route path="/bn/privacy-policy" element={<PrivacyPolicyBang />} />
          <Route path="/bn/terms-of-service" element={<TermsOfServiceBang />} />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/bn/admin" element={
            <PrivateRoute>
              <DashboardBang />
            </PrivateRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/bn/login" element={<LoginBang />} />

        </Routes>
        <FloatingContact />
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;

