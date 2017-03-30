import { Board } from './board';
import { BoardEvents, BoardInterface, Dependencies, Mouse, ShapeObjectInterface, ContainerInterface } from './../../types';

export class Events implements BoardEvents {
  board: BoardInterface;

  constructor(board: BoardInterface) {
    this.board = board;
  }

  get mouse(): Mouse {
    return this.board.deps.mouse;
  }

  get container(): ContainerInterface {
    return this.board.deps.container;
  }

  get drawing(): ShapeObjectInterface {
    return this.container.drawing;
  }

  up(e: Event): void {
    this.mouse.holding = false;

    switch (this.mouse.type) {
      case 'draw':
        if (this.drawing.instance.draw) {
          this.drawing.instance.draw(e);
        }
        break;
      case 'stop':
        this.drawing.instance.draw('stop', e);
        this.mouse.type = this.mouse.prev;
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
        this.container.handler = this.drawing.instance.remember('_paintHandler');
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
