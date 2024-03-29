import logo from './logo.svg';
import './App.css';
import React from "react";
import {Routes, Route} from 'react-router-dom';
import {HomePage} from "./Pages/HomePage"
import {LaunchPadPage} from "./Pages/LaunchPadPage";
import {DetailPage} from "./Pages/DetailPage";
import {StakePage} from "./Pages/StakePage";

function App() {

    // const [tonConnectUI, setOptions] = useTonConnectUI();
    //
    // const onLanguageChange = (lang) => {
    //     setOptions({language: lang});
    // };

    // const myTransaction = {
    //     validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    //     messages: [
    //         {
    //             address: "UQBdUQmKKwMdT7zquSTwUGKRlh4sM-4xxVTaJ4cUe8_LOi7j",
    //             amount: "2000000",
    //             // stateInit: "base64bocblahblahblah==" // just for instance. Replace with your transaction initState or remove
    //         },
    //         // {
    //         //     address: "EQDmnxDMhId6v1Ofg_h5KR5coWlFG6e86Ro3pc7Tq4CA0-Jn",
    //         //     amount: "60000000",
    //         //     // payload: "base64bocblahblahblah==" // just for instance. Replace with your transaction payload or remove
    //         // }
    //     ]
    // }
    //
    // const onTrans = async () => {
    //     try {
    //         const result = await tonConnectUI.sendTransaction(myTransaction)
    //         console.log(result)
    //
    //         // const someTxData = await myAppExplorerService.getTransaction(result.boc);
    //         // console.log(someTxData)
    //     } catch (e) {
    //         // if (e instanceof UserRejectedError) {
    //         //     alert('You rejected the transaction. Please confirm it to send to the blockchain');
    //         // } else {
    //         //     alert('Unknown error happened', e);
    //         // }
    //     }
    // }

    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/launchpad" element={<LaunchPadPage/>}/>
            <Route path="/stake" element={<StakePage/>}/>
            <Route path="/detail" element={<DetailPage/>}/>
            <Route path="*" element={<HomePage/>}/>
        </Routes>
    );
}

export default App;
