import React from 'react';
import hero from "../../../assets/image/banner.png";
import hero2 from "../../../assets/image/hero-2.jpg";
import './Home.scss'
import img1 from '../../../assets/svg_icon/1.svg'
import img2 from '../../../assets/svg_icon/2.svg'
import img3 from '../../../assets/svg_icon/3.svg'
import img4 from '../../../assets/svg_icon/4.svg'
import img5 from '../../../assets/gallery/gallery-1.jpg'
import img6 from '../../../assets/gallery/gallery-2.jpg'
import img7 from '../../../assets/gallery/gallery-3.jpg'
import img8 from '../../../assets/gallery/gallery-4.jpg'
import img9 from '../../../assets/gallery/gallery-5.jpg'
import img10 from '../../../assets/gallery/gallery-6.jpg'
function Home(props) {
    return (
        <div>
            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src={hero} class="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src={hero2} class="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Second slide label</h5>
                            <p>Some representative placeholder content for the second slide.</p>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            <div class="features_area">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="section_title text-center mb-73">
                                <h3>Our Features</h3>
                                <p>There are many variations of passages of lorem Ipsum available, but the majority <br /> have suffered alteration.</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-6">
                            <div class="single_feature text-center mb-73">
                                <div class="icon">
                                    <img src={img1} alt="" />
                                </div>
                                <h4>Weightlifting</h4>
                                <p>There are many variations of passages of lorem Ipsum available.</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="single_feature text-center">
                                <div class="icon">
                                    <img src={img2} alt="" />
                                </div>
                                <h4>Specific Muscles</h4>
                                <p>There are many variations of passages of lorem Ipsum available.</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="single_feature text-center">
                                <div class="icon">
                                    <img src={img3} alt="" />
                                </div>
                                <h4>Flex Your Muscles</h4>
                                <p>There are many variations of passages of lorem Ipsum available.</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="single_feature text-center">
                                <div class="icon">
                                    <img src={img4} alt="" />
                                </div>
                                <h4>Cardio Exercises</h4>
                                <p>There are many variations of passages of lorem Ipsum available.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gallery-section">
                <div class="gallery">
                    <div class="grid-sizer"></div>
                    <div class="gs-item grid-wide">
                        <a href={img5} class="thumb-icon image-popup">
                            <img src={img5} alt="Gallery Image"/>
                        </a>
                    </div>
                    <div class="gs-item">
                        <a href="img/gallery/gallery-2.jpg" class="thumb-icon image-popup">
                            <img src={img6} alt="Gallery Image"/>
                        </a>
                    </div>
                    <div class="gs-item">
                        <a href="img/gallery/gallery-3.jpg" class="thumb-icon image-popup">
                            <img src={img7} alt="Gallery Image"/>
                        </a>
                    </div>
                    <div class="gs-item">
                        <a href="img/gallery/gallery-4.jpg" class="thumb-icon image-popup">
                            <img src={img8} alt="Gallery Image"/>
                        </a>
                    </div>
                    <div class="gs-item">
                        <a href="img/gallery/gallery-5.jpg" class="thumb-icon image-popup">
                            <img src={img9} alt="Gallery Image"/>
                        </a>
                    </div>
                    <div class="gs-item grid-wide">
                        <a href="img/gallery/gallery-6.jpg" class="thumb-icon image-popup">
                            <img src={img10} alt="Gallery Image"/>
                        </a>
                    </div>
                </div>
            </div>

            <section class="team-section spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="team-title">
                                <div class="section-title">
                                    <span>Our Team</span>
                                    <h2>TRAIN WITH EXPERTS</h2>
                                </div>
                                <a href="#" class="primary-btn btn-normal appoinment-btn">appointment</a>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="ts-slider owl-carousel">
                            <div class="col-lg-4">
                                <div class="ts-item set-bg" data-setbg="img/team/team-1.jpg">
                                    <div class="ts_text">
                                        <h4>Athart Rachel</h4>
                                        <span>Gym Trainer</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="ts-item set-bg" data-setbg="img/team/team-2.jpg">
                                    <div class="ts_text">
                                        <h4>Athart Rachel</h4>
                                        <span>Gym Trainer</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="ts-item set-bg" data-setbg="img/team/team-3.jpg">
                                    <div class="ts_text">
                                        <h4>Athart Rachel</h4>
                                        <span>Gym Trainer</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="ts-item set-bg" data-setbg="img/team/team-4.jpg">
                                    <div class="ts_text">
                                        <h4>Athart Rachel</h4>
                                        <span>Gym Trainer</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="ts-item set-bg" data-setbg="img/team/team-5.jpg">
                                    <div class="ts_text">
                                        <h4>Athart Rachel</h4>
                                        <span>Gym Trainer</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="ts-item set-bg" data-setbg="img/team/team-6.jpg">
                                    <div class="ts_text">
                                        <h4>Athart Rachel</h4>
                                        <span>Gym Trainer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="gettouch-section">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="gt-text">
                                <i class="fa fa-map-marker"></i>
                                <p>333 Middle Winchendon Rd, Rindge,<br /> NH 03461</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="gt-text">
                                <i class="fa fa-mobile"></i>
                                <ul>
                                    <li>125-711-811</li>
                                    <li>125-668-886</li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="gt-text email">
                                <i class="fa fa-envelope"></i>
                                <p>Support.gymcenter@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;