import React from 'react';
import { ISquareProps } from '../interfaces';

/*This is a component representing a single square on the map the simulation is taking place on
* Can be of 4 types
* Plain - o
* Rocky - r
* Removable Tree - t
* Preserved Tree - T
*/

const style = {
  background: 'lightblue',
  border: '2px solid darkblue',
  fontSize: '30px',
  margin: '0, auto',
  outline: 'none'
};

const MapSquare = ({landType}: ISquareProps) => {

  return(
    <div style={style}>{landType}</div>
  );
}

export default MapSquare;