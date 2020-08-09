import React from 'react';

/*This is a component representing a single square on the map the simulation is taking place on
* Can be of 4 types
* Plain - o
* Rocky - r
* Removable Tree - t
* Preserved Tree - T
*/

interface ISquareProps {
  landType: string
}

const style = {
  background: 'lightblue',
  border: '2px solid darkblue',
  fontSize: '30px',
  outline: 'none'
};

const MapSquare = ({landType}: ISquareProps) => {

  return(
    <div style={style}>{landType}</div>
  );
}

export default MapSquare;