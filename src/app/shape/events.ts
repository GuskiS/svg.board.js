import { ShapeObject } from './';
import { BoardMainInterface, ShapeSvgInterface, ShapeObjectInterface, ShapeEventsInterface } from './../../types';

export class ShapeEvents implements ShapeEventsInterface {
  board: BoardMainInterface;

  constructor(board: BoardMainInterface) {
    this.board = board;
  }

  create(event: MouseEvent): void {
    const shape = this.shape(event);
    this.board.history.add(shape, 'draw');
  }

  updatePre(event: MouseEvent, instance?: ShapeSvgInterface): void {
    const shape = this.shape(event, instance);
    this.board.history.add(shape, 'update', 'start');
  }

  updatePost(event: MouseEvent, instance?: ShapeSvgInterface): void {
    const shape = this.shape(event, instance);
    this.board.history.add(shape, 'update', 'end');
  }

  private shape(event: MouseEvent, instance?: ShapeSvgInterface): ShapeObjectInterface {
    instance = instance || event.target['instance'] as ShapeSvgInterface;
    return new ShapeObject(this.board, instance);
  }
}
