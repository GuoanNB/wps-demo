import "./index.css"
import { customizeSVG, msnSVG } from "../../Icons/svg";

const TabBar = ({type = 0, tabIndex, onChange }) => {
    return (
        <div className="tab">
            <div className={`tab-button${tabIndex === 0 ? " active" : ""}`} onClick={() => onChange(0)}>
                {type === 0 ? customizeSVG() : <img src={require("../../images/newsletter.png")} alt="" />}
                <span>{ type === 0 ? 'Customized content' : 'Newsletter'}</span>
            </div>
            <div className={`tab-button${tabIndex === 1 ? " active" : ""}`} onClick={() => onChange(1)}>
                {type === 0 ? msnSVG() : <img src={require("../../images/discord.png")} alt="" />}
                <span>{ type === 0 ? 'MSN content' : 'Discord'}</span>
            </div>
        </div>
    )
}

export default TabBar