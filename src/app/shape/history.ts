import {
  BoardMainInterface, ShapeHistoryStorage, ShapeHistoryTypes, ShapeHistoryInterface,
  ShapeObjectInterface, ShapeSvgContainer, ShapeHistoryWhen, ShapeHistoryElementInterface
} from './../../types';

//           undo  |  redo
// resize = update | update
// move   = update | update
// draw   = remove | draw
// remove = draw   | remove

export class ShapeHistoryElement implements ShapeHistoryElementInterface {
  type: ShapeHistoryTypes;
  elements: ShapeObjectInterface[];
  endElement: string;

  constructor(type: ShapeHistoryTypes, elements: ShapeObjectInterface[], endElement?: string) {
    this.type = type;
    this.elements = elements;
    this.endElement = endElement;
  }
};

export class ShapeHistory implements ShapeHistoryInterface {
  board: BoardMainInterface;
  undo: ShapeHistoryElement[];
  redo: ShapeHistoryElement[];

  constructor(board: BoardMainInterface) {
    this.board = board;
    this.redo = [];
    this.undo = [];
  }

  add(objects: ShapeObjectInterface[], type: ShapeHistoryTypes, when?: ShapeHistoryWhen): void {
    if (type === 'update' && when === 'end') {
      const historyObject = objects[0];
      // this.last('undo').endElement = historyObject.instance.svg(null);
    } else {
      this.undo.push(new ShapeHistoryElement(type, objects));
      this.redo = [];
    }
  }

  remove(storage: ShapeHistoryStorage): ShapeHistoryElement {
    return this[storage].pop();
  }

  last(storage: ShapeHistoryStorage): ShapeHistoryElement {
    const data = this[storage];
    return data[storage.length - 1];
  }

  doUndo(): void {
    if (this.undo.length) {
      const object = this.remove('undo');
      this.board.container.deselect();
      this.redo.push(object);
      object.elements.forEach(this.actionUndo.bind(this, object));
    }
  }

  doRedo(): void {
    if (this.redo.length) {
      const object = this.remove('redo');
      this.board.container.deselect();
      this.undo.push(object);
      object.elements.forEach(this.actionRedo.bind(this, object));
    }
  }

  private actionUndo(history: ShapeHistoryElement, object: ShapeObjectInterface): void {
    switch (history.type) {
      case 'draw':
        return this.board.options.deletePost(object);
      case 'remove':
        return this.board.options.createPost(object);
      case 'update':
        return this.board.options.updatePost(object);
      default:
        console.error('History undo action not found:', history.type);
    }
  }

  private actionRedo(history: ShapeHistoryElement, object: ShapeObjectInterface): void {
    switch (history.type) {
      case 'draw':
        // this.board.container.loadOne(object.uid);
        return this.board.options.createPost(object);
      case 'remove':
        return this.board.options.deletePost(object);
      case 'update':
        // endElement
        return this.board.options.updatePost(object);
      default:
        console.error('History redo action not found:', history.type);
    }
  }
}
