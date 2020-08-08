import React from "react";
import MapSquare from "./MapSquare";

interface ISiteMapProps {
  siteMap: string[][]
}

const style = {
  border: '4px solid darkblue',
  borderRadius: '10px',
  width: '500px',
  height: '500px',
  margin: '0 auto',
  display: 'grid',
  gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)' //default to a 3X3 Grid
}


const SiteMap = ({siteMap}: ISiteMapProps) => {

  // Dynamically buold grid based off of the dimensions of the map provided
  const BuildGridStyle = () => {
    const width: number = siteMap[0].length;
    const height: number = siteMap.length;
    
    style.gridTemplate = `repeat(${width}, 1fr) / repeat(${height}, 1fr)`;
    return style;
  }

  const BuildSiteMap = (): JSX.Element[] => {
    let items: JSX.Element[] = [];

    for(const row of siteMap){
      for(const square of row){
        items.push(
          <MapSquare landType={square}/>
        )
      }
    }
    return items;
  }
  
  

  return(
    <div style={BuildGridStyle()}>
      {BuildSiteMap()}
    </div>
  )
}

export default SiteMap;