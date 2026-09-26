import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Loading from './components/ui/Loading';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}