import { BoardEventsInterface, BoardMainInterface, ShapeObjectInterface, ShapeSvgInterface } from './../../types';

export class BoardEvents implements BoardEventsInterface {
  private _board: BoardMainInterface;

  constructor(board: BoardMainInterface) {
    this._board = board;
  }

  up(event: MouseEvent): void {
    this._board.mouse.holding = false;

    switch (this._board.mouse.type) {
      case 'create':
        if (this.instance) {
          this.instance.draw(event);
        }
        break;
      case 'drawing':
        if (this.instance) {
          this.instance.draw('stop', event);
          this._board.mouse.type = this._board.mouse.prev;
        }
        break;
    }
  }

  down(event: MouseEvent): void {
    this._board.mouse.holding = true;

    switch (this._board.mouse.type) {
      case 'select':
        this._board.container.deselect();
        break;
      case 'create':
        this._board.container.create(event);
        if (this.instance) {
          this._board.container.handler = this.instance.remember('_paintHandler');
        }
        break;
    }
  }

  move(event: MouseEvent): void {
    if (this._board.mouse.holding && this._board.mouse.drawing && this._board.options.scribble) {
      this.drawing.instance.remember('_paintHandler', this._board.container.handler);
      this.drawing.instance.draw('point', event);
    }
  }

  leave(event: MouseEvent): void {
    const category = this._board.options.category === 'poly';
    if (category && this.drawing && this._board.mouse.holding) {
      this.up(event);
    }
  }

  private get drawing(): ShapeObjectInterface {
    return this._board.container.drawing;
  }

  private get instance(): ShapeSvgInterface {
    return this.drawing && this.drawing.instance;
  }
}
