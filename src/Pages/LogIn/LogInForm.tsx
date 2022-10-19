import React, { useState } from 'react';
import { Paper } from '@mui/material';
import { Box } from '@mui/material';
import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
    const [loading, setLoading] = useState(Boolean);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const url = 'https://api-nodejs-todolist.herokuapp.com';
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        login();
        setEmail('');
        setPassword('');
    }

    const login = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${url}/user/login`, {
                email: email,
                password: password,
            });
            setLoading(false);
            const registerResponse = response.data;
            localStorage.setItem('authToken', registerResponse.token);
            toast.success('Success Notification !');
            console.log("response", registerResponse);
            navigate("/dashboard");
        }
        catch (err) {
            const errors = err as Error | AxiosError;
            setLoading(false);
            console.log(errors.message);
            toast.success('Error Notification !');
        };
    }

    return (
        <div>
            <Paper elevation={3}
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: 400,
                    justifyContent: 'center',
                    margin: 'auto',
                    my: 5
                }}>

                <Box px={3} py={2}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="email"
                                name="email"
                                label="Email"
                                margin="dense"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                sx={{ width: 350 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="password"
                                name="password"
                                label="Password"
                                margin="dense"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                sx={{ width: 350 }}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Button sx={{ width: 350, my: 2, p: 1.5 }} variant="outlined" onClick={handleSubmit}>Login</Button>
            </Paper>
        </div>
    )
}