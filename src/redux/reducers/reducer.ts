import { EBulldozerDirection, ELandType, IInitialState, IReduxAction } from "../../interfaces";
import * as constants  from "../constants/action-types";

//TODO Move this to a new file
const initialState: IInitialState = {
  userCommands: [],
  siteMap: [],
  isSimulationInProgress: true,  
  bulldozerPosition: { xPos: 0, yPos: 0 },
  bulldozerDirection: EBulldozerDirection.east,
  northBorder: 0,
  southBorder: 0,
  eastBorder: 0,
  westBorder: 0,
  fuelUsed: 0,
  communicationOverhead: 0,
  paintDamage: 0
};

const rootReducer = (state = initialState,  action: IReduxAction ) => {
  //TODO
  //Fill root reducer with if statements for all actions

  switch(action.type) {
    case constants.ADD_USER_COMMAND:
      return Object.assign({}, state, {
        userCommands: state.userCommands.concat(action.payload)
      });
    case constants.UPDATE_MAP_BORDERS:
      return Object.assign({}, state, {
        eastBorder: action.payload.eastBorder,
        southBorder: action.payload.southBorder
      });
    case constants.UPDATE_SIMULATION_IN_PROGRESS:
      return Object.assign({}, state, {
        isSimulationInProgress: action.payload
      })
    case constants.UPDATE_BULLDOZER_DIRECTION:
      return Object.assign({}, state, {
        bulldozerDirection: action.payload
      })
    case constants.UPDATE_BULLDOZER_POSITION:
      return Object.assign({}, state, {
        bulldozerPosition: action.payload
      })
    case constants.UPDATE_LAND_TYPE:
      const mapCopy: string[][] = [...state.siteMap];
      mapCopy[action.payload.yPos].splice(action.payload.xPos, 1, ELandType.o);
      console.log(`landtype after cleared ${mapCopy[action.payload.yPos][action.payload.xPos]}`);
      return Object.assign({}, state, {
        siteMap: mapCopy
      })
    case constants.UPDATE_FUEL_USED:
      return Object.assign({}, state, {
        fuelUsed: state.fuelUsed + action.payload
      })
    case constants.UPDATE_PAINT_DAMAGE:
      return Object.assign({}, state, {
        paintDamage: state.paintDamage + action.payload
      })
    case constants.UPDATE_SITE_MAP:
      return Object.assign({}, state, {
        siteMap: action.payload
      }) 
    default:
      return state;
  }
}

export default rootReducer;