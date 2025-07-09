import { useState } from "react";
import { createOrUpdateWeightEndpoint, WeightEntryRequest } from "../api/weight";


export const useCreateWeight = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createOrUpdateWeight = async (weightEntryRequest: WeightEntryRequest) => {
        try {

            if (weightEntryRequest.date == undefined) {
                setError("Date cannot be null");
                return;
            }

            if (weightEntryRequest.weight == undefined) {
                setError("Weight cannot be null");
                return;
            }

            if (weightEntryRequest.weight < 0) {
                setError("Weight cannot be negative");
                return;
            }

            setLoading(true);
            setError(null);
            await createOrUpdateWeightEndpoint(weightEntryRequest);
        } catch (err: any) {
            setError(err.response?.data?.message || "Error al guardar el peso");
        } finally {
            setLoading(false);
        }
    };

    return { createOrUpdateWeight, loading, error };
};