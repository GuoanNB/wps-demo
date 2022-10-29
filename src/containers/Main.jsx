import './index.css';

import React from 'react';
import axios from 'axios';
import { config } from "../utils/web-office-sdk-v1.1.19.es.js";

const wx = window.wx;

const Main = (props) => {

  // wx.miniProgram.postMessage({ data: {foo: 'bar'} })

  const refreshToken = async () => {
    // 自身业务处理...
    // 可以返回 Promise 或者 return { token, timeout }
    const {data: {
      expires_in, token
    }} = await axios.get(`https://api.yingoukj.cn/getUrlAndToken?fileid=&filename=&fileurl=`);
    return {
      token: token, // 必需：你需要设置的 token
      timeout: expires_in, //  必需：token 超时时间，以 10 分钟示例
    };
  };
  const iframeRef = React.useRef(null);

  const init = async (fileId, fileName, fileUrl) => {
    // const {data} = await axios.get("http://82.157.243.144:6443/getWXAccToken");
    // const {data} = await axios.get("https://api.yingoukj.cn/getWXAccToken");
    console.log("fileUrl", fileUrl);
    // setWxToken(data.wx_acc_token);
    const {data: {
      expires_in, token, wpsUrl
    }} = await axios.get(`https://api.yingoukj.cn/getUrlAndToken?fileid=${fileId}&filename=${fileName}&fileurl=${fileUrl}`);
    // const {data: {
    //   expires_in, token, wpsUrl
    // }} = await axios.get("http://82.157.243.144:6443/getUrlAndToken?fileid=3007808831");


    const jssdk = config({
      url: wpsUrl, // 该地址需要后端提供，https://wwo.wps.cn/office/p/xxx,
      mount: document.querySelector('.mount-container'),
      refreshTokenWrapper: refreshToken
    });

    timerRec.current = Date.now();
  
    jssdk.setToken({token: token})
    iframeRef.current = jssdk.iframe;
    await jssdk.ready();
    // const events = await jssdk.Events;

    // // 监听幻灯片Active Slice事件
    jssdk.ApiEvent.AddApiEventListener('ActiveSlideChange', (e) => {
      const { Data: {slideIndex, finished }} = e 
      setActiveIndesCB(slideIndex + 1) // 似乎是从零开始的
    })
  
    //监听PDF页码变化, word好像不行
    jssdk.ApiEvent.AddApiEventListener("CurrentPageChange", (data) => {
      setActiveIndesCB(data + 1)
    });

    jssdk.ApiEvent.AddApiEventListener("WindowScrollChange", (data) => {
      const {Data: {scrollTop, clientHeight}} = data;
      const pageIdx = Math.floor(scrollTop / clientHeight) + 1;
      if(pageIdx === activeIndex) return;
      setActiveIndesCB(pageIdx)
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
  
    // jssdk.ApiEvent.AddApiEventListener('SlideSelectionChanged', (e) => {
    //   setSelectedIndex(e)
    // })

  }
  const [activeIndex, setActiveIndex] = React.useState(1);


  const setActiveIndesCB = (activeIndex) => {
    setActiveIndex((prev) => {

      lastPageRec.current = prev;
      return activeIndex
    })
  };

  // const [selectedIndex, setSelectedIndex] = React.useState(1);
  // const [wxToken, setWxToken] = React.useState("");
  // const [fileID, setFileId] = React.useState("");


  const [pageStayTime, setPageStayTime] = React.useState({});

  const timerRec = React.useRef(Date.now());
  const lastPageRec = React.useRef(1);

  const setPageStayTimeCB = () => {
    const tempRec = {...pageStayTime}
    if(tempRec[activeIndex] === undefined) {
      tempRec[activeIndex] = 0;
    }
    if( tempRec[lastPageRec.current] !== undefined) {
      tempRec[lastPageRec.current] = (tempRec[lastPageRec.current] + (Date.now() - timerRec.current)) / 1000;
    }
    setPageStayTime({
      ...pageStayTime,
      ...tempRec,
    })
    wx.miniProgram.postMessage({ data: {
      ...pageStayTime,
      ...tempRec,
      [activeIndex]: tempRec[activeIndex] + (Date.now() - timerRec.current) / 1000,
    }});
    lastPageRec.current = activeIndex;
    timerRec.current = Date.now();
  };


  React.useEffect(() => {
    setPageStayTimeCB();
  }, [activeIndex]);


  React.useEffect(() => {
    const search = window.location.search?.slice(1)?.split("&")
    const fileName = search[1]?.split("=")[1]
    const fileUrl = search[2]?.split("=")[1]
    // const fileId = search[0]?.split("=")[1].slice(8).split(".")[0] + fileName;
    const fileId = search[0]?.split("=")[1]
    if(fileId && fileName && fileUrl) {
      // setFileId(fileId);
      init(fileId, fileName, fileUrl);
    }
  }, []);

  // const saveAction = async (fileID) => {
  //   const res = await axios.post("http://82.157.243.144:6443/saveUserAction", {
  //     fileID: fileID,
  //     action: pageStayTime
  //   })
  //   console.log("saveAction", res);
  // }

  return (
    <div className="App">
        <div id="iframe-wrap" className="mount-container"></div>
        <div className="return-btn" onClick={() => {
          wx.miniProgram.postMessage({ data: {
            ...pageStayTime,
            [activeIndex]: pageStayTime[activeIndex] !== undefined && pageStayTime[activeIndex] + (Date.now() - timerRec.current) / 1000,
          }});
          // wx.miniProgram.navigateBack();
          wx.miniProgram.switchTab({url: "/pages/index/index"})
        }}>返回</div>
    </div>
  );
}

// /pages/index/index
export default Main;

// const ActiveIndexIndicator = ({activeIndex}) => {
  
// }

// $(function() {
//   pushHistory();
//   window.addEventListener("popstate", function(e) {
//       //首页点击返回,直接关闭网页
//       WeixinJSBridge.call('closeWindow');
//       // !!!这里提交监控数据!!!
//   }, false);
//   function pushHistory() {
//       var state = {
//           title: "title",
//           url: "#"
//       };
//       window.history.pushState(state, state.title, state.url);
//   }
// })