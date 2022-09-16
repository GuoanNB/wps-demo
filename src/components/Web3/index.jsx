import './index.css';
import React from 'react';
import { Logo } from '../../containers/assets';
import liIcon from '../../images/li-icon.png';
import content1 from '../../images/content-1.png';
import content2 from '../../images/content-2.png';
import content3 from '../../images/content-3.png';
import content4 from '../../images/content-4.png';
import content5 from '../../images/content-5.png';

const Web3 = () => {
  return (
    <div className="TopCointainer"> 
      <header className="App-header">
        <div className="App-logo">
          {Logo()}
          Web3
        </div>
      </header>
      <div className="TopsCells">
          <div className="TopAreaContainerWeb3">
              <div className="TopTitle">Your Web3 journey begins here</div>
              <div className="TopSubTitle">Onboarding creators to Web3 world seamlessly & easily</div>
          </div>

          <div className="ListContainer">
            <div className='itemContainer'>
                <div className="title">
                    <p className="mainTitle">Easily access Web3 without crypto experience</p>
                    <p className="subTitle"><img src={ liIcon } alt='li-icon' /> Simple login and interact. No technical barriers</p>
                </div>
                <div className='web3ImgContainer'>
                    <img src={content1} alt='content-1' />
                </div>
            </div>
            <div className='itemContainer'>
            <div className='web3ImgContainer2'>
                    <img src={content2} alt='content-1' />
                </div>
                <div className="title">
                    <p className="mainTitle">Decentralized by design</p>
                    <p className="subTitle"><img src={ liIcon } alt='li-icon' /> You publish it, you own it</p>
                </div>
            </div>
            <div className='itemContainer'>
                <div className="title">
                    <p className="mainTitle">Monetize your digital arts</p>
                    <p className="subTitle"><img src={ liIcon } alt='li-icon' />Mint & sell your content as NFTs</p>
                </div>
                <div className='web3ImgContainer'>
                    <img src={content3} alt='content-3' />
                </div>
            </div>
            <div className='itemContainer'>
            <div className='web3ImgContainer2'>
                    <img src={content4} alt='content-4' />
                </div>
                <div className="title">
                    <p className="mainTitle">Turn your readers & fans into collections</p>
                    <p className="subTitle"><img src={ liIcon } alt='li-icon' /> Build community around your ideas</p>
                </div>
            </div>
            <div className='itemContainer'>
                <div className="title">
                    <p className="mainTitle">Launch your creator economy</p>
                    <p className="subTitle"><img src={ liIcon } alt='li-icon' />Create your coin and reward your community</p>
                </div>
                <div className='web3ImgContainer2'>
                    <img src={content5} alt='content-3' />
                </div>
            </div>
          </div>
          <div className="footer">© 2022 MICROSOFT. ALL RIGHTS RESERVED.</div>

      </div>
    </div>
  );
}


export default Web3;