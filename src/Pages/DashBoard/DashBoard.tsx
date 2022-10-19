import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CreateTodo } from "../AddTodo/CreateTodo";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from "@mui/material";
import Button from '@mui/material/Button';

interface TodoInterface {
    completed: boolean,
    createdAt: string,
    description: string,
    _id: string
}

export function DashBoardPage() {
    const [todos, setTodos] = useState<TodoInterface[]>([]);
    const [editTodo, setEditTodo] = useState<TodoInterface | null>(null);

    const url = 'https://api-nodejs-todolist.herokuapp.com';

    useEffect(() => {
        getUserData();
    }, []);

    const addTodo = (todo: TodoInterface) => {
        setTodos([...todos, todo]);
    }

    const deleteTodo = async (id: string) => {
        let token = localStorage.getItem("authToken");
        try {
            await axios.delete(`${url}/task/${id}`, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } })
            setTodos([...todos.filter((item: any) => item._id !== id)]);
            toast.success('Success Notification !');
        }
        catch (error) {
            console.log(error);
        }
    };

    async function getUserData() {
        let token = localStorage.getItem("authToken");
        try {
            const response = await axios.get(`${url}/task`, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
            console.log("table data", todos);
            setTodos(response.data.data || undefined);
        }
        catch (error) {
            console.log(error);
        }
    }

    // const editTodo = async (id: string) => {

    //     let token = localStorage.getItem("authToken");
    //     var datasend = {
    //         "description": todos[index].description
    //     }

    //     try {
    //         const response = await axios.put(`${url}/task/${id}`, datasend, {
    //             headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    //         });

    //         console.log("reponse-todo",response);
    //     //     const editingTodo: TodoInterface = response.data.data;
    //     //     console.log("description", editingTodo.description);
    //     //     // const index: number = todos.findIndex((todo: TodoInterface) => todo._id === editingTodo._id);
    //     //     // console.log("index",index);
    //     //     todos[index] = editingTodo;
    //     //     setTodos([...todos]);
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }

    // }

    const markAsCompleted = async (id: string) => {
        let token = localStorage.getItem("authToken");
        var data = {
            "completed": true
        };

        try {
            const response = await axios.put(`${url}/task/${id}`, data, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
            });

            const updateTodo: TodoInterface = response.data.data;
            console.log("updatetodo", updateTodo);
            replaceTodo(updateTodo);
        }
        catch (error) {
            console.log(error);
        }
    }

    const replaceTodo = (updateTodo: any) => {
        const index: number = todos.findIndex((todo: TodoInterface) => todo._id === updateTodo._id);
        todos[index] = updateTodo;
        setTodos([...todos]);
    }

    return (
        <>
            <div style={{ height: 700, width: '100%' }}>
                <div>
                    <CreateTodo addTodo={addTodo} editTodo={editTodo} setEditTodo={setEditTodo} replaceTodo={replaceTodo}  />
                </div>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Completed</TableCell>
                                <TableCell align="center">CreatedAt</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Edit</TableCell>
                                <TableCell align="center">Delete</TableCell>
                                <TableCell align="center">Mark as Completed</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todos && todos.length && todos.map((todo, index) => (
                                <TableRow
                                    key={index}
                                >
                                    <TableCell align="center">{todo.completed ? 'finished' : 'unfinished'}</TableCell>
                                    <TableCell align="center">{todo.createdAt}</TableCell>
                                    <TableCell align="center">{todo.description}</TableCell>
                                    <TableCell align="center">{todo._id}</TableCell>
                                    <TableCell align="center"> <Button variant="outlined" onClick={() => setEditTodo(todo)}>Edit</Button></TableCell>
                                    <TableCell align="center"> <Button variant="outlined" onClick={() => deleteTodo(todo._id)}>Delete</Button></TableCell>
                                    <TableCell align="center"> <Button variant="outlined" onClick={() => markAsCompleted(todo._id)}>Mark as Completed</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}