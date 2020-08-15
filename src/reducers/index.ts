import { ADD_USER_COMMAND, UPDATE_MAP_BORDERS } from "../constants/action-types";
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
  isSimulationInProgress: false,  
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

  if (action.type === ADD_USER_COMMAND) {
    return Object.assign({}, state, {
      userCommands: state.userCommands.concat(action.payload)
    });
  } else if (action.type === UPDATE_MAP_BORDERS) {
    return Object.assign({}, state, {
      eastBorder: action.payload.eastBorder,
      southBorder: action.payload.southBorder
    });
  }
  return state;
}

export default rootReducer;