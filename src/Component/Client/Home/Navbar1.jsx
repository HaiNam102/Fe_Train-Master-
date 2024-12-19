import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { menuClient } from '../../Contants';
import logo_1 from "../../../assets/image/logo_1.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket, faCircleUser, faBars, faSearch, faFacebook, faTwitter, faYoutubePlay, faInstagram, faClose } from '@fortawesome/free-solid-svg-icons';
import Logout from '../../Login/Logout';

function Navbar(props) {
    const [showModal, setShowModal] = useState(false);
    const [profile, setProfile] = useState(false);
    const [isChoose, setIsChoose] = useState("Home");
    const navigate = useNavigate();
    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleClose = () => {
        setShowModal(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/Home1");
    };
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
                                <a href="./index.html">
                                    <img style={{ width: '100px', height: 'auto' }} src={logo_1} alt="Logo" />
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <nav class="nav-menu">
                                <ul className='d-flex justify-content-evenly' >
                                    {
                                        menuClient.map((e, i) => (
                                            <Link className='text-white' onClick={() => setIsChoose(e.title)} to={e.path}>
                                                <li class={isChoose === e.title ? "active" : ""}><a>{e.title}</a></li>
                                            </Link>
                                        ))
                                    }
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3 text-end">
                            <div onClick={() => setProfile(!profile)} className="profile-client position-relative">
                                <div className="d-flex align-items-center justify-content-end gap-3">
                                    <h4 className="mb-0">Hello Nam !!</h4>
                                    <i className="fa-regular fa-circle-user h3 m-0"></i>
                                </div>
                                {profile && (
                                    <div className="position-absolute bg-black end-0 text-white rounded mt-1" style={{ zIndex: 1000 }}>
                                        <ul className="list-unstyled">
                                            <li className="d-flex align-items-center border-bottom border-light p-2">
                                                <FontAwesomeIcon icon={faUser} style={{ marginRight: '7px' }} />
                                                <Link to="/Home/Profile" style={{ textDecoration: 'none' }}>
                                                    Profile
                                                </Link>
                                            </li>
                                            <li className="d-flex align-items-center p-2">
                                                <FontAwesomeIcon
                                                    icon={faRightFromBracket}
                                                    onClick={() => {
                                                        handleShowModal();
                                                    }}
                                                    style={{ marginRight: '8px' }}
                                                />
                                                Logout
                                            </li>
                                        </ul>
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                    <div class="canvas-open">
                        <i class="fa fa-bars"></i>
                    </div>
                </div>
            </header>
            <Logout
                showModal={showModal}
                handleClose={handleClose}
                handleLogout={handleLogout}
            />
        </div>
    );
}

export default Navbar;