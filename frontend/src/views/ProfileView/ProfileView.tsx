import { useProfile } from "../../hooks/useProfile"


export const ProfileView = () => {

    const { profile, loading } = useProfile();

    return (<>
        <h1 className="text-4xl">Tu perfil</h1>
        {
            loading ? <div className="skeleton h-96 w-3xl"></div> : (
                profile ? (
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Usuario</th>
                                <td>{profile.username}</td>
                            </tr>
                            <tr>
                                <th>Peso objetivo</th>
                                <td>{profile.weightGoal} kg</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>No hay perfil</p>
                )
            )
        }
    </>
    )
}