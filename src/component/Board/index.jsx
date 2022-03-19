import React, { Component } from "react"
import StyleBoard from "./index.module.css"
import Square from "../Square"
export default class Board extends Component {
    state = {
        rowList: [
            {
                id: 10,
                colums: [0, 1, 2]
            },
            {
                id: 20,
                colums: [3, 4, 5]
            },
            {
                id: 30,
                colums: [6, 7, 8]
            }
        ]
    }
    render() {
        const { rowList } = this.state
        const { squares, onClick } = this.props
        return (
            <div>
                {rowList.map(v => (
                    <div className={StyleBoard.boardRow} key={v.id}>
                        {v.colums.map(item => (
                            <Square key={item} value={squares[item]} eidt={() => onClick(item)} />
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}
