export default interface IBulldozerPosition {
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