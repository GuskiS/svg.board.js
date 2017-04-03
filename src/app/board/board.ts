import { Doc, G } from 'svg.js';
import { BoardEvents, BoardOptions, BoardMouse } from './';
import { ShapeContainer, ShapeHistory } from './../shape';
import {
  Dependencies, Options, BoardMainInterface,
  BoardMouseInterface, BoardOptionsInterface, ShapeContainerInterface, ShapeHistoryInterface
} from './../../types';

export class BoardMain implements BoardMainInterface {
  board: Doc;
  group: G;
  deps: Dependencies;

  constructor(id: string, options: Options = {}) {
    this.board = new Doc(id) as Doc;
    this.group = this.board.group();

    this.init(options);
  }

  get container(): ShapeContainerInterface {
    return this.deps.container;
  }

  get history(): ShapeHistoryInterface {
    return this.deps.history;
  }

  get mouse(): BoardMouseInterface {
    return this.deps.mouse;
  }

  get options(): any {
    return this.deps.options;
  }

  set options(options: any) {
    this.options.set = options;
  }

  private init(options: Options): void {
    this.dependencies(options);
    this.defaults();
    this.events();
  }

  private dependencies(options: Options): void {
    this.deps = {
      mouse: new BoardMouse(),
      events: new BoardEvents(this),
      options: new BoardOptions(options),
      container: new ShapeContainer(this),
      history: new ShapeHistory(this),
    };
  }

  private defaults(): void {
    const { width, height } = this.options;

    this.board.size(width, height);
    this.group.size(width, height);
  }

  private events(): void {
    const { up, down, move, leave } = this.deps.events;

    this.board.on('mouseup', up.bind(this.deps.events));
    this.board.on('mousedown', down.bind(this.deps.events));
    this.board.on('mousemove', move.bind(this.deps.events));
    this.board.on('mouseleave', leave.bind(this.deps.events));
  }
}
