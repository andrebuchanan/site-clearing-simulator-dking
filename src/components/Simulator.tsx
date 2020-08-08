import React, {useState, useEffect} from 'react';
import SiteMap from "./SiteMap";
import Bulldozer from "./Bulldozer";
import UserControls from "./UserControls";

const complexSiteMap: string[][] = [["o","o","t"],["T","o","T"],["T","t", "t"], ["o","o","o"]];

const Simulator = () => {

  //const [buzzdozerPosition, setBulldozerPosition] = useState({xPos: null, yPos: null});
  const [commandsUsed, setCommandsUsed] = useState([]);

  //Used by child components to update the simulator state
  const ParentCallback = (entry: any) => {
    setCommandsUsed(commandsUsed => commandsUsed.concat(entry));
  }

  //TODO
  //Validate that dimensions of map fit requirements

  useEffect(() => {
    console.log(commandsUsed.length);
  });

  return(
    <div>
      <Bulldozer/>
      <SiteMap siteMap={complexSiteMap}/>
      <UserControls parentCallback={ParentCallback}/>
    </div>
    
  )
}

export default Simulator;