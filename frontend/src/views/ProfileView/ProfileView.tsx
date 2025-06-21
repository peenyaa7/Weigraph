import { useProfile } from "../../hooks/useProfile"


export const ProfileView = () => {

    const { profile, loading } = useProfile();

    return (
        <div>
            {
                loading ? <p>Loading...</p> :
                    profile &&
                    <div>
                        <p>{profile.id}</p>
                        <p>{profile.username}</p>
                        <p>{profile.weightGoal}</p>
                    </div>
            }
        </div>
    )
}