import React, {useState, useEffect} from 'react';
import SiteMap from "./SiteMap";
import UserControls from "./UserControls";
import { IBulldozerPosition, EBulldozerDirection, IUserCommand, EUserCommand } from "../interfaces";
import { UpdateBulldozerPosition, UpdateBulldozerDirection } from "../helper";
import store from '../store';

const Simulator = () => {

  const [bulldozerPosition, setBulldozerPosition] = useState<IBulldozerPosition>({xPos: 0, yPos: 0});
  const [bulldozerDirection, setBulldozerDirection] = useState(EBulldozerDirection.east);
  const [commandsUsed, setCommandsUsed] = useState<IUserCommand[]>([]);
  //const [siteMap, setSiteMap] = useState<string[][]>(dummyMap);
  const [isSimulationInProgress, setIsSimulationInProgress] = useState(true);

  /**
   * Used by child components to update the simulator state 
   * @param cmd - User command as IUSerCommand Object
   */
  const HandleUserCommand = (cmd: IUserCommand): void => {
    setCommandsUsed(commandsUsed => commandsUsed.concat(cmd));

    switch(cmd.command){
      case EUserCommand.advance:
        //TODO call moveBulldozer instead of update position
        const newPosition = UpdateBulldozerPosition(cmd.value, bulldozerPosition, bulldozerDirection);
        setBulldozerPosition(newPosition);
        break;
      case EUserCommand.quit:
        setIsSimulationInProgress(false);
        break;
      case EUserCommand.left | EUserCommand.right:
        try {
          const newDirection: EBulldozerDirection = UpdateBulldozerDirection(cmd.command, bulldozerDirection);
          setBulldozerDirection(newDirection);
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
      <UserControls/>
    </div>
    
  )
}

export default Simulator;