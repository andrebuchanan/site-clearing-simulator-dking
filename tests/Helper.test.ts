import /*UpdateBulldozerPosition,*/ { UpdateBulldozerDirection } from "../src/helper";
import  { EBulldozerDirection, EUserCommand } from "../src/interfaces";

describe("UpdateBulldozerPosition", () => {

    const currentDirection = EBulldozerDirection.east;

    test("Facing East, move 2", () => {
        fail;
    });
});

describe("UpdateBulldozerDirection", () => {

    test("Facing East, turn left", () => {
        const currentDirection = EBulldozerDirection.east;
        const newDirection: EBulldozerDirection = UpdateBulldozerDirection(EUserCommand.left, currentDirection);
        expect(newDirection).toEqual(EBulldozerDirection.north);
    });

    test("Facing East, turn right", () => {
        const currentDirection = EBulldozerDirection.east;
        const newDirection: EBulldozerDirection = UpdateBulldozerDirection(EUserCommand.right, currentDirection);
        expect(newDirection).toEqual(EBulldozerDirection.south);
    });

    test("Facing South, turn right", () => {
        const currentDirection = EBulldozerDirection.south;
        const newDirection: EBulldozerDirection = UpdateBulldozerDirection(EUserCommand.right, currentDirection);
        expect(newDirection).toEqual(EBulldozerDirection.west);
    });

    test("Facing south, turn left", () => {
        const currentDirection = EBulldozerDirection.south;
        const newDirection: EBulldozerDirection = UpdateBulldozerDirection(EUserCommand.left, currentDirection);
        expect(newDirection).toEqual(EBulldozerDirection.east);
    });
    
});