import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoutes from './components/ProtectedRoutes';
import ProductList from './pages/products/ProductList';
import AdminLayout from './layouts.jsx/AdminLayout';
import CategoryPage from './pages/categories/CategoryPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<AdminLayout><ProtectedRoutes><Dashboard /></ProtectedRoutes></AdminLayout>} />
        <Route path='/products' element={<AdminLayout><ProductList /></AdminLayout>} />
        <Route path="/categories" element={<AdminLayout><CategoryPage /></AdminLayout>} />
      </Routes>
    </>
  )
}

export default App