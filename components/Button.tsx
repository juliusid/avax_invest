import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: React.ReactNode;
  to?: string;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  to,
  href,
  ...props 
}) => {
  const baseStyles = "px-6 py-2.5 rounded-xl font-medium transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 inline-flex cursor-pointer";
  
  const variants = {
    primary: "bg-farm-500 hover:bg-farm-600 text-white shadow-lg hover:shadow-farm-500/20 border border-transparent",
    secondary: "bg-white text-gray-900 hover:bg-gray-100 shadow-md border border-transparent",
    outline: "bg-transparent border border-farm-500 text-farm-500 hover:bg-farm-500/10",
    ghost: "bg-transparent text-gray-300 hover:text-white hover:bg-white/5",
  };
  
  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={styles}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={styles} {...(props as any)}>
        {children}
      </a>
    );
  }

  return (
    <button 
      className={styles} 
      {...props}
    >
      {children}
    </button>
  );
};