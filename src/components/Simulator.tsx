import React, {useState, useEffect} from 'react';
import SiteMap from "./SiteMap";
import UserControls from "./UserControls";
import { IBulldozerPosition, EBulldozerDirection, IUserCommand, EUserCommand } from "../interfaces";
import { _UpdateBulldozerDirection } from "../helper";
import store from '../store';
import { connect } from 'react-redux';
import { UpdateBulldozerDirection, UpdateSimulationInProgress } from "../actions/index";

const mapDispatchToProps = (dispatch: any) => {
  return {
    UpdateBulldozerDirection: (direction: EBulldozerDirection) => dispatch(UpdateBulldozerDirection(direction)),
    UpdateIsSimulationInProgress: (inProgress: boolean) => dispatch(UpdateSimulationInProgress(inProgress))
  };
}

const ConnectedSimulator = () => {

  const bulldozerPosition: IBulldozerPosition = store.getState().bulldozerPosition;
  const bulldozerDirection: EBulldozerDirection = store.getState().bulldozerDirection;
  //const [siteMap, setSiteMap] = useState<string[][]>(dummyMap);


  store.subscribe(() => {
    console.log("inProgress? ", store.getState().isSimulationInProgress);
  });

  /**
   * Used by child components to update the simulator state 
   * @param cmd - User command as IUSerCommand Object
   */
  const HandleUserCommand = (cmd: IUserCommand): void => {
    switch(cmd.command){
      case EUserCommand.advance:
        //TODO call moveBulldozer instead of update position
        //const newPosition = UpdateBulldozerPosition(cmd.value, bulldozerPosition, bulldozerDirection);
        //setBulldozerPosition(newPosition);
        //moveBulldozer(cmd.value);

        break;
      case EUserCommand.quit:
        store.dispatch(UpdateSimulationInProgress(false));
        break;
      case EUserCommand.left || EUserCommand.right:
        try {
          //TODO
          // const newDirection: EBulldozerDirection = _UpdateBulldozerDirection(cmd.command, bulldozerDirection);
          // store.dispatch(UpdateBulldozerDirection(newDirection));
          // break;
        } catch (error) {
          //TODO
          console.log(error);
        }
    }
  }

  useEffect(() => {
    //TODO
  });

  return(
    <div>
      <SiteMap/>
      <UserControls HandleUserCommandCallback={HandleUserCommand}/>
    </div>
    
  )
}

const Simulator = connect(null, mapDispatchToProps)(ConnectedSimulator);

export default Simulator;