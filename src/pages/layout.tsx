import '../App.css';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
}
