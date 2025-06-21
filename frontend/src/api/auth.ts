import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:8080/api';


export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    expiresIn: string;
    userInfo: {
        username: string;
        isAdmin: boolean;
    }
}

export const loginUser = async (loginRequest: LoginRequest): Promise<LoginResponse> => {

    const response = await axios.post<LoginResponse>(`${API_URL}/login`, loginRequest);
    console.log(response.data);
    const { token, expiresIn, userInfo } = response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', Date.now() + expiresIn);
    localStorage.setItem('username', userInfo.username);
    localStorage.setItem('isAdmin', userInfo.isAdmin ? 'true' : 'false');
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response.data;
}

export const logoutUser = async (): Promise<void> => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    axios.defaults.headers.common['Authorization'] = '';
}

export const isLoggedIn = (): boolean => {
    const token = getToken();
    const expiry = parseInt(localStorage.getItem('expiresIn') || '0', 10);
    return !!token && expiry > Date.now();
}

export const getUsername = (): string | null => {
    return localStorage.getItem('username');
}

export const getToken = (): string | null => {
    return localStorage.getItem('token');
}

export const isAdminUser = (): boolean => {
    return localStorage.getItem('isAdmin') === 'true';
}