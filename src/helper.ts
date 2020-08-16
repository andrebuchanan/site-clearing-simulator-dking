import { IBulldozerPosition, EBulldozerDirection, IUserCommand, EUserCommand, ELandType } from "./interfaces"
import store from './store';
import { UpdateSimulationInProgress, UpdateBulldozerPosition, UpdateLandType } from "./actions/index";


/**
 * Takes user command as input and changes the direction of bulldozer given its current orientation
 * @param command User Command (left or right)
 * @param bulldozerDirection The current orientation of the bulldozer (N,S,E,W)
 * @returns EBulldozerDirection enum or Error
 */
export const _UpdateBulldozerDirection = (command: EUserCommand, bulldozerDirection: EBulldozerDirection): EBulldozerDirection => {
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

/**
 * Moves the x, y coordinates of the bulldozer by updating the Redux Store.
 * Will Also update the isSimulationInProgress boolean in the Redux store if the
 * user tries to make an illegal move
 */
export const moveBulldozer = (): void => {

    const currentPosition: IBulldozerPosition = store.getState().bulldozerPosition;
    const bulldozerDirection: EBulldozerDirection = store.getState().bulldozerDirection;
    const siteMap: string[][] = store.getState().siteMap;
    let newPosition: IBulldozerPosition;

    let targetPosition: IBulldozerPosition = getTargetPosition(currentPosition, bulldozerDirection);
    let targetPositionLandType: string = siteMap[targetPosition.yPos][targetPosition.xPos];

    //check if target position contains protected tree
    if (targetPositionLandType === ELandType.T) {
      store.dispatch(UpdateSimulationInProgress(false));
    }
    //If Bulldozer is at the edge of the map, check if user tries to navigate outside the boundary
    else if (targetOutsideBorder(targetPosition)){
      store.dispatch(UpdateSimulationInProgress(false));
    } else {
      newPosition = getTargetPosition(currentPosition, bulldozerDirection);
      //update landType to cleared
      console.log(`landtype before cleared ${targetPositionLandType}`);
      store.dispatch(UpdateLandType(currentPosition));
      store.dispatch(UpdateBulldozerPosition(newPosition));
    }
}

/**
 * Function will check to see if the user is trying to navigate outside the boundaries
 * of the site. If so it will return true.
 * @param targetPosition The Target position of the bulldozer
 * @returns true boolean if user is trying to navigate outside boundary, false otherwise
 */
const targetOutsideBorder = (targetPosition: IBulldozerPosition): boolean => {

  const northBorder: number = store.getState().northBorder;
  const southBorder: number = store.getState().southBorder;
  const eastBorder: number = store.getState().eastBorder;
  const westBorder: number = store.getState().westBorder;

  if (targetPosition.xPos < westBorder || targetPosition.xPos > eastBorder ||
    targetPosition.yPos < northBorder || targetPosition.yPos > southBorder){
      return true;
  } else
    return false;
}

/**
 * Fetches the x,y coordinates of the target position of the bulldozer
 * @param userCommandValue The numeric value of the advance command the user has entered
 * @param currentPosition The bulldozers current position
 * @param bulldozerDirection The bulldozers current direction
 * @returns A new IBulldozerPosition Object
 */
export const getTargetPosition = (
  currentPosition: IBulldozerPosition,
  bulldozerDirection: EBulldozerDirection): IBulldozerPosition => {

    let newPosition: IBulldozerPosition;
    switch(bulldozerDirection){
      case EBulldozerDirection.east:
        newPosition = {
          xPos: currentPosition.xPos + 1,
          yPos: currentPosition.yPos
        }
        break;

      case EBulldozerDirection.west:
        newPosition = {
          xPos: currentPosition.xPos - 1,
          yPos: currentPosition.yPos
        }
        break;
      case EBulldozerDirection.north:
        newPosition = {
          xPos: currentPosition.xPos,
          yPos: currentPosition.yPos - 1
        }
        break;
      case EBulldozerDirection.south:
        newPosition = {
          xPos: currentPosition.xPos,
          yPos: currentPosition.yPos + 1
        }
        break;
    }
    return newPosition;
}