import * as deepmerge from 'deepmerge';

import {
  Options, BoardOptionsInterface, BoardOptionsCurrent, ElementAttributes,
  BoardOptionsCategory, BoardOptionsMinMax, ShapeObjectInterface
} from './../../types';

export class BoardOptions implements BoardOptionsInterface {
  width = '100%';
  height = '100%';
  current: BoardOptionsCurrent = 'Circle';
  category: BoardOptionsCategory = 'forms';
  minMax: BoardOptionsMinMax = {
    minX: 0,
    minY: 0,
    maxX: this.width,
    maxY: this.height
  };
  shape: ElementAttributes = {
    'pointer-events': 'all'
  };

  constructor(options: any = {}) {
    this.set = options;
  }

  get scribble(): boolean {
    return this.current === 'Scribble';
  }

  set set(options: any) {
    (<any>Object).assign(this, deepmerge(this, options));
  }

  canDrag(event: MouseEvent): void {}
  canResize(event: MouseEvent): void {}
  canUpdate(event: MouseEvent): void {}
  canCreate(event: MouseEvent): void {}

  created(shape: ShapeObjectInterface): void {}
  updated(shape: ShapeObjectInterface): void {}
  deleted(shape: ShapeObjectInterface): void {}
}
