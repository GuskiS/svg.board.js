import { BoardMainInterface, ShapeObjectInterface, ShapeSvgInterface } from './../../types';

export class ShapeObject implements ShapeObjectInterface {
  board: BoardMainInterface;
  instance: ShapeSvgInterface;

  uid: string;
  data: string;
  updatedAt: string;

  constructor(board: BoardMainInterface, instance: ShapeSvgInterface, params: any) {
    this.board = board;
    this.instance = instance;

    this.uid = params.uid;
    this.data = params.data;
    this.updatedAt = params.updatedAt;
  }
}
