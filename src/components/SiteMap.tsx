import React, {useState, useEffect}from "react";
import MapSquare from "./MapSquare";
import Bulldozer from "./Bulldozer";
import { ISiteMapProps, IMapBorders } from "../interfaces";
import { connect } from "react-redux";
import { UpdateMapBorders } from "../actions";
import store from "../store";

const mapStateToProps = (state:  any/*TODO */) => {
  return { 
    siteMap: state.siteMap,
    bulldozerPosition: state.bulldozerPosition
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    UpdateMapBorders: (input: any)=> dispatch(UpdateMapBorders(input))
  };
}

const ConnectedSiteMap = ({siteMap, bulldozerPosition}: ISiteMapProps) => {

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

  //North and west borders will always equal 0
  const mapBorders: IMapBorders = {
    eastBorder: (mapWidth - 1),
    southBorder: (mapHeight - 1)
  }
  //Update the map borders in the redux store
  store.dispatch(UpdateMapBorders(mapBorders));

  //Build the sitemap of JSX Elements based off of the map the user provided
  const BuildSiteMap = (): void => {
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

  useEffect(() => {
    BuildSiteMap();
  },[bulldozerPosition]);


  return(
    <div style={style}>
      {finalSiteMap}
    </div>
  )
}

const SiteMap = connect(mapStateToProps, mapDispatchToProps)(ConnectedSiteMap)

export default SiteMap;