import { useWeights } from "../../hooks/useWeights";

export const HomeView = () => {

    const { weights, loading } = useWeights();

    return (
        <div>
            <h1>HomeView</h1>

            {
                loading ? <p>Loading...</p> : null
            }
            {
                weights && weights.length > 0 ? (<>
                    <p>Weights:</p>
                    <ul>
                        {weights.map((weight, index) => (
                            <li key={index}>{weight.date}: {weight.weight} kg</li>
                        ))}
                    </ul>
                </>) : <p>No weights yet.</p>
            }
        </div>
    );
};