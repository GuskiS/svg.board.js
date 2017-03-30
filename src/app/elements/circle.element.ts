import { EmptyElement } from './empty.element';
import { ShapeSvgInterface } from './../../types';

export class CircleEmpty extends EmptyElement {
  constructor(...args) {
    super(args[0], args[1], args[2], args[3]);
  }

  build(): ShapeSvgInterface {
    super.build();
    return this.shape.draw(this.event);
  }

  get shape(): any {
    return this.nested.ellipse();
  }
}
