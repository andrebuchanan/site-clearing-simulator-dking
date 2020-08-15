import { ADD_USER_COMMAND, UPDATE_MAP_BORDERS, 
    UPDATE_SIMULATION_IN_PROGRESS, UPDATE_BULLDOZER_DIRECTION } from "../constants/action-types"

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

export {
    AddUserCommand,
    UpdateMapBorders,
    UpdateSimulationInProgress,
    UpdateBulldozerDirection
}