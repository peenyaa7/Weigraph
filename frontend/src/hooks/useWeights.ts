import { useEffect, useState } from "react";
import { getWeights, WeightEntriesResponse } from "../api/weight";
import { Weight } from "../types/Weight";

export const useWeights = () => {
    const [weights, setWeights] = useState<Weight[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getWeights()
            .then((weightEntriesResponse: WeightEntriesResponse) => {

                let weights: Weight[] = [];
                weightEntriesResponse.entries.forEach(entry => {
                    weights.push({
                        date: entry.date,
                        weight: entry.weight
                    });
                });

                setWeights(weights);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return { weights, loading };
};