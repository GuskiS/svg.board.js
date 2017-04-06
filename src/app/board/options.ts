import * as deepmerge from 'deepmerge';

import {
  Options, BoardOptionsInterface, BoardOptionsCurrent, ElementAttributes,
  BoardOptionsCategory, BoardOptionsViewBox, ShapeObjectInterface
} from './../../types';

export class BoardOptions implements BoardOptionsInterface {
  current: BoardOptionsCurrent = 'Circle';
  category: BoardOptionsCategory = 'forms';
  viewBox: BoardOptionsViewBox = {
    x: 0,
    y: 0,
    width: 150,
    height: 150,
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
