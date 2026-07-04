import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20',
    secondary: 'bg-secondary text-text-secondary border border-border hover:bg-secondary-hover hover:text-text-primary',
    danger: 'bg-danger text-white hover:bg-danger-hover shadow-lg shadow-red-500/10 hover:shadow-red-500/20',
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
}
