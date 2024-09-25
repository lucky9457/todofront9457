import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const register = async (userData) => {
    return axios.post(`${API_URL}/api/auth/signup`, userData);
};

export const login = async (userData) => {
    return axios.post(`${API_URL}/api/auth/login`, userData);
};

export const getTasks = async (token) => {
    return axios.get(`${API_URL}/api/todos`, {
        headers: { Authorization: token }
    });
};

export const createTask = async (taskData, token) => {
    return axios.post(`${API_URL}/api/todos`, taskData, {
        headers: { Authorization: token }
    });
};

export const updateTask = async (taskId, taskData, token) => {
    return axios.put(`${API_URL}/api/todos/${taskId}`, taskData, {
        headers: { Authorization: token }
    });
};

export const deleteTask = async (taskId, token) => {
    return axios.delete(`${API_URL}/api/todos/${taskId}`, {
        headers: { Authorization: token }
    });
};

export const getProfile = async (token) => {
    return axios.get(`${API_URL}/api/profile`, {
        headers: { Authorization: token }
    });
};

export const updateProfile = async (profileData, token) => {
    return axios.put(`${API_URL}/api/profile`, profileData, {
        headers: { Authorization: token }
    });
};


export const deleteProfile = async (token) => {
    try {
        const response = await axios.delete(`${API_URL}/api/profile`, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};