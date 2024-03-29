import {HeaderComponent} from "../Components/HeaderComponent";
import {FooterComponent} from "../Components/FooterComponent";
import {useEffect} from "react";
// import Swiper from "swiper";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';

export function HomePage() {

    useEffect(() => {

        let Swiper = window.Swiper;
        let index = new Swiper('.index .swiper-container', {
            pagination: '.index .swiper-pagination',
            paginationClickable: '.index .swiper-pagination',
            nextButton: '.index .swiper-button-next',
            prevButton: '.index .swiper-button-prev',
            autoplay: 5000,
            autoplayDisableOnInteraction: false,
            speed: 500,
            slidesPerView: 1,
            spaceBetween: 30
        });
        //
        console.log("swiper",index)

        // console.log('HomePage mounted');
        return () => {
            // console.log('HomePage unmount');
        }
    }, []);

    return (
        <div>
            <HeaderComponent/>

            <div className="banner">
                <img src="images/index_banner.jpg" alt=""/>
            </div>


            <div className="index">
                <div className="wrap">
                    <div className="content">
                        <div className="list">
                            {/*<Swiper*/}
                            {/*    // className="swiper-container"*/}
                            {/*    spaceBetween={50}*/}
                            {/*    slidesPerView={3}*/}
                            {/*    onSlideChange={() => console.log('slide change')}*/}
                            {/*    onSwiper={(swiper) => console.log(swiper)}*/}
                            {/*>*/}
                            {/*    <SwiperSlide>*/}
                            {/*        <img src="images/pic.png" alt=""/>*/}
                            {/*    </SwiperSlide>*/}
                            {/*    <SwiperSlide>*/}
                            {/*        <img src="images/pic.png" alt=""/>*/}
                            {/*    </SwiperSlide>*/}
                            {/*    <SwiperSlide>*/}
                            {/*        <img src="images/pic.png" alt=""/>*/}
                            {/*    </SwiperSlide>*/}
                            {/*    <SwiperSlide>*/}
                            {/*        <img src="images/pic.png" alt=""/>*/}
                            {/*    </SwiperSlide>*/}
                            {/*</Swiper>*/}

                            <div className="swiper-container">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <img src="images/pic.png" alt=""/>
                                    </div>
                                    <div className="swiper-slide">
                                        <img src="images/pic.png" alt=""/>
                                    </div>
                                    <div className="swiper-slide">
                                        <img src="images/pic.png" alt=""/>
                                    </div>
                                </div>
                                <div className="swiper-pagination"></div>
                            </div>
                        </div>
                        <div className="detail">
                            <div className="infor1">
                                <div className="tit">Swap</div>
                                <button className="set"></button>
                            </div>
                            <div className="infor2">
                                <div className="left">
                                    <div className="tit">From</div>
                                    <img src="images/icon1.png" alt=""/>
                                    <select name="" id="">
                                        <option value="TON">TON</option>
                                    </select>
                                </div>
                                <div className="right">
                                    Balance: 0.00
                                </div>
                            </div>
                            <div className="infor3">
                                <input type="text" value="0.00" readOnly className="words"/>
                            </div>
                            <div className="change"></div>
                            <div className="infor2">
                                <div className="left">
                                    <div className="tit">To</div>
                                    <select name="" id="">
                                        <option value="Select">Select</option>
                                    </select>
                                </div>
                                <div className="right">
                                    Balance: 0.00
                                </div>
                            </div>
                            <div className="infor3">
                                <input type="text" value="0.00" readOnly className="words"/>
                            </div>
                            <a className="connect" href="https://ston.fi" target="_blank">Buy Jettons on Ston.fi</a>

                            {/*<button className="connect">Connect Wallet</button>*/}
                            <div className="infor4">Powered by <a href="https://ston.fi" target="_blank">Ston.fi</a></div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterComponent/>
        </div>
    );
}