import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RouteGuard from './components/RouteGuard';
import { hasAuthToken } from './utils/auth';
import Login from './pages/login';
import Signup from './pages/signup';
import Layout from './pages/layout';
import Posts from './pages/posts';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<RouteGuard pred={!hasAuthToken()} element={<Login />} redirect="/" />} />
        <Route path="/signup" element={<RouteGuard pred={!hasAuthToken()} element={<Signup />} redirect="/" />} />

        <Route path="/" element={<RouteGuard pred={hasAuthToken()} element={<Layout />} redirect="/login" />} >
          <Route index element={<Posts />} />
          <Route path="/tag/:tag" element={<Posts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
