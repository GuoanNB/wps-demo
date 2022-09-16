import './topTitle.css';
import React from 'react';
import { Image } from 'antd';
import { Triangle } from '../../containers/assets';


const TopTitleCell = ({OriginHeadline, Headline, PVLift, OriginCTR, OptimaizedCTR, ImgUrl, DocLink}) => {

  return (
    <div className="TitleCellCointainer">
        <div className="InfoContainer">
            <div className="RecTitle">
                Recommended headline
            </div>
            <div className="RecTitleContent"  title={Headline}>

                {Headline}

            </div>
            <div className="DataArea">
                <div className="DataAreaHalf">
                    <div className="OriTitle">Original headlines</div>
                    <div className="OriTitleContent" title={OriginHeadline}>
                    <a href={DocLink} target="_blank">{OriginHeadline}</a>
                    </div>
                </div>
                <div className="DataAreaRight">
                    <div className="DataCell ">
                        <div className="DataCellTitle">PV lift</div>
                        <div className="DataCellContent GrowthData">{Triangle()}{`${Math.round(parseFloat(PVLift * 100)) / 100}%`}</div>
                        {/* <div className="DataCellContent GrowthData">{Triangle()}{PVLift}</div> */}

                    </div>
                    <div className="DataCell">
                        <div className="DataCellTitle">Original CTR</div>
                        {/* <div className="DataCellContent">{`${parseFloat(OriginCTR * 100).toPrecision(2)}%`}</div> */}
                        <div className="DataCellContent">{OriginCTR}</div>
                    </div>
                    <div className="DataCell">
                        <div className="DataCellTitle">Optimized CTR</div>
                        {/* <div className="DataCellContent" >{`${parseFloat(OptimaizedCTR * 100).toPrecision(2)}%`}</div> */}
                        <div className="DataCellContent" >{OptimaizedCTR}</div>
                    </div>
                </div>
            </div>
        </div>
        <Image
          style={{borderRadius: "4px"}}
          preview={true}
          width={251}
          height={156}
          src={ImgUrl}
        />
    </div>
  );
}


export default TopTitleCell;