import { BoardMainInterface, ShapeObjectInterface, ShapeSvgInterface } from './../../types';

export class ShapeObject implements ShapeObjectInterface {
  board: BoardMainInterface;
  instance: ShapeSvgInterface;

  id: string;
  data: string;
  updatedAt: string;

  constructor(board: BoardMainInterface, instance: ShapeSvgInterface, params: { updatedAt?: string } = {}) {
    this.board = board;
    this.instance = instance;

    this.id = instance.id();
    this.data = instance.svg(null) as any;
    this.updatedAt = params.updatedAt;
  }
}
