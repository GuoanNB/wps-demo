import React from "react";
import TabBar from "../TabBar";
import { newsLetterList, discordList } from "../../utils";
import "./index.css"
const renderContent = (tabIndex) => {
    const list = tabIndex === 0 ? newsLetterList : discordList
    return (
        <div className="audience-content">
            {list.map((item,index) => {
                return (
                    <div key={item.title} className={`audience-item${index %2 === 1 ? " row-reverse" : ""}`}>
                        <div style={{paddingTop: item.img[item.img.length - 1] > 3 ? "25px" : 0}}>
                            <div className="audience-title">{item.title}</div>
                            <div className="audience-subtitle">{item.subTitle}</div>
                            {item.description.map(val => {
                                return <div key={val} className="audience-description">
                                    <img src={require("../../images/polygon.png")} alt="" />
                                    <span>{val}</span>
                                </div>
                            })}
                        </div>
                        <img className="audience-img" src={require(`../../images/${item.img}.png`)} alt="" />
                    </div>
                )
            })}
        </div>
    )
}
const renderFooter = () => {
    return (
        <div className="audience-footer">
            <div className="audience-footer-title">Want to engage with your exclusive audience? Join now</div>
            <div className="audience-btn">Join now</div>
            <div className="more">More information</div>
        </div>
    )
}
const Audience = () => {
    const [tabIndex, setTabIndex] = React.useState(0)
    return (
        <>
            <div className="audience-header">
                <div className="audience-header-title">Full control of your content and audience</div>
                <div className="audience-header-subtitle">Let your most passionate fans support your creative work via subscription.</div>
            </div>
            <div className="audience-container">
                <TabBar type={1} tabIndex={tabIndex} onChange={index => setTabIndex(index)} />
                {renderContent(tabIndex)}
                {renderFooter()}
            </div>
            <div className="bottom-bar">© 2022 MICROSOFT. ALL RIGHTS RESERVED.</div>
        </>
    )
}

export default Audience