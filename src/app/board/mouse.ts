import { BoardMouseType, BoardMouseInterface, BoardMainInterface } from './../../types';

export class BoardMouse implements BoardMouseInterface {
  board: BoardMainInterface;
  currType: BoardMouseType;
  prevType: BoardMouseType;
  holding: boolean;

  constructor(board: BoardMainInterface) {
    this.board = board;
    this.currType = 'select';
  }

  get type(): BoardMouseType {
    return this.currType;
  }

  set type(newType: BoardMouseType) {
    this.board.container.deselect();
    this.prevType = this.currType;
    this.currType = newType;
  }

  get prev(): BoardMouseType {
    return this.prevType;
  }

  get select(): boolean {
    return this.currType === 'select';
  }

  get draw(): boolean {
    return this.currType === 'draw';
  }

  get stop(): boolean {
    return this.currType === 'stop';
  }
}
