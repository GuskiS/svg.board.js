import { Board } from './../board';
import { ShapeObjectInterface, ShapeSvgInterface } from './../../types';

export class ShapeObject implements ShapeObjectInterface {
  board: Board;
  instance: ShapeSvgInterface;

  uid: string;
  updatedAt: string;
  event: {
    element: string;
  };

  constructor(board: Board, instance: ShapeSvgInterface, params: any) {
    this.board = board;
    this.instance = instance;

    this.uid = params.uid;
    this.event = params.event;
    this.updatedAt = params.updatedAt;
  }
}
