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

export function RegistrationForm() {
    const [loading, setLoading] = useState(Boolean);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();

    const url = 'https://api-nodejs-todolist.herokuapp.com'

    const handleSubmit = (e: any) => {
        e.preventDefault();
        register();
        setName('');
        setEmail('');
        setPassword('');
        setAge('');
    }

    const register = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${url}/user/register`, {
                name: name,
                email: email,
                password: password,
                age: age
            });
            setLoading(false);
            const registerResponse = response.data;
            toast.success('Success Notification !');
            console.log("response", registerResponse);
            navigate("/login");
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
                                id="name"
                                name="name"
                                label="Name"
                                margin="dense"
                                sx={{ width: 350 }}
                                value={name}
                                onChange={e => setName(e.target.value)}
                            // {...register('fullname111')}
                            // error={errors.fullname ? true : false}
                            />
                            {/* <Typography variant="inherit" color="textSecondary">
                                {errors.fullname?.message}
                            </Typography> */}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="email"
                                name="email"
                                label="Email"
                                margin="dense"
                                sx={{ width: 350 }}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="password"
                                name="password"
                                label="Password"
                                margin="dense"
                                sx={{ width: 350 }}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="age"
                                name="age"
                                label="Age"
                                margin="dense"
                                sx={{ width: 350 }}
                                value={age}
                                onChange={e => setAge(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Button sx={{ width: 350, my: 2, p: 1.5 }} variant="outlined" onClick={handleSubmit}>{loading ? 'Loading...' : 'Register'}</Button>
            </Paper>
        </div>
    )
}