import React, { useState, useEffect } from 'react';
import eastImg from "../resources/images/bulldozerEast.png";
import westImg from "../resources/images/bulldozerWest.png";
import southImg from "../resources/images/bulldozerSouth.png";
import northImg from "../resources/images/bulldozerNorth.png";
import { EBulldozerDirection, IBulldozerProps } from "../interfaces";
import { connect } from 'react-redux';

const mapStateToProps = (state:  any) => {
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
    <div>
      <img className="bulldozer-img" src={currentImage}></img>
    </div>
    
  );
}

const Bulldozer = connect(mapStateToProps)(ConnectedBulldozer)

export default Bulldozer;