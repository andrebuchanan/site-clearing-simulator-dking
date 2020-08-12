import React, {useState, useEffect}from "react";
import MapSquare from "./MapSquare";
import Bulldozer from "./Bulldozer"
import { ISiteMapProps } from "../interfaces"


const SiteMap = ({siteMap, bulldozerPosition}: ISiteMapProps) => {

  const [finalSiteMap, setFinalSiteMap] = useState<JSX.Element[][]>([]);
  const mapWidth: number = siteMap[0].length;
  const mapHeight: number = siteMap.length;
  const style = {
    border: '4px solid darkblue',
    borderRadius: '10px',
    width: '500px',
    height: '500px',
    margin: '0 auto',
    display: 'grid',
    gridTemplate: `repeat(${mapHeight}, 1fr) / repeat(${mapWidth}, 1fr)`
  }
  const northBorder: number = 0;
  const southBorder: number = mapHeight - 1;
  const eastBorder: number = mapWidth - 1;
  const westborder = 0;


  //Build the sitemap based off of the map the user provided
const BuildInitialSiteMap = (): void => {
    console.log("Building Map...");
    //TODO find better way to initilise array
    let items: JSX.Element[][] = [[],[],[],[]];

    for(let i=0;i<siteMap.length; i++){
      for(let j=0;j<siteMap[i].length; j++){
        items[i].push(<MapSquare landType={siteMap[i][j]}/>);
      }
    }
    //Add in the bulldozer
    items[bulldozerPosition.yPos].splice(bulldozerPosition.xPos, 1, <Bulldozer/>);

    return setFinalSiteMap(items);
  }

const renderBulldozer = (): void => {

    //TODO
    //Right idea here but can't refernece finalSiteMap[idx] cause we don't know if exists in that format yet

    //setFinalSiteMap(finalSiteMap => [finalSiteMap[1].splice(2,1,<Bulldozer/>);])

    //1. copy entire map
    //2. splice in the update
    //3. use useStateFunc to update to new state
    // const copy: JSX.Element[][] = [...finalSiteMap];
    // if (copy.length === 0) {return};
    // copy[0].splice(0,1,<Bulldozer/>);
    // setFinalSiteMap(copy);
  }

  useEffect(() => {
    BuildInitialSiteMap();
    //renderBulldozer();
  },[]);

  useEffect(() => {
    //cant call a func thst will update state from inside useeffect. infinite loop
    //renderBulldozer();
  },[]);


  return(
    <div style={style}>
      {finalSiteMap}
    </div>
  )
}

export default SiteMap;