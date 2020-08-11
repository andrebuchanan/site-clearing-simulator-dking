import React, {useState, useEffect} from 'react';
import SiteMap from "./SiteMap";
import UserControls from "./UserControls";
import { IBulldozerPosition, EBulldozerDirection, IUserCommand, EUserCommand } from "../interfaces";
import { UpdateBulldozerPosition } from "../helper";

const complexSiteMap: string[][] = [["o","o","t"],["T","o","T"],["T","t", "t"], ["o","o","o"]];

const Simulator = () => {

  const [bulldozerPosition, setBulldozerPosition] = useState<IBulldozerPosition>({xPos: 0, yPos: 0});
  const [bulldozerDirection, setBulldozerDirection] = useState(EBulldozerDirection.east);
  const [commandsUsed, setCommandsUsed] = useState([]);

  //Used by child components to update the simulator state
  const HandleUserCommand = (cmd: any /*IBulldozerPosition*/) => {
    setCommandsUsed(commandsUsed => commandsUsed.concat(cmd));
    switch(cmd.command){
      case EUserCommand.advance:
        //TODO Should i return new Pos and update state in simulator instead
        UpdateBulldozerPosition(cmd, bulldozerPosition, bulldozerDirection, setBulldozerPosition);
        break;
      case EUserCommand.quit:
        //TODO User has quit
        break;
      default:
        //TODO UpdateBulldozerDirection
    }
  }

  //TODO
  //Validate that dimensions of map fit requirements

  useEffect(() => {
    console.log(`CommandsUsed: ${commandsUsed}`);
    console.log(`Bulldozer coordinates: ${bulldozerPosition.xPos}, ${bulldozerPosition.yPos}`);
  });

  return(
    <div>
      <SiteMap siteMap={complexSiteMap} bulldozerPosition={bulldozerPosition}/>
      <UserControls HandleUserCommand={HandleUserCommand}/>
    </div>
    
  )
}

export default Simulator;