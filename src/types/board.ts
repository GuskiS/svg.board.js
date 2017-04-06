import { Doc, G } from 'svg.js';
import { Dependencies, EventFunction, ShapeObjectInterface, ElementAttributes, ShapeContainerInterface, ShapeHistoryInterface } from './';

export type BoardMouseType = 'select'|'create'|'drawing';
export type BoardOptionsCurrent = 'Circle'|'Rect'|'Line'|'Scribble';
export type BoardOptionsCategory = 'forms'|'poly';
export type BoardOptionsPost = (shape: ShapeObjectInterface) => void;
export interface BoardOptionsViewBox { [key: string]: number; };

export interface BoardMainInterface {
  group: G;
  mouse: BoardMouseInterface;
  options: BoardOptionsInterface;
  container: ShapeContainerInterface;
  history: ShapeHistoryInterface;
}

export interface BoardEventsInterface {
  up: EventFunction;
  down: EventFunction;
  move: EventFunction;
  leave: EventFunction;
}

export interface BoardOptionsInterface {
  current: BoardOptionsCurrent;
  category: BoardOptionsCategory;
  viewBox: BoardOptionsViewBox;
  shape: ElementAttributes;

  scribble: boolean;
  set: BoardOptionsInterface;

  canDrag: EventFunction;
  canResize: EventFunction;
  canUpdate: EventFunction;
  canCreate: EventFunction;

  created: BoardOptionsPost;
  updated: BoardOptionsPost;
  deleted: BoardOptionsPost;
}

export interface BoardMouseInterface {
  type: BoardMouseType;
  prev: BoardMouseType;

  holding: boolean;
  select: boolean;
  create: boolean;
  drawing: boolean;
}
