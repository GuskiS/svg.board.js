import { BaseElement } from './base.element';
import { BoardMainInterface, ShapeSvgInterface, ElementInterface, ElementAttributes } from './../../types';

export class Scribble extends BaseElement {
  constructor(board: BoardMainInterface, event: MouseEvent, nested: ShapeSvgInterface, options: ElementAttributes = {}) {
    super(board, event, nested, options);
  }

  get shape(): any {
    this.board.mouse.type = 'drawing';
    return this.nested.polyline([0, 0]);
  }
}
