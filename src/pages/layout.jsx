import { Link, Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import '../App.css';
import { useAuthContext } from "../authProvider/authProvider";
import ProfileMenu from "../components/ProfileMenu";

function Layout() {

    const [queryClient] = useState(() => new QueryClient());

    return (
        <>
            <NavBar />
            <QueryClientProvider client={queryClient}>
                <Outlet />
            </QueryClientProvider>
        </>
    )
}



function NavBar() {

    const {
        user, logoutApp
    } = useAuthContext();

    return (
        <>


            <nav className="nav">
                <div className="nav-left">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/profile/1">Profile</Link>

                </div>

                <div className="nav-right d-flex gap-3">
                        <ProfileMenu logoutApp={logoutApp} user={'Hi, ' + (user ? user.username : 'Guest')}/>
                </div>
            </nav>
        </>
    )
}


export default Layout;