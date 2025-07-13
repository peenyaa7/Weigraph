import { useNavigate } from "react-router-dom";
import { WeightCalendar } from "../../components/WeightCalendar/WeightCalendar";
import { ADD_WEIGHT_PATH } from "../../constants/PathConstants";

export const HomeView = () => {

    const navigate = useNavigate();

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
                <WeightCalendar />
            </div>
                
        </div>
    );
};