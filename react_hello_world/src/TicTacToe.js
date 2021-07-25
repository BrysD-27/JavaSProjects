import React from 'react';
import './TicTacToe.css';

const board = [
  'x', null, 'o', 
  'o', 'x', null,
  'x', 'o', null
];

const TicTacToe = () => {
  return <div className="tic-tac-toe">
    <h1>Tic-Tac-Toe</h1>
    <div className="board">
    {
        board.map((item, index) => {
            return <div className="cell" key={ index }><span>{ item }</span></div>
        })
    }
    </div>
  </div>
}

export default TicTacToe;