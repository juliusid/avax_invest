import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sprout, Menu, X, User } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  isLoggedIn: boolean;
  onLoginToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLoginToggle }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-farm-500' : 'text-gray-300 hover:text-white'
    }`;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <NavLink to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-farm-500 rounded-lg flex items-center justify-center shadow-lg shadow-farm-500/20">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">FarmStock</span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/invest" className={navLinkClass}>Invest</NavLink>
            {isLoggedIn && (
              <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                   <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                     <User size={16} />
                   </div>
                   <span className="text-sm">John Doe</span>
                </div>
                <Button variant="outline" onClick={onLoginToggle} className="!py-1.5 !px-4 text-xs">
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" onClick={onLoginToggle}>Log In</Button>
                <Button variant="primary" onClick={() => alert("Sign up modal would open here")}>
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <NavLink 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
            >
              About
            </NavLink>
            <NavLink 
              to="/invest" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
            >
              Invest
            </NavLink>
            {isLoggedIn && (
              <NavLink 
                to="/dashboard" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
              >
                Dashboard
              </NavLink>
            )}
            <div className="pt-4 border-t border-gray-800 flex flex-col gap-3">
               {isLoggedIn ? (
                 <Button variant="outline" onClick={onLoginToggle} className="w-full justify-center">Logout</Button>
               ) : (
                 <>
                  <Button variant="secondary" onClick={onLoginToggle} className="w-full justify-center">Log In</Button>
                  <Button variant="primary" className="w-full justify-center">Sign Up</Button>
                 </>
               )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};