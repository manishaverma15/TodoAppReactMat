import React, { createContext, useReducer, useState } from 'react';
import { TodoActionsEnum } from '../enums/todo-action.enum';
import { TodoInterface } from '../Pages/DashBoard/DashBoardPage';

interface AddTodoAction {
    type: TodoActionsEnum.ADD_TODO,
    payload: { todo: TodoInterface }
}

interface DeleteTodoAction {
    type: TodoActionsEnum.DELETE_TODO,
    payload: { id: string }
}

interface MarkAsCompletedAction {
    type: TodoActionsEnum.MARK_AS_COMPLETED,
    payload: { id: string }
}

interface SetTodosAction {
    type: TodoActionsEnum.SET_TODO,
    payload: { todos: TodoInterface[] }
}

export type TodoAction = AddTodoAction | DeleteTodoAction | MarkAsCompletedAction | SetTodosAction

const todoReducer = (todos: TodoInterface[], action: TodoAction) => {
    switch (action.type) {
        case TodoActionsEnum.ADD_TODO:
            return [...todos, action.payload.todo];

        case TodoActionsEnum.DELETE_TODO:
            return [...todos.filter((item: any) => item._id !== action.payload.id)];

        case TodoActionsEnum.MARK_AS_COMPLETED:
            return todos.map((todo) => {
                if (todo._id === action.payload.id) {
                    return { ...todo, isComplete: !todo.isComplete };
                }
                return todo;
            });

        case TodoActionsEnum.SET_TODO:
            return [...action.payload.todos];

        default:
            return todos;
    }
}

export interface TodoContextInterface {
    todos: TodoInterface[];
    dispatch: React.Dispatch<TodoAction>;
}

const initialState: TodoContextInterface = {
    todos: [],
    dispatch: () => { },
}

const TaskContext = createContext<TodoContextInterface>(initialState);

const TodoProvider = (props: any) => {
    const [todos, dispatch] = useReducer(todoReducer, []);

    return <TaskContext.Provider value={{ todos, dispatch }}>
        {props.children}
    </TaskContext.Provider>
}

export { TodoProvider, TaskContext };