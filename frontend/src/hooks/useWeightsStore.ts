import { useContext } from "react"
import { WeightsContext } from "../context/WeightsContext"

export const useWeightsStore = () => {
    const ctx = useContext(WeightsContext);
    if (!ctx) throw new Error("useWeightsStore should be inside <WeightsProvider>");
    return ctx;
}