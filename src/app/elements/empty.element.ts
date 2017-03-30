import { BaseElement } from './base.element';

export class EmptyElement extends BaseElement {
  constructor(...args) {
    super(args[0], args[1], args[2], args[3]);
  }

  build(): void {
    this.attrs.fill = 'none';
  }
}
