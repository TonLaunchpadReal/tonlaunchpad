import {FooterComponent} from "../Components/FooterComponent";
import {HeaderComponent} from "../Components/HeaderComponent";
import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from 'react-router-dom';
import {Locales, useTonConnectUI, useTonWallet} from '@tonconnect/ui-react';
// import {bigInt} from 'big-integer';
import ReactECharts from 'echarts-for-react';
// import $ from 'jquery';
import {Button, Collapse, message} from 'antd';

export function DetailPage() {
    /* global BigInt */

    const wallet = useTonWallet();


    const [messageApi, contextHolder] = message.useMessage();
    // const myBigInt = BigInt('12345678901234567890');

    const location = useLocation();

    const [token, setToken] = useState(null);

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

    const showUtcTime = (timestamp) => {
        let time = new Date(timestamp * 1000);//.toUTCString();
        //return 2022-01-01 00:00:00 UTC
        //return time.getUTCFullYear() + "-" + (time.getUTCMonth() + 1) + "-" + time.getUTCDate() + " " + time.getUTCHours() + ":" + time.getUTCMinutes() + ":" + time.getUTCSeconds() ;
        //保持2位
        const year = time.getUTCFullYear();
        const month = time.getUTCMonth() + 1;
        const date = time.getUTCDate();
        const hour = time.getUTCHours();
        const minute = time.getUTCMinutes();
        const second = time.getUTCSeconds();

        return year + "-" + (month < 10 ? "0" + month : month) + "-" + (date < 10 ? "0" + date : date) + " " + (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second);
    }

    let [receivingBalance, setReceivingBalance] = useState(0);


    const calculateStage = () => {
        let now = Math.floor(new Date().getTime() / 1000);
        let start_time = token.presale_start_time;
        let end_time = token.presale_end_time;
        let claim_time = token.presale_claim_time;

        let stage;
        if (now < start_time) {
            stage = 0;
        } else if (now >= start_time && now < end_time) {
            stage = 1;
        } else if (now >= end_time && now < claim_time) {
            stage = 2;
        } else if (now >= claim_time) {
            stage = 3;
        }

        return stage;
    }

    // useEffect(() => {
    //
    //     $('.group_4 .slideList ul li h2').click(function () {
    //         console.log("click slideList");
    //         $(this).next('.dec').stop().slideToggle(200000)
    //     })
    //     return () => {
    //
    //     }
    // }, []);

    const [reward, setReward] = useState({
        code: 0,
        message: 'success',
        // wallet_address: wallet_address,
        // wallet_readable: wallet_readable,
        // my_records: my_records,
        // all_records: all_records,
        percentage: 5,
        my_reward: 0,
        all_reward: 0,
        my_contribution: 0,
    });

    useEffect(() => {
        const fetchData = async () => {

            if (wallet) {
                let reward_res = await axios.get("https://tonlaunchpad.org/api/InvitationRewardsStatistics/" + wallet.account.address);
                console.log("reward_res", reward_res.data);
                setReward(reward_res.data);
                console.log("reward", reward)
            } else {
                console.log("wallet is null");
            }
        };
        fetchData();
        return () => {
        };
    }, [wallet])

    useEffect(() => {

        // $('.group_4 .slideList ul li h2').click(function () {
        //     console.log("click slideList");
        //     $(this).next('.dec').stop().slideToggle(200000)
        // })

        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('id');

        // console.log("id", id);


        let interval;

        const fetchData = async () => {
            try {
                const response = await axios.get("https://tonlaunchpad.org/api/token/" + id);
                // console.log(response.data);
                if (response.data.length > 0) {
                    let token = response.data[0];
                    token.show_countdown = showCountdown(token);
                    setToken(token);

                    interval = setInterval(async () => {
                        let header = {
                            "x-api-key": "6f58cd1c2464f5a3cfd16837d69d3d84af247334450a99566b717c46f4de84c2"
                        }

                        let url = 'https://toncenter.com/api/v2/getAddressBalance?address=' + token.receiving_account;
                        let balance = await axios.get(url, {headers: header});
                        // console.log(balance.data);
                        setReceivingBalance(Number(balance.data.result) / 1e9);
                        // let wallet = new


                    }, 1000);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        const intervalId = setInterval(() => {
            // console.log("refresh");
            setToken(prevToken => {
                // console.log("prevToken", prevToken);
                if (prevToken === null) {
                    return prevToken;
                }
                let token = {...prevToken};
                token.show_countdown = showCountdown(token);
                // console.log("seconds", token.show_countdown.seconds);
                return token;
            });
        }, 1000);

        return () => {
            clearInterval(intervalId);
            clearInterval(interval);
        };

    }, []);


    const [tonConnectUI, setOptions] = useTonConnectUI();

    const voidFunc = () => {

    }

    const onTrans = async () => {
        if (token === null) {
            return;
        }

        const amount = (BigInt(inputValue === '' || inputValue == undefined ? 1 : inputValue) * BigInt(1e9));

        let payload = "";

        let myTransaction = {
            validUntil: Math.floor(Date.now() / 1000) + 120, // 60 sec
            messages: [
                {
                    address: token.receiving_account,
                    amount: (amount).toString(),
                    payload: payload,
                    // payload: "te6cckEBAQEAPgAAeAAAAABpbnZpdG9yOlVRQkFXNEpoQmVhX2EtUm9hbnFka2JNSW1xUTdJbHJsdWoyNFU5Slh1NXlDSE0ydNaS3lU="
                    // stateInit: "base64bocblahblahblah==" // just for instance. Replace with your transaction initState or remove
                },

            ]
        }

        const searchParams = new URLSearchParams(location.search);
        const invitor = searchParams.get('invitor');
        if (invitor !== undefined && invitor !== null && invitor !== '') {
            const payload_res = await axios.get("https://tonlaunchpad.org/api/payload/" + invitor);
            console.log("payload_res", payload_res.data);


            if (wallet.account.address === payload_res.data.wallet_unreadable) {
                messageApi.error("Cannot invite yourself");
                return;
            }

            payload = payload_res.data.payload;


            const reward = BigInt(amount * BigInt(5)) / BigInt(100);

            myTransaction.messages[0].amount = (amount - reward).toString();
            myTransaction.messages[0].payload = payload;

            myTransaction.messages.push({
                address: invitor,
                amount: reward.toString(),
                payload: "te6cckEBAQEAGAAALAAAAAByZXdhcmQgZm9yIGludml0b3JswrvP"
            });

        }


        console.log("myTransaction", myTransaction);

        try {
            const result = await tonConnectUI.sendTransaction(myTransaction)
            console.log(result)

            // const someTxData = await myAppExplorerService.getTransaction(result.boc);
            // console.log(someTxData)
        } catch (e) {
            // if (e instanceof UserRejectedError) {
            //     alert('You rejected the transaction. Please confirm it to send to the blockchain');
            // } else {
            //     alert('Unknown error happened', e);
            // }
        }
    }

    const onClaim = async () => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('id');
        console.log("wallet", wallet);
        const wallet_address = wallet.account.address;
        console.log("wallet_address", wallet_address);
        let res = await axios.get("https://tonlaunchpad.org/api/claim/" + id + "/" + wallet_address);
        // let res = await axios.get("http://localhost:3009/claim/" + id + "/" + wallet_address);


        messageApi.info("Operation has been successful, waiting for execution");

        console.log(res);
    }

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const setMax = () => {
        setInputValue('100');
    }

    const copyAddress = () => {

        // 创建一个临时textarea元素
        const textarea = document.createElement('textarea');
        // 设置textarea的值为要复制的文本
        textarea.value = token.token_address;
        // 将textarea添加到页面中
        document.body.appendChild(textarea);
        // 选择文本
        textarea.select();
        // 复制文本到剪贴板
        document.execCommand('copy');
        // 移除临时textarea元素
        document.body.removeChild(textarea);

        messageApi.info('Copied to clipboard');
    }


    const copyLink = () => {

        console.log("wallet", wallet);

        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('id');
        // 创建一个临时textarea元素
        const textarea = document.createElement('textarea');
        // 设置textarea的值为要复制的文本
        textarea.value = "https://tonlaunchpad.org/detail?id=" + id + "&invitor=" + wallet.account.address
        // 将textarea添加到页面中
        document.body.appendChild(textarea);
        // 选择文本
        textarea.select();
        // 复制文本到剪贴板
        document.execCommand('copy');
        // 移除临时textarea元素
        document.body.removeChild(textarea);

        messageApi.info('Copied to clipboard');
    }

    if (token === null) {
        return <div></div>
    } else {
        return (
            <div>
                {contextHolder}
                <HeaderComponent/>
                <div className="article">
                    <div className="wrap">
                        <div className="left">
                            <div>
                                <div className="group_1 paddingborder">
                                    <div className="block1">
                                        <img className="image_1" src={token.icon_url}/>
                                        <div className="lef">
                                            <span className="text_7">{token.name}</span>
                                            <div className="links">
                                                <div className="image-wrapper">
                                                    <a href={token.official_website_url}>
                                                        <img src="images/link1.png"/>
                                                    </a>
                                                </div>
                                                <div className="image-wrapper ">
                                                    <a href={token.telegram_url}>
                                                        <img src="images/link2.png"/>
                                                    </a>
                                                </div>
                                                <div className="image-wrapper">
                                                    <a href={token.twitter_url}>
                                                        <img src="images/link3.png"/>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        {/*<div className="coming">*/}
                                        {/*<i></i>*/}
                                        {/*<span>Upcoming</span>*/}
                                        {/*</div>*/}
                                    </div>
                                    <div className="desc">
                                        {token.description}
                                    </div>
                                    <div className="listmodel">
                                        <ul>
                                            <li>
                                                <div className="s1">Presale Address</div>
                                                <div className="s2">
                                                    <button type="button" className="copy"
                                                            data-clipboard-text="123">{token.presale_address}
                                                    </button>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="s1">Token Name</div>
                                                <div className="s2">
                                                    {token.name}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="s1">Token Symbol</div>
                                                <div className="s2">
                                                    {token.symbol}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="s1">Token Decimals</div>
                                                <div className="s2">
                                                    {token.decimal}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="s1">Token Address</div>
                                                <div className="s2">
                                                    <button type="button" className="copy"
                                                            data-clipboard-text="456" onClick={copyAddress}>
                                                        {token.token_address}
                                                    </button>
                                                    <div className="grey">(Do not send TON to the token address!)
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="s1">Total Supply</div>
                                                <div className="s2">
                                                    {token.total_supply} {token.symbol}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="s1">Tokens For Presale</div>
                                                <div className="s2">
                                                    {token.tokens_for_presale} {token.symbol}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="s1">Tokens For Liquidity</div>
                                                <div className="s2">
                                                    {token.tokens_for_liquidity} {token.symbol}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="s1">Initial Market Cap (estimate)</div>
                                                <div className="s2">
                                                    {token.initial_market_cap} TON
                                                </div>
                                            </li>
                                            <li>
                                                <div className="s1">Soft Cap</div>
                                                <div className="s2">
                                                    {token.soft_cap} TON
                                                </div>
                                            </li>
                                            <li>
                                                <div className="s1">Limit per user</div>
                                                <div className="s2">
                                                    ∞ TON
                                                </div>
                                            </li>
                                            <li>
                                                <div className="s1">Presale Start Time</div>
                                                <div className="s2">
                                                    {showUtcTime(token.presale_start_time)} (UTC)
                                                </div>
                                            </li>
                                            <li>
                                                <div className="s1">Presale End Time</div>
                                                <div className="s2">
                                                    {showUtcTime(token.presale_end_time)} (UTC)
                                                </div>
                                            </li>
                                            <li>
                                                <div className="s1">Listing On</div>
                                                <div className="s2">
                                                    <div className="blue">
                                                        <a href={token.list_on} target="_blank">
                                                            {token.list_on}
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="s1">Liquidity Percent</div>
                                                <div className="s2">
                                                    {token.liquidity_percent}%
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {wallet &&
                                <div className="group_2 paddingborder">
                                    <div className="titlemodel">
                                        Affiliate Program
                                    </div>
                                    <div className="copytxt">
                                        <div className="tit">Affiliate Link</div>
                                        <input type="text" className="words"
                                               value={"https://tonlaunchpad.org/detail?id=" + token.id + "&invitor=" + wallet.account.address}
                                               id="foo" onChange={voidFunc}/>
                                        <input type="button" value=" " className="copy2"
                                               data-clipboard-action="copy"
                                               data-clipboard-target="#foo" onChange={voidFunc} onClick={copyLink}/>
                                    </div>
                                    <div className="listmodel">
                                        <ul>
                                            <li>
                                                <div className="s1">Reward Percentage</div>
                                                <div className="s2">
                                                    <div className="blue">{reward.percentage}%</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="s1">Current Rewards</div>
                                                <div className="s2">
                                                    {typeof reward !== 'undefined' ? reward.all_reward : 0} TON
                                                </div>
                                            </li>
                                            <li>
                                                <div className="s1">Your Rewards</div>
                                                <div className="s2">
                                                    <div
                                                        className="blue">{typeof reward !== 'undefined' ? reward.my_reward : 0} TON
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                                }
                                <div className="group_3 paddingborder">
                                    <div className="titlemodel">TON Launchpad tokenomics</div>
                                    <div className="charts">
                                        {/*<div id="main1" style={{height: "100%"}}></div>*/}
                                        <ReactECharts option={JSON.parse(token.echart)} style={{height: "100%"}}/>
                                    </div>
                                </div>
                            </div>


                            <div className="group_4 paddingborder">


                                <div className="titlemodel">Frequently Asked Question</div>
                                <Collapse items={JSON.parse(token.questions)} ghost={true} defaultActiveKey={[]}
                                          expandIconPosition='end'/>

                                {/*<div className="slideList">*/}
                                {/*    <ul>*/}
                                {/*        <li>*/}
                                {/*            <h2 className="h2tit">What's this token sale all about?</h2>*/}
                                {/*            <div className="dec">*/}
                                {/*                <p>*/}
                                {/*                    Lorem ipsum dolor sit amet consectetur adipisicing, elit. Fugit*/}
                                {/*                    facere*/}
                                {/*                    sapiente autem voluptatem harum doloribus similique laudantium hic*/}
                                {/*                    repudiandae possimus quasi, accusamus quia dolore impedit*/}
                                {/*                    consectetur*/}
                                {/*                    dolorem excepturi aspernatur sint!*/}
                                {/*                </p>*/}
                                {/*            </div>*/}
                                {/*        </li>*/}
                                {/*        <li>*/}
                                {/*            <h2 className="h2tit">How are these tokens being used or divided? Can you*/}
                                {/*                show*/}
                                {/*                me in simple terms?</h2>*/}
                                {/*            <div className="dec">*/}
                                {/*                <p>*/}
                                {/*                    Lorem ipsum dolor sit amet consectetur adipisicing, elit. Fugit*/}
                                {/*                    facere*/}
                                {/*                    sapiente autem voluptatem harum doloribus similique laudantium hic*/}
                                {/*                    repudiandae possimus quasi, accusamus quia dolore impedit*/}
                                {/*                    consectetur*/}
                                {/*                    dolorem excepturi aspernatur sint!*/}
                                {/*                </p>*/}
                                {/*            </div>*/}
                                {/*        </li>*/}
                                {/*        <li>*/}
                                {/*            <h2 className="h2tit">What does "liquidity" mean for this token? And when*/}
                                {/*                and*/}
                                {/*                where can l trade it?</h2>*/}
                                {/*            <div className="dec">*/}
                                {/*                <p>*/}
                                {/*                    Lorem ipsum dolor sit amet consectetur adipisicing, elit. Fugit*/}
                                {/*                    facere*/}
                                {/*                    sapiente autem voluptatem harum doloribus similique laudantium hic*/}
                                {/*                    repudiandae possimus quasi, accusamus quia dolore impedit*/}
                                {/*                    consectetur*/}
                                {/*                    dolorem excepturi aspernatur sint!*/}
                                {/*                </p>*/}
                                {/*            </div>*/}
                                {/*        </li>*/}
                                {/*        <li>*/}
                                {/*            <h2 className="h2tit">Possibility to claim tokens after the sale and vesting*/}
                                {/*                periods</h2>*/}
                                {/*            <div className="dec">*/}
                                {/*                <p>*/}
                                {/*                    Lorem ipsum dolor sit amet consectetur adipisicing, elit. Fugit*/}
                                {/*                    facere*/}
                                {/*                    sapiente autem voluptatem harum doloribus similique laudantium hic*/}
                                {/*                    repudiandae possimus quasi, accusamus quia dolore impedit*/}
                                {/*                    consectetur*/}
                                {/*                    dolorem excepturi aspernatur sint!*/}
                                {/*                </p>*/}
                                {/*            </div>*/}
                                {/*        </li>*/}
                                {/*        <li>*/}
                                {/*            <h2 className="h2tit">Claim of referral rewards after sale</h2>*/}
                                {/*            <div className="dec">*/}
                                {/*                <p>*/}
                                {/*                    Lorem ipsum dolor sit amet consectetur adipisicing, elit. Fugit*/}
                                {/*                    facere*/}
                                {/*                    sapiente autem voluptatem harum doloribus similique laudantium hic*/}
                                {/*                    repudiandae possimus quasi, accusamus quia dolore impedit*/}
                                {/*                    consectetur*/}
                                {/*                    dolorem excepturi aspernatur sint!*/}
                                {/*                </p>*/}
                                {/*            </div>*/}
                                {/*        </li>*/}
                                {/*    </ul>*/}
                                {/*</div>*/}
                            </div>
                        </div>


                        <div className="right">
                            <div className="group_5 paddingborder">
            <span className="title">
              Presale Starts In :
            </span>
                                <div className="numlist" id="dateShow1">


                                    <div className="text-wrapper ">
                                        <span className="s1 date-tiem-span d">{token.show_countdown.days}</span>
                                        <span className="s2">days</span>
                                    </div>
                                    <div className="text-wrapper ">
                                        <span className="s1 date-tiem-span h">{token.show_countdown.hours}</span>
                                        <span className="s2">hours</span>
                                    </div>
                                    <div className="text-wrapper ">
                                        <span className="s1 date-tiem-span m">{token.show_countdown.minutes}</span>
                                        <span className="s2">mins</span>
                                    </div>
                                    <div className="text-wrapper ">
                                        <span className="s1 date-s-span s">{token.show_countdown.seconds}</span>
                                        <span className="s2">secs</span>
                                    </div>
                                </div>
                                <div className="text-wrapper_23">
                                    <span className="text_72">{receivingBalance} TON</span>
                                    <span className="text_73">{token.receiving_max} TON</span>
                                </div>
                                <div className="line "><i style={{width: token.progress + "%"}}></i></div>
                                {calculateStage() === 1 &&
                                <span className="title">Amount</span>
                                }
                                {calculateStage() === 1 &&
                                <div className="text-wrapper_24">
                                    <input type="text" className="words" value={inputValue}
                                           onChange={handleChange}/>
                                    <button type="button" className="text_76" onClick={setMax}>MAX</button>
                                </div>
                                }

                                {calculateStage() === 1 && <a className="buy" onClick={onTrans}>BUY</a>}
                                {calculateStage() === 3 && <a className="buy" onClick={onClaim}>CLAIM</a>}
                            </div>
                            <div className="group_6 paddingborder">
                                <div className="line">
                                    <i style={{width: (calculateStage() + 1) * 25 + "%"}}><em></em></i>
                                </div>
                                <div className="list">
                                    <div className="paragraph_1 current">
                                        <p>
                                            Waiting for pool start
                                        </p>
                                        <p>
                                            No one can purchase
                                        </p>
                                    </div>
                                    {/*<div className="paragraph_1 current">*/}
                                    <div className={calculateStage() > 0 ? 'paragraph_1 current' : 'paragraph_1'}>

                                        <p>
                                            Pool Start
                                        </p>
                                        <p>
                                            Pool starts at {showUtcTime(token.presale_start_time)} (UTC)
                                        </p>
                                    </div>
                                    <div className={calculateStage() > 1 ? 'paragraph_1 current' : 'paragraph_1'}>
                                        <p>
                                            Pool Ended
                                        </p>
                                        <p>
                                            Pool ends at {showUtcTime(token.presale_end_time)} (UTC)
                                        </p>
                                    </div>
                                    <div className={calculateStage() > 2 ? 'paragraph_1 current' : 'paragraph_1'}>
                                        <p>
                                            Claim tokens
                                        </p>
                                        <p>
                                            Claim at {showUtcTime(token.presale_claim_time)} (UTC)
                                        </p>
                                    </div>
                                </div>
                                <div className="decs">
                                    {/*<div className="txt">*/}
                                    {/*    <span className="s1">Status</span>*/}
                                    {/*    <span className="s2">not started</span>*/}
                                    {/*</div>*/}
                                    <div className="txt">
                                        <span className="s1">Sale Type</span>
                                        <span className="s2"><span className="blue">Public</span></span>
                                    </div>
                                    <div className="txt">
                {/*<span className="s1">*/}
                {/*  Current Rate*/}
                {/*  <br/>*/}
                {/*  1 Obama = 0.000025625 TON*/}
                {/*</span>*/}
                                        <span className="s2"></span>
                                    </div>
                                    <div className="txt">
                                        <div className="s1">Total Contributors</div>
                                        <div className="s2"></div>
                                    </div>
                                    <div className="txt">
                                        <span className="s1">Your Contribution</span>
                                        <span className="s2">{reward.my_contribution} TON</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <FooterComponent/>
            </div>
        );
    }
}