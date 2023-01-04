import '../App.css';
import { Outlet } from 'react-router-dom';
import NavBarDrawer from '../components/NavBarDrawer';

export default function Layout() {
  return (
    <div>
      <NavBarDrawer />
      <Outlet />
    </div>
  );
}
