import './index.css';
import React from 'react';
import TopTitleCell from "../components/TopTitleCell";
import { Skeleton } from 'antd';
import { getTopHeadlines } from "../utils"
import { Logo } from './assets';
import Footer from "./Footer";
const testData = {
        OriginHeadline: "Works worth millions donated to gallery in show of support", Headline: "Machine Gun Kelly and Mod Sun's Stoner Comedy Was Inspired by a Real-Life Event", PVLift: "21.5%", OriginCTR: "1.5%", OptimaizedCTR:"9.7%", ImgUrl: "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
}

const testList = Array(20).fill(testData);


const TopTraffic = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [dataList, setList] = React.useState([]);



  React.useEffect(() => {
    const getHeadlines = async () => {
      const {data} = await getTopHeadlines();
      console.log("data", data)
      setList(data)
      setIsLoading(false);
    }
    getHeadlines();
  }, [])

  return (
    <div className="TopCointainer"> 
      <header className="App-header">
        <div className="App-logo">
          {Logo()}
          Intelligence home
        </div>
      </header>
      <div className="TopsCells">
          <div className="HeadlinesTopAreaContainer">
              <div className="TopTitle">Top lift headlines gain estimation</div>
              <div className="TopSubTitle">The headlines automatically launches A/B testing to reach a best title, quickly finding the most click-worthy headline for your content to get more interaction instead of visitors leaving. See how much your contents are improved.</div>
          </div>

          <div className="ListContainer">
            <Skeleton loading={isLoading || !dataList.length} active avatar round>
              {dataList.map((item, idx) => {
                  return <TopTitleCell key={item.OriginHeadline + idx} {...item}/>
              })}
            </Skeleton>

          </div>
            <Footer/>
      </div>

    </div>
  );
}


export default TopTraffic;