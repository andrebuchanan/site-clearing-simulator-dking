import React, {useState, useEffect}from "react";
import MapSquare from "./MapSquare";
import Bulldozer from "./Bulldozer";
import { ISiteMapProps, IMapBorders } from "../interfaces";
import { connect } from "react-redux";
import { UpdateMapBorders } from "../redux/actions/actions";
import store from "../redux/store/store";

const mapStateToProps = (state:  any/*TODO */) => {
  return { 
    siteMap: state.siteMap,
    mapWidth: state.mapWidth,
    mapHeight: state.mapHeight,
    bulldozerPosition: state.bulldozerPosition
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    UpdateMapBorders: (input: any)=> dispatch(UpdateMapBorders(input))
  };
}

const ConnectedSiteMap = ({siteMap, mapWidth, mapHeight, bulldozerPosition}: ISiteMapProps) => {

  const [ finalSiteMap, setFinalSiteMap ] = useState<JSX.Element[][]>([]);
  const [ finalMapStyle, setFinalMapStyle ] = useState();

  //Build the sitemap of JSX Elements based off of the map the user provided
  const buildSiteMap = (): void => {

    //Build a 2D array with sam structure as map but fill it with nulls
    let items: JSX.Element[][] = Array.from(Array(mapHeight), () => Array(mapWidth).fill(null));

    for(let i=0;i<siteMap.length; i++){
      for(let j=0;j<siteMap[i].length; j++){
        //replace the null entries with MapSquare JSX items
        items[i].splice(j, 1, <MapSquare landType={siteMap[i][j]}/>);
      }
    }
    //Add in the bulldozer
    if (bulldozerPosition.xPos !== -1){
      items[bulldozerPosition.yPos].splice(bulldozerPosition.xPos, 1, <Bulldozer/>);
    }
    

    return setFinalSiteMap(items);
  }

  const buildMapBorders = () => {
    //North and west borders will always equal 0
    const mapBorders: IMapBorders = {
      eastBorder: (mapWidth - 1),
      southBorder: (mapHeight - 1)
    }
    //Update the map borders in the redux store
    store.dispatch(UpdateMapBorders(mapBorders));
  }
  
  const buildMapStyle = (): void => {
    const style: any = {
      border: '4px solid darkblue',
      borderRadius: '10px',
      width: '500px',
      height: '500px',
      margin: '0 auto',
      display: 'grid',
      gridTemplate: `repeat(${mapHeight}, 1fr) / repeat(${mapWidth}, 1fr)`
    }
    setFinalMapStyle(style);
  }

  useEffect(() => {
    buildMapBorders();
    buildSiteMap();
    buildMapStyle();
  },[]);

  useEffect(() => {
    buildSiteMap();
  }, [bulldozerPosition])


  return(
    <div style={finalMapStyle}>
      {finalSiteMap}
    </div>
  )
}

const SiteMap = connect(mapStateToProps, mapDispatchToProps)(ConnectedSiteMap)

export default SiteMap;