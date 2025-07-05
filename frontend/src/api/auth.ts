import axios from './axios';

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
        mustChangePassword: boolean;
    }
}

export interface ChangePasswordRequest {
    newPassword: string;
}

export const loginUser = async (loginRequest: LoginRequest): Promise<LoginResponse> => {

    const response = await axios.post<LoginResponse>('/login', loginRequest);
    const { token, expiresIn, userInfo } = response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', Date.now() + expiresIn);
    localStorage.setItem('username', userInfo.username);
    localStorage.setItem('isAdmin', userInfo.isAdmin ? 'true' : 'false');
    localStorage.setItem('mustChangePassword', userInfo.mustChangePassword ? 'true' : 'false');
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response.data;
}

export const changePasswordCall = async (changePasswordRequest: ChangePasswordRequest): Promise<void> => {
    const response = await axios.post<any>('/change-password', changePasswordRequest);
    if (response.status == 200) {
        localStorage.setItem('mustChangePassword', 'false');
    } 
    
    if (response.status == 400) {
        const errors: string[] = response.data['errors'];
        throw new Error(errors.join(','));
    }
}

export const logoutUser = async (): Promise<void> => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('mustChangePassword');
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

export const getMustChangePassword = (): boolean => {
    return localStorage.getItem('mustChangePassword') === 'true';
}