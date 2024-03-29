import {TonConnectButton} from "@tonconnect/ui-react";
import React from "react";
import {useEffect} from "react";
import $ from "jquery";

export function HeaderComponent() {

    // const [tonConnectUI, setOptions] = useTonConnectUI();

    useEffect(() => {

        $(".mobile-inner-header-icon").click(function () {

            console.log("click");
            $(this).toggleClass("mobile-inner-header-icon-click mobile-inner-header-icon-out");
            $(".mobile-inner-nav").slideToggle(250);
        });
        // $(".mobile-inner-nav li").each(function (index) {
        //     $(this).css({'animation-delay': (index / 10) + 's'});
        // });
        // $(".mobile-inner-nav li").click(function () {
        //     $(this).find('dl').slideToggle(200)
        // });

        return () => {
            // console.log('HeaderComponent unmount');
        }
    }, []);

    return (
        <div>
            <div className="wap_nav wap">
                <div className="mobile">
                    <div className="mobile-inner">
                        <div className="mobile-inner-header">
                            <div className="logo">
                                <a href="/">
                                    <img src="images/logo.png" alt=""/>
                                </a>
                            </div>
                            <div className="mobile-inner-header-icon mobile-inner-header-icon-out">
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className="mobile-inner-nav">
                            <ul>
                                <li>
                                    <h2 className="h2tit">
                                        <a href="/">Swap</a>
                                    </h2>
                                </li>
                                <li>
                                    <h2 className="h2tit">
                                        <a href="/stake">Stake 2 Earn</a>
                                    </h2>
                                </li>
                                <li>
                                    <h2 className="h2tit">
                                        <a href="/launchpad">Launch</a>
                                    </h2>
                                </li>
                                <li>
                                    <h2 className="h2tit">
                                        <a href="#">More</a>
                                    </h2>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="head">
                <div className="wrap">
                    <div className="logo pc">
                        <a href="/">
                            <img src="images/logo.png" alt=""/>
                        </a>
                    </div>
                    <div className="nav ">
                        <ul className="pc">
                            <li>
                                <h2 className="h2tit">
                                    <a href="/">Swap</a>
                                </h2>
                            </li>
                            <li>
                                <h2 className="h2tit">
                                    <a href="/stake">Stake 2 Earn</a>
                                </h2>
                            </li>
                            <li>
                                <h2 className="h2tit">
                                    <a href="/launchpad">Launch</a>
                                </h2>
                            </li>
                            <li>
                                <h2 className="h2tit">
                                    <a href="#">More</a>
                                </h2>
                            </li>
                        </ul>
                        {/*<a href="#" className="more">Connect</a>*/}
                        <div style={{float: "right"}}>
                            <TonConnectButton className="more"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
