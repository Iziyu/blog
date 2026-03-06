import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import WriteArticle from './pages/WriteArticle';

export default function App() {
  const { user, login, register, logout } = useAuth();

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar user={user} onLogout={logout} />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticleDetail user={user} />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={login} />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register onRegister={register} />} />
            <Route path="/write" element={user ? <WriteArticle /> : <Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
