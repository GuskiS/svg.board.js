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
      this.last('undo').endElement = objects[0].data;
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
    return data[data.length - 1];
  }

  doUndo(): void {
    if (this.undo.length) {
      const object = this.remove('undo');
      this.board.container.deselect();
      this.redo.push(object);
      object.elements.forEach(this.actionUndo.bind(this, object));
      console.error('doUndo', this.undo, this.redo);
    }
  }

  doRedo(): void {
    if (this.redo.length) {
      const object = this.remove('redo');
      this.board.container.deselect();
      this.undo.push(object);
      object.elements.forEach(this.actionRedo.bind(this, object));
      console.error('doRedo', this.undo, this.redo);
    }
  }

  private actionUndo(history: ShapeHistoryElement, object: ShapeObjectInterface): void {
    console.error(history.type, 'undo');
    switch (history.type) {
      case 'draw':
        return this.board.options.deletePost(object);
      case 'remove':
        return this.board.options.createPost(object);
      case 'update':
        console.error(history.endElement === object.data);
        this.board.container.deleteOne(object.id);
        return this.board.options.updatePost(object);
      default:
        console.error('History undo action not found:', history.type);
    }
  }

  private actionRedo(history: ShapeHistoryElement, object: ShapeObjectInterface): void {
    console.error(history.type, 'redo');
    switch (history.type) {
      case 'draw':
        // this.board.container.loadOne(object.uid);
        return this.board.options.createPost(object);
      case 'remove':
        return this.board.options.deletePost(object);
      case 'update':
        // endElement
        this.board.container.deleteOne(object.id);
        object.data = history.endElement;
        return this.board.options.updatePost(object);
      default:
        console.error('History redo action not found:', history.type);
    }
  }
}
