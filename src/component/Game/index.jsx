import React, { Component } from "react"
import Board from "../Board"
import StyleGame from "./index.module.css"
export default class Game extends Component {
    state = {
        xIsNext: true, // 轮流落子
        stepNumber: 0, // 步数
        // 记录
        history: [
            {
                squares: Array(9).fill(null)
            }
        ]
    }
    // 判断谁获胜
    calculateWinner = squares => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]
            }
        }
        return null
    }

    // 点击
    handleClick = i => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length - 1]
        const squares = current.squares.slice()
        if (this.calculateWinner(squares) || squares[i]) return alert(this.calculateWinner(squares))
        squares[i] = this.state.xIsNext ? "X" : "O"
        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }

    // 跳转
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0
        })
    }

    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = this.calculateWinner(current.squares)

        // 步骤
        const moves = history.map((step, move) => {
            const desc = move ? "Go to move #" + move : "Go to game start"
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status
        if (winner) {
            status = "Winner: " + winner
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O")
        }

        return (
            <div className={StyleGame.game}>
                <div className={StyleGame["game-info"]}>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <div>
                    <Board squares={current.squares} onClick={i => this.handleClick(i)} />
                </div>
            </div>
        )
    }
}
