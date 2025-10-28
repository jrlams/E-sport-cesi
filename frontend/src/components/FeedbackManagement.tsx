import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

const FeedbackManagement = ({ password }: { password: string }) => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetch('/api/feedback')
      .then((res) => res.json())
      .then((data) => setFeedback(data));
  }, []);

  const handleDelete = (id: number) => {
    fetch(`/api/feedback/${id}`, {
      method: 'DELETE',
      headers: {
        'x-admin-password': password,
      },
    }).then(() => {
      setFeedback(feedback.filter((f: { id: number }) => f.id !== id));
    });
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>Rating</TableCell>
          <TableCell>Organization</TableCell>
          <TableCell>Gameplay</TableCell>
          <TableCell>Venue</TableCell>
          <TableCell>Comments</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {feedback.map((f: any) => (
          <TableRow key={f.id}>
            <TableCell>{f.email}</TableCell>
            <TableCell>{f.rating}</TableCell>
            <TableCell>{f.organization_rating}</TableCell>
            <TableCell>{f.gameplay_rating}</TableCell>
            <TableCell>{f.venue_rating}</TableCell>
            <TableCell>{f.comments}</TableCell>
            <TableCell>
              <Button onClick={() => handleDelete(f.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FeedbackManagement;
