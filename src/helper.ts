import { IBulldozerPosition, EBulldozerDirection, IUserCommand } from "./interfaces"

const UpdateBulldozerPosition = (userCommand: IUserCommand,
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
        newPosition = {
          xPos: currentPosition.xPos,
          yPos: currentPosition.yPos - userCommand.value
        }
        bulldozerPositionCallback(newPosition);
        break;
      case EBulldozerDirection.south:
        //TODO Handle Grid borders
        newPosition = {
          xPos: currentPosition.xPos,
          yPos: currentPosition.yPos + userCommand.value
        }
        bulldozerPositionCallback(newPosition);
        break;
    }
}