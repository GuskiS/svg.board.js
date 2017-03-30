import { Doc } from 'svg.js';
import { BoardInterface } from './';

export interface ShapeSvgInterface extends Doc {
  updatedAt: string;
  selectize: Function;
  start: Function;
  draw: Function;
}

export interface ShapeObjectInterface {
  uid: string;
  board: BoardInterface;
  instance: ShapeSvgInterface;
  updatedAt: string;
  event: {
    element: string;
  };
}

export interface ShapeSvgContainer {
  [key: string]: ShapeSvgInterface;
}

export interface ShapeObjectContainer {
  [key: string]: ShapeObjectInterface;
}

export interface ContainerInterface {
  board: BoardInterface;
  drawing: ShapeObjectInterface;
  selected: ShapeSvgInterface;
  added: ShapeSvgContainer;

  handler: Function;
  select: Function;
  deselect: Function;
  create: Function;
}
