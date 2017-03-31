import { ShapeSvgInterface, BoardInterface } from './';

export interface ElementInterface {
  board: BoardInterface;
  event: Event;
  nested: ShapeSvgInterface;
  attrs: any;
  build: () => ShapeSvgInterface|void;
}

export interface ElementAttributes {
  id: string;
  fill: string;
  stroke: string;
  'stroke-width': string;
}
