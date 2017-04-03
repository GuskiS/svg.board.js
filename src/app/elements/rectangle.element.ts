import { BaseElement } from './base.element';
import { BoardMainInterface, ShapeSvgInterface, ElementInterface, ElementAttributes } from './../../types';

export class Rect extends BaseElement {
  constructor(board: BoardMainInterface, event: MouseEvent, nested: ShapeSvgInterface, options: ElementAttributes = {}) {
    super(board, event, nested, options);
  }

  get shape(): any {
    return this.nested.rect();
  }
}
