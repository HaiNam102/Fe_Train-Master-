import React from 'react';
import Navbar1 from '../Client/Home/Navbar1';
import Home from '../Client/Home/Home';
import Footer from '../Client/Home/Footer';
import { Outlet } from 'react-router-dom';

function ClientRoutes(props) {
    return (
        <div>
            <Navbar1/>
            <div style={{ marginTop: '80px' }}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default ClientRoutes;
