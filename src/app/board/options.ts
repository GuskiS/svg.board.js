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

  constructor(options: Options = {}) {
    this.set = options;
  }

  set set(options: Options) {
    (<any>Object).assign(this, deepmerge(this, options));
  }

  createPre(e: MouseEvent): void {}
  updatePre(e: MouseEvent): void {}
  deletePre(e: MouseEvent): void {}
  createPost(shape: ShapeObjectInterface): void {}
  updatePost(shape: ShapeObjectInterface): void {}
  deletePost(shape: ShapeObjectInterface): void {}
}
