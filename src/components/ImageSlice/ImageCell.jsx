import './index.css';
import React from 'react';
import { Image } from 'antd';

const ImageCell = ({isReversed, cardTitle, cardText, coverContent, imageUrl}) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div className="imgCellContainer"         
    onMouseEnter={() => setVisible(true)}
    onMouseLeave={() => setVisible(false)}>
      <Image
        preview={false}
        width={"100%"}
        height={"100%"}
        src={imageUrl}
      />
      {!visible && <div className={isReversed ? "upTab" : "downTab"}>
        <div className="tabTitle">
            {cardTitle}
        </div>
        <div className="tabText">
            {cardText}
        </div>
      </div>}
      { visible && <div className={isReversed ? "light-cover" : "dark-cover"}>{coverContent}</div>}
    </div>
  );
}


export default ImageCell;