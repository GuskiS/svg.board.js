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
    'pointer-events': 'all',
    'stroke-width': '2',
    'fill': '#BADA55',
    'stroke': '#BADA55'
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

  createPre(event: MouseEvent): void {}
  updatePre(event: MouseEvent): void {}
  deletePre(event: MouseEvent): void {}
  createPost(shape: ShapeObjectInterface): void {}
  updatePost(shape: ShapeObjectInterface): void {}
  deletePost(shape: ShapeObjectInterface): void {}
}
