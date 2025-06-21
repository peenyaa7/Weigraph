import { useEffect, useState } from "react";
import { getProfile, ProfileResponse } from "../api/profile";
import { Profile } from "../types/Profile";

export const useProfile = () => {
    const [profile, setProfile] = useState<Profile>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProfile()
            .then((profileResponse: ProfileResponse) => {
                setProfile({
                    id: profileResponse.id,
                    username: profileResponse.username,
                    weightGoal: profileResponse.weightGoal
                });
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return { profile, loading };
};
