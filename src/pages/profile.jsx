import { useParams } from "react-router";
import { useQueryClient } from '@tanstack/react-query';
import '../App.css';

function Profile() {

    const { userId } = useParams();

    return(
        <>
        <h1>Profile Page</h1>
        </>
    )

}

export default Profile;