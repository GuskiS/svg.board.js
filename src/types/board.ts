import { Doc, G } from 'svg.js';
import { Dependencies, EventFunction, ShapeObjectInterface } from './';

export type BoardMouseType = 'select'|'draw'|'stop';
export type BoardOptionsCurrent = 'CircleEmpty';
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
  color: string;
  width: string;
  height: string;
  strokeWidth: string;
  current: BoardOptionsCurrent;
  category: BoardOptionsCategory;
  minMax: BoardOptionsMinMax;

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
