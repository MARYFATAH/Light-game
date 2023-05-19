import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';
import "./Cell.css"


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 6,
    ncols: 6,
    chanceLightStartsOn: 0.25
  
  }

  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      hasWon: false, board: this.createBoard()
    };

   
    this.createBoard = this.createBoard.bind(this);
    
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < this.props.nrows; ++i){
      let row = [];
      for (let j = 0; j < this.props.ncols; ++j){
       row.push( Math.random()< this.props.chanceLightStartsOn)

      }
      board.push(row);
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log("flipping", coord)
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won
    
    
    flipCell(y, x); // Flip clicked cell
    flipCell(y, x - 1); // Flip left cell
    flipCell(y, x + 1); // Flip right cell
    flipCell(y - 1, x); // Flip cell above
    flipCell(y + 1, x); // Flip cell below
    const hasWon = board.every(row => row.every(cell => !cell));
    this.setState({board, hasWon});
  }


  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else
    if (this.state.hasWon)
      return <h1>You Won!!</h1>;
    // TODO
    
    let tblBoard = [];
    for (let i = 0; i < this.props.nrows; i++){
      let row = [];
      for (let j = 0; j < this.props.ncols; j++){
        let coord = `${i}-${j}`;
        row.push(<Cell key={coord}  isLit={this.state.board[i][j]} flipCellsAroundMe={()=>this.flipCellsAround(coord)} />);
      }
       tblBoard.push(<tr key={i}>{row}</tr>);
    }
   
      
    
  
    return (
      <table className="Board">
        <tbody>
          {tblBoard}
        </tbody>
      </table>
    );
   


    // make table board

    // TODO
  }
}


export default Board;
