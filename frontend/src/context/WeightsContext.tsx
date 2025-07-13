import { createContext } from "react";
import { WeightsStore } from "./WeightsStore";
import { Weight } from "../types/Weight";

type WeightsContextType = {
    store: WeightsStore;
    loading: boolean;
    addOrUpdateWeight: (weight: Weight) => Promise<void>;
};

export const WeightsContext = createContext<WeightsContextType>({} as WeightsContextType);