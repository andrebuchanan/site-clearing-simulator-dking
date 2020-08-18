import { IBulldozerPosition, EBulldozerDirection, EUserCommand, ELandType, ESimulationStatus } from "./interfaces"
import store from './redux/store/store';
import { UpdateSimulationStatus, UpdateBulldozerPosition, UpdateLandType } from "./redux/actions/actions";
import { calculateFuelUsed, calculatePaintDamage } from "./OverheadsCalculator";


/**
 * Takes user command as input and changes the direction of bulldozer given its current orientation
 * @param command User Command (left or right)
 * @param bulldozerDirection The current orientation of the bulldozer (N,S,E,W)
 * @returns EBulldozerDirection enum or Error
 */
export const _updateBulldozerDirection = (command: EUserCommand, bulldozerDirection: EBulldozerDirection): EBulldozerDirection => {
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
 * @param advanceValue - The number of squares to move forward
 */
export const moveBulldozer = (advanceValue: number): void => {

  let currentPosition: IBulldozerPosition;
  let bulldozerDirection: EBulldozerDirection;
  let siteMap: string[][];

  //Need to loop for the number of Advance Value the user has entered
  for(let i = 0; i< advanceValue; i++) {

    currentPosition = store.getState().bulldozerPosition;
    bulldozerDirection = store.getState().bulldozerDirection;
    siteMap = store.getState().siteMap;

    let targetPosition: IBulldozerPosition = getTargetPosition(currentPosition, bulldozerDirection);
    //If Bulldozer is at the edge of the map, check if user tries to navigate outside the boundary
    if (targetOutsideBorder(targetPosition)){
      store.dispatch(UpdateSimulationStatus(ESimulationStatus.ended));
      return;
    }
    
    let targetPositionLandType: string = siteMap[targetPosition.yPos][targetPosition.xPos];
    //check if target position contains protected tree
    if (targetContainsProtectedTree(targetPositionLandType)) {
      store.dispatch(UpdateSimulationStatus(ESimulationStatus.ended));
      return;
    } 
    //If target position contains an uncleared tree then calculate paint damage
    else {
      if (targetContainsUnclearedTree(targetPositionLandType)) {
        //Only 2 edge cases for paint damage
        //1. The advance value > 1 and there is an uncleared tree in the target position
        //2. It is not the last move of the advance and there is an uncleared tree in the target position
        if (advanceValue > 1 && i !== advanceValue-1) {
          calculatePaintDamage();
        }
      }
      //update landType to cleared
      //TODO Move these to their own helper?
      store.dispatch(UpdateLandType(currentPosition));
      store.dispatch(UpdateBulldozerPosition(targetPosition));
      //calculate cost of moving into new square
      calculateFuelUsed(targetPositionLandType as ELandType);
    }
  }
}

/**
 * Fetches the x,y coordinates of the target position of the bulldozer
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

/**
 * Function will check to see if the user is trying to navigate outside the boundaries
 * of the site. If so it will return true.
 * @param targetPosition The Target position of the bulldozer
 * @returns true boolean if user is trying to navigate outside boundary, false otherwise
 */
export const targetOutsideBorder = (targetPosition: IBulldozerPosition): boolean => {

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
 * Function checks if the target position contains a protected tree
 * @param targetPositionLandType string - the land type of the target position
 * @returns boolean - true if contains protected tree
 */
export const targetContainsProtectedTree = (targetPositionLandType: string): boolean => {
  if (targetPositionLandType === ELandType.T) {
    return true;
  } else {
    return false;
  }
}

export const targetContainsUnclearedTree = (targetPositionLandType: string): boolean => {
  if (targetPositionLandType === ELandType.t) {
    return true;
  } else {
    return false;
  }
}