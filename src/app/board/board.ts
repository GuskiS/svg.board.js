import { Doc, G } from 'svg.js';
import { BoardEvents, BoardOptions, BoardMouse } from './';
import { ShapeContainer, ShapeHistory } from './../shape';
import {
  Dependencies, Options, BoardMainInterface, BoardOptionsCurrent, BoardOptionsCategory, ElementAttributes,
  BoardMouseInterface, BoardOptionsInterface, ShapeContainerInterface, ShapeHistoryInterface
} from './../../types';

export class BoardMain implements BoardMainInterface {
  group: G;
  private _board: Doc;
  private _deps: Dependencies;

  constructor(id: string, options: Options = {}) {
    this._board = new Doc(id) as Doc;
    this.group = this._board.group();

    this.init(options);
  }

  get container(): ShapeContainerInterface {
    return this._deps.container;
  }

  get history(): ShapeHistoryInterface {
    return this._deps.history;
  }

  get mouse(): BoardMouseInterface {
    return this._deps.mouse;
  }

  get options(): any {
    return this._deps.options;
  }

  set options(options: any) {
    this.options.set = options;
    if (options.shape && this.container.selected) {
      this.container.update(this.container.selected);
    }
  }

  changeShape(current: BoardOptionsCurrent, category: BoardOptionsCategory, shape: ElementAttributes = {}): void {
    this.options = { current, category, shape };
  }

  private init(options: Options): void {
    this.dependencies(options);
    this.defaults();
    this.events();
  }

  private dependencies(options: Options): void {
    this._deps = {
      mouse: new BoardMouse(this),
      events: new BoardEvents(this),
      options: new BoardOptions(options),
      container: new ShapeContainer(this),
      history: new ShapeHistory(this),
    };
  }

  private defaults(): void {
    this._board.viewbox(this.options.viewBox);
  }

  private events(): void {
    const { up, down, move, leave } = this._deps.events;

    this._board.on('mouseup', up.bind(this._deps.events));
    this._board.on('mousedown', down.bind(this._deps.events));
    this._board.on('mousemove', move.bind(this._deps.events));
    this._board.on('mouseleave', leave.bind(this._deps.events));
  }
}
