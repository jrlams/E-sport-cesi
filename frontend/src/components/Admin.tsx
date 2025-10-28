import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

const Admin = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [password, setPassword] = useState('');

    const handleLogin = (password: string) => {
        setPassword(password);
        setLoggedIn(true);
    };

    return (
        <div>
            {loggedIn ? (
                <Dashboard password={password} />
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
};

export default Admin;
