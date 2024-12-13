import React from 'react';
import Navbar from '../Client/Home/Navbar';
import Home from '../Client/Home/Home';
import Footer from '../Client/Home/Footer';
import { Outlet } from 'react-router-dom';

function ClientRoutes(props) {
    return (
        <div>
            <Navbar />
            <div style={{ marginTop : '80px'}}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default ClientRoutes;
