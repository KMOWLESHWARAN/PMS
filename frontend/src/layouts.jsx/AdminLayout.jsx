import React, { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { LayoutDashboard, Package, Folder, Menu } from 'lucide-react';

function AdminLayout({ children }) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">

      <div className="{`${isCollapsed ? 'w-20' : 'w-56'}} bg-gray-900 text-white p-5 transition-all duration-600">

        <h1 className={`text-xl font-bold mb-6 ${isCollapsed ? 'hidden' : 'block'}`}>Admin Panel</h1>

        <div className="mt-6 space-y-2">
          <button onClick={()=> setIsCollapsed(!isCollapsed)} className='mb-4 p-2 hover:bg-grat-700 rounded'><Menu size={20}/></button>

          <Link to="/dashboard" className={`flex items-center gap-2 px-3 py-2 rounded ${location.pathname === "/dashboard" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}><LayoutDashboard size={18} /> {!isCollapsed && "Dashboard"}</Link>

          <Link to="/products" className={`flex items-center gap-2 px-3 py-2 rounded ${location.pathname === "/products" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}><Package size={18} /> {!isCollapsed && "Products"}</Link>

          <Link to="/categories" className={`flex items-center gap-2 px-3 py-2 rounded ${location.pathname === "/categories" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}><Folder size={18} />  {!isCollapsed && "Categories"}</Link>
        </div>
      </div>

      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {children}
      </div>

    </div>
  );
}
export default AdminLayout;