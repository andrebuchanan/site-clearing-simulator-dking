import React, {useState, useEffect} from 'react';
import SiteMap from "./SiteMap";
import UserControls from "./UserControls";
import { IBulldozerPosition, EBulldozerDirection, IUserCommand } from "../interfaces"

const complexSiteMap: string[][] = [["o","o","t"],["T","o","T"],["T","t", "t"], ["o","o","o"]];

const Simulator = () => {

  const [bulldozerPosition, setBulldozerPosition] = useState<IBulldozerPosition>({xPos: 1, yPos: 1});
  const [bulldozerDirection, setBulldozerDirection] = useState(EBulldozerDirection.east);
  const [commandsUsed, setCommandsUsed] = useState([]);

  //Used by child components to update the simulator state
  const UpdateCommandsUsedCallback = (cmd: any) => {
    setCommandsUsed(commandsUsed => commandsUsed.concat(cmd));
    //
    //updateBulldozerPosition

  }

  // const UpdateBulldozerPositionCallback = (newPosition: IBulldozerPosition) => {
  //   //TODO
  //   setBulldozerPosition(buzzdozerPosition);
  // }

  //TODO
  //Validate that dimensions of map fit requirements

  useEffect(() => {
    console.log(commandsUsed);
  });

  return(
    <div>
      <SiteMap siteMap={complexSiteMap} bulldozerPosition={bulldozerPosition} bulldozerDirection={bulldozerDirection}/>
      <UserControls UpdateCommandsUsedCallback={UpdateCommandsUsedCallback}/>
    </div>
    
  )
}

export default Simulator;