import React, { useEffect, useState } from 'react';
import { login } from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'; // Import ClipLoader
import '../../styles/Auth.css';

const Login = () => {
    const [userData, setUserData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // State to track loading
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when login starts
        try {
            const res = await login(userData);
            localStorage.setItem('token', res.data.token);
            setLoading(false); // Set loading to false after successful login
            navigate('/');
        } catch (err) {
            console.error(err);
            setLoading(false); // Set loading to false in case of error
            setShowError(true);
            setErrorMsg(err.response.data.message);
            setTimeout(() => {
                setShowError(false);
                setErrorMsg('');
            }, 4000);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            return navigate('/');
        }
    }, [navigate]);

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    required
                />
                <button className='loader' type="submit" disabled={loading}> {/* Disable button during loading */}
                    {loading ? <ClipLoader color="#fff" size={20} /> : 'Login'}
                </button>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
                {showError && <p className="errormsg">{errorMsg}</p>}
            </form>
        </div>
    );
};

export default Login;
