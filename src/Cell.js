import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.flipCellsAroundMe();
  }

  render() {
    const classes = `Cell ${this.props.isLit ? 'Cell-lit' : 'Cell-off'}`;

    return <td className={classes} onClick={this.handleClick}></td>;
  }
}

export default Cell;
