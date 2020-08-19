import { IBulldozerPosition, EBulldozerDirection, EUserCommand, ELandType, ESimulationStatus, IMapBorders } from "../interfaces"
import { UpdateSimulationStatus, UpdateBulldozerPosition, UpdateLandType } from "../redux/actions/actions";


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
export const targetOutsideBorder = (targetPosition: IBulldozerPosition, borders: IMapBorders): boolean => {

  const northBorder: number = 0;
  const southBorder: number = borders.southBorder;
  const eastBorder: number = borders.eastBorder;
  const westBorder: number = 0

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

/**
 * Checks if the target position contains an uncleared tree.
 * @param targetPositionLandType The land type of the target position
 * @returns boolean - true if the target contains an uncleared tree
 */
export const targetContainsUnclearedTree = (targetPositionLandType: string): boolean => {
  if (targetPositionLandType === ELandType.t) {
    return true;
  } else {
    return false;
  }
}