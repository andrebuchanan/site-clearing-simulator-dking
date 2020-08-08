import React from "react";
import MapSquare from "./MapSquare";

interface ISiteMapProps {
  squares: string[]
}


const SiteMap = ({squares}: ISiteMapProps) => {

  const BuildSiteMap = () => {
    let items: JSX.Element[] = [];

    for(const square of squares){
      items.push(
        <MapSquare landType={square}/>
      )
    }
    return items;
  }
  
  

  return(
    <div>
      {BuildSiteMap()}
      <MapSquare landType={squares[0]}/>
    </div>
  )
}





// function BuildMap(file: String[][]): void {
//   //Build the SiteMap based off of the props

//   let newMap: JSX.Element[][] = []

//   for (let row=0; row < file.length; row++){
//     for(let square = 0; square < file[row].length; square++){
//       switch(file[row][square]){
//         case "o":
//           newMap[row].splice(square, 0, MapSquare("o")); //insert MapSquare element ar specificindex
//           break;
//         case "t":
//       }
//     }
//   }
// }
export default SiteMap;