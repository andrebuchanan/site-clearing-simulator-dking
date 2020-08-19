import { _updateBulldozerDirection, targetOutsideBorder } from "../helpers/BulldozerHelper";
import  { EBulldozerDirection, EUserCommand, IBulldozerPosition, IUserCommand, IMapBorders } from "../interfaces";

describe("_updateBulldozerDirection", () => {

    let currentDirection: EBulldozerDirection;
    let expectedDirection: EBulldozerDirection;
    let userCommand: EUserCommand;
    let newDirection: EBulldozerDirection;
    

    it("facing north, turn right. Returns east", () => {
        currentDirection = EBulldozerDirection.north
        userCommand = EUserCommand.right
        expectedDirection = EBulldozerDirection.east;

        newDirection = _updateBulldozerDirection(userCommand,currentDirection);
        expect(newDirection).toEqual(expectedDirection);
    });

    it("facing east, turn right. Returns south", () => {
        currentDirection = EBulldozerDirection.east
        userCommand = EUserCommand.right
        expectedDirection = EBulldozerDirection.south;

        newDirection = _updateBulldozerDirection(userCommand,currentDirection);
        expect(newDirection).toEqual(expectedDirection);
    });

    it("facing south, turn right. Returns west", () => {
        currentDirection = EBulldozerDirection.south
        userCommand = EUserCommand.right
        expectedDirection = EBulldozerDirection.west;
        newDirection = _updateBulldozerDirection(userCommand,currentDirection);

        expect(newDirection).toEqual(expectedDirection);
    });

    it("facing west, turn right. Returns north", () => {
        currentDirection = EBulldozerDirection.west
        userCommand = EUserCommand.right
        expectedDirection = EBulldozerDirection.north;
        newDirection = _updateBulldozerDirection(userCommand,currentDirection);

        expect(newDirection).toEqual(expectedDirection);
    });

    it("facing north, turn left. Returns west", () => {
        currentDirection = EBulldozerDirection.north
        userCommand = EUserCommand.left
        expectedDirection = EBulldozerDirection.west;
        newDirection = _updateBulldozerDirection(userCommand,currentDirection);

        expect(newDirection).toEqual(expectedDirection);
    });

    it("facing west, turn left. Returns south", () => {
        currentDirection = EBulldozerDirection.west
        userCommand = EUserCommand.left
        expectedDirection = EBulldozerDirection.south;
        newDirection = _updateBulldozerDirection(userCommand,currentDirection);
        
        expect(newDirection).toEqual(expectedDirection);
    });

    it("facing south, turn left. Returns east", () => {
        currentDirection = EBulldozerDirection.south
        userCommand = EUserCommand.left
        expectedDirection = EBulldozerDirection.east;
        newDirection = _updateBulldozerDirection(userCommand,currentDirection);
        
        expect(newDirection).toEqual(expectedDirection);
    });

    it("facing east, turn left. Returns north", () => {
        currentDirection = EBulldozerDirection.east
        userCommand = EUserCommand.left
        expectedDirection = EBulldozerDirection.north;
        newDirection = _updateBulldozerDirection(userCommand,currentDirection);
        
        expect(newDirection).toEqual(expectedDirection);
    });
});

describe("TargetOutsideBorder", () => {
    const mapBorders: IMapBorders = {
        eastBorder: 4,
        southBorder: 4
    }
    let targetPosition: IBulldozerPosition;

    it("returns false when target position is within borders", () => {
        targetPosition = {
            xPos: 1,
            yPos: 1
        }
        const outside: boolean = targetOutsideBorder(targetPosition, mapBorders);
        expect(outside).toEqual(false);
    });

    it("returns true when target position is above north border", () => {
        targetPosition = {
            xPos: 0,
            yPos: -1
        }
        const outside: boolean = targetOutsideBorder(targetPosition, mapBorders);
        expect(outside).toEqual(true);
    });

    it("returns true when target position is below south border", () => {
        targetPosition = {
            xPos: 0,
            yPos: 5
        }
        const outside: boolean = targetOutsideBorder(targetPosition, mapBorders);
        expect(outside).toEqual(true);
    });

    it("returns true when target position is beyond east border", () => {
        targetPosition = {
            xPos: 5,
            yPos: 0
        }
        const outside: boolean = targetOutsideBorder(targetPosition, mapBorders);
        expect(outside).toEqual(true);
    });

    it("returns true when target position is beyond the west border", () => {
        targetPosition = {
            xPos: -1,
            yPos: 0
        }
        const outside: boolean = targetOutsideBorder(targetPosition, mapBorders);
        expect(outside).toEqual(true);
    });

});