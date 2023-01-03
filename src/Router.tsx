import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RouteGuard from './components/RouteGuard';
import { hasAuthToken } from './utils/auth';
import Login from './pages/login';
import Signup from './pages/signup';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<RouteGuard pred={!hasAuthToken()} element={<Login />} redirect="/" />} />
        <Route path="/signup" element={<RouteGuard pred={!hasAuthToken()} element={<Signup />} redirect="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
