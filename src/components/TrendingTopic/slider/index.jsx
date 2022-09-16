import React from "react"
import classnames from "classnames"
import {LeftOutlined, RightOutlined} from "@ant-design/icons"
import ResizeObserver from 'resize-observer-polyfill';
import debounce from 'lodash/debounce';
import './index.css'

export default class Slider extends React.Component {

    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.scrollerRef = React.createRef();
        this.containerRef = React.createRef();
        this.offset = 0;
        this.debouncedResize = null;
        this.resizeObserver = null;
        this.state = {
            showBtnPrevNext: false,
            btnNextDisabled: false,
            btnPrevDisabled: false,
        };
    }

    componentDidMount() {
        this.debouncedResize = debounce(() => {
            this.updateScrollerPosition(this.offset);
        }, 200);
        this.resizeObserver = new ResizeObserver(this.debouncedResize);
        this.resizeObserver.observe(this.wrapperRef.current);
    }

    componentWillUnmount() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        if (this.debouncedResize && this.debouncedResize.cancel) {
            this.debouncedResize.cancel();
        }
    }

    needShowPrevOrNext() {
        return !(this.wrapperRef.current.offsetWidth > this.scrollerRef.current.offsetWidth);
    }

    updateScrollerPosition(offset) {
        const maxScrollerXOffset = 0;
        const minScrollerXOffset = this.wrapperRef.current.offsetWidth - this.scrollerRef.current.offsetWidth;

        let target = -1;
        if (!this.needShowPrevOrNext()) {
            target = 0;
        } else {
            target = Math.max(Math.min(maxScrollerXOffset, offset), minScrollerXOffset);
        }

        this.offset = target;
        const scrollerStyle = this.scrollerRef.current.style;
        const transformSupported = `translate3d(${scrollerStyle})`;
        if (transformSupported) {
            scrollerStyle.transform = `translate3d(${target}px,0,0)`;
        } else {
            scrollerStyle.left = `${target}px`;
        }

        if (this.needShowPrevOrNext()) {
            this.setState({
                showBtnPrevNext: true,
                btnPrevDisabled: this.offset == 0,
                btnNextDisabled: !(this.offset > minScrollerXOffset)
            });
        } else {
            this.setState({
                showBtnPrevNext: false,
                btnPrevDisabled: true,
                btnNextDisabled: true,
            });
        }
    }

    handleClick = (index) => {
        const {onClick} = this.props;
        if (onClick) {
            onClick(index);
        }
    };

    handlePrev = () => {
        const containerNode = this.wrapperRef.current;
        const {offset} = this;
        this.updateScrollerPosition(offset + containerNode.offsetWidth);
    };

    handleNext = () => {
        const containerNode = this.wrapperRef.current;
        const {offset} = this;
        this.updateScrollerPosition(offset - containerNode.offsetWidth);
    };

    render() {

        const {
            className,
            style,
            selectedIndex,
            children
        } = this.props;

        const {
            showBtnPrevNext,
            btnNextDisabled,
            btnPrevDisabled
        } = this.state;

        return (
            <div className={classnames("mousex-slider", className)} style={style}>
                {/* <span
                    className={classnames("mousex-slider-btn-prev", {
                        "mousex-slider-btn-show": showBtnPrevNext,
                        "mousex-slider-btn-disabled": btnPrevDisabled
                    })}
                    onClick={this.handlePrev}>
                    <LeftOutlined className={"mousex-slider-btn-prev-icon"}/>
                </span> */}
                <div className={"mousex-slider-items-wrapper"} ref={this.wrapperRef}>
                    <div className={classnames("mousex-slider-items-scroller", "animated")} ref={this.scrollerRef}>
                        <div className={"mousex-slider-items-container"} ref={this.containerRef}>
                            {
                                React.Children.map(children, (child, index) => {
                                    if(!child){
                                        return null;
                                    }
                                    return (
                                        <div onClick={() => this.handleClick(index)}
                                             className={index === selectedIndex ? "mousex-slider-item selected" : "mousex-slider-item"}>
                                            {child}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {/* <span
                    className={classnames("mousex-slider-btn-next", {
                        "mousex-slider-btn-show": showBtnPrevNext,
                        "mousex-slider-btn-disabled": btnNextDisabled
                    })}
                    onClick={this.handleNext}>
                    <RightOutlined className={"mousex-slider-btn-next-icon"}/>
                </span> */}
            </div>
        );
    };
}