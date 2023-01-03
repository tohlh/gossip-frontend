import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/layout';
import Login from './pages/login';
import RouteGuard from './components/RouteGuard';
import { hasAuthToken } from './utils/auth';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<RouteGuard pred={!hasAuthToken()} element={<Login />} redirect="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
