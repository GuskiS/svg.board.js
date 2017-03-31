import * as SVG from 'svg.js';

import {
  BoardInterface, HistoryStorage, HistoryTypes, HistoryElement, HistoryInterface,
  ShapeObjectInterface, ShapeSvgContainer, HistoryWhen
} from './../../types';

//           undo  |  redo
// resize = update | update
// move   = update | update
// draw   = remove | draw
// remove = draw   | remove

export class History implements HistoryInterface {
  board: BoardInterface;
  undo: HistoryElement[];
  redo: HistoryElement[];

  constructor(board: BoardInterface) {
    this.board = board;
    this.redo = [];
    this.undo = [];
  }

  add(objects: ShapeObjectInterface[], type: HistoryTypes, when?: HistoryWhen): void {
    if (type === 'update' && when === 'end') {
      const historyObject = objects[0];
      // this.last('undo').endElement = historyObject.instance.svg(null);
    } else {
      this.undo.push(new HistoryElement(type, objects));
      this.redo = [];
    }
  }

  remove(storage: HistoryStorage): HistoryElement {
    return this[storage].pop();
  }

  last(storage: HistoryStorage): HistoryElement {
    const data = this[storage];
    return data[storage.length - 1];
  }

  doUndo(): void {
    if (this.undo.length) {
      const object = this.remove('undo');
      this.board.deps.container.deselect();
      this.redo.push(object);
      object.elements.forEach(this.actionUndo.bind(this, object));
    }
  }

  doRedo(): void {
    if (this.redo.length) {
      const object = this.remove('redo');
      this.board.deps.container.deselect();
      this.undo.push(object);
      object.elements.forEach(this.actionRedo.bind(this, object));
    }
  }

  private actionUndo(history: HistoryElement, object: ShapeObjectInterface): void {
    switch (history.type) {
      case 'draw':
        return this.board.deps.options.deletePost(object);
      case 'remove':
        return this.board.deps.options.createPost(object);
      case 'update':
        return this.board.deps.options.updatePost(object);
      default:
        console.error('History undo action not found:', history.type);
    }
  }

  private actionRedo(history: HistoryElement, object: ShapeObjectInterface): void {
    switch (history.type) {
      case 'draw':
        // this.board.deps.container.loadOne(object.uid);
        return this.board.deps.options.createPost(object);
      case 'remove':
        return this.board.deps.options.deletePost(object);
      case 'update':
        // endElement
        return this.board.deps.options.updatePost(object);
      default:
        console.error('History redo action not found:', history.type);
    }
  }
}
