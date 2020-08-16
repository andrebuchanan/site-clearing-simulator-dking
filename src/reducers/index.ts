import { IUserCommand, IBulldozerPosition, EBulldozerDirection, ELandType } from "../interfaces";
import { ADD_USER_COMMAND, UPDATE_MAP_BORDERS, UPDATE_SIMULATION_IN_PROGRESS,
  UPDATE_BULLDOZER_DIRECTION, UPDATE_BULLDOZER_POSITION, UPDATE_LAND_TYPE } from "../constants/action-types";
import SiteMap from "../components/SiteMap";

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
  bulldozerPosition: { xPos: 0, yPos: 0 },
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
      return Object.assign({}, state, {
        bulldozerDirection: action.payload
      })
    case UPDATE_BULLDOZER_POSITION:
      return Object.assign({}, state, {
        bulldozerPosition: action.payload
      })
    case UPDATE_LAND_TYPE:
      const mapCopy: string[][] = [...state.siteMap];
      mapCopy[action.payload.yPos].splice(action.payload.xPos, 1, ELandType.o);
      console.log(`landtype after cleared ${mapCopy[action.payload.yPos][action.payload.xPos]}`);
      return Object.assign({}, state, {
        siteMap: mapCopy
      })
    default:
      return state;
  }
}

export default rootReducer;