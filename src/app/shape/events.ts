import { ShapeObject } from './';

import {
  BoardMainInterface, BoardOptionsInterface,
  ShapeSvgInterface, ShapeObjectInterface,
  ShapeEventsInterface, ShapeHistoryInterface,
} from './../../types';

export class ShapeEvents implements ShapeEventsInterface {
  board: BoardMainInterface;

  constructor(board: BoardMainInterface) {
    this.board = board;
  }

  get history(): ShapeHistoryInterface {
    return this.board.deps.history;
  }

  get options(): BoardOptionsInterface {
    return this.board.deps.options;
  }

  preDrag(shape: ShapeSvgInterface, e: MouseEvent): void {
    this.options.updatePre(e);
  }

  preResize(shape: ShapeSvgInterface, e: MouseEvent): void {
    this.options.updatePre(e);
    if (e.defaultPrevented) {
      shape.resize('stop');
      shape._memory._resizeHandler.update = () => {};
      delete shape._memory._resizeHandler;
    } else {
      shape.resize();
    }
  }

  create(e: MouseEvent): void {
    const shape = this.shape(e);
    this.history.add([shape], 'draw');
  }

  updatePre(e: MouseEvent): void {
    if (!e.defaultPrevented) {
      const shape = this.shape(e);
      this.history.add([shape], 'update', 'start');
    }
  }

  updatePost(e: MouseEvent): void {
    const shape = this.shape(e);
    const undo = this.history.last('undo');

    if (undo && undo.elements.length === 1 && undo.elements[0].instance.svg(null) === shape.instance.svg(null)) {
      this.options.deletePre(e);

      if (!e.defaultPrevented) {
        this.history.remove('undo');
      }
    } else {
      this.history.add([shape], 'update', 'end');
    }
  }

  private shape(e: MouseEvent): ShapeObjectInterface {
    const instance = e.target['instance'] as ShapeSvgInterface;
    return new ShapeObject(this.board, instance, { uid: instance.id() });
  }
}
