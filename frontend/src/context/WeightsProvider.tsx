import { useEffect, useState } from "react"
import { WeightsStore } from "./WeightsStore"
import { Weight } from "../types/Weight";
import { createOrUpdateWeightEndpoint, getWeights } from "../api/weight";
import { WeightsContext } from "./WeightsContext";

export const WeightsProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [store] = useState(() => new WeightsStore());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeights = async () => {
            try {
                const weightEntriesResponse = await getWeights();
                weightEntriesResponse.weightEntries.map(weightEntry => store.addOrUpdate(weightEntry));
                store.loadWeights(weightEntriesResponse.weightEntries.map(w => ({
                    date: w.date,
                    weight: w.weight
                })));
            } catch (error) {
                console.error("Error fetching weights: " + error);
            } finally {
                setLoading(false);
            }
        };
        fetchWeights();
    }, [])

    /**
     * Add a new weight to store and to backend
     * @param weight Weight to add, replace if exist
     */
    const addOrUpdateWeight = async (weight: Weight) => {

        if (weight.date == undefined) {
            alert("Date cannot be null");
            return;
        }

        if (weight.weight == undefined) {
            alert("Weight cannot be null");
            return;
        }

        if (weight.weight < 0) {
            alert("Weight cannot be negative");
            return;
        }

        try {
            await createOrUpdateWeightEndpoint({
                date: weight.date,
                weight: weight.weight
            });
            store.addOrUpdate(weight);
        } catch (err: any) {
            alert("Unknown error after add or update weight: " + err)
        }
    }

    return (
        <WeightsContext.Provider value={{
            store,
            loading,
            addOrUpdateWeight
        }}>
            {children}
        </WeightsContext.Provider>
    )

}