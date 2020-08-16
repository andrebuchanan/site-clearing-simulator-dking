import { ELandType } from "./interfaces";
import { UpdateFuelUsed, UpdatePaintDamage } from "./actions/index";
import store from "./store/index"

export const calculateFuelUsed = (targetLandType: ELandType): void => {
    let fuel: number = 0;

    switch(targetLandType){
        case ELandType.o:
            fuel+=1;
            break;
        case ELandType.r:
        case ELandType.t:
            fuel+=2
            break;
        default:
            throw Error(`Cannot calculate cost of invalid landtype ${targetLandType}`);
    }
    store.dispatch(UpdateFuelUsed(fuel));
}

export const calculatePaintDamage = (): void => {
    store.dispatch(UpdatePaintDamage(1));
}