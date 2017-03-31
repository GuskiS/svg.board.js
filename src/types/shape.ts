import { Doc } from 'svg.js';
import { BoardInterface, EventFunction, VoidFunction } from './';

export interface ShapeSvgInterface extends Doc {
  updatedAt: string;
  selectize: Function;
  start: Function;
  draw: Function;
}

export interface ShapeObjectInterface {
  board: BoardInterface;
  instance: ShapeSvgInterface;

  uid: string;
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

  loadOne: (data: string, updatedAt: string) => void;
  deselect: VoidFunction;
  select: EventFunction;
  create: EventFunction;
  handler: Function;
}

export interface ShapeEventsInterface {
  board: BoardInterface;
  createPre: Function;
  updatePre: Function;
  updatePost: Function;
}
