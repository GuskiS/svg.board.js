import { BoardMainInterface, ShapeSvgInterface, ElementInterface, ElementAttributes } from './../../types';

export class BaseElement implements ElementInterface {
  board: BoardMainInterface;
  event: MouseEvent;
  nested: ShapeSvgInterface;
  attrs: ElementAttributes;

  constructor(board: BoardMainInterface, event: MouseEvent, nested: ShapeSvgInterface, attrs: ElementAttributes) {
    this.board = board;
    this.event = event;
    this.nested = nested;
    this.attrs = attrs;
  }

  build(): void {
    console.error('Not implemented!');
  }
}
