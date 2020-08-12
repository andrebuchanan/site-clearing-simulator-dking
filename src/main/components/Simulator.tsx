import React, {useState, useEffect} from 'react';
import SiteMap from "./SiteMap";
import UserControls from "./UserControls";
import { IBulldozerPosition, EBulldozerDirection, IUserCommand, EUserCommand } from "../interfaces";
import { UpdateBulldozerPosition, UpdateBulldozerDirection } from "../helper";

const dummyMap: string[][] = [["o","o","t"],["T","o","T"],["T","t", "t"], ["o","o","o"]];

const Simulator = () => {

  const [bulldozerPosition, setBulldozerPosition] = useState<IBulldozerPosition>({xPos: 0, yPos: 0});
  const [bulldozerDirection, setBulldozerDirection] = useState(EBulldozerDirection.east);
  const [commandsUsed, setCommandsUsed] = useState<IUserCommand[]>([]);
  const [siteMap, setSiteMap] = useState<string[][]>(dummyMap);
  const [isSimulationInProgress, setIsSimulationInProgress] = useState(true);

  /**
   * Used by child components to update the simulator state 
   * @param cmd - User command as IUSerCommand Object
   */
  const HandleUserCommand = (cmd: IUserCommand): void => {
    setCommandsUsed(commandsUsed => commandsUsed.concat(cmd));

    switch(cmd.command){
      case EUserCommand.advance:
        //TODO Should i return new Pos and update state in simulator instead
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

  /**
   * 
   * @param newSiteMap Used by child components to update the site map
   */
  const UpdateSiteMapCallback = (newSiteMap: string[][]): void => {
    setSiteMap(newSiteMap);
  }

  useEffect(() => {
    console.log(`CommandsUsed: ${commandsUsed}`);
    console.log(`Bulldozer coordinates: ${bulldozerPosition.xPos}, ${bulldozerPosition.yPos}`);
  });

  return(
    <div>
      <SiteMap siteMap={siteMap} bulldozerPosition={bulldozerPosition} UpdateSiteMapCallback={UpdateSiteMapCallback}/>
      <UserControls HandleUserCommand={HandleUserCommand}/>
    </div>
    
  )
}

export default Simulator;