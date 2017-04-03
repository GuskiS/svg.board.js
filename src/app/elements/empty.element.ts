import { BaseElement } from './base.element';
import { BoardMainInterface, ShapeSvgInterface, ElementInterface, ElementAttributes } from './../../types';

export class EmptyElement extends BaseElement {
  constructor(board: BoardMainInterface, event: MouseEvent, nested: ShapeSvgInterface, options: ElementAttributes = {}) {
    super(board, event, nested, options);
  }

  build(): void {
    this.options = { fill: 'none' };
  }
}
