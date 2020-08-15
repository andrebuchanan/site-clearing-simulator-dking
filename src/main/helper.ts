import { IBulldozerPosition, EBulldozerDirection, IUserCommand, EUserCommand } from "./interfaces"

/**
 * Updates the x,y coordinates of the bulldozer
 * @param userCommandValue The numeric value of the advance command the user has entered
 * @param currentPosition The bulldozers current position
 * @param bulldozerDirection The bulldozers current direction
 * @returns A new IBulldozerPosition Object
 */
export const UpdateBulldozerPosition = (userCommandValue: number,
  currentPosition: IBulldozerPosition,
  bulldozerDirection: EBulldozerDirection): IBulldozerPosition => {

    let newPosition: IBulldozerPosition;
    switch(bulldozerDirection){
      case EBulldozerDirection.east:
        //TODO Handle Grid borders
        newPosition = {
          xPos: currentPosition.xPos + userCommandValue,
          yPos: currentPosition.yPos
        }
        break;

      case EBulldozerDirection.west:
        //TODO Handle Grid borders
        newPosition = {
          xPos: currentPosition.xPos - userCommandValue,
          yPos: currentPosition.yPos
        }
        break;
      case EBulldozerDirection.north:
        //TODO Handle Grid borders
        //TODO Handle moving to new array
        newPosition = {
          xPos: currentPosition.xPos,
          yPos: currentPosition.yPos - userCommandValue
        }
        break;
      case EBulldozerDirection.south:
        //TODO Handle Grid borders
        //TODO Handle moving to new array
        newPosition = {
          xPos: currentPosition.xPos,
          yPos: currentPosition.yPos + userCommandValue
        }
        break;
    }
    return newPosition;
}

/**
 * Takes user command as input and changes the direction of bulldozer given its current orientation
 * @param command User Command (left or right)
 * @param bulldozerDirection The current orientation of the bulldozer (N,S,E,W)
 * @returns EBulldozerDirection enum or Error
 */
export const UpdateBulldozerDirection = (command: EUserCommand, bulldozerDirection: EBulldozerDirection): EBulldozerDirection => {
  switch(bulldozerDirection) {
    case EBulldozerDirection.east:
      switch(command) {
        case EUserCommand.left:
          return EBulldozerDirection.north;
        case EUserCommand.right:
          return EBulldozerDirection.south;
        default:
          throw Error("Invalid user command");
      }
    case EBulldozerDirection.west:
      switch(command) {
        case EUserCommand.left:
          return EBulldozerDirection.south;
        case EUserCommand.right:
          return EBulldozerDirection.north
        default:
          throw Error("Invalid user command");
      }
    case EBulldozerDirection.north:
      switch(command) {
        case EUserCommand.left:
          return EBulldozerDirection.west;
        case EUserCommand.right:
          return EBulldozerDirection.east; 
        default:
          throw Error("Invalid user command");
      }
    case EBulldozerDirection.south:
      switch(command) {
        case EUserCommand.left:
          return EBulldozerDirection.east;
        case EUserCommand.right:
          return EBulldozerDirection.west;   
        default:
        throw Error("Invalid user command");    
      }
      
    default:
      throw Error("Invalid Bulldozer Direction");
  }
}

// const moveBulldozer = (currentPosition: IBulldozerPosition,
//   bulldozerDirection: EBulldozerDirection,
//   spacesToMove: number,
//   landTypeOfTargetPosition: string) => {

//     //TODO need to update current position on each iteration
//     for(let i = 0; i < spacesToMove; i++) {
//       if (/*target position contains protected tree */) {
//         //TODO End Simulation
//       }
  
//       //Bulldozer is at the edge of the map, check if user tries to navigate outside the boundary
//       else if (currentPosition.xPos === 0 || currentPosition.yPos === 0 
//         || currentPosition.xPos === eastBorder || currentPosition.yPos === southBorder) {
//         if(checkIfUserNavigatesOutsideBorder(currentPosition, bulldozerDirection)){
//           isSimulationInProgress = false;
//         }
//       }
  
//       //TODO
//       //Update the landtype of the current position to o (cleared)
//     }

// }

/**
 * 
 * @param currentPosition 
 * @param bulldozerDirection 
 */
// const checkIfUserNavigatesOutsideBorder = (currentPosition: IBulldozerPosition, 
//   bulldozerDirection: EBulldozerDirection): boolean => {
//   switch(bulldozerDirection) {
//     case EBulldozerDirection.north:
//       if(currentPosition.yPos === northBorder){
//         return true;
//       }
//       break;
//     case EBulldozerDirection.south:
//       if(currentPosition.yPos === southBorder){
//         return true;
//       }
//       break;
//     case EBulldozerDirection.east:
//       if(currentPosition.xPos === eastBorder){
//         return true;
//       }
//       break;
//     case EBulldozerDirection.west:
//       if(currentPosition.xPos === westBorder){
//         return true;
//       }
//       break;
//   }
//   return false;
// }