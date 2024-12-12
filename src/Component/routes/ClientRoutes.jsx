import React from 'react';
import Navbar from '../Client/Home/Navbar';
import Home from '../Client/Home/Home';
import Footer from '../Client/Home/Footer';
import { Outlet } from 'react-router-dom';

function ClientRoutes(props) {
    return (
        <div>
            <Navbar/>
            <main >
                <Outlet /> {/* This renders child routes */}
            </main>
            <Footer/>
        </div>
    );
}

export default ClientRoutes;