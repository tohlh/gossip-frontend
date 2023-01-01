import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/layout';
import Login from './pages/login';
import AuthRoute from './components/AuthRouteGuard';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
