import { ShapeSvgInterface, BoardMainInterface } from './';

export interface ElementInterface {
  board: BoardMainInterface;
  event: Event;
  nested: ShapeSvgInterface;
  attrs: ElementAttributes;
  build: () => ShapeSvgInterface|void;
}

export interface ElementAttributes {
  id: string;
  fill: string;
  stroke: string;
  'stroke-width': string;
}
