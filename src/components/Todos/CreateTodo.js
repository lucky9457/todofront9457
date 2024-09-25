import React, { useState } from 'react';
import { createTask } from '../../services/api';
import '../../styles/Todos.css';

const CreateTodo = () => {
    const [task, setTask] = useState('');
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTask({ task }, token);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="create-todo">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="New Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default CreateTodo;
