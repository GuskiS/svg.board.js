export type MouseType = 'select'|'draw'|'stop';

export class Mouse {
  currType: MouseType;
  prevType: MouseType;
  holding: boolean;

  constructor() {
    this.currType = 'draw';
  }

  get prev(): MouseType {
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

  get type(): MouseType {
    return this.currType;
  }

  set type(newType: MouseType) {
    this.prevType = this.currType;
    this.currType = newType;
  }
}
