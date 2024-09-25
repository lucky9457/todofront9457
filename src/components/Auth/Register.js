import React, { useEffect, useState } from 'react';
import { register } from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';  // Import ClipLoader
import '../../styles/Auth.css';

const Register = () => {
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);  // State for loading spinner
    const navigate = useNavigate();
    const [showwerror, setshowerror] = useState(false);
    const [errormsg, seterrormsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.name === "" || userData.email === "" || userData.password === "") {
            setshowerror(true);
            seterrormsg("Credentials cannot be blank");
            setTimeout(() => {
                setshowerror(false);
                seterrormsg("");
            }, 4000);
        } else {
            setLoading(true);  // Start loading
            try {
                const res = await register(userData);
                if (res.status === 400) {
                    alert(res.error);
                }
                navigate('/login');
            } catch (err) {
                console.error(err);
                setshowerror(true);
                seterrormsg(err.response?.data?.error || "An error occurred");
                setTimeout(() => {
                    setshowerror(false);
                    seterrormsg("");
                }, 4000);
            } finally {
                setLoading(false);  // Stop loading after request finishes
            }
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            return navigate("/");
        }
    }, [navigate]);

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
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

                <button className='loader' type="submit" disabled={loading}>
                    {loading ? <ClipLoader size={20} color="#ffffff" /> : 'Sign Up'}
                </button>

                {showwerror && <p className="errormsg">{errormsg}</p>}
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
};

export default Register;
