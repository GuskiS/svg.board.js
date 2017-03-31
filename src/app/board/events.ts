import {
  BoardEventsInterface, BoardMainInterface, BoardMouseInterface,
  ShapeContainerInterface, ShapeObjectInterface, ShapeSvgInterface
} from './../../types';

export class BoardEvents implements BoardEventsInterface {
  board: BoardMainInterface;

  constructor(board: BoardMainInterface) {
    this.board = board;
  }

  get mouse(): BoardMouseInterface {
    return this.board.deps.mouse;
  }

  get container(): ShapeContainerInterface {
    return this.board.deps.container;
  }

  get drawing(): ShapeObjectInterface {
    return this.container.drawing;
  }

  get instance(): ShapeSvgInterface {
    return this.drawing && this.drawing.instance;
  }

  up(e: Event): void {
    this.mouse.holding = false;

    switch (this.mouse.type) {
      case 'draw':
        if (this.instance) {
          this.instance.draw(e);
        }
        break;
      case 'stop':
        if (this.instance) {
          this.instance.draw('stop', e);
          this.mouse.type = this.mouse.prev;
        }
        break;
    }
  }

  down(e: Event): void {
    this.mouse.holding = true;

    switch (this.mouse.type) {
      case 'select':
        this.container.deselect();
        break;
      case 'draw':
        this.container.create(e);
        if (this.instance) {
          this.container.handler = this.instance.remember('_paintHandler');
        }
        break;
    }
  }

  move(e: Event): void {
    // if (this.mouse.holding && this.mouse.stop) {
    //   if (['scribbleEmpty', 'scribbleFilled'].includes(this.board.deps.options.current)) {
    //     this.drawing.instance.remember('_paintHandler', this.container.handler);
    //     this.drawing.instance.draw('point', e);
    //   }
    // }
  }

  leave(e: Event): void {
    const category = this.board.deps.options.category === 'poly';
    if (category && this.drawing && this.mouse.holding) {
      this.up(e);
    }
  }
}
