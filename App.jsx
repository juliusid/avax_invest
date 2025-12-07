import React, { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Header } from "./components/Header.jsx";
import { Home } from "./pages/Home";
import { Invest } from "./pages/Invest.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { About } from "./pages/About";
import { Archives } from "./pages/Archives";
import { ProjectDetails } from "./pages/ProjectDetails";
import { Profile } from "./pages/Profile"; // 1. Added Profile Import
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";
import { AuthModal } from "./components/AuthModal.jsx";
import { VerificationModal } from "./components/VerificationModal.jsx";

// 2. Added Notification Imports from frontend changes
import { NotificationProvider } from "./contexts/NotificationContext";
import { NotificationToast } from "./components/NotificationToast";

const AppContent = () => {
  const { user, logout } = useAuth(); // Keeps your real backend session

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  // Verification Modal State
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verifyData, setVerifyData] = useState({ email: "", phone: "" });

  const openLogin = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthMode("signup");
    setIsAuthModalOpen(true);
  };

  const triggerVerification = (email, phone) => {
    setVerifyData({ email, phone });
    setIsAuthModalOpen(false);
    setIsVerifyModalOpen(true);
  };

  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-white font-sans selection:bg-farm-500 selection:text-white flex flex-col">
        <Header
          isLoggedIn={!!user}
          onLoginClick={openLogin}
          onSignupClick={openSignup}
          onLogoutClick={logout}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          initialMode={authMode}
          onClose={() => setIsAuthModalOpen(false)}
          onVerificationNeeded={triggerVerification}
        />

        <VerificationModal
          isOpen={isVerifyModalOpen}
          onClose={() => setIsVerifyModalOpen(false)}
          email={verifyData.email}
          phone={verifyData.phone}
        />

        {/* 3. New Toast Component for notifications */}
        <NotificationToast />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/project/:id" element={<ProjectDetails />} />

            {/* 4. Added Protected Profile Route */}
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/" replace />}
            />

            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/" replace />}
            />
          </Routes>
        </main>

        <footer className="bg-gray-950 border-t border-gray-800 py-12 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-500 text-sm">
              &copy; 2024 FarmStock Platform. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

const App = () => {
  return (
    // 5. Wrap everything with BOTH Providers
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
