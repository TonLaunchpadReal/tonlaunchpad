import {FooterComponent} from "../Components/FooterComponent";
import {HeaderComponent} from "../Components/HeaderComponent";
import {useEffect, useState} from "react";
import axios from "axios";

export function LaunchPadPage() {


    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://tonlaunchpad.org/api/tokens");
                let tokens_list = response.data;
                // console.log(tokens_list);
                for (let i = 0; i < tokens_list.length; i++) {
                    tokens_list[i].show_countdown = showCountdown(tokens_list[i]);
                }

                for (let i = 0; i < tokens_list.length; i++) {
                    let token = tokens_list[i];
                    console.log(token);
                    let url = 'https://toncenter.com/api/v2/getAddressBalance?address=' + token.receiving_account;
                    let header = {
                        "x-api-key": "6f58cd1c2464f5a3cfd16837d69d3d84af247334450a99566b717c46f4de84c2"
                    }
                    let balance = await axios.get(url, {headers: header});
                    tokens_list[i].receiving_balance =  (Number(balance.data.result) / 1e9).toFixed(4)
                }

                setTokens(tokens_list);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        const intervalId = setInterval(async () => {
            setTokens(prevTokens => {
                if (prevTokens.length <= 0) {
                    return prevTokens;
                }
                // console.log("refresh");
                let tokens_list = [...prevTokens];
                for (let i = 0; i < tokens_list.length; i++) {
                    tokens_list[i].show_countdown = showCountdown(tokens_list[i]);
                }
                // console.log("seconds", tokens_list[0].show_countdown.seconds);
                return tokens_list;
            });
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);


    const showCountdown = (token) => {
        let end_time = token.countdown;
        let now = Math.floor(new Date().getTime() / 1000);
        let diff = end_time - now;

        let days = Math.floor(diff / (24 * 60 * 60));
        let hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
        let minutes = Math.floor((diff % (60 * 60)) / 60);
        let seconds = Math.floor(diff % 60);

        //防止负数
        days = days < 0 ? 0 : days;
        hours = hours < 0 ? 0 : hours;
        minutes = minutes < 0 ? 0 : minutes;
        seconds = seconds < 0 ? 0 : seconds;

        //保留2位
        days = days < 10 ? "0" + days : days;
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
    }

    return (
        <div>
            <HeaderComponent/>

            <div className="cbanner banner"
                // style={{background:"url(images/banner.jpg) no-repeat center center;background-size: cover;"}}
            >
                <div className="wrap">
                    <div className="title">TON Launchpad</div>
                    <div className="dec">Enhance your portfolio by investing in Alphas on Ton Launchpad and
                        participating in Initial DEX Offerings for potential high returns.
                    </div>
                </div>
            </div>

            <div className="main1">
                <div className="wrap">
                    <div className="block1">
                        <a className="current">All Launchpads <span className="num"> {tokens.length}</span></a>
                        <a className="">My contributions <span className="num">0</span></a>
                    </div>
                    <div className="block2">
                        <div className="w1">
                            <div className="tit">Search</div>
                            <input type="text" placeholder="Enter jetton name" className="words"/>
                        </div>
                        <div className="w2">
                            <div className="tit">Filter by</div>
                            <select name="" id="">
                                <option value="No Fitter">No Fitter</option>
                            </select>
                        </div>
                        <div className="w2">
                            <div className="tit">Sort by</div>
                            <select name="" id="">
                                <option value="No Fitter">No Fitter</option>
                            </select>
                        </div>
                    </div>
                    <div className="block3">
                        {tokens.map((token, index) => (
                            <div key={index} className="itemType1">
                                <div className="infor1">
                                    <img src={token.icon_url} alt=""/>
                                    <div className="ri">
                                        {/*<div className="Upcoming"><i></i>Upcoming</div>*/}
                                        {/*<div className="per">5%</div>*/}
                                    </div>
                                </div>
                                <div className="infor2">
                                    <div className="title">{token.name}</div>
                                    <div className="dec">1 {token.symbol} = {token.price} TON</div>
                                </div>
                                <div className="infor3">
                                    <div className="txt1">
                                        <p>Soft cap :</p>
                                        <p><b>{token.soft_cap} TON</b></p>
                                    </div>
                                    <div className="txt2">
                                        <p>
                                            <span className="s1">Liquidity :</span>
                                            <span className="s2">{token.liquidity_percent}%</span>
                                        </p>
                                        <p>
                                            <span className="s1">Offered :</span>
                                            <span className="s2">{token.tokens_for_presale} {token.symbol}</span>
                                        </p>
                                    </div>
                                    <div className="txt1">
                                        <p>Progerss (<b>{token.progress} %</b>)</p>
                                        <p>
                                            <b>{token.receiving_balance !== undefined ? token.receiving_balance : 0}</b> / {token.receiving_max} TON
                                        </p>
                                    </div>
                                    <div className="line"><i style={{width: token.progress + "%"}}></i></div>
                                </div>
                                <div className="infor4">
                                    <div className="time">
                                        <div className="data-show-box" id="dateShow1">
                                            <span className="date-tiem-span d">{token.show_countdown.days}</span>:
                                            <span className="date-tiem-span h">{token.show_countdown.hours}</span>:
                                            <span className="date-tiem-span m">{token.show_countdown.minutes}</span>:
                                            <span className="date-s-span s">{token.show_countdown.seconds}</span>
                                        </div>
                                    </div>
                                    <a href={"/detail?id=" + token.id} className="View">View</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <FooterComponent/>
        </div>
    );
}