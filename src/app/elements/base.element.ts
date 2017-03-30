import { BoardInterface, ShapeSvgInterface, ElementInterface, ElementAttributes } from './../../types';

export class BaseElement implements ElementInterface {
  board: BoardInterface;
  event: Event;
  nested: ShapeSvgInterface;
  attrs: ElementAttributes;

  constructor(board: BoardInterface, event: Event, nested: ShapeSvgInterface, attrs: ElementAttributes) {
    this.board = board;
    this.event = event;
    this.nested = nested;
    this.attrs = attrs;
  }

  build(): void {
    console.error('Not implemented!');
  }
}
