import { createContext, use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext(null);

export const AuthContextWrapper = ({ children }) => {

    const navigate = useNavigate();

    const [user, setAuth] = useState(() => {
        const userData = localStorage.getItem('user');

        if (userData) {
            const parsedJson = JSON.parse(userData);
            return (parsedJson);
        }

        return null;
    });

    useEffect(() => {

        const handleTabsControl = (event) => {
            if (event.key === 'logout') {
                localStorage.removeItem("token");
                setAuth(null);
            }
        }

        window.addEventListener('storage', handleTabsControl);

        return () => window.removeEventListener('storage', handleTabsControl);

    }, []);


    const loginTokenSet = (tokenData) => {
        localStorage.setItem('user', JSON.stringify(tokenData));
        setAuth(tokenData);
    }

    useEffect(() => {
        if (!user) {
            navigate('/login', { replace: true });
        }
    }, [user]);


    const logoutApp = () => {
        localStorage.removeItem("user");
        localStorage.setItem("logout", Date.now()); // trigger other tabs
        setAuth(null);
    }

    return (
        <AuthContext.Provider value={{ user, setAuth, loginTokenSet, logoutApp }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);