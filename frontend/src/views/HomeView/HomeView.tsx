import { useNavigate } from "react-router-dom";
import { WeightCalendar } from "../../components/WeightCalendar/WeightCalendar";
import { useWeights } from "../../hooks/useWeights";
import { ADD_WEIGHT_PATH } from "../../constants/PathConstants";

export const HomeView = () => {

    const navigate = useNavigate();
    const { weights, loading } = useWeights();

    return (
        <div>
            <div className="flex justify-end">
                <button
                    onClick={() => navigate(ADD_WEIGHT_PATH)}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                >
                    + Add weight
                </button>
            </div>
            <div className="p-4 space-y-4 flex justify-center m-auto">
                {
                    loading
                        ? <div className="skeleton h-96 w-3xl"></div>
                        : <WeightCalendar weights={weights} />
                }


            </div>
                
        </div>
    );
};