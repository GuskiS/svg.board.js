import { BoardMainInterface, ShapeSvgInterface, ShapeValidationsInterface } from './../../types';

export class ShapeValidations implements ShapeValidationsInterface {
  private _board: BoardMainInterface;

  constructor(board: BoardMainInterface) {
    this._board = board;
  }

  canDrag(event: MouseEvent, callback: Function = () => {}): void {
    this._board.options.canDrag(event);

    if (!event.defaultPrevented) {
      callback();
    }
  }

  // Ugly fix for resize lib
  canResize(event: MouseEvent, callback: Function = () => {}): void {
    this._board.options.canResize(event);
    const shape = this._board.container.selected;

    if (event.defaultPrevented) {
      shape.resize('stop');
      shape._memory._resizeHandler.update = () => {};
      delete shape._memory._resizeHandler;
    } else {
      shape.resize();
      callback();
    }
  }

  canUpdate(event: MouseEvent, callback: Function): void {
    this._board.options.canUpdate(event);

    if (!event.defaultPrevented) {
      callback();
    }
  }

  canCreate(event: MouseEvent, callback: Function): void {
    this._board.options.canCreate(event);

    if (!event.defaultPrevented) {
      callback();
    }
  }
}
