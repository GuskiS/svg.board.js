import { EmptyElement } from './empty.element';
import { BoardMainInterface, ShapeSvgInterface, ElementInterface, ElementAttributes } from './../../types';

export class CircleEmpty extends EmptyElement {
  constructor(board: BoardMainInterface, event: MouseEvent, nested: ShapeSvgInterface, attrs: ElementAttributes) {
    super(board, event, nested, attrs);
  }

  build(): ShapeSvgInterface {
    super.build();
    return this.shape.draw(this.event);
  }

  get shape(): any {
    return this.nested.ellipse();
  }
}
