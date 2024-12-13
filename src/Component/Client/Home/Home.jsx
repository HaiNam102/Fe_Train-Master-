import React from 'react';
import hero from "../../../assets/image/hero-1.jpg";
import hero2 from "../../../assets/image/hero-2.jpg";
function Home(props) {
    return (
        <div>
            <div id="carouselExampleCaptions" class="carousel slide">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
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

            <section class="choseus-section spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title">
                                <span>Why chose us?</span>
                                <h2>PUSH YOUR LIMITS FORWARD</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-sm-6">
                            <div class="cs-item">
                                <span class="flaticon-034-stationary-bike"></span>
                                <h4>Modern equipment</h4>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                            <div class="cs-item">
                                <span class="flaticon-033-juice"></span>
                                <h4>Healthy nutrition plan</h4>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                            <div class="cs-item">
                                <span class="flaticon-002-dumbell"></span>
                                <h4>Proffesponal training plan</h4>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                            <div class="cs-item">
                                <span class="flaticon-014-heart-beat"></span>
                                <h4>Unique to your needs</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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