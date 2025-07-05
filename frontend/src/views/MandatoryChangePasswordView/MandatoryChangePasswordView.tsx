import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_PATH } from "../../constants/PathConstants";

export const MandatoryChangePasswordView = () => {

    const { changePassword } = useAuth();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (newPassword == "") {
            setError("A password should be set");
            return;
        }

        if (newPassword != newPasswordConfirmation) {
            setError("Both password should be the same");
            return;
        }

        try {
            await changePassword(newPassword);
            navigate(DASHBOARD_PATH);
        } catch (error) {
            setError("Error: " + error);
        }
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
                        <legend className="fieldset-legend">New password:</legend>
                        <input
                            id="current-password"
                            type="password"
                            className="input w-full"
                            placeholder="Your password"
                            autoComplete="current-password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            required
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">New password (confirmation):</legend>
                        <input
                            id="new-password"
                            type="password"
                            className="input w-full"
                            placeholder="Your password again"
                            autoComplete="new-password"
                            value={newPasswordConfirmation}
                            onChange={e => setNewPasswordConfirmation(e.target.value)}
                            required
                        />
                    </fieldset>

                    <button type="submit" className="btn btn-neutral mt-4">Change password!</button>
                </form>
            </div>
        </div>
    )
}