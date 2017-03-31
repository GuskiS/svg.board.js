import { Doc, G } from 'svg.js';
import { Dependencies, EventFunction } from './';

export type BoardOptionsCurrent = 'CircleEmpty';
export type BoardOptionsCategory = 'none'|'forms'|'poly';
export interface BoardOptionsMinMax { [key: string]: number|string; };

export interface BoardInterface {
  board: Doc;
  group: G;
  deps: Dependencies;
}

export interface BoardEventsInterface {
  board: BoardInterface;
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

  createPre:  EventFunction;
  createPost: EventFunction;
  updatePre:  EventFunction;
  updatePost: EventFunction;
  deletePre:  EventFunction;
  deletePost: EventFunction;
}
