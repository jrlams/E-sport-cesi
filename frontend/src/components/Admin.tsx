import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import { Container } from '@mui/material';

const Admin = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [password, setPassword] = useState('');

    const handleLogin = (password: string) => {
        setPassword(password);
        setLoggedIn(true);
    };

    return (
        <div className="bg-white min-h-screen">
            <Container maxWidth="lg">
                {loggedIn ? (
                    <Dashboard password={password} />
                ) : (
                    <Login onLogin={handleLogin} />
                )}
            </Container>
        </div>
    );
};

export default Admin;
