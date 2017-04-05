import { ShapeObject } from './';
import { BoardMainInterface, ShapeSvgInterface, ShapeObjectInterface, ShapeEventsInterface } from './../../types';

export class ShapeEvents implements ShapeEventsInterface {
  private _board: BoardMainInterface;

  constructor(board: BoardMainInterface) {
    this._board = board;
  }

  create(event: MouseEvent): void {
    const shape = this.shape(event);
    this._board.history.add(shape, 'create');
  }

  updatePre(event: MouseEvent, instance?: ShapeSvgInterface): void {
    const shape = this.shape(event, instance);
    this._board.history.add(shape, 'update', 'start');
  }

  updatePost(event: MouseEvent, instance?: ShapeSvgInterface): void {
    const shape = this.shape(event, instance);
    this._board.history.add(shape, 'update', 'end');
  }

  private shape(event: MouseEvent, instance?: ShapeSvgInterface): ShapeObjectInterface {
    instance = instance || event.target['instance'] as ShapeSvgInterface;
    return new ShapeObject(instance);
  }
}
