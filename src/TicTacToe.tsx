import React, { Component } from 'react';
import './TicTacToe.css';
import {Tile} from "./Tile";

type TicTacToeProps = {
}
type TicTacToeState = {
    board: number[][];
    boardWin: boolean[][];
    outputText: string;
    currentPlayer: number;
    gameOver: boolean;

}

export default class TicTacToe extends Component<TicTacToeProps, TicTacToeState> {
    constructor(props: TicTacToeProps){
        super(props);
        this.state = {
            board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            boardWin: [[false, false, false], [false, false, false], [false, false, false]],
            outputText: "Welcome to Tic Tac Toe ",
            currentPlayer: 1,
            gameOver: false
        };
    }
    tryMove = (row: number, col:number) => {
        if(this.state.board[row][col]===0){
            let boardClone = this.state.board.slice();
            boardClone[row][col] = this.state.currentPlayer;
            this.setState({
                board: boardClone,
                currentPlayer: -1*this.state.currentPlayer});
            if(this.checkForWin(row,col)){
                console.log(this.state.boardWin);
                console.log('Game Over');
            }
        }
    };
    checkForWin = (row: number, col:number) => {
        return this.checkCol(row, col) || this.checkRow(row, col) || this.checkDiag();
    };
    checkCol = (row: number, col:number) => {
        if((this.state.board[0][col] === this.state.board[1][col])
            &&(this.state.board[1][col] === this.state.board[2][col])){
            let boardWinClone = this.state.boardWin.slice();
            boardWinClone[0][col] = true;
            boardWinClone[1][col] = true;
            boardWinClone[2][col] = true;
            this.setState({boardWin: boardWinClone});
            return true;
        }
        return false;
    };
    checkRow = (row: number, col:number) => {
        if((this.state.board[row][0] === this.state.board[row][1])
            &&(this.state.board[row][1]===this.state.board[row][2])){
            let boardWinClone = this.state.boardWin.slice();
            boardWinClone[row][0] = true;
            boardWinClone[row][1] = true;
            boardWinClone[row][2] = true;
            this.setState({boardWin: boardWinClone});
            return true;
        }
        return false;
    };
    checkDiag = () => {
        if(this.state.board[1][1]!==0){
            if((this.state.board[0][0] === this.state.board[1][1])
                && (this.state.board[1][1]===this.state.board[2][2])){
                console.log(1);
                let boardWinClone = this.state.boardWin.slice();
                boardWinClone[0][0] = true;
                boardWinClone[1][1] = true;
                boardWinClone[2][2] = true;
                this.setState({boardWin: boardWinClone});
                return true;
            }
            else if((this.state.board[0][2] === this.state.board[1][1])
                && (this.state.board[1][1]===this.state.board[2][0])){
                console.log(2);
                let boardWinClone = this.state.boardWin.slice();
                boardWinClone[0][2] = true;
                boardWinClone[1][1] = true;
                boardWinClone[2][0] = true;
                this.setState({boardWin: boardWinClone});
                return true;
            }
        }
        return false;
    };
    getChar = (row: number, col:number) => {
        switch(this.state.board[row][col]){
            case 1:
                return "X";
            case -1:
                return "O";
            default:
                return "";
        }
    };
    renderGameBoard = () => {
        return (
            <div className="tileGrid">
                {Array.from(Array(9).keys()).map((key) =>
                    <div key = {key} id = {""+key} className="tileContainer" onClick={()=>
                        this.tryMove(Math.floor(key/3),key%3)}>
                        <Tile key ={key+"_tile"} label={this.getChar(Math.floor(key/3),key%3)}
                                                    highlight={this.state.boardWin[Math.floor(key/3)][key%3]} />
                    </div>)}
            </div>
        )
    };
    render () {
        return(
            <div className = "game">
                {this.renderGameBoard()}
            </div>
        )
    };
}
