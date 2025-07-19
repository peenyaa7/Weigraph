import { useLocation, useNavigate } from "react-router-dom";
import { DASHBOARD_PATH } from "../../constants/PathConstants";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../constants/DateConstants";
import { useWeightsStore } from "../../hooks/useWeightsStore";
import { Weight } from "../../types/Weight";

export const AddWeightView = () => {

	const error = undefined;
    const today = new Date();
    
    const { store, loading, addOrUpdateWeight, removeWeight } = useWeightsStore();
	const navigate = useNavigate();
    const { state } = useLocation();
    const { day } = state || { day: undefined };
    const dayStr = day !== undefined ? format(day, DATE_FORMAT) : format(today, DATE_FORMAT);
    const isRemovableWeight = store.get(dayStr) !== undefined;

	const [newWeight, setNewWeight] = useState<Weight>({
		date: dayStr,
		weight: store.getWeightEntryPriorOrEqualToDate(dayStr)?.weight || 0
	});

    useEffect(() => {
        if (!loading) {
            const lastWeightIncludingToday = store.getWeightEntryPriorOrEqualToDate(dayStr);
            if (lastWeightIncludingToday !== undefined) {
                setNewWeight({ ...newWeight, weight: lastWeightIncludingToday.weight})
            }
        }
    }, [loading])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
        await addOrUpdateWeight(newWeight);
		navigate(DASHBOARD_PATH);
	}

    const handleRemoveWeight = async (e: React.MouseEvent) => {
        e.preventDefault();
        await removeWeight(dayStr);
        navigate(DASHBOARD_PATH);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
                {
                    error && (
                        <div role="alert" className="alert alert-error mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )
                }
                <form onSubmit={handleSubmit} className="flex flex-col justify-items-center">

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Date</legend>
                        <input
                            id="weight-date"
                            type="date"
                            className="input w-full"
                            placeholder="Date"
                            value={newWeight.date}
                            onChange={e => setNewWeight({
								...newWeight,
								date: e.target.value
							})}
                            required
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Weight:</legend>
                        <input
                            id="weight-kg"
                            type="number"
                            step={0.1}
                            className="input w-full"
                            value={newWeight.weight}
                            onChange={e => setNewWeight({
								...newWeight,
								weight: Number.parseFloat(e.target.value)
							})}
                            required
                        />
                    </fieldset>

                    <button type="submit" className="btn btn-neutral mt-4">Add weight!</button>
                    {isRemovableWeight && <button type="button" className="btn btn-error mt-4" onClick={handleRemoveWeight}>Remove weight</button>}
                </form>
            </div>
        </div>
    )
};