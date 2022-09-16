import './index.css';
import React from 'react';
import ImageCell from "./ImageCell";
import { Image, Carousel } from 'antd';

const SliceInner = ({index, title, context}) => {
    return <div className="innerContentWrapper">
    <div className="contentIndex">
      {index}
    </div>
    <div className="contentTitle">
      {title}
    </div>
    <div className="contentText" >
      {context}
      
    </div>
    <div className="contentLink">
      See More →
    </div>
  </div>
}



const ImageSlice = () => {


  return (
    <div className="sectionWrapper">
        <div className="sectionTitle">
          Video Editing
        </div>
        <div className="sectionMainTitle">
          Empower video creators
        </div>
        <div className="sectionDesc">
        Provide video shooting, audio and video mixing, sticker effects, beautification filters and teleprompters, while supporting mobile, PC short video shooting, online conferences, webinars and other wide range of scenes, so that you stand out in video creation.
        </div>
        <div className="imgContainer">
          <ImageCell isReversed={false} cardTitle={"01"} cardText={"Cut & Editing"} imageUrl={require("../../images/vedio1.png")} coverContent={
            <SliceInner
            index={"01"}
            title={"Cut & Editing"}
            context={"Provide tens of thousands of explosive special effect stickers which are realistic, innovative and interesting"}
            
            />
          }/>
          <ImageCell isReversed={true} cardTitle={"02"} cardText={"Filters & Stickers"}  imageUrl={require("../../images/vedio2.png")}  coverContent={
            <SliceInner
            index={"02"}
            title={"Filters & Stickers"}
            context={"No need of reciting long scripts, just focus on your phone and read them out in a natural recording way."}
            />
          }/>
          <ImageCell isReversed={false} cardTitle={"03"} cardText={"Telepromoter"} coverContent={
            <SliceInner
            index={"03"}
            title={"Telepromoter"}
            context={"Video/audio mixing during a recording or offline​"}
            />
            }
            imageUrl={require("../../images/vedio3.png")}  
          />
          <ImageCell isReversed={true} cardTitle={"04"} cardText={"Teams webinar"} imageUrl={require("../../images/vedio4.png")} coverContent={
            <SliceInner
            index={"04"}
            title={"Teams Webinar"}
            context={"Record a webinar with filters, stickers and animations with teams, you are professional and innovative! "}
            
            />
          }/>
        </div>
        <div className="bigImageContainer">
          <div className="bigImageTitle">Microsoft Custom Filters Empower Webinar Creators to Apply Filters and Frames via TEAMS Meeting </div>
              <div>
                <video width="900" height="507" controls  src="https://teamseffectfinaltest3.z22.web.core.windows.net/imagesticker/teams_demo_video.mp4" poster={require("../../images/VideoCore.png")}>
                </video>
              </div>
        </div>
        {/* <div className="bigImageContainer">
              <div className="bigImageTitle">Video Core Capability Exploring Landed in TEAMS and in process of Ignite and GA (mid Oct)</div>
              <div>
                <video width="900" height="507" controls src="https://teamseffectfinaltest3.z22.web.core.windows.net/imagesticker/frames/dynamic_frame.mp4" >
                </video>
              </div>
        </div> */}

        <div className="bigImageContainer">
          <div className="bigImageTitle">More Frames to be Released Post GA</div>
            <Carousel dotPosition = {"top"} className="CarouselContainer" autoplay>
              <Image
                preview={false}
                width={"100%"}
                height={"100%"}
                src={require("../../images/slide1.png")}
              />
              <Image
                preview={false}
                width={"100%"}
                height={"100%"}
                src={require("../../images/slide2.png")}
              />
              <Image
                preview={false}
                width={"100%"}
                height={"100%"}
                src={require("../../images/slide3.png")}
              />
              <Image
                preview={false}
                width={"100%"}
                height={"100%"}
                src={require("../../images/slide4.png")}
              />

              <Image
                preview={false}
                width={"100%"}
                height={"100%"}
                src={require("../../images/slide5.png")}
              />
              <Image
                preview={false}
                width={"100%"}
                height={"100%"}
                src={require("../../images/slide6.png")}
              />
            </Carousel>
        </div>
    </div>

  );
}


export default ImageSlice;