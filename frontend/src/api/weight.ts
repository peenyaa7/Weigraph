import axios from './axios';

export interface WeightEntryRequest {
    date: string;
    weight: number;
}

export interface WeightEntryResponse {
    date: string;
    weight: number;
}

export interface WeightEntriesResponse {
    weightEntries: WeightEntryResponse[];
}

const WEIGHTS_API_ENDPOINT = '/weights'

export const getWeights = async (): Promise<WeightEntriesResponse> => {
    const response = await axios.get<WeightEntriesResponse>(WEIGHTS_API_ENDPOINT);
    return response.data;
}

export const createOrUpdateWeightEndpoint = async (weightEntryRequest: WeightEntryRequest): Promise<void> => {
    await axios.post<void>(WEIGHTS_API_ENDPOINT, weightEntryRequest);
}

export const removeWeightEndpoint = async (date: string): Promise<void> => {
    await axios.delete<void>(`${WEIGHTS_API_ENDPOINT}/${date}`);
}