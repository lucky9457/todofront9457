import React, { useEffect, useState } from 'react';
import { login } from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/Auth.css';

const Login = () => {
    const [userData, setUserData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const [showwerror, setshowerror] = useState(false)
    const [errormsg, seterrormsg] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(userData);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            console.error(err);
            setshowerror(true)
            seterrormsg(err.response.data.message)
            const timer = setTimeout(() => {
                setshowerror(false);
                seterrormsg("")
            }, 4000);
        }
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            return navigate("/")
        }
    })


    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />
                <button type="submit">Login</button>
                <p>Dont have an account? <Link to="/register">Register</Link></p>
                {showwerror && <p className='errormsg'>{errormsg}</p>}
            </form>
        </div >
    );
};

export default Login;
