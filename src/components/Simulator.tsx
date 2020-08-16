import React, {useState, useEffect} from 'react';
import SiteMap from "./SiteMap";
import UserControls from "./UserControls";
import { IBulldozerPosition, EBulldozerDirection, IUserCommand, EUserCommand, ISimulatorProps } from "../interfaces";
import { _UpdateBulldozerDirection, moveBulldozer } from "../helper";
import store from '../store';
import { connect } from 'react-redux';
import { UpdateBulldozerDirection, UpdateSimulationInProgress } from "../actions/index";
import { stat } from 'fs';

const mapStateToProps = (state:  any/*TODO */) => {
  return { 
    bulldozerPosition: state.bulldozerPosition,
    bulldozerDirection: state.bulldozerDirection,
    isSimulationInProgress: state.isSimulationInProgress
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    UpdateBulldozerDirection: (direction: EBulldozerDirection) => dispatch(UpdateBulldozerDirection(direction)),
    UpdateIsSimulationInProgress: (inProgress: boolean) => dispatch(UpdateSimulationInProgress(inProgress))
  };
}

const ConnectedSimulator = ( { bulldozerDirection, isSimulationInProgress }: ISimulatorProps) => {

  /**
   * Used by child components to fire once user command added to state
   * @param cmd - User command as IUserCommand Object
   */
  const HandleUserCommand = (cmd: IUserCommand): void => {
    let newDirection: EBulldozerDirection;

    switch(cmd.command){
      case EUserCommand.advance:
        //moveBulldozer forward based on the user command value
        for(let i = 0; i < cmd.value; i++){
          moveBulldozer();
        }
        break;
      case EUserCommand.quit:
        store.dispatch(UpdateSimulationInProgress(false));
        break;
      case EUserCommand.left:
      case EUserCommand.right:
        try {
          newDirection = _UpdateBulldozerDirection(cmd.command, bulldozerDirection);
          store.dispatch(UpdateBulldozerDirection(newDirection));
          break;
        } catch (error) {
          //TODO
          console.log(error);
          break;
        }
    }
  }

  useEffect(() => {
    //TODO
  });

  return(
    <div>
      {isSimulationInProgress ? 
      <>
        <SiteMap/>
        <UserControls HandleUserCommandCallback={HandleUserCommand}/>
      </> : 
      <>
        <div>SIMULATION OVER</div>
      </>}
    </div>
    
  )
}

const Simulator = connect(mapStateToProps, mapDispatchToProps)(ConnectedSimulator);

export default Simulator;