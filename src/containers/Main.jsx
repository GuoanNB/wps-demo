import './index.css';

import React from 'react';
import axios from 'axios';
import { config } from "../utils/web-office-sdk-v1.1.19.es.js";

// const wx = window.wx;
const Main = (props) => {

  // wx.miniProgram.postMessage({ data: {foo: 'bar'} })

  const refreshToken = async () => {
    // 自身业务处理...
    // 可以返回 Promise 或者 return { token, timeout }
    return Promise.resolve({
      token: "dd8bda649935479bb9e2af2ad84892a4", // 必需：你需要设置的 token
      timeout: 10 * 600 * 1000, //  必需：token 超时时间，以 10 分钟示例
    });
  };
  const iframeRef = React.useRef(null);

  const init = async (fileId, fileName, fileUrl) => {
    const accToken = await axios.get("http://82.157.243.144:6443/getWXAccToken");

    console.log("accToken", accToken);
    const {data: {
      expires_in, token, wpsUrl
    }} = await axios.get(`http://82.157.243.144:6443/getUrlAndToken?fileid=${fileId}&filename=${fileName}&fileurl=${fileUrl}`);
    // const {data: {
    //   expires_in, token, wpsUrl
    // }} = await axios.get("http://82.157.243.144:6443/getUrlAndToken?fileid=3007808831");
    // console.log("testREstestREs", wpsUrl);
    // console.log("token", token);

    const jssdk = config({
      url: wpsUrl, // 该地址需要后端提供，https://wwo.wps.cn/office/p/xxx,
      mount: document.querySelector('.mount-container'),
      refreshToken
    });
    jssdk.setToken({token: token})
    iframeRef.current = jssdk.iframe;
    await jssdk.ready();
    const events = await jssdk.Events;
    // console.log("events", events)

    // // 监听幻灯片Active Slice事件
    jssdk.ApiEvent.AddApiEventListener('ActiveSlideChange', (e) => {
      const { Data: {slideIndex, finished }} = e 
      setActiveIndex(slideIndex + 1) // 似乎是从零开始的
      console.log("ActiveSlideChange", slideIndex)
    })
  
    //监听PDF页码变化
    jssdk.ApiEvent.AddApiEventListener("CurrentPageChange", (data) => {
      console.log("CurrentPageChange PDF: ", data);
      setActiveIndex(data + 1)
    });

    // jssdk.ApiEvent.AddApiEventListener('SlideShowOnNext', (e) => {
    //   console.log("SlideShowOnNext SlideShowOnNext==================", e)
    //   const { Data: {slideIndex }} = e
    // })
    
    
    // jssdk.ApiEvent.AddApiEventListener('SlideShowOnPrevious', (e) => {
    //   console.log("SlideShowOnPrevious SlideShowOnPrevious==================", e)
    //   const { Data: {slideIndex }} = e
    // })

    // jssdk.ApiEvent.AddApiEventListener('SlideShowOnFirst', (e) => {
    //   console.log("SlideShowOnFirst SlideShowOnFirst==================", e)
    //   const { Data: {slideIndex }} = e
    // })
  
    jssdk.ApiEvent.AddApiEventListener('SlideSelectionChanged', (e) => {
      console.log("SlideSelectionChanged SlideSelectionChanged==================", e)
      setSelectedIndex(e)
    })
    
    // jssdk.ApiEvent.AddApiEventListener('SlideShowEnd', (e) => {
    //   console.log("SlideShowEnd SlideShowEnd: ", e);
    // })
    // // 取消监听
    // jssdk.ApiEvent.RemoveApiEventListener('ActiveSlideChange', ActiveSlideChangeHandle)

  }
  const [activeIndex, setActiveIndex] = React.useState(1);
  const [selectedIndex, setSelectedIndex] = React.useState(1);


  React.useEffect(() => {
    // fetchFileList();
    const search = window.location.search?.slice(1)?.split("&")
    const fileName = search[1]?.split("=")[1]
    const fileUrl = search[2]?.split("=")[1]
    // const fileId = search[0]?.split("=")[1].slice(8).split(".")[0] + fileName;
    const fileId = search[0]?.split("=")[1]
    if(fileId && fileName && fileUrl) {
      init(fileId, fileName, fileUrl);
    }
  }, []);
  const currentIndex = React.useMemo(() => {
    return `当前页${activeIndex}`;
  }, [activeIndex]);

  return (
    <div className="App">
        <div id="iframe-wrap" className="mount-container"></div>
        <div id="ActiveIndexIndicator" className='indicator-index'>{currentIndex} 选择页{selectedIndex}</div>

    </div>
  );
}


export default Main;

// const ActiveIndexIndicator = ({activeIndex}) => {
  
// }