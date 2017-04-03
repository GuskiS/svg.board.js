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

    console.error(this.board.deps.options);
    this.options = this.default;
    this.options = options;
  }

  get options(): ElementAttributes {
    return this._options;
  }

  set options(params: ElementAttributes) {
    this._options = deepmerge(this._options, params) as ElementAttributes;
  }

  get build(): ShapeSvgInterface {
    return this.shape.draw(this.event);
  }

  get shape(): any {
    return;
  }

  private get default(): ElementAttributes {
    return this.board.deps.options.shape;
  }
}
