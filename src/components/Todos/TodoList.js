/*import React, { useEffect, useState } from 'react';
import { getTasks } from '../../services/api';
import TodoItem from './TodoItem';
import '../../styles/Todos.css';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await getTasks(token);
                setTasks(res.data.tasks);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTasks();
    }, [token]);

    return (
        <div className="todo-list">
            <h2>Your Tasks</h2>
            {tasks.map((task) => (
                <TodoItem key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TodoList;
*/
import React, { useEffect, useState } from 'react';
import { getTasks } from '../../services/api';
import TodoItem from './TodoItem';
import '../../styles/Todos.css';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await getTasks(token);
                setTasks(res.data.tasks);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTasks();
    }, [token]);

    return (
        <div className="todo-list">
            <h2>Your Tasks</h2>
            <table className="todo-table">
                <thead>
                    <tr className="todo-item">
                        <th className='taskheadWidth taskhead'>Task</th>
                        <th className='taskheadWidth statushead'>Status</th>
                        <th className='taskheadWidth actionhead'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <TodoItem key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;
