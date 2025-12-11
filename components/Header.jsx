import React, { useState } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { Sprout, Menu, X, User } from "lucide-react";
import { Button } from "./Button";
import logo from "../assets/logos/LOGO HORIZONTAL GREEN.svg";

export const Header = ({
  isLoggedIn,
  onLoginClick,
  onSignupClick,
  onLogoutClick,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-farm-500" : "text-gray-300 hover:text-white"
    }`;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
          >
            {/* <div className="w-10 h-10 bg-farm-500 rounded-lg flex items-center justify-center shadow-lg shadow-farm-500/20"> */}
            {/* <Sprout className="w-6 h-6 text-white" /> */}
            {/* </div> */}
            <img src={logo} className="h-10 object-contain" />
            {/* <span className="text-xl font-bold tracking-tight text-white">
              FarmStock
            </span> */}
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/invest" className={navLinkClass}>
              Invest
            </NavLink>
            <NavLink to="/archives" className={navLinkClass}>
              Archives
            </NavLink>
            {isLoggedIn && (
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 group-hover:border-farm-500 transition-colors">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-medium">John Doe</span>
                </Link>
                <div className="h-6 w-px bg-gray-700 mx-1"></div>
                <Button
                  variant="outline"
                  onClick={onLogoutClick}
                  className="!py-1.5 !px-4 text-xs"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" onClick={onLoginClick}>
                  Log In
                </Button>
                <Button variant="primary" onClick={onSignupClick}>
                  Get Started
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
            <NavLink
              to="/archives"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
            >
              Archives
            </NavLink>
            {isLoggedIn && (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  My Profile
                </NavLink>
              </>
            )}
            <div className="pt-4 border-t border-gray-800 flex flex-col gap-3">
              {isLoggedIn ? (
                <Button
                  variant="outline"
                  onClick={onLogoutClick}
                  className="w-full justify-center"
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLoginClick();
                    }}
                    className="w-full justify-center"
                  >
                    Log In
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onSignupClick();
                    }}
                    className="w-full justify-center"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
