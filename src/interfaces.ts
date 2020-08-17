export interface IInitialState {
  userCommands: IUserCommand[],
  siteMap: string[][],
  isSimulationInProgress: boolean,
  bulldozerPosition: IBulldozerPosition;
  bulldozerDirection: EBulldozerDirection,
  northBorder: number,
  southBorder: number,
  eastBorder: number,
  westBorder: number;
  fuelUsed: number;
  communicationOverhead: number;
  paintDamage: number
}

export interface IBulldozerPosition {
  xPos: number;
  yPos: number;
}

export interface ISiteMapProps {
  siteMap: string[][],
  bulldozerPosition: IBulldozerPosition
}

export interface IBulldozerProps {
  bulldozerPosition: IBulldozerPosition,
  bulldozerDirection: EBulldozerDirection
}

export interface ISimulatorProps {
  bulldozerDirection: EBulldozerDirection,
  isSimulationInProgress: boolean
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
  advance,
  left,
  right,
  quit
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