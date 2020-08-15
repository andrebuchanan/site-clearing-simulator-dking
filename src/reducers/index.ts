import { ADD_USER_COMMAND, UPDATE_MAP_BORDERS, UPDATE_SIMULATION_IN_PROGRESS, UPDATE_BULLDOZER_DIRECTION } from "../constants/action-types";
import { IUserCommand, IBulldozerPosition, EBulldozerDirection } from "../interfaces";

interface IInitialState {
  userCommands: IUserCommand[],
  siteMap: string[][],
  isSimulationInProgress: boolean,
  bulldozerPosition: IBulldozerPosition;
  bulldozerDirection: EBulldozerDirection,
  northBorder: number,
  southBorder: number,
  eastBorder: number,
  westBorder: number;
}

const initialState: IInitialState = {
  userCommands: [],
  siteMap: [["o","o","t"],["T","o","T"],["T","t", "t"], ["o","o","o"]], //TODO remove
  isSimulationInProgress: true,  
  bulldozerPosition: { xPos: 1, yPos: 0 },
  bulldozerDirection: EBulldozerDirection.east,
  northBorder: 0,
  southBorder: 0,
  eastBorder: 0,
  westBorder: 0

};

const rootReducer = (state = initialState,  action: any/*IReduxAction */ ) => {
  //TODO
  //Fill root reducer with if statements for all actions

  switch(action.type) {
    case ADD_USER_COMMAND:
      return Object.assign({}, state, {
        userCommands: state.userCommands.concat(action.payload)
      });
    case UPDATE_MAP_BORDERS:
      return Object.assign({}, state, {
        eastBorder: action.payload.eastBorder,
        southBorder: action.payload.southBorder
      });
    case UPDATE_SIMULATION_IN_PROGRESS:
      return Object.assign({}, state, {
        isSimulationInProgress: action.payload
      })
    case UPDATE_BULLDOZER_DIRECTION:
      console.log("changing direction");
      return Object.assign({}, state, {
        bulldozerDirection: action.payload
      })
    default:
      return state;
  }
}

export default rootReducer;