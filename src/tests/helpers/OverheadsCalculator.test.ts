import { calculateFuelUsed } from '../../main/helpers/OverheadsCalculator';
import { ELandType } from '../../main/interfaces';

describe('calculateFuelUsed', () => {
    let targetLandType: ELandType;
    let fuelUsed: number;
    let expectedFuelUsed: Number;

    it('calculates correct fuel for plain land', () => {
        targetLandType = ELandType.o;
        fuelUsed = calculateFuelUsed(targetLandType);
        expectedFuelUsed = 1;

        expect(fuelUsed).toEqual(expectedFuelUsed);
    });

    it('calculates correct fuel for rocky land', () => {
        targetLandType = ELandType.r;
        fuelUsed = calculateFuelUsed(targetLandType);
        expectedFuelUsed = 2;

        expect(fuelUsed).toEqual(expectedFuelUsed);
    });

    it('calculates correct fuel for land with tree', () => {
        targetLandType = ELandType.t;
        fuelUsed = calculateFuelUsed(targetLandType);
        expectedFuelUsed = 2;

        expect(fuelUsed).toEqual(expectedFuelUsed);
    });

    it('throws an error for an invalid land type', () => {
        targetLandType = ELandType.T;

        expect( () => {
            calculateFuelUsed(targetLandType)
        }).toThrow(new Error(`Cannot calculate cost of invalid landtype T`));
    });
});