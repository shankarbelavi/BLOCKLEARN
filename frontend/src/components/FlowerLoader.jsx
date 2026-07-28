import React from 'react';

const FlowerLoader = ({
  size = 'medium',
  color = '#5c3d99',
  className = '',
  showText = false,
  text = 'Loading...'
}) => {
  const sizeClasses = {
    small: 'scale-25',
    medium: 'scale-50',
    large: 'scale-75',
    xlarge: 'scale-100'
  };

  const loaderStyle = {
    '--fill-color': color,
    '--shine-color': `${color}33`
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`loader ${sizeClasses[size]}`}
        style={loaderStyle}
      >
        <svg viewBox="0 0 200 200" width="200" height="200">
          <g id="pegtopone">
            <path d="M100,20 L110,40 L90,40 Z" />
            <path d="M100,20 L105,35 L95,35 Z" />
            <circle cx="100" cy="45" r="3" />
          </g>
          <g id="pegtoptwo">
            <path d="M100,20 L110,40 L90,40 Z" />
            <path d="M100,20 L105,35 L95,35 Z" />
            <circle cx="100" cy="45" r="3" />
          </g>
          <g id="pegtopthree">
            <path d="M100,20 L110,40 L90,40 Z" />
            <path d="M100,20 L105,35 L95,35 Z" />
            <circle cx="100" cy="45" r="3" />
          </g>
        </svg>
      </div>

      {showText && (
        <p className="mt-4 text-sm text-gray-600 dark:text-slate-400 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default FlowerLoader;
