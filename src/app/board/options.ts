import * as deepmerge from 'deepmerge';

import {
  Options, BoardOptionsInterface, BoardOptionsCurrent,
  BoardOptionsCategory, BoardOptionsMinMax, ShapeObjectInterface
} from './../../types';

export class BoardOptions implements BoardOptionsInterface {
  color = '#BADA55';
  width = '100%';
  height = '100%';
  strokeWidth = '2';
  current: BoardOptionsCurrent = 'CircleEmpty';
  category: BoardOptionsCategory = 'forms';
  minMax: BoardOptionsMinMax = {
    minX: 0,
    minY: 0,
    maxX: this.width,
    maxY: this.height
  };

  constructor(options: Options = {}) {
    (<any>Object).assign(this, deepmerge(this, options));
  }

  createPre(e: Event): void {}
  updatePre(e: Event): void {}
  deletePre(e: Event): void {}
  createPost(shape: ShapeObjectInterface): void {}
  updatePost(shape: ShapeObjectInterface): void {}
  deletePost(shape: ShapeObjectInterface): void {}
}
