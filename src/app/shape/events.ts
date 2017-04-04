import { ShapeObject } from './';
import { BoardMainInterface, ShapeSvgInterface, ShapeObjectInterface, ShapeEventsInterface } from './../../types';

export class ShapeEvents implements ShapeEventsInterface {
  board: BoardMainInterface;

  constructor(board: BoardMainInterface) {
    this.board = board;
  }

  create(event: MouseEvent): void {
    const shape = this.shape(event);
    this.board.history.add([shape], 'draw');
  }

  updatePre(event: MouseEvent): void {
    const shape = this.shape(event);
    this.board.history.add([shape], 'update', 'start');
  }

  updatePost(event: MouseEvent): void {
    const shape = this.shape(event);
    const undo = this.board.history.last('undo');

    // if (undo && undo.elements.length === 1 && undo.elements[0].instance.svg(null) === shape.instance.svg(null)) {
    //   // this.board.options.deletePre(event);
    //   //
    //   // console.error("----");
    //   // if (!event.defaultPrevented) {
    //   //   this.board.history.remove('undo');
    //   // }
    // } else {
    // }
    this.board.history.add([shape], 'update', 'end');
  }

  private shape(event: MouseEvent): ShapeObjectInterface {
    const instance = event.target['instance'] as ShapeSvgInterface;
    return new ShapeObject(this.board, instance);
  }
}
