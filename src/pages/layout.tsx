import '../App.css';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/system';
import NavBarDrawer from '../components/NavBarDrawer';

export default function Layout() {
  return (
    <div>
      <NavBarDrawer />
      <Container maxWidth="md" >
        <Outlet />
      </Container>
    </div>
  );
}
