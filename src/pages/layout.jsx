import { Outlet, useNavigate } from "react-router";
import { useState } from 'react';
import '../App.css';
import { useAuthContext } from "../authProvider/authProvider";
import ProfileMenu from "../components/ProfileMenu";
import { NavLink } from "react-router-dom";

function Layout() {
    return (
        <>
            <NavBar />
            <SideBar />
            <main className="main-content">
                <Outlet />
            </main>

        </>
    )
}


function SideBar() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const menuItems = [
        { name: "Dashboard", icon: "🏠", to: '/' },
        { name: "About", icon: "👤", to: '/about' },
        { name: "Profile", icon: "📦", to: '/profile/1' },
    ];

    return (

        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            <div className="top-section">
                <button
                    className="toggle-btn"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? "☰" : "✖"}
                </button>
            </div>

            <ul className="menu">
                {menuItems.map((item, index) => (
                    <li onClick={() => navigate(item.to)} key={index} className="menu-item">
                        <NavLink
                            to={item.to}
                            className={({ isActive }) =>
                                `menu-link ${isActive ? "active" : ""}`
                            }
                        >
                            <span className="icon">{item.icon}</span>
                            {!collapsed && <span className="label">{item.name}</span>}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}


function NavBar() {

    const {
        user, logoutApp
    } = useAuthContext();

    return (
        <>
            <nav className="nav d-flex">
                <ProfileMenu logoutApp={logoutApp} user={'Hi, ' + (user ? user.username : 'Guest')} />
            </nav>
        </>
    )
}


export default Layout;