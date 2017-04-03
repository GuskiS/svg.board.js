import { BaseElement } from './base.element';
import { BoardMainInterface, ShapeSvgInterface, ElementInterface, ElementAttributes } from './../../types';

export class EmptyElement extends BaseElement {
  constructor(board: BoardMainInterface, event: MouseEvent, nested: ShapeSvgInterface, attrs: ElementAttributes) {
    super(board, event, nested, attrs);
  }

  build(): void {
    this.attrs.fill = 'none';
  }
}
