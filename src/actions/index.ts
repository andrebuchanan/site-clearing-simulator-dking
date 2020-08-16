import { ADD_USER_COMMAND, UPDATE_MAP_BORDERS, 
    UPDATE_SIMULATION_IN_PROGRESS, UPDATE_BULLDOZER_DIRECTION,
    UPDATE_BULLDOZER_POSITION, 
    UPDATE_LAND_TYPE} from "../constants/action-types"

const AddUserCommand = (payload: any) => {
    return { type: ADD_USER_COMMAND, payload }
}

const UpdateMapBorders = (payload: any) => {
    return { type: UPDATE_MAP_BORDERS, payload }
}

const UpdateSimulationInProgress = (payload: any) => {
    return { type: UPDATE_SIMULATION_IN_PROGRESS, payload }
}

const UpdateBulldozerDirection = (payload: any) => {
    return { type: UPDATE_BULLDOZER_DIRECTION, payload }
}

const UpdateBulldozerPosition = (payload: any) => {
    return { type: UPDATE_BULLDOZER_POSITION, payload }
}

const UpdateLandType = (payload: any) => {
    return { type: UPDATE_LAND_TYPE, payload }
} 

export {
    AddUserCommand,
    UpdateMapBorders,
    UpdateSimulationInProgress,
    UpdateBulldozerDirection,
    UpdateBulldozerPosition,
    UpdateLandType
}