import * as deepmerge from 'deepmerge';
import { BoardMainInterface, ShapeSvgInterface, ElementInterface, ElementAttributes } from './../../types';

export class BaseElement implements ElementInterface {
  board: BoardMainInterface;
  event: MouseEvent;
  nested: ShapeSvgInterface;
  private _options: ElementAttributes;

  constructor(board: BoardMainInterface, event: MouseEvent, nested: ShapeSvgInterface, options: ElementAttributes = {}) {
    this.board = board;
    this.event = event;
    this.nested = nested;

    this.options = this.default;
    this.options = options;
  }

  get options(): ElementAttributes {
    return this._options;
  }

  set options(params: ElementAttributes) {
    this._options = deepmerge(this._options, params) as ElementAttributes;
  }

  build(): void {
    console.error('Not implemented!');
  }

  private get default(): ElementAttributes {
    const { color, strokeWidth } = this.board.deps.options;
    return { fill: color, 'stroke-width': strokeWidth, stroke: color, 'pointer-events': 'all' };
  }
}
