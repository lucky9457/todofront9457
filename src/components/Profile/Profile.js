import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile, deleteProfile } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [profileData, setProfileData] = useState({ name: '', email: '', password: '' });
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getProfile(token);
                setProfileData(res.data.user);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfile();
    }, [token]);

    const [showwerror, setshowerror] = useState(false)
    const [errormsg, seterrormsg] = useState("")

    const handleUpdate = async () => {
        if (profileData.name === "" || profileData.email === "" || profileData.password === "") {
            setshowerror(true);
            seterrormsg("profile info cannot be blank")
            const timer = setTimeout(() => {
                setshowerror(false);
                seterrormsg("")
            }, 4000);
        }
        else {
            try {
                await updateProfile(profileData, token);
                setIsEditing(false);
                alert('Profile updated successfully');
            } catch (err) {
                console.error(err);
                setshowerror(true);
                seterrormsg("profile info cannot be blank")
                const timer = setTimeout(() => {
                    setshowerror(false);
                    seterrormsg("")
                }, 4000);
            }
        }
    };

    const handleDelete = async () => {
        try {
            await deleteProfile(token);
            localStorage.removeItem('token');
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };
    const handleCancel = () => {
        // Revert the profile data to the original state and exit editing mode

        setIsEditing(false);
    };

    return (
        <div className="profile-page">
            <h2>Your Profile</h2>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                    <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>

                </>
            ) : (
                <>
                    <p>Name: {profileData.name}</p>
                    <p>Email: {profileData.email}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
            <button className="delete-button" onClick={handleDelete}>Delete Profile</button>
            {showwerror && <p className='errormsg'>{errormsg}</p>}
        </div>
    );
};

export default Profile;
