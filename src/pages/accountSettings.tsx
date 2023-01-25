import React from "react";
import { Container } from "@mui/system";
import UpdateDetailsCard from "../components/UpdateDetailsCard";
import UpdatePasswordCard from "../components/UpdatePasswordCard";
import DeleteAccountCard from "../components/DeleteAccountCard";

// Account settings page, allows user to change name, username, and password
// Also allows user to delete their account
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
