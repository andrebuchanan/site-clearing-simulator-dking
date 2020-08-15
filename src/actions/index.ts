import { ADD_USER_COMMAND, UPDATE_MAP_BORDERS } from "../constants/action-types"

const AddUserCommand = (payload: any) => {
    return { type: ADD_USER_COMMAND, payload }
}

const UpdateMapBorders = (payload: any) => {
    return { type: UPDATE_MAP_BORDERS, payload }
}

export default AddUserCommand;