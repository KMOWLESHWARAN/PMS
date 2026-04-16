import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Folder } from 'lucide-react';

function AdminLayout({ children }) {
  const location = useLocation();

  return (
    <div className="flex h-screen">

      <div className="w-56 bg-gray-900 text-white p-5">
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

        <div className="mt-6 space-y-2">
          <Link to="/dashboard" className={`flex items-center gap-2 px-3 py-2 rounded ${location.pathname === "/dashboard" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}><LayoutDashboard size={18} /> Dashboard</Link>

          <Link to="/products" className={`flex items-center gap-2 px-3 py-2 rounded ${location.pathname === "/products" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}><Package size={18} />Products</Link>

          <Link to="/categories" className={`flex items-center gap-2 px-3 py-2 rounded ${location.pathname === "/categories" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}><Folder size={18} />  Categories</Link>
        </div>
      </div>

      <div className="flex-1 bg-gray-100 p-6">
        {children}
      </div>

    </div>
  );
}
export default AdminLayout;