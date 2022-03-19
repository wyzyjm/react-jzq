import React, { Component } from "react"
import StyleSquare from "./index.module.css" // 样式

export default class Square extends Component {
    render() {
        const { value, eidt } = this.props // 值 和 修改状态
        return (
            <button className={StyleSquare.square} onClick={eidt}>
                {value}
            </button>
        )
    }
}
