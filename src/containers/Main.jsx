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
    // console.log("fileUrl", fileUrl);
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
      refreshTokenWrapper: refreshToken,
      pptOptions: {
        isShowBottomStatusBar: false, // 是否展示底部状态栏
        isShowRemarkView: false, // 是否显示备注视图
        isShowInsertMedia: false, // 是否显示插入音视频入口
        isShowComment: false, // 是否显示评论相关入口
      }
    });
    await jssdk.on('fileOpen', async (data) => {
      const { fileInfo: {officeType} } = data;
      timerRec.current = Date.now();

      await jssdk.ready();
      const app = jssdk.Application;
      const Cooperation = await app.CommandBars('Cooperation');
      Cooperation.Visible = false;
      const More = await app.CommandBars('More');
      const Logo = await app.CommandBars('Logo');
      const SendButton = await app.CommandBars('SendButton');
      const Invitation = await app.CommandBars('Invitation');
      More.Visible = false;
      Logo.Visible = false;
      SendButton.Visible = false;
      Invitation.Visible = false;

      // const waterMarks = await app.ActiveDocument.Sections.Item(1).WaterMarks;
      // console.log("waterMarks", waterMarks);
      // waterMarks?.DeleteWaterMark();
      if (officeType === 'w') {
        setActiveIndesCB(1);
        jssdk.ApiEvent.AddApiEventListener("WindowScrollChange", (data) => {
          const {Data: {scrollTop, clientHeight}} = data;
          const pageIdx = Math.floor(scrollTop / clientHeight) + 1;
          if(pageIdx === activeIndex) return;
          setActiveIndesCB(pageIdx)
        });
        const WriterHoverToolbars = await app.CommandBars('WriterHoverToolbars');
        WriterHoverToolbars.Visible = false;
      }
      if(officeType === 'f') {
        setActiveIndesCB(1);
        //监听PDF页码变化, word好像不行
        jssdk.ApiEvent.AddApiEventListener("CurrentPageChange", (data) => {
          setActiveIndesCB(data + 1)
        });
      }
      if (officeType === 'p') {
    // // 监听幻灯片Active Slice事件
        jssdk.ApiEvent.AddApiEventListener('ActiveSlideChange', (e) => {
          const { Data: {slideIndex, finished }} = e 
          setActiveIndesCB(slideIndex + 1) // 似乎是从零开始的
        })

        const mobileCommentMenus = await app.CommandBars('comment');
        const WPPMobileCommentButton = await app.CommandBars('WPPMobileCommentButton');
        const WPPMobileMarkButton = await app.CommandBars('WPPMobileMarkButton');
        const insert = await app.CommandBars('insert');
        const keyboard = await app.CommandBars('keyboard');
        const InsertImage = await app.CommandBars('InsertImage');
        const FloatMenuDownloadImage = await app.CommandBars('FloatMenuDownloadImage');
        const WPPMobileTimeStamp = await app.CommandBars('WPPMobileTimeStamp');
        // const Invitation = await app.CommandBars('Invitation');
        // commentMenus.Visible = false;
        mobileCommentMenus.Visible = false;
        WPPMobileMarkButton.Visible = false;
        insert.Visible = false;
        keyboard.Visible = false;
        InsertImage.Visible = false;
        FloatMenuDownloadImage.Visible = false;
        WPPMobileCommentButton.Visible = false;
        WPPMobileTimeStamp.Visible = false;
      };

      // setInterval(() => {
      //   wx.miniProgram.postMessage({ data: {
      //     ...pageStayTime
      //   }});
      // }, 2000);

    });
    jssdk.setToken({token: token})
    iframeRef.current = jssdk.iframe;
    // await jssdk.ready();
    // const events = await jssdk.Events;
    // const app = jssdk.Application;

    
    // const waterMarks = await app.ActiveDocument.Sections.Item(1).WaterMarks;

    // // 插入文字水印
    // await waterMarks.AddTextWaterMark({
    //   Text: '水印文本', // Text：水印文本
    //   FontName: '宋体', // FontName：水印字体类型
    //   FontSize: 40, // FontSize：水印字体大小
    //   FontColor: '#171717', // FontColor：水印字体颜色
    //   Transparency: 0.3, // Transparency：透明度
    //   Gradient: false, // Gradient：倾斜度
    //   ApplyTo: 1, // ApplyTo：插入位置
    // });
    // waterMarks.DeleteWaterMark();
    // 公共
    // const waterMarks = await app.ActiveDocument.Sections.Item(1).WaterMarks;
    // console.log("waterMarks", waterMarks);
    // // 获取水印
    // const waterMark = await waterMarks.Item(1);
    // console.log("获取水印", waterMark);
  
    // 设置水印的透明度
    // waterMark.Transparency = 0;

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


  // const [selectedIndex, setSelectedIndex] = React.useState(1);
  // const [wxToken, setWxToken] = React.useState("");
  // const [fileID, setFileId] = React.useState("");


  const [pageStayTime, setPageStayTime] = React.useState({});

  const timerRec = React.useRef(null);
  const lastPageRec = React.useRef(0);

  const [activeIndex, setActiveIndex] = React.useState(0);

  const setActiveIndesCB = (activeIndex) => {
    setActiveIndex((prev) => {
      if(!prev){
        lastPageRec.current = activeIndex;
      } else {
        lastPageRec.current = prev;
      }
      return activeIndex
    })
  };

  const setPageStayTimeCB = () => {
    if (!activeIndex || !timerRec.current) return; // 文档没加载完
    const tempRec = {...pageStayTime}
    if(tempRec[activeIndex] === undefined) {
      tempRec[activeIndex] = 0;
    }
    if(tempRec[lastPageRec.current] !== undefined) {
      tempRec[lastPageRec.current] = (tempRec[lastPageRec.current] + (Date.now() - timerRec.current)) / 1000;
    }

    setPageStayTime({
      // ...pageStayTime,
      ...tempRec,
    })
    wx.miniProgram.postMessage({ data: {
      // ...pageStayTime,
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
    let weixinBoolean = false
    const ready = () => {
      console.log('miniprogram')

      if (window.__wxjs_environment === 'miniprogram') {
      console.log('miniprogram true')

        weixinBoolean = true;
      }
    };
    if (!window.WeixinJSBridge || !window.WeixinJSBridge.invoke) {
      console.log('WeixinJSBridge', window.WeixinJSBridge)

      document.addEventListener('WeixinJSBridgeReady', ready, false);
    } else {
      ready();
      window.WeixinJSBridge.on('onPageStateChange', res => {
        console.log('res is active', res.active);
      });
    }
    
    if (weixinBoolean) {
        console.log('微信小程序')
    }

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
            [activeIndex]: pageStayTime[activeIndex] ? pageStayTime[activeIndex] + (Date.now() - timerRec.current) / 1000 : (Date.now() - timerRec.current) / 1000,
          }});
          // wx.miniProgram.navigateBack();
          wx.miniProgram.switchTab({url: "/pages/index/index"})
        }}> {"< 返回首页"}</div>
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