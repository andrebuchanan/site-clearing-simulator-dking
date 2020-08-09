import React, {useState, useEffect} from 'react';
import SiteMap from "./SiteMap";
import UserControls from "./UserControls";
import IBulldozerPosition, { EBulldozerDirection } from "../interfaces"

const complexSiteMap: string[][] = [["o","o","t"],["T","o","T"],["T","t", "t"], ["o","o","o"]];

const Simulator = () => {

  const [buzzdozerPosition, setBulldozerPosition] = useState<IBulldozerPosition>({xPos: -1, yPos: -1});
  const [bulldozerDirection, setBulldozerDirection] = useState(EBulldozerDirection.east);
  const [commandsUsed, setCommandsUsed] = useState([]);

  //Used by child components to update the simulator state
  const UpdateCommandsUsedCallback = (entry: any) => {
    setCommandsUsed(commandsUsed => commandsUsed.concat(entry));
    // if entry is (a)dvance, then update bulldozer position
    if (entry.command === "a"){

    }
  }

  const UpdateBulldozerPositionCallback = () => {
    //TODO
    setBulldozerPosition(buzzdozerPosition);
  }

  //TODO
  //Validate that dimensions of map fit requirements

  useEffect(() => {
    console.log(commandsUsed.length);
  });

  return(
    <div>
      <SiteMap siteMap={complexSiteMap} bulldozerPosition={buzzdozerPosition} bulldozerDirection={bulldozerDirection}/>
      <UserControls UpdateCommandsUsedCallback={UpdateCommandsUsedCallback}/>
    </div>
    
  )
}

export default Simulator;