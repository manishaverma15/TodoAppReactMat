import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const BasicButtons = () => {
    let navigate = useNavigate();

    function navigateToRegister() {
        navigate("/register");
    }

    function navigateToLogin() {
        navigate("/login");
    }

    return (
        <div>
            <Stack spacing={2} direction="row">
                <Button onClick={navigateToRegister} variant="outlined">Register</Button>
                <Button onClick={navigateToLogin} variant="outlined">Login</Button>
            </Stack>
        </div>
    );
}

export default BasicButtons;