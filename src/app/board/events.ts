import {
  BoardEventsInterface, BoardMainInterface, BoardMouseInterface,
  ShapeContainerInterface, ShapeObjectInterface, ShapeSvgInterface
} from './../../types';

export class BoardEvents implements BoardEventsInterface {
  board: BoardMainInterface;

  constructor(board: BoardMainInterface) {
    this.board = board;
  }

  up(event: MouseEvent): void {
    this.board.mouse.holding = false;

    switch (this.board.mouse.type) {
      case 'draw':
        if (this.instance) {
          this.instance.draw(event);
        }
        break;
      case 'stop':
        if (this.instance) {
          this.instance.draw('stop', event);
          this.board.mouse.type = this.board.mouse.prev;
        }
        break;
    }
  }

  down(event: MouseEvent): void {
    this.board.mouse.holding = true;

    switch (this.board.mouse.type) {
      case 'select':
        this.board.container.deselect();
        break;
      case 'draw':
        this.board.container.create(event);
        if (this.instance) {
          this.board.container.handler = this.instance.remember('_paintHandler');
        }
        break;
    }
  }

  move(event: MouseEvent): void {
    // if (this.board.mouse.holding && this.board.mouse.stop) {
    //   if (['scribbleEmpty', 'scribbleFilled'].includes(this.board.options.current)) {
    //     this.drawing.instance.remember('_paintHandler', this.board.container.handler);
    //     this.drawing.instance.draw('point', e);
    //   }
    // }
  }

  leave(event: MouseEvent): void {
    const category = this.board.options.category === 'poly';
    if (category && this.drawing && this.board.mouse.holding) {
      this.up(event);
    }
  }

  private get drawing(): ShapeObjectInterface {
    return this.board.container.drawing;
  }

  private get instance(): ShapeSvgInterface {
    return this.drawing && this.drawing.instance;
  }
}
