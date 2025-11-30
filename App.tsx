import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Invest } from './pages/Invest';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { X, Eye, EyeOff, ShieldCheck, Mail, Lock, User, Globe, Phone, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './components/Button';

// --- Authentication Modal Component ---
interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onLoginSuccess: (name: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialMode, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [signupStep, setSignupStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'USA',
    password: '',
    code: ''
  });

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setSignupStep(1);
      setFormData({ name: '', email: '', phone: '', country: 'USA', password: '', code: '' });
      setIsLoading(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const simulateAsync = (callback: () => void) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      callback();
    }, 1500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    simulateAsync(() => {
      onLoginSuccess(formData.email.split('@')[0] || "Investor");
      onClose();
      alert(`Welcome back! Redirecting to Investor Dashboard...`);
    });
  };

  const handleSignupStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    simulateAsync(() => {
      setSignupStep(2);
    });
  };

  const handleSignupVerification = (e: React.FormEvent) => {
    e.preventDefault();
    simulateAsync(() => {
      onLoginSuccess(formData.name || "Investor");
      onClose();
      alert("Verification Successful! Welcome to the Global Investor Dashboard.");
    });
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setSignupStep(1);
  };

  const passwordStrength = formData.password.length > 8 ? "Strong" : "Weak";
  const passwordColor = formData.password.length > 8 ? "text-green-500" : "text-yellow-500";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 p-1 hover:bg-gray-800 rounded-full"
        >
          <X size={20} />
        </button>

        {/* --- LOGIN VIEW --- */}
        {mode === 'login' && (
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-farm-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-farm-500">
                <Lock size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400 text-sm">Access your agricultural portfolio</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="investor@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-farm-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Password</label>
                  <a href="#" className="text-xs text-farm-500 hover:text-farm-400">Forgot Password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-10 text-white placeholder-gray-600 focus:outline-none focus:border-farm-500 transition-colors"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button variant="primary" className="w-full mt-6 py-3" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Login to Dashboard"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <button onClick={toggleMode} className="text-white hover:text-farm-500 font-medium underline-offset-4 hover:underline">
                Sign up
              </button>
            </div>
          </div>
        )}

        {/* --- SIGN UP VIEW STEP 1 --- */}
        {mode === 'signup' && signupStep === 1 && (
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-400 text-sm">Join the global agricultural market.</p>
            </div>

            <form onSubmit={handleSignupStep1} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Full Legal Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-farm-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Email</label>
                    <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-3 text-white placeholder-gray-600 focus:outline-none focus:border-farm-500"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Phone</label>
                    <input 
                    type="tel" 
                    name="phone"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-3 text-white placeholder-gray-600 focus:outline-none focus:border-farm-500"
                    />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Country of Residence</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <select 
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-farm-500 appearance-none cursor-pointer"
                  >
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Canada">Canada</option>
                    <option value="Germany">Germany</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide flex justify-between">
                    <span>Password</span>
                    <span className={`text-[10px] ${formData.password ? passwordColor : 'text-gray-600'}`}>
                        {formData.password ? passwordStrength : 'Min 8 chars'}
                    </span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    required
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-10 pr-10 text-white placeholder-gray-600 focus:outline-none focus:border-farm-500"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input type="checkbox" required id="terms" className="mt-1 rounded bg-gray-800 border-gray-700 text-farm-500 focus:ring-farm-500" />
                <label htmlFor="terms" className="text-xs text-gray-400">
                    I verify that I am an accredited investor and agree to the <a href="#" className="text-farm-500 underline">Terms of Service</a> and Investment Risks.
                </label>
              </div>

              <Button variant="primary" className="w-full mt-4" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                  <span className="flex items-center">Verify & Continue <ChevronRight size={16} className="ml-1" /></span>
                )}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <button onClick={toggleMode} className="text-white hover:text-farm-500 font-medium underline-offset-4 hover:underline">
                Log in
              </button>
            </div>
          </div>
        )}

        {/* --- SIGN UP VIEW STEP 2 (VERIFICATION) --- */}
        {mode === 'signup' && signupStep === 2 && (
            <div className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500 animate-pulse">
                    <ShieldCheck size={32} />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-2">Security Verification</h2>
                <p className="text-gray-400 text-sm mb-8 px-4">
                    We've sent a 6-digit secure code to <span className="text-white font-medium">{formData.email}</span>
                </p>

                <form onSubmit={handleSignupVerification} className="space-y-6">
                    <div>
                        <input 
                            type="text" 
                            name="code"
                            required
                            maxLength={6}
                            placeholder="0 0 0 0 0 0"
                            value={formData.code}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                setFormData({ ...formData, code: val });
                            }}
                            className="w-full bg-gray-900 border-b-2 border-gray-700 text-center text-4xl font-bold tracking-[0.5em] py-4 text-white focus:outline-none focus:border-farm-500 placeholder-gray-700 transition-colors"
                        />
                    </div>
                    
                    <div className="text-sm text-gray-500">
                        Resend code in <span className="text-white">0:59</span>
                    </div>

                    <Button variant="primary" className="w-full py-3" disabled={isLoading || formData.code.length < 6}>
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Confirm Code"}
                    </Button>
                </form>

                <button 
                    onClick={() => setSignupStep(1)} 
                    className="mt-6 text-sm text-gray-500 hover:text-white flex items-center justify-center mx-auto gap-1"
                >
                    Change contact details
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  // Simulating authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string>('');
  
  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const openLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    // Optional: redirect to home
  };

  const handleLoginSuccess = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-white font-sans selection:bg-farm-500 selection:text-white flex flex-col">
        <Header 
          isLoggedIn={isLoggedIn} 
          onLoginClick={openLogin}
          onSignupClick={openSignup}
          onLogoutClick={handleLogout}
        />
        
        <AuthModal 
            isOpen={isAuthModalOpen}
            initialMode={authMode}
            onClose={closeAuthModal}
            onLoginSuccess={handleLoginSuccess}
        />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/invest" element={<Invest />} />
            <Route 
              path="/dashboard" 
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />} 
            />
          </Routes>
        </main>

        {/* Simple Footer */}
        <footer className="bg-gray-950 border-t border-gray-800 py-12 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-500 text-sm">
              &copy; 2024 FarmStock Platform. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;