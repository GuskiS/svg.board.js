import { Doc, G } from 'svg.js';
import { Dependencies, EventFunction, ShapeObjectInterface, ElementAttributes } from './';

export type BoardMouseType = 'select'|'draw'|'stop';
export type BoardOptionsCurrent = 'Circle'|'Rect';
export type BoardOptionsCategory = 'none'|'forms'|'poly';
export type BoardOptionsPost = (shape: ShapeObjectInterface) => void;
export interface BoardOptionsMinMax { [key: string]: number|string; };

export interface BoardMainInterface {
  board: Doc;
  group: G;
  deps: Dependencies;
}

export interface BoardEventsInterface {
  board: BoardMainInterface;
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

  createPre: EventFunction;
  updatePre: EventFunction;
  deletePre: EventFunction;
  createPost: BoardOptionsPost;
  updatePost: BoardOptionsPost;
  deletePost: BoardOptionsPost;
}

export interface BoardMouseInterface {
  currType: BoardMouseType;
  prevType: BoardMouseType;

  type: BoardMouseType;
  prev: BoardMouseType;

  holding: boolean;
  select: boolean;
  draw: boolean;
  stop: boolean;
}
