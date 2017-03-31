import { BoardInterface, ShapeObjectInterface, ShapeSvgInterface } from './../../types';

export class ShapeObject implements ShapeObjectInterface {
  board: BoardInterface;
  instance: ShapeSvgInterface;

  uid: string;
  updatedAt: string;
  event: {
    element: string;
  };

  constructor(board: BoardInterface, instance: ShapeSvgInterface, params: any) {
    this.board = board;
    this.instance = instance;

    this.uid = params.uid;
    this.event = params.event;
    this.updatedAt = params.updatedAt;
  }
}
