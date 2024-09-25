import React, { useEffect, useState } from 'react';
import { register } from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/Auth.css';

const Register = () => {

    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();
    const [showwerror, setshowerror] = useState(false)
    const [errormsg, seterrormsg] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.name === "" || userData.email === "" || userData.password === "") {

            setshowerror(true);
            seterrormsg("Credentials cannot be blank")
            const timer = setTimeout(() => {
                setshowerror(false);
                seterrormsg("")
            }, 4000);

        }
        else {


            try {
                const res = await register(userData);
                if (res.status == 400) {
                    alert(res.error)
                }
                navigate('/login');
            } catch (err) {
                console.error(err);
                setshowerror(true)
                seterrormsg(err.response.data.error)
                const timer = setTimeout(() => {
                    setshowerror(false);
                    seterrormsg("")
                }, 4000);


            }
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
                <button type="submit">Sign Up</button>
                {showwerror && <p className='errormsg'>{errormsg}</p>}
                <p>already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
};

export default Register;
