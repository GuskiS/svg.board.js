import {
  BoardMainInterface, ShapeHistoryStorage, ShapeHistoryTypes, ShapeHistoryInterface,
  ShapeObjectInterface, ShapeHistoryWhen, ShapeHistoryElementInterface
} from './../../types';

//           undo  |  redo
// resize = update | update
// move   = update | update
// create = delete | create
// delete = create | delete

export class ShapeHistoryElement implements ShapeHistoryElementInterface {
  shape: ShapeObjectInterface;
  prev: string;
  next: string;

  constructor(shape: ShapeObjectInterface, prev?: string, next?: string) {
    this.shape = shape;
    this.prev = prev;
    this.next = next;
  }

  swap(): void {
    const data = this.prev;
    this.prev = this.next;
    this.next = data;
  }
}

export class ShapeHistory implements ShapeHistoryInterface {
  private _board: BoardMainInterface;
  private _undo: ShapeHistoryElement[];
  private _redo: ShapeHistoryElement[];

  constructor(board: BoardMainInterface) {
    this._board = board;
    this._redo = [];
    this._undo = [];
  }

  add(object: ShapeObjectInterface, type: ShapeHistoryTypes, when?: ShapeHistoryWhen): void {
    switch (type) {
      case 'update':
        if (when === 'start') {
          this._undo.push(new ShapeHistoryElement(object, object.data));
        } else {
          this.last('undo').next = object.data;
        }
        break;
      case 'create':
        this._undo.push(new ShapeHistoryElement(object, undefined, object.data));
        break;
      case 'delete':
        this._undo.push(new ShapeHistoryElement(object, object.data, undefined));
        break;
    }

    this._redo = [];
  }

  remove(storage: ShapeHistoryStorage): ShapeHistoryElement {
    return this.storage(storage).pop();
  }

  last(storage: ShapeHistoryStorage): ShapeHistoryElement {
    const data = this.storage(storage);
    return data[data.length - 1];
  }

  undo(): void {
    this.perform('undo', 'redo');
  }

  redo(): void {
    this.perform('redo', 'undo');
  }

  perform(from: ShapeHistoryStorage, to: ShapeHistoryStorage): void {
    if (this.storage(from).length) {
      const history = this.remove(from);
      this._board.container.deselect();

      history.swap();
      this.action(history);

      this.storage(to).push(history);
    }
  }

  private storage(storage: ShapeHistoryStorage): ShapeHistoryElement[] {
    return this[`_${storage}`];
  }

  private action(history: ShapeHistoryElement): void {
    const { prev, next } = history;

    if (!prev && next) {
      this._board.options.createPost(history.shape);
    } else if (prev && !next) {
      this._board.options.deletePost(history.shape);
    } else if (prev && next) {
      this._board.container.deleteOne(history.shape.id);
      history.shape.data = history.next;
      this._board.options.updatePost(history.shape);
    }
  }
}
