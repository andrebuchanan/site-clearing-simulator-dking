import { IBulldozerPosition, EBulldozerDirection, IUserCommand, EUserCommand } from "./interfaces"

export const UpdateBulldozerPosition = (userCommand: any/*IUserCommand*/,
  currentPosition: IBulldozerPosition,
  bulldozerDirection: EBulldozerDirection,
  bulldozerPositionCallback: any) => {

    let newPosition: IBulldozerPosition;
    switch(bulldozerDirection){
      case EBulldozerDirection.east:
        //TODO Handle Grid borders
        newPosition = {
          xPos: currentPosition.xPos + userCommand.value,
          yPos: currentPosition.yPos
        }
        bulldozerPositionCallback(newPosition);
        break;

      case EBulldozerDirection.west:
        //TODO Handle Grid borders
        newPosition = {
          xPos: currentPosition.xPos - userCommand.value,
          yPos: currentPosition.yPos
        }
        bulldozerPositionCallback(newPosition);
        break;
      case EBulldozerDirection.north:
        //TODO Handle Grid borders
        //TODO Handle moving to new array
        newPosition = {
          xPos: currentPosition.xPos,
          yPos: currentPosition.yPos - userCommand.value
        }
        bulldozerPositionCallback(newPosition);
        break;
      case EBulldozerDirection.south:
        //TODO Handle Grid borders
        //TODO Handle moving to new array
        newPosition = {
          xPos: currentPosition.xPos,
          yPos: currentPosition.yPos + userCommand.value
        }
        bulldozerPositionCallback(newPosition);
        break;
    }
}

/**
 * Takes user command as input and changes the direction of bulldozer given its current orientation
 * @param command User Command (left or right)
 * @param bulldozerDirection The current orientation of the bulldozer (N,S,E,W)
 * @returns EBulldozerDirection enum or Error
 */
export const UpdateBulldozerDirection = (command: EUserCommand, bulldozerDirection: EBulldozerDirection): EBulldozerDirection | Error => {
  switch(bulldozerDirection) {
    case EBulldozerDirection.east:
      switch(command) {
        case EUserCommand.left:
          return EBulldozerDirection.north;
        case EUserCommand.right:
          return EBulldozerDirection.south;
        default:
          return Error("Invalid user command");
      }
    case EBulldozerDirection.west:
      switch(command) {
        case EUserCommand.left:
          return EBulldozerDirection.south;
        case EUserCommand.right:
          return EBulldozerDirection.north
        default:
          return Error("Invalid user command");
      }
    case EBulldozerDirection.north:
      switch(command) {
        case EUserCommand.left:
          return EBulldozerDirection.west;
        case EUserCommand.right:
          return EBulldozerDirection.east; 
        default:
          return Error("Invalid user command");
      }
    case EBulldozerDirection.south:
      switch(command) {
        case EUserCommand.left:
          return EBulldozerDirection.east;
        case EUserCommand.right:
          return EBulldozerDirection.west;   
        default:
        return Error("Invalid user command");    
      }
      
    default:
      return Error("Invalid Bulldozer Direction");
  }
}