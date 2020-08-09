import React, {useState, useEffect}from "react";
import MapSquare from "./MapSquare";
import Bulldozer from "./Bulldozer"
import IBulldozerPosition, { ISiteMapProps } from "../interfaces"

const SiteMap = ({siteMap, bulldozerPosition, bulldozerDirection}: ISiteMapProps) => {

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
    gridTemplate: `repeat(${mapWidth}, 1fr) / repeat(${mapHeight}, 1fr)`
  }


  //Build the sitemap based off of the map the user provided
  const BuildSiteMap = (): void => {
    console.log("Building Map...");
    //TODO find better way to initilise array
    let items: JSX.Element[][] = [[],[],[],[]];

    for(let i=0;i<siteMap.length; i++){
      for(let j=0;j<siteMap[i].length; j++){
        items[i].push(<MapSquare landType={siteMap[i][j]}/>);
      }
    }
    //TODO Add key for each element
    // for(const row of siteMap){
    //   for(const square of row){
    //     items.push(
    //       <MapSquare landType={square}/>
    //     )
    //   }
    // }
    setFinalSiteMap(items);
  }

  const renderBulldozer = (): void => {
    //setFinalSiteMap(finalSiteMap.splice(4,1,<Bulldozer/>));
  }
  
  useEffect(() => {
    BuildSiteMap();
    //renderBulldozer();
  }, []);

  return(
    <div style={style}>
      {finalSiteMap}
    </div>
  )
}

export default SiteMap;