import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateTodo from '../components/Todos/CreateTodo';
import TodoList from '../components/Todos/TodoList';
import '../../src/styles/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');

        // Navigate to the login page
        navigate('/login');
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    return (
        <div className="dashboard">
            <div className="navbar">
                <button className="navbar-button" onClick={handleProfile}>Profile</button>
                <button className="navbar-button logout-button" onClick={handleLogout}>Logout</button>
            </div>

            <CreateTodo />
            <TodoList />

        </div>
    );
};

export default Dashboard;
