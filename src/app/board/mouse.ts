import { BoardMouseType, BoardMouseInterface } from './../../types';

export class BoardMouse implements BoardMouseInterface {
  currType: BoardMouseType;
  prevType: BoardMouseType;
  holding: boolean;

  constructor() {
    this.currType = 'draw';
  }

  get type(): BoardMouseType {
    return this.currType;
  }

  set type(newType: BoardMouseType) {
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
