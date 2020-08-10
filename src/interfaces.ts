export interface IBulldozerPosition {
  xPos: number;
  yPos: number;
}

export interface ISiteMapProps {
  siteMap: string[][],
  bulldozerPosition: IBulldozerPosition,
  bulldozerDirection: EBulldozerDirection
}

export enum EBulldozerDirection {
  north,
  east,
  south,
  west
}

export interface IUserCommand {
  command: string;
  value: number;
}