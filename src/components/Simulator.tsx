import React, { useEffect } from 'react';
import SiteMap from "./SiteMap";
import UserControls from "./UserControls";
import { EBulldozerDirection, IUserCommand, EUserCommand, ISimulatorProps, ESimulationStatus } from "../interfaces";
import { _updateBulldozerDirection, moveBulldozer } from "../helpers/BulldozerHelper";
import store from '../redux/store/store';
import { connect } from 'react-redux';
import { UpdateBulldozerDirection, UpdateSimulationStatus } from "../redux/actions/actions";
import CostSummary from './CostSummary';
import FileUploader from './FileUploader';

const mapStateToProps = (state:  any/*TODO */) => {
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

  if (simulationStatus === ESimulationStatus.notStarted) {
    return (<FileUploader/>)
  } else if (simulationStatus === ESimulationStatus.inProgress) {
    return(
      <div className="">
        <SiteMap/>
        <UserControls HandleUserCommandCallback={HandleUserCommand}/>
      </div>
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