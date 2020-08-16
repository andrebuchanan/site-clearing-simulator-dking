import { _updateBulldozerDirection, targetOutsideBorder } from "../BulldozerHelper";
import  { EBulldozerDirection, EUserCommand, IBulldozerPosition } from "../interfaces";

// describe("UpdateBulldozerPosition", () => {

//     const currentDirection = EBulldozerDirection.east;

//     test("Facing East, move 2", () => {
//         fail;
//     });
// });

describe("TargetOutsideBorder", () => {
    let targetPosition: IBulldozerPosition;
    const northBorder = 0, westBorder  = 0, southBorder = 5, eastBorder = 5;

    it("returns false when target position is above north border", () => {
        targetPosition = {
            xPos: -1,
            yPos: 0
        }
        const outside: boolean = targetOutsideBorder(targetPosition);
        expect(outside).toEqual(true);
    });

//     test("target position is below south border", () => {
        
//     });

//     test("target position is beyond west border", () => {
        
//     });

//     test("target position is beyond east border", () => {
        
//     });
// })

// describe("_updateBulldozerDirection", () => {

//     test("Facing East, turn left", () => {
//         const currentDirection = EBulldozerDirection.east;
//         const newDirection: EBulldozerDirection = _updateBulldozerDirection(EUserCommand.left, currentDirection);
//         expect(newDirection).toEqual(EBulldozerDirection.north);
//     });

//     test("Facing East, turn right", () => {
//         const currentDirection = EBulldozerDirection.east;
//         const newDirection: EBulldozerDirection = _updateBulldozerDirection(EUserCommand.right, currentDirection);
//         expect(newDirection).toEqual(EBulldozerDirection.south);
//     });

//     test("Facing South, turn right", () => {
//         const currentDirection = EBulldozerDirection.south;
//         const newDirection: EBulldozerDirection = _updateBulldozerDirection(EUserCommand.right, currentDirection);
//         expect(newDirection).toEqual(EBulldozerDirection.west);
//     });

//     test("Facing south, turn left", () => {
//         const currentDirection = EBulldozerDirection.south;
//         const newDirection: EBulldozerDirection = _updateBulldozerDirection(EUserCommand.left, currentDirection);
//         expect(newDirection).toEqual(EBulldozerDirection.east);
//     });
    
});