import { ShapeSvgInterface, BoardMainInterface } from './';

export interface ElementInterface {
  board: BoardMainInterface;
  event: Event;
  nested: ShapeSvgInterface;
  options: ElementAttributes;
  build: ShapeSvgInterface;
  shape: any;
}

export interface ElementAttributes {
  id?: string;
  fill?: string;
  stroke?: string;
  'stroke-width'?: string;
  'pointer-events'?: string;
}
