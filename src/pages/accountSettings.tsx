import React from 'react';
import { Container } from '@mui/system';
import UpdateDetailsCard from '../components/UpdateDetailsCard';
import UpdatePasswordCard from '../components/UpdatePasswordCard';
import DeleteAccountCard from '../components/DeleteAccountCard';

const AccountSettings: React.FC = () => {
  return (
    <Container sx={{ mt: 12, mb: 6 }} maxWidth="xs">
      <UpdateDetailsCard />
      <UpdatePasswordCard />
      <DeleteAccountCard />
    </Container>
  );
}

export default AccountSettings;
