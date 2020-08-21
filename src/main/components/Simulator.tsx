import React, { useEffect } from 'react';
import SiteMap from "./SiteMap";
import UserControls from "./UserControls";
import { EBulldozerDirection, IUserCommand, EUserCommand, ISimulatorProps, ESimulationStatus, IBulldozerPosition, ELandType, IMapBorders } from "../interfaces";
import { _updateBulldozerDirection, getTargetPosition, targetOutsideBorder, targetContainsProtectedTree, targetContainsUnclearedTree } from "../helpers/BulldozerHelper";
import store from '../redux/store/store';
import { connect } from 'react-redux';
import { UpdateBulldozerDirection, UpdateSimulationStatus, UpdateBulldozerPosition, UpdateLandType, UpdateFuelUsed, UpdatePaintDamage } from "../redux/actions/actions";
import CostSummary from './CostSummary';
import FileUploader from './FileUploader';
import { calculateFuelUsed } from '../helpers/OverheadsCalculator';
import { MDBContainer} from 'mdbreact';

const mapStateToProps = (state: ISimulatorProps) => {
  return { 
    bulldozerPosition: state.bulldozerPosition,
    bulldozerDirection: state.bulldozerDirection,
    simulationStatus: state.simulationStatus
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    UpdateBulldozerDirection: (direction: EBulldozerDirection) => dispatch(UpdateBulldozerDirection(direction)),
    UpdateSimulationInStatus: (simulationStatus: ESimulationStatus) => dispatch(UpdateSimulationStatus(simulationStatus))
  };
}

const ConnectedSimulator = ( { bulldozerPosition, bulldozerDirection, simulationStatus }: ISimulatorProps) => {

  /**
   * Used by child components to fire once user command added to state
   * @param cmd - User command as IUserCommand Object
   */
  const HandleUserCommand = (cmd: IUserCommand): void => {
    let newDirection: EBulldozerDirection;

    switch(cmd.command){
      case EUserCommand.advance:
        moveBulldozer(cmd.value);
        break;
      case EUserCommand.quit:
        store.dispatch(UpdateSimulationStatus(ESimulationStatus.ended));
        break;
      case EUserCommand.left:
      case EUserCommand.right:
        try {
          newDirection = _updateBulldozerDirection(cmd.command, bulldozerDirection);
          store.dispatch(UpdateBulldozerDirection(newDirection));
          break;
        } catch (error) {
          throw Error(`Error trying to update bulldozer direction`);
        }
    }
  }

  /**
 * Moves the x, y coordinates of the bulldozer by updating the Redux Store.
 * Will Also update the simulationStatus boolean in the Redux store if the
 * user tries to make an illegal move
 * @param advanceValue - The number of squares to move forward
 */
  const moveBulldozer = (advanceValue: number): void => {

    let currentPosition: IBulldozerPosition;
    let bulldozerDirection: EBulldozerDirection;
    let siteMap: string[][];
    const mapBorders: IMapBorders = {
      eastBorder: store.getState().eastBorder,
      southBorder: store.getState().southBorder
    }

    //Need to loop for the number of Advance Value the user has entere
    for(let i = 0; i< advanceValue; i++) {

      currentPosition = store.getState().bulldozerPosition;
      bulldozerDirection = store.getState().bulldozerDirection;
      siteMap = store.getState().siteMap;

      let targetPosition: IBulldozerPosition = getTargetPosition(currentPosition, bulldozerDirection);
      //If Bulldozer is at the edge of the map, check if user tries to navigate outside the boundary
      if (targetOutsideBorder(targetPosition, mapBorders)){
        store.dispatch(UpdateSimulationStatus(ESimulationStatus.ended));
        return;
      }
      
      let targetPositionLandType: string = siteMap[targetPosition.yPos][targetPosition.xPos];
      //check if target position contains protected tree
      if (targetContainsProtectedTree(targetPositionLandType)) {
        store.dispatch(UpdateSimulationStatus(ESimulationStatus.ended));
        return;
      } 
      //If target position contains an uncleared tree then calculate paint damage
      else {
        if (targetContainsUnclearedTree(targetPositionLandType)) {
          //Only 2 edge cases for paint damage
          //1. The advance value > 1 and there is an uncleared tree in the target position
          //2. It is not the last move of the advance and there is an uncleared tree in the target position
          if (advanceValue > 1 && i !== advanceValue-1) {
            store.dispatch(UpdatePaintDamage(1));
          }
        }
        //update landType to cleared
        changeLandTypeOfPosition(currentPosition);
        store.dispatch(UpdateBulldozerPosition(targetPosition));
        //calculate cost of moving into new square
        let fuelUsed: number = calculateFuelUsed(targetPositionLandType as ELandType);
        store.dispatch(UpdateFuelUsed(fuelUsed));
      }
    }
  }

  /**
   * 
   * @param position The position on the grid to chnage
   */
  const changeLandTypeOfPosition = (position: IBulldozerPosition): void => {
    //Check the position to change is not the starting position (outside grid)
    if(position.xPos !== -1) {
      store.dispatch(UpdateLandType(position));
    }
  }

  if (simulationStatus === ESimulationStatus.notStarted) {
    return (<FileUploader/>)
  } else if (simulationStatus === ESimulationStatus.inProgress) {
    return(
      <MDBContainer className="inProgressContainer">
        <SiteMap/>
        <UserControls HandleUserCommandCallback={HandleUserCommand}/>
      </MDBContainer>
    )
  } else {
    //(simulationStatus === ESimulationStatus.ended)
    return(
      <CostSummary/>
    )
  }
}

const Simulator = connect(mapStateToProps, mapDispatchToProps)(ConnectedSimulator);

export default Simulator;