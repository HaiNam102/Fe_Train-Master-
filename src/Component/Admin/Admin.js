import React, { useState } from 'react';
import SideBar from './SideBar';
import { Outlet } from "react-router-dom";
import './Admin.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='admin-container'>
            <div className={`admin-sidebar ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
                <SideBar toggleSidebar={handleSidebarToggle} isOpen={isSidebarOpen} />
            </div>
            <div className='admin-content'>
                <div className='admin-main'>
                    <Outlet />
                </div>
            </div>
                <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
                <ToastContainer />
        </div>
    );
};

export default Admin;
