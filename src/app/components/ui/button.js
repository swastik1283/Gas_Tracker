import React from 'react';
import classNames from 'classnames';

export const Button = ({
  children,
  className = '',
  variant = 'default',
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
  };

  return (
    <button className={classNames(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};
