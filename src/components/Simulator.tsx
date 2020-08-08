import React from 'react';
import SiteMap from "./SiteMap";

const Simulator = () => {

  //const exampleSiteMap: string[] = ["o","o","t","T","o","T","T","t", "t"];
  const complexSiteMap: string[][] = [["o","o","t"],["T","o","T"],["T","t", "t"], ["o","o", "o"]];

  //TODO
  //Validate that dimensions of map fit requirements

  return(
    <SiteMap siteMap={complexSiteMap}/>
  )
}

export default Simulator;