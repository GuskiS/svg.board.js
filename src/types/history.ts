import { BoardInterface, ShapeObjectInterface } from './';

export type HistoryStorage = 'undo'|'redo';
export type HistoryTypes = 'draw'|'update'|'remove'|'removeAll';
export type HistoryWhen = 'start'|'end';

export type HistoryAddFunction = (objects: ShapeObjectInterface[], type: HistoryTypes, when?: HistoryWhen) => void;
export type HistoryRemoveFunction = (storage: HistoryStorage) => HistoryElement;
export type HistoryLastFunction = (storage: HistoryStorage) => HistoryElement;

export class HistoryElement {
  type: HistoryTypes;
  elements: ShapeObjectInterface[];
  endElement: string;

  constructor(type: HistoryTypes, elements: ShapeObjectInterface[], endElement?: string) {
    this.type = type;
    this.elements = elements;
    this.endElement = endElement;
  }
};

export interface HistoryInterface {
  board: BoardInterface;
  undo: HistoryElement[];
  redo: HistoryElement[];

  add: HistoryAddFunction;
  remove: HistoryRemoveFunction;
  last: HistoryLastFunction;
}
