import { ELandType } from "../interfaces";

/**
 * calculate fuel used by moving into the target square
 * @param targetLandType the land tyoe of the target square
 * @returns number - the fuel used by the move to the target square
 */
export const calculateFuelUsed = (targetLandType: ELandType): number => {
    let fuelUsed: number = 0;

    switch(targetLandType){
        case ELandType.o:
            fuelUsed+=1;
            break;
        case ELandType.r:
        case ELandType.t:
            fuelUsed+=2
            break;
        default:
            throw Error(`Cannot calculate cost of invalid landtype ${targetLandType}`);
    }
    return fuelUsed;
}