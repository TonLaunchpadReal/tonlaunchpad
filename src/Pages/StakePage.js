import {HeaderComponent} from "../Components/HeaderComponent";
import {FooterComponent} from "../Components/FooterComponent";

export function StakePage() {
    return (
        <div>
            <HeaderComponent/>

            <div className="cbanner banner"
                // style="background: url(images/banner.jpg) no-repeat center center;background-size: cover;"
            >
                <div className="wrap">
                    <div className="title">Stake 2 Earn</div>
                    <div className="dec">Maximize returns through strategic token staking, where rewards scale with
                        commitment duration and token quantity.
                    </div>
                    <div className="imgbox"><img src="images/img.png" alt=""/></div>
                </div>
            </div>

            <div className="main1">
                <div className="wrap">
                    <div className="block1">
                        <a href="javascript:;" className="current">Active <span className="num">3</span></a>
                        <a href="javascript:;" className="">Inactive <span className="num">3</span></a>
                    </div>


                    <div className="block3 pt0">
                        {/*<div className="itemType2">*/}
                        {/*    <div className="infor1">*/}
                        {/*        <img src="images/logo2.png" alt=""/>*/}
                        {/*        <div className="ri">*/}
                        {/*            <div className="tit">Tlaun</div>*/}
                        {/*            <div className="dec">Stake TLAUN - Earn TLAUN</div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className="infor2">*/}
                        {/*        <div className="tit">Stake Periods：</div>*/}
                        {/*        <select name="" id="">*/}
                        {/*            <option value="30 days">30 days</option>*/}
                        {/*        </select>*/}
                        {/*    </div>*/}
                        {/*    <div className="infor3">*/}
                        {/*        <div className="inputwords">*/}
                        {/*            <input type="text" value="APR" readOnly className="words"/>*/}
                        {/*            <div className="num">12%</div>*/}
                        {/*        </div>*/}
                        {/*        <div className="txt">*/}
                        {/*            <p>Total Stake:</p>*/}
                        {/*            <p>*/}
                        {/*                <span><b>8,512,452,545.212</b></span>*/}
                        {/*                <span>/ 10,000,000,000</span>*/}
                        {/*            </p>*/}
                        {/*        </div>*/}
                        {/*        <div className="line"><i style={{width: "60%"}}></i></div>*/}
                        {/*    </div>*/}
                        {/*    <div className="infor4">*/}
                        {/*        <div className="lef">*/}
                        {/*            <div className="s1">You 30 days stake</div>*/}
                        {/*            <div className="s2">0 TLAUN</div>*/}
                        {/*        </div>*/}
                        {/*        <button className="current">Stake</button>*/}
                        {/*    </div>*/}
                        {/*    <div className="infor4">*/}
                        {/*        <div className="lef">*/}
                        {/*            <div className="s1">Your reward</div>*/}
                        {/*            <div className="s2">0 TLAUN</div>*/}
                        {/*        </div>*/}
                        {/*        <button>Reward</button>*/}
                        {/*    </div>*/}
                        {/*    <div className="infor5">Unstaking will be unavailable for 0 minutes</div>*/}
                        {/*</div>*/}
                        {/*<div className="itemType2">*/}
                        {/*    <div className="infor1">*/}
                        {/*        <img src="images/logo2.png" alt=""/>*/}
                        {/*        <div className="ri">*/}
                        {/*            <div className="tit">Tlaun</div>*/}
                        {/*            <div className="dec">Stake TLAUN - Earn TLAUN</div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className="infor2">*/}
                        {/*        <div className="tit">Stake Periods：</div>*/}
                        {/*        <select name="" id="">*/}
                        {/*            <option value="30 days">30 days</option>*/}
                        {/*        </select>*/}
                        {/*    </div>*/}
                        {/*    <div className="infor3">*/}
                        {/*        <div className="inputwords">*/}
                        {/*            <input type="text" value="APR" readOnly className="words"/>*/}
                        {/*            <div className="num">12%</div>*/}
                        {/*        </div>*/}
                        {/*        <div className="txt">*/}
                        {/*            <p>Total Stake:</p>*/}
                        {/*            <p>*/}
                        {/*                <span><b>8,512,452,545.212</b></span>*/}
                        {/*                <span>/ 10,000,000,000</span>*/}
                        {/*            </p>*/}
                        {/*        </div>*/}
                        {/*        <div className="line"><i style={{width: "60%"}}></i></div>*/}
                        {/*    </div>*/}
                        {/*    <div className="infor4">*/}
                        {/*        <div className="lef">*/}
                        {/*            <div className="s1">You 30 days stake</div>*/}
                        {/*            <div className="s2">0 TLAUN</div>*/}
                        {/*        </div>*/}
                        {/*        <button className="current">Stake</button>*/}
                        {/*    </div>*/}
                        {/*    <div className="infor4">*/}
                        {/*        <div className="lef">*/}
                        {/*            <div className="s1">Your reward</div>*/}
                        {/*            <div className="s2">0 TLAUN</div>*/}
                        {/*        </div>*/}
                        {/*        <button>Reward</button>*/}
                        {/*    </div>*/}
                        {/*    <div className="infor5">Unstaking will be unavailable for 0 minutes</div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>


            <FooterComponent/>
        </div>
    );
}