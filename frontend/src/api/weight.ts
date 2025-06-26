import axios from './axios';

export interface WeightEntryResponse {
    date: string;
    weight: number;
}

export interface WeightEntriesResponse {
    weightEntries: WeightEntryResponse[];
}

export const getWeights = async (): Promise<WeightEntriesResponse> => {
    const response = await axios.get<WeightEntriesResponse>(`/weights`);
    return response.data;
}