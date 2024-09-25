/*import React, { useState } from 'react';
import { updateTask, deleteTask } from '../../services/api';
import '../../styles/Todos.css';

const TodoItem = ({ task }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task.task);
    const [status, setStatus] = useState(task.status);
    const token = localStorage.getItem('token');

    const handleUpdate = async () => {
        try {
            await updateTask(task.id, { task: editedTask, status }, token);
            setIsEditing(false);
            window.location.reload()
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTask(task.id, token);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="todo-item">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                    />
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="in progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                    <button onClick={handleUpdate}>Save</button>
                </>
            ) : (
                <>
                    <p>{task.task}</p>
                    <p>Status: {task.status}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
    );
};

export default TodoItem;
*/

import React, { useState } from 'react';
import { updateTask, deleteTask } from '../../services/api';
import '../../styles/Todos.css';

const TodoItem = ({ task }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task.task);
    const [status, setStatus] = useState(task.status);
    const token = localStorage.getItem('token');

    const handleUpdate = async () => {
        try {
            await updateTask(task.id, { task: editedTask, status }, token);
            setIsEditing(false);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTask(task.id, token);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <tr className="todo-item">
            {isEditing ? (
                <>
                    <td className='taskd'>
                        <input
                            type="text"
                            value={editedTask}
                            onChange={(e) => setEditedTask(e.target.value)}
                        />
                    </td>
                    <td className='status'>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="in progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </td>
                    <td className='taskaction'>
                        <button onClick={handleUpdate}>Save</button>
                    </td>
                </>
            ) : (
                <>
                    <td className='taskd'>{task.task}</td>
                    <td className='status'>{task.status}</td>
                    <td className='taskaction'>
                        <button className='editbtn' onClick={() => setIsEditing(true)}>Edit</button>
                        <button className='delbtn' onClick={handleDelete}>Delete</button>
                    </td>
                </>
            )}
        </tr>
    );
};

export default TodoItem;
