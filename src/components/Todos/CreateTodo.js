import React, { useState } from 'react';
import { createTask } from '../../services/api';
import ClipLoader from 'react-spinners/ClipLoader'; // Import the ClipLoader
import '../../styles/Todos.css';

const CreateTodo = () => {
    const [task, setTask] = useState('');
    const [loading, setLoading] = useState(false); // State for loader
    const token = localStorage.getItem('token');
    const [showwerror, setshowerror] = useState(false)
    const [errormsg, seterrormsg] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        if (task === "") {
            seterrormsg("enter task")
            setshowerror(true)
            setLoading(false);
            const timer = setTimeout(() => {
                setshowerror(false);
                seterrormsg("")
            }, 4000);
        }
        else {
            try {
                await createTask({ task }, token);
                setTask(''); // Clear the input after successful submission
                window.location.reload();
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false); // Stop loading after request completes
            }
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
                <button className='loader' type="submit" disabled={loading}> {/* Disable button while loading */}
                    {loading ? <ClipLoader color="#fff" size={20} /> : 'Add Task'}
                </button>
                {showwerror && <p className='errormsg'>{errormsg}</p>}
            </form>
        </div>
    );
};

export default CreateTodo;
