import { BoardMainInterface, ShapeObjectInterface, ShapeSvgInterface } from './../../types';

export class ShapeObject implements ShapeObjectInterface {
  data: string;
  updatedAt: string;
  instance: ShapeSvgInterface;

  constructor(instance: ShapeSvgInterface, params: { updatedAt?: string } = {}) {
    this.data = instance.svg(null) as any;
    this.updatedAt = params.updatedAt;
    this.instance = instance;
  }

  get id(): string {
    return this.instance.id();
  }
}
