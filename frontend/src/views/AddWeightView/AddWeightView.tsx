import { useNavigate } from "react-router-dom";
import { DASHBOARD_PATH } from "../../constants/PathConstants";
import { useCreateWeight } from "../../hooks/useCreateWeight";
import { useState } from "react";
import { WeightEntryRequest } from "../../api/weight";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../constants/DateConstants";

export const AddWeightView = () => {

	const navigate = useNavigate();
	const { createOrUpdateWeight, loading, error } = useCreateWeight();
	const [weightEntryRequest, setWeightEntryRequest] = useState<WeightEntryRequest>({
		date: format(new Date(), DATE_FORMAT),
		weight: 65.55
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await createOrUpdateWeight(weightEntryRequest);
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
                            value={weightEntryRequest.date}
                            onChange={e => setWeightEntryRequest({
								...weightEntryRequest,
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
                            className="input w-full"
                            placeholder="Your password again"
                            autoComplete="new-password"
                            value={weightEntryRequest.weight}
                            onChange={e => setWeightEntryRequest({
								...weightEntryRequest,
								weight: Number.parseFloat(e.target.value)
							})}
                            required
                        />
                    </fieldset>

                    <button type="submit" className="btn btn-neutral mt-4">Add weight!</button>
                </form>
            </div>
        </div>
    )
};