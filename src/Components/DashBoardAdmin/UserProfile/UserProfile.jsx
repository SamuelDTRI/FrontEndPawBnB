import { useParams } from "react-router-dom";

const UserProfile = () => {
    const { id, role } = useParams();
    console.log( id)
    console.log(role)
    
    return (
        <div>
            <h1>USER PROFILE NEW</h1>

        </div>
    );
}

export default UserProfile;