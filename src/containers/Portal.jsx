import './index.css';
import 'antd/dist/antd.min.css';
import { Image } from 'antd';
import { Logo } from './assets';
import React from 'react';
import {Link} from "react-router-dom";
import Footer from "./Footer";
const Portal = () => {
  const portalList = React.useRef(null);

  const observerBtnRef = React.useRef(null);
  const btnRef = React.useRef(null);

  const [isShowRoc, setIsShow] = React.useState(true);


  React.useEffect(() => {
    observerBtnRef.current = new IntersectionObserver(function(entries) {
      const isShow = entries[0].isIntersecting;
      setIsShow(!isShow)
    }, {threshold: [0, 0.1,  0.25, 0.5, 0.75, 1]});
    observerBtnRef.current.observe(btnRef.current);
    return () => {
      observerBtnRef?.current?.disconnect();
    }
  }, [])


  const linkAudienceRef = React.useRef(null);

  const linkInteRef = React.useRef(null);
  const linkWeb3Ref = React.useRef(null);


  return (  
    
    <div className="App">
      <header className="App-header">
        <div className="App-logo">
          {Logo()}
          Creator Portal
        </div>
      </header>
      <div className="App-Container">
        <div className="PortalTopContainer" >
            <div className="PortalTopTitle">
                Every Creator and Creative Need to be Valued More
            </div>
            <div className="Page-top-sub-title" style={{width: "622px"}}>The Microsoft Creator Center amplifies the footprint of your brand and derives new value of your content</div>
        </div>
        <div style={{width: "100vw", background: "#FAFAFA"}}>
          <div className="PortalCellContainer" ref={portalList} style={{background: "#FAFAFA"}}>
            <Image preview={false} className="iteImg" src={require("../images/‌integelent.png")}/>
            <div className="iteContent">
                <div className="iteTitle">Creation intelligence</div>
                <div className="iteBigTitle">Great Creatives, Simplified Work</div>
                <div className="iteText">Create high quality content easily with trending topics, headline generator and mobile video creation tool.</div>
                <div className="iteBtn" onClick={() => linkInteRef.current.click()}><Link ref={linkInteRef} to={"/Intelligence"}>Try now</Link></div>
            </div>
          </div>
        </div>

        <div className="PortalCellContainer" style={{ marginTop: "92px"}}>
          <div className="bizLeft">
            <div className="bizLeftTitle">Flexible business models</div>
            <div className="bizLeftBigTitle">Grow Your Brand And Business</div>
            <div className="bizLeftText">Flexible offerings work closely with you on every angle in your content work</div>
          </div>
          <Image preview={false} className="iteImg" src={require("../images/wallet.png")}/>
          <div  className="bizCellContainer">
              <div className="bizCell">
                <div className="bizCellTitle">Ads</div>  
                <div className="bizCellSubTitle">Run MSFT Ads on website and gain revenue share</div>
                <ul className="bizCellList">
                  <li>Ads revenue share</li>
                </ul>
              </div>
              <div className="bizCell">
                <div className="bizCellTitle">Light</div>  
                <div className="bizCellSubTitle">Show contents on MSFT and gain referral traffic</div>
                <ul className="bizCellList">
                  <li>Traffic on search and feed</li>
                  <li>Referral traffic</li>
                  <li>Ads revenue share</li>
                </ul>
              </div>
              <div className="bizCell">
                <div className="bizCellTitle">Premium</div>  
                <div className="bizCellSubTitle">License contents to MSFT for distribution and monetization</div>
                <ul className="bizCellList">
                  <li>Unlimited traffic on search and feed</li>
                  <li>Referral traffic</li>
                  <li>Branding homepage</li>
                  <li>Followers/comments/likes</li>
                  <li>Higher ratio of Ads revenue share</li>
                  <li>Reader support</li>
                  <li>Subscription</li>
                </ul>
              </div>
          </div>
        </div>
        <div style={{width: "100vw", background: "#FAFAFA", marginTop: "92px",  paddingBottom: "92px"}}>
          <div className="PortalCellContainer" style={{ paddingTop: "92px"}}>
            <Image preview={false} className="iteImg" src={require("../images/Incentives.png")} width={"50%"}/>
            <div className="iteContent">
                <div className="iteTitle">Incentives</div>
                <div className="iteBigTitle">Full Control of Your Content and Audience</div>
                <div className="iteText">Let your most passionate fans support your creative work via subscription </div>
                <div onClick={() => {linkAudienceRef.current.click();}} className="iteBtn"><Link ref={linkAudienceRef} to={"/Audience"}>Try now</Link></div>
            </div>  
          </div>
        </div>

          <div className="PortalBottomContainer" ref={btnRef} style={{}}>
            <div className="PortalBotContent">
              <div className="PortalBotTitle">
                The new creator economy in Web3
              </div>
              <ul >
                <li>Creator ownership</li>
                <li>Community owned ecosystem</li>
                <li>Sustainable monetization</li>
                <li>Deeper engagement & loyalty</li>
              </ul>
              <div className="PortalBotBtn" onClick={() =>linkWeb3Ref.current.click()}>
                <Link ref={linkWeb3Ref} to={"/web3"}><div >Have a look</div>
                </Link>
              </div>

            </div>
            <div className="PortalBotImg">

              <Image preview={false}  src={require("../images/BigRocket.png")}/>

            </div>
          </div>
          <Footer/>
      </div>
      {isShowRoc && <div className="StaticLogo" >
        <Image preview={false} className="iteImg" src={require("../images/Rocket.png")}/>
        <Link to={"/web3"}><div className="staticLogoText">More benefits in <span style={{fontWeight: "600"}}>Web3</span></div>
        </Link>
      </div>}
    </div>

  );
}

export default Portal;
