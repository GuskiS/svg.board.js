import { ShapeObject } from './';

import {
  ShapeSvgInterface, BoardInterface, ShapeObjectInterface,
  ShapeEventsInterface, HistoryInterface,
  BoardOptionsInterface
} from './../../types';

export class ShapeEvents implements ShapeEventsInterface {
  board: BoardInterface;

  constructor(board: BoardInterface) {
    this.board = board;
  }

  get history(): HistoryInterface {
    return this.board.deps.history;
  }

  get options(): BoardOptionsInterface {
    return this.board.deps.options;
  }

  createPre(e: Event): void {
    this.options.createPre(e);

    if (!e.defaultPrevented) {
      const shape = this.shape(e);
      this.history.add([shape], 'draw');
    }
  }

  updatePre(e: Event): void {
    this.options.updatePre(e);

    if (!e.defaultPrevented) {
      const shape = this.shape(e);
      this.history.add([shape], 'update', 'start');
    }
  }

  updatePost(e: Event): void {
    const shape = this.shape(e);
    const undo = this.history.last('undo').elements;

    if (undo.length === 1 && undo[0].instance.svg(null) === shape.instance.svg(null)) {
      this.options.deletePre(e);

      if (!e.defaultPrevented) {
        this.history.remove('undo');
      }
    } else {
      this.history.add([shape], 'update', 'end');
    }
  }

  private shape(e: Event): ShapeObjectInterface {
    const instance = e.target['instance'] as ShapeSvgInterface;
    return new ShapeObject(this.board, instance, { uid: instance.id() });
  }
}
