import { useState } from "react";
import { useAuthContext } from "../authProvider/authProvider";
import { useNavigate } from "react-router";
import { setToken } from "../feature/counter/authSlice";
import { useDispatch } from "react-redux";
function Login() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const userAuth = {
        "id": 1,
        "username": "emilys",
        "email": "emily.johnson@x.dummyjson.com",
        "firstName": "Emily",
        "lastName": "Johnson",
        "gender": "female",
        "image": "https://dummyjson.com/icon/emilys/128",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // JWT accessToken (for backward compatibility) in response and cookies
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // refreshToken in response and cookies
    }
    const dispatch = useDispatch();

    const {
        loginTokenSet
    } = useAuthContext();

    async function onLogin(event) {
        event.preventDefault();
        loginTokenSet(userAuth);
        dispatch(setToken(userAuth))
        navigate('/', { replace: true });


    }

    return (
        <>
            <h1>Login Page</h1>
            <button className="btn btn-primary" onClick={onLogin}>Login</button>

        </>
    )
}

export default Login;