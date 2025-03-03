import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/home/home';
import Produtos from './pages/produtos/produtos';
import Vendas from './pages/vendas/vendas';
import AddVenda from './pages/vendas/addVenda/addVenda';
import VendaDetalhes from './pages/vendas/vendaDetalhes/vendaDetalhes';

const App = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        jwtDecode(token);
        setAuth(true);
      } catch {
        localStorage.removeItem('token');
        setAuth(false);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/produtos" element={<ProtectedRoute><Produtos /></ProtectedRoute>} />
        <Route path="/vendas" element={<ProtectedRoute><Vendas /></ProtectedRoute>} />
        <Route path="/vendas" element={<ProtectedRoute><Vendas /></ProtectedRoute>} />
        <Route path="/vendas/:id" element={<ProtectedRoute><VendaDetalhes /></ProtectedRoute>} />
        <Route path="/addVenda" element={<ProtectedRoute><AddVenda/></ProtectedRoute>} />
        <Route path="*" element={<Navigate to={auth ? "/home" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;