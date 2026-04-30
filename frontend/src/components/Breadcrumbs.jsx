import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to="/dashboard" className="inline-flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium">
            <Home className="w-4 h-4 mr-1.5" />
            Home
          </Link>
        </li>
        
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          const title = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');
          
          if (value.toLowerCase() === 'dashboard') return null;

          return (
            <li key={to} className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              {isLast ? (
                <span className="text-gray-900 font-semibold">{title}</span>
              ) : (
                <Link to={to} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  {title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;