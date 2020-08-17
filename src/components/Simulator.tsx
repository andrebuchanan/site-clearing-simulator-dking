import React, {useState, useEffect} from 'react';
import SiteMap from "./SiteMap";
import UserControls from "./UserControls";
import { EBulldozerDirection, IUserCommand, EUserCommand, ISimulatorProps } from "../interfaces";
import { _updateBulldozerDirection, moveBulldozer } from "../BulldozerHelper";
import store from '../redux/store/store';
import { connect } from 'react-redux';
import { UpdateBulldozerDirection, UpdateSimulationInProgress } from "../redux/actions/actions";
import CostSummary from './CostSummary';

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
        moveBulldozer(cmd.value);
        break;
      case EUserCommand.quit:
        store.dispatch(UpdateSimulationInProgress(false));
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

  return(
    <div>
      {isSimulationInProgress ? 
      <>
        <SiteMap/>
        <UserControls HandleUserCommandCallback={HandleUserCommand}/>
      </> :
      <>
        <div>SIMULATION OVER</div>
        <CostSummary/>
      </>}
    </div>
    
  )
}

const Simulator = connect(mapStateToProps, mapDispatchToProps)(ConnectedSimulator);

export default Simulator;