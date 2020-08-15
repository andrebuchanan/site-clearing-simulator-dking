export interface IBulldozerPosition {
  xPos: number;
  yPos: number;
}

export interface ISiteMapProps {
  siteMap: string[][],
  bulldozerPosition: IBulldozerPosition
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

export interface IUserCommand {
  command: EUserCommand;
  value: number;
}

export interface ISquareProps {
  landType: string
}

export interface IReduxAction {
  type: string;
  payload: {}
}

export interface IMapBorders {
  eastBorder: number,
  southBorder: number
}