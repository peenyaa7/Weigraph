import { useState } from "react";
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom";
import { DASHBOARD_PATH } from "../../constants/PathConstants";

export const LoginView = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setError("");
        
        try {
            await login(username, password);
            navigate(DASHBOARD_PATH);
        } catch (error) {
            setError("Invalid username or password");
        }
    }

    return (
        <div>
            <h1 className="text-center text-4xl font-bold mb-4">Weigraph</h1>


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

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">


                <label htmlFor="username" className="input w-full">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                        </g>
                    </svg>
                    <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} required />
                </label>

                <label htmlFor="password" className="input w-full">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <path
                            d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                        ></path>
                        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        </g>
                    </svg>
                    <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>

                <button type="submit" className="btn btn-neutral">Login</button>
            </form>

        </div>
    )
}