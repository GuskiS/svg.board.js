import { Doc } from 'svg.js';
import { BoardMainInterface, EventFunction, VoidFunction } from './';

export type ShapeHistoryStorage = 'undo'|'redo';
export type ShapeHistoryTypes = 'create'|'update'|'delete';
export type ShapeHistoryWhen = 'start'|'end';
export type ShapeValidationFunction = (event: MouseEvent, callback: Function) => void;

export type ShapeHistoryAddFunction = (objects: ShapeObjectInterface, type: ShapeHistoryTypes, when?: ShapeHistoryWhen) => void;
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
  id: string;
  data: string;
  updatedAt: string;
  instance: ShapeSvgInterface;
}

export interface ShapeSvgContainer {
  [key: string]: ShapeSvgInterface;
}

export interface ShapeObjectContainer {
  [key: string]: ShapeObjectInterface;
}

export interface ShapeContainerInterface {
  drawing: ShapeObjectInterface;
  selected: ShapeSvgInterface;
  added: ShapeSvgContainer;

  loadOne: (data: string, updatedAt: string) => void;
  deselect: VoidFunction;
  select: EventFunction;
  create: EventFunction;
  update: (shape: ShapeSvgInterface) => void;
  deleteOne: (id: string) => void;
  handler: Function;
}

export interface ShapeEventsInterface {
  create: EventFunction;
  updatePre: EventFunction;
  updatePost: EventFunction;
}

export interface ShapeHistoryElementInterface {
  shape: ShapeObjectInterface;
  prev: string;
  next: string;
  swap: () => void;
}

export interface ShapeValidationsInterface {
  canDrag: ShapeValidationFunction;
  canResize: ShapeValidationFunction;
  canUpdate: ShapeValidationFunction;
  canCreate: ShapeValidationFunction;
}

export interface ShapeHistoryInterface {
  undo: () => void;
  redo: () => void;

  add: ShapeHistoryAddFunction;
  remove: ShapeHistoryRemoveFunction;
  last: ShapeHistoryLastFunction;
}
