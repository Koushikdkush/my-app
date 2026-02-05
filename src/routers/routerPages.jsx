import {Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import About from '../pages/about';
import Profile from '../pages/profile'
import Error from '../pages/error';
import Layout from '../pages/layout';
import Login from '../content-pages/login';
import ProtectedRoute from './routeguard';
function RouterWrapper() {
    return (

        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="profile/:userId" element={<Profile />} />
                </Route>
            </Route>
            <Route path="*" element={<Error />} />
        </Routes>

    );
}

export default RouterWrapper;
