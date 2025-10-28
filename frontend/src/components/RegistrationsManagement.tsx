import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

const RegistrationsManagement = ({ password }: { password: string }) => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetch('/api/registrations')
      .then((res) => res.json())
      .then((data) => setRegistrations(data));
  }, []);

  const handleDelete = (id: number) => {
    fetch(`/api/registrations/${id}`, {
      method: 'DELETE',
      headers: {
        'x-admin-password': password,
      },
    }).then(() => {
      setRegistrations(registrations.filter((r: { id: number }) => r.id !== id));
    });
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>Pseudo</TableCell>
          <TableCell>Team Name</TableCell>
          <TableCell>Game</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {registrations.map((registration: any) => (
          <TableRow key={registration.id}>
            <TableCell>{registration.email}</TableCell>
            <TableCell>{registration.pseudo}</TableCell>
            <TableCell>{registration.team_name}</TableCell>
            <TableCell>{registration.game}</TableCell>
            <TableCell>{registration.phone}</TableCell>
            <TableCell>
              <Button onClick={() => handleDelete(registration.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RegistrationsManagement;
