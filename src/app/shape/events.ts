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

    if (!e.preventDefault) {
      const shape = this.shape(e);
      this.history.add([shape], 'draw');
      e['shape'] = shape;

      this.options.createPost(e);
    }
  }

  updatePre(e: Event): void {
    this.options.updatePre(e);

    const shape = this.shape(e);
    this.history.add([shape], 'update', 'start');
  }

  updatePost(e: Event): void {
    const shape = this.shape(e);
    const undo = this.history.last('undo').elements;

    if (undo.length === 1 && undo[0].instance.svg(null) === shape.instance.svg(null)) {
      this.options.deletePre(e);

      if (!e.preventDefault) {
        this.history.remove('undo');
        this.options.deletePost(e);
      }
    } else {
      this.history.add([shape], 'update', 'end');
      this.options.updatePost(e);
    }
  }

  private shape(e: Event): ShapeObjectInterface {
    const instance = e.target['instance'] as ShapeSvgInterface;
    return new ShapeObject(this.board, instance, { uid: instance.id() });
  }
}
