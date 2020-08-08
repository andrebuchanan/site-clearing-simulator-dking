import React from 'react';
import SiteMap from "./SiteMap";

const Simulator = () => {

  const exampleSiteMap: string[] = ["o","o","t","T","o","T","T","t"];

  // const renderMoves = () => {
  //   //TODO
  // }


  return(
    <SiteMap squares={exampleSiteMap}/>
  )
}

export default Simulator;