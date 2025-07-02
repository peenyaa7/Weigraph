import { WeightCalendar } from "../../components/WeightCalendar/WeightCalendar";
import { useWeights } from "../../hooks/useWeights";

export const HomeView = () => {

    const { weights, loading } = useWeights();

    return (
        <div>
            <h1>HomeView</h1>


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