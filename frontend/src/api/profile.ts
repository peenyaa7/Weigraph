import axios from './axios';

export interface ProfileResponse {
    id: string;
    username: string;
    weightGoal: number;
}

export const getProfile = async (): Promise<ProfileResponse> => {
    const response = await axios.get<ProfileResponse>(`/profile`);
    return response.data;
}