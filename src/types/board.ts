import { Doc, G } from 'svg.js';
import { Options, Dependencies } from './';

export interface BoardInterface {
  board: Doc;
  group: G;
  deps: Dependencies;
}

export interface BoardEvents {
  board: BoardInterface;
  up: Function;
  down: Function;
  move: Function;
  leave: Function;
}

export class BoardOptions {
  width: string;
  height: string;
  color: string;
  current: 'CircleEmpty';
  strokeWidth: string;
  category: 'none'|'forms'|'poly';
  minMax: {
    minX: number|string;
    minY: number|string;
    maxX: number|string;
    maxY: number|string;
  };

  constructor(options: Options) {
    const { width, height, color, current, category, strokeWidth } = options;
    const { minX, minY, maxX, maxY } = options.minMax || {} as any;

    this.width = width || '100%';
    this.height = height || '100%';
    this.color = color || 'red';
    this.current = current || 'CircleEmpty';
    this.category = category || 'none';
    this.strokeWidth = strokeWidth || '2';
    this.minMax = {
      minX: minX || 0,
      minY: minY || 0,
      maxX: maxX || this.width,
      maxY: maxY || this.height
    };
  }
}
