import React, { useState, useEffect } from 'react';
import eastImg from "../images/bulldozerEast.png";
import westImg from "../images/bulldozerWest.png";
import southImg from "../images/bulldozerSouth.png";
import northImg from "../images/bulldozerNorth.png";
import { EBulldozerDirection, IBulldozerProps } from "../interfaces";
import { connect } from 'react-redux';

const mapStateToProps = (state:  any/*TODO */) => {
  return {
    bulldozerDirection: state.bulldozerDirection
  };
};


const ConnectedBulldozer = ({bulldozerDirection}: IBulldozerProps) => {

  const [ currentImage, setCurrentImage] = useState<string>();

  const determineBulldozerOrientation = () => {
    switch(bulldozerDirection){
      case EBulldozerDirection.east:
        setCurrentImage(eastImg);
        break;
      case EBulldozerDirection.west:
        setCurrentImage(westImg);
        break;
      case EBulldozerDirection.south:
        setCurrentImage(southImg);
        break;
      case EBulldozerDirection.north:
        setCurrentImage(northImg);
        break;
    }
  }

  useEffect(() => {
    determineBulldozerOrientation();
  }, [bulldozerDirection])

  return(
    <img className="bulldozer-img" src={currentImage}></img>
  );
}

const Bulldozer = connect(mapStateToProps)(ConnectedBulldozer)

export default Bulldozer;