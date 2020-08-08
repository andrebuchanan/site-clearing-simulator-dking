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

const MapSquare = ({landType}: ISquareProps) => {

  return(
    <h2>{landType}</h2>
  );
}

export default MapSquare;