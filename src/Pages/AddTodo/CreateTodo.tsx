import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios, { AxiosError } from "axios";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import { Box } from '@mui/material';

export function CreateTodo(props: any) {
    const [description, setDescription] = useState('');
    const url = 'https://api-nodejs-todolist.herokuapp.com'

    const handleSubmit = (e: any) => {
        e.preventDefault();
        CreateTodo();
    }

    useEffect(() => {
        setDescription(props.editTodo ? props.editTodo.description : '');
    }, [props.editTodo]);

    const CreateTodo = async () => {
        let token = localStorage.getItem("authToken");
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }

        if (props.editTodo) {
            //edit
            try {
                const response = await axios.put(`${url}/task/${props.editTodo._id}`, { description }, {
                    headers: headers
                });
                const todoEdited = response.data.data;
                console.log("response-value", todoEdited);
                props.replaceTodo(todoEdited);
            }
            catch (errors: any) {
                console.log(errors.message);
                toast.success('Error Notification !');
            }

        }
        else {
            try {
                const response = await axios.post(`${url}/task`, { description }, {
                    headers: headers
                });

                const todoCreated = response.data.data;
                props.addTodo(todoCreated);
                toast.success('Success Notification !');
            }
            catch (errors: any) {
                console.log(errors.message);
                toast.success('Error Notification !');
            };
        }
    }

    return (
        <>
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
                    <TextField
                        id="outlined-multiline-static"
                        label="Write description here"
                        multiline
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button sx={{ width: 350, my: 2, p: 1.5 }} variant="outlined" onClick={handleSubmit}>Submit</Button>
                </Box>
            </Paper>
        </>
    )

}