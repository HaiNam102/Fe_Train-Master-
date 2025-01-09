import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { menuClient } from '../../Contants.js';
import logo_1 from "../../../assets/image/logo_1.jpg";
function Navbar(props) {
    const [isChoose,setIsChoose] = useState("Home");
    return (
        <div>
            <div class="offcanvas-menu-overlay"></div>
            <div class="offcanvas-menu-wrapper">
                <div class="canvas-close">
                    <i class="fa fa-close"></i>
                </div>
                <div class="canvas-search search-switch">
                    <i class="fa fa-search"></i>
                </div>
                {/* <nav class="canvas-menu mobile-menu">
                    <ul>
                        <li><a href="./home">Home</a></li>
                        <li><a href="./about-us">About Us</a></li>
                        <li><a href="./classes">Classes</a></li>
                        <li><a href="./services">Services</a></li>
                        <li><a href="./team">Our Team</a></li>
                        <li><a href="#">Pages</a>
                            <ul class="dropdown">
                                <li><a href="./about-us">About us</a></li>
                                <li><a href="./class-timetable">Classes timetable</a></li>
                                <li><a href="./bmi-calculator">Bmi calculate</a></li>
                                <li><a href="./team">Our team</a></li>
                                <li><a href="./gallery">Gallery</a></li>
                                <li><a href="./blog">Our blog</a></li>
                            </ul>
                        </li>
                        <li><a href="./contact">Contact</a></li>
                    </ul>
                </nav>
                <div id="mobile-menu-wrap"></div> */}
                <div class="canvas-social">
                    <a href="#"><i class="fa fa-facebook"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                    <a href="#"><i class="fa fa-youtube-play"></i></a>
                    <a href="#"><i class="fa fa-instagram"></i></a>
                </div>
            </div>
            <header class="header-section position-fixed">
                <div class="container-fluid">
                    <div class="row align-items-center">
                        <div class="col-lg-3">
                            <div class="logo">
                                <a href="">
                                <img style={{ width: '100px', height: 'auto' }} src={logo_1} alt="Logo" />

                                </a>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <nav class="nav-menu">
                                <ul className='d-flex justify-content-evenly' >
                                    {
                                        menuClient.map((e,i) => (
                                            <Link className='text-white' onClick={() => setIsChoose(e.title)} to={e.path}>
                                             <li class={isChoose === e.title ? "active" : ""}><a>{e.title}</a></li>
                                           </Link> 
                                        ))
                                    } 
                                </ul>
                            </nav>
                        </div>
                        <div class="col-lg-3 text-end">
                            <div className="nav-menu text-end">
                                <ul>
                                <li><a href="/login">Login</a></li>
                                <li><a href="/Register_Client">Signup</a></li>
                                </ul>            
                            </div>
                        </div>
                    </div>
                    <div class="canvas-open">
                        <i class="fa fa-bars"></i>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Navbar;