import { Doc, G } from 'svg.js';
import { Dependencies, EventFunction, ShapeObjectInterface, ElementAttributes, ShapeContainerInterface, ShapeHistoryInterface } from './';

export type BoardMouseType = 'select'|'create'|'drawing';
export type BoardOptionsCurrent = 'Circle'|'Rect'|'Line'|'Scribble';
export type BoardOptionsCategory = 'forms'|'poly';
export type BoardOptionsPost = (shape: ShapeObjectInterface) => void;
export interface BoardOptionsMinMax { [key: string]: number|string; };

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
  width: string;
  height: string;
  current: BoardOptionsCurrent;
  category: BoardOptionsCategory;
  minMax: BoardOptionsMinMax;
  shape: ElementAttributes;

  scribble: boolean;
  set: BoardOptionsInterface;

  canDrag: EventFunction;
  canResize: EventFunction;
  canUpdate: EventFunction;
  canCreate: EventFunction;

  createPost: BoardOptionsPost;
  updatePost: BoardOptionsPost;
  deletePost: BoardOptionsPost;
}

export interface BoardMouseInterface {
  type: BoardMouseType;
  prev: BoardMouseType;

  holding: boolean;
  select: boolean;
  create: boolean;
  drawing: boolean;
}
