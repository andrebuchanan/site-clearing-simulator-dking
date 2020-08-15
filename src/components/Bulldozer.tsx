import React from 'react';
import { connect } from 'react-redux';
import { IBulldozerProps, EBulldozerDirection } from "../interfaces";
import store from '../store';
import  { UpdateSimulationInProgress } from "../actions";

const mapStateToProps = (state:  any/*TODO */) => {
  return { 
    bulldozerPosition: state.bulldozerPosition,
    bulldozerDirection: state.bulldozerDirection
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    UpdateSimulationInProgress: (inProgress: boolean)=> dispatch(UpdateSimulationInProgress(inProgress))
  };
}

const ConnectedBulldozer = ({ bulldozerPosition, bulldozerDirection}: IBulldozerProps) => {

  //TODO Is this best practice OR pass as props???
  const northBorder: number = store.getState().northBorder;
  const eastBorder: number = store.getState().eastBorder;
  const southBorder: number = store.getState().southBorder;
  const westBorder: number = store.getState().westBorder;

  const moveBulldozer = (spacesToMove: number) => {
  
      //TODO need to update current position on each iteration
      for(let i = 0; i < spacesToMove; i++) {
        // if (/*target position contains protected tree */) {
        //   //TODO End Simulation
        // }
    
        //Bulldozer is at the edge of the map, check if user tries to navigate outside the boundary
        if (bulldozerPosition.xPos === 0 || bulldozerPosition.yPos === 0 
          || bulldozerPosition.xPos === eastBorder || bulldozerPosition.yPos === southBorder) {
          if(checkIfUserNavigatesOutsideBorder()){
            //change the boolean flag in the redux store
            store.dispatch(UpdateSimulationInProgress(false));
          }
        }
    
        //TODO
        //Update the landtype of the current position to o (cleared)
      }
  
  }
  
  /**
   * 
   * @param bulldozerPosition 
   * @param bulldozerDirection 
   */
  const checkIfUserNavigatesOutsideBorder = (): boolean => {
    switch(bulldozerDirection) {
      case EBulldozerDirection.north:
        if(bulldozerPosition.yPos === northBorder){
          return true;
        }
        break;
      case EBulldozerDirection.south:
        if(bulldozerPosition.yPos === southBorder){
          return true;
        }
        break;
      case EBulldozerDirection.east:
        if(bulldozerPosition.xPos === eastBorder){
          return true;
        }
        break;
      case EBulldozerDirection.west:
        if(bulldozerPosition.xPos === westBorder){
          return true;
        }
        break;
    }
    return false;
  }

  return(
    <div>BULL</div>
  );
}

const Bulldozer = connect(mapStateToProps, mapDispatchToProps)(ConnectedBulldozer)

export default Bulldozer;