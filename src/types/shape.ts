import { Doc } from 'svg.js';
import { BoardMainInterface, EventFunction, VoidFunction } from './';

export type ShapeHistoryStorage = 'undo'|'redo';
export type ShapeHistoryTypes = 'draw'|'update'|'remove'|'removeAll';
export type ShapeHistoryWhen = 'start'|'end';

export type ShapeHistoryAddFunction = (objects: ShapeObjectInterface[], type: ShapeHistoryTypes, when?: ShapeHistoryWhen) => void;
export type ShapeHistoryRemoveFunction = (storage: ShapeHistoryStorage) => ShapeHistoryElementInterface;
export type ShapeHistoryLastFunction = (storage: ShapeHistoryStorage) => ShapeHistoryElementInterface;

export interface ShapeSvgInterface extends Doc {
  updatedAt: string;
  selectize: Function;
  start: Function;
  draw: Function;
  resize: Function;
  drawCircles: Function;
  _memory: any;
}

export interface ShapeObjectInterface {
  board: BoardMainInterface;
  instance: ShapeSvgInterface;

  uid: string;
  data: string;
  updatedAt: string;
}

export interface ShapeSvgContainer {
  [key: string]: ShapeSvgInterface;
}

export interface ShapeObjectContainer {
  [key: string]: ShapeObjectInterface;
}

export interface ShapeContainerInterface {
  board: BoardMainInterface;
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
  board: BoardMainInterface;
  create: EventFunction;
  updatePre: EventFunction;
  updatePost: EventFunction;
}

export interface ShapeHistoryElementInterface {
  type: ShapeHistoryTypes;
  elements: ShapeObjectInterface[];
  endElement: string;
}

export interface ShapeHistoryInterface {
  board: BoardMainInterface;
  undo: ShapeHistoryElementInterface[];
  redo: ShapeHistoryElementInterface[];

  add: ShapeHistoryAddFunction;
  remove: ShapeHistoryRemoveFunction;
  last: ShapeHistoryLastFunction;
}
