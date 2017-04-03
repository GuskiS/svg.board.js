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

  preDrag(shape: ShapeSvgInterface, event: MouseEvent): void {
    this.board.options.updatePre(event);
  }

  preResize(shape: ShapeSvgInterface, event: MouseEvent): void {
    this.board.options.updatePre(event);
    if (event.defaultPrevented) {
      shape.resize('stop');
      shape._memory._resizeHandler.update = () => {};
      delete shape._memory._resizeHandler;
    } else {
      shape.resize();
    }
  }

  create(event: MouseEvent): void {
    const shape = this.shape(event);
    this.board.history.add([shape], 'draw');
  }

  updatePre(event: MouseEvent): void {
    if (!event.defaultPrevented) {
      const shape = this.shape(event);
      this.board.history.add([shape], 'update', 'start');
    }
  }

  updatePost(event: MouseEvent): void {
    const shape = this.shape(event);
    const undo = this.board.history.last('undo');

    if (undo && undo.elements.length === 1 && undo.elements[0].instance.svg(null) === shape.instance.svg(null)) {
      this.board.options.deletePre(event);

      if (!event.defaultPrevented) {
        this.board.history.remove('undo');
      }
    } else {
      this.board.history.add([shape], 'update', 'end');
    }
  }

  private shape(event: MouseEvent): ShapeObjectInterface {
    const instance = event.target['instance'] as ShapeSvgInterface;
    return new ShapeObject(this.board, instance, { uid: instance.id() });
  }
}
