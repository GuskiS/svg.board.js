import { BoardMouseType, BoardMouseInterface, BoardMainInterface } from './../../types';

export class BoardMouse implements BoardMouseInterface {
  holding: boolean;
  private _board: BoardMainInterface;
  private _currType: BoardMouseType;
  private _prevType: BoardMouseType;

  constructor(board: BoardMainInterface) {
    this._board = board;
    this._currType = 'select';
  }

  get type(): BoardMouseType {
    return this._currType;
  }

  set type(newType: BoardMouseType) {
    this._board.container.deselect();
    this._prevType = this._currType;
    this._currType = newType;
  }

  get prev(): BoardMouseType {
    return this._prevType;
  }

  get select(): boolean {
    return this._currType === 'select';
  }

  get create(): boolean {
    return this._currType === 'create';
  }

  get drawing(): boolean {
    return this._currType === 'drawing';
  }
}
