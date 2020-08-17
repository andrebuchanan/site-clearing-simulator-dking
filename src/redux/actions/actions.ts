import * as constants from "../constants/action-types"
import { IUserCommand, IMapBorders, EBulldozerDirection, IBulldozerPosition, ELandType } from "../../interfaces"

const AddUserCommand = (payload: IUserCommand) => {
    return { type: constants.ADD_USER_COMMAND, payload }
}

const UpdateMapBorders = (payload: IMapBorders) => {
    return { type: constants.UPDATE_MAP_BORDERS, payload }
}

const UpdateSimulationInProgress = (payload: boolean) => {
    return { type: constants.UPDATE_SIMULATION_IN_PROGRESS, payload }
}

const UpdateBulldozerDirection = (payload: EBulldozerDirection) => {
    return { type: constants.UPDATE_BULLDOZER_DIRECTION, payload }
}

const UpdateBulldozerPosition = (payload: IBulldozerPosition) => {
    return { type: constants.UPDATE_BULLDOZER_POSITION, payload }
}

const UpdateLandType = (payload: ELandType) => {
    return { type: constants.UPDATE_LAND_TYPE, payload }
}

const UpdateFuelUsed = (payload: number) => {
    return { type: constants.UPDATE_FUEL_USED, payload }
}

const UpdatePaintDamage = (payload: number) => {
    return { type: constants.UPDATE_PAINT_DAMAGE, payload }
}

export {
    AddUserCommand,
    UpdateMapBorders,
    UpdateSimulationInProgress,
    UpdateBulldozerDirection,
    UpdateBulldozerPosition,
    UpdateLandType,
    UpdateFuelUsed,
    UpdatePaintDamage
}