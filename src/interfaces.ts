export interface IInitialState {
  userCommands: IUserCommand[],
  siteMap: string[][],
  simulationStatus: ESimulationStatus,
  bulldozerPosition: IBulldozerPosition;
  bulldozerDirection: EBulldozerDirection,
  northBorder: number,
  southBorder: number,
  eastBorder: number,
  westBorder: number;
  fuelUsed: number;
  communicationOverhead: number;
  paintDamage: number,
  mapWidth: number,
  mapHeight: number
}

export enum ESimulationStatus {
  notStarted = "not started",
  inProgress = "in progress",
  ended = "ended"
}

export interface IBulldozerPosition {
  xPos: number;
  yPos: number;
}

export interface ISiteMapProps {
  siteMap: string[][],
  mapWidth: number,
  mapHeight: number,
  bulldozerPosition: IBulldozerPosition
}

export interface IBulldozerProps {
  bulldozerDirection: EBulldozerDirection
}

export interface ISimulatorProps {
  bulldozerPosition: IBulldozerPosition,
  bulldozerDirection: EBulldozerDirection,
  simulationStatus: ESimulationStatus
}

export interface IUserCommandProps {
  HandleUserCommandCallback(command: IUserCommand): void
}

export interface ICostSummaryProps {
  fuelUsed: number,
  siteMap: string[][],
  userCommands: IUserCommand[],
  paintDamage: number;
}

export enum EBulldozerDirection {
  north,
  east,
  south,
  west
}

export enum EUserCommand {
  advance = "advance",
  left = "left",
  right = "right",
  quit = "quit"
}

export enum ELandType {
  o = "o",  //Plain Land
  r = "r",  //Rocky Land,
  t = "t",  //Removable Tree
  T = "T",  //Preserved Tree
}

export interface IUserCommand {
  command: EUserCommand;
  value: number;
}

export interface ISquareProps {
  landType: string
}

export interface IReduxAction {
  type: string;
  payload: any
}

export interface IMapBorders {
  eastBorder: number,
  southBorder: number
}