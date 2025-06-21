import { useState } from "react";
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom";

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
            console.log("Logged in");
            navigate("/");
        } catch (error) {
            setError("Invalid username or password");
        }
    }

    return (
        <div>
            <h2>Login</h2>

            {
                error && (
                    <div className="error">{error}</div>
                )
            }

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />

                <button type="submit">Login</button>
            </form>

        </div>
    )
}