import { ShapeSvgInterface, BoardInterface } from './';

export interface ElementInterface {
  board: BoardInterface;
  event: Event;
  nested: ShapeSvgInterface;
  attrs: any;
  build: Function;
}

export interface ElementAttributes {
  id: string;
  fill: string;
  stroke: string;
  'stroke-width': string;
}
