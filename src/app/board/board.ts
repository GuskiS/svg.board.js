import { Doc, G } from 'svg.js';
import { BoardEvents, BoardOptions, BoardMouse } from './';
import { ShapeContainer, ShapeHistory } from './../shape';
import { Dependencies, Options, BoardMainInterface } from './../../types';

export class BoardMain implements BoardMainInterface {
  board: Doc;
  group: G;
  deps: Dependencies;

  constructor(id: string, options: Options = {}) {
    this.board = new Doc(id) as Doc;
    this.group = this.board.group();

    this.init(options);
  }

  private init(options: Options): void {
    this.dependencies(options);
    this.options();
    this.events();
  }

  private dependencies(options: Options): void {
    this.deps = {};
    this.deps.mouse = new BoardMouse();
    this.deps.events = new BoardEvents(this);
    this.deps.options = new BoardOptions(options);
    this.deps.container = new ShapeContainer(this);
    this.deps.history = new ShapeHistory(this);
  }

  private options(): void {
    const { width, height } = this.deps.options;

    this.board.size(width, height);
    this.group.size(width, height);
  }

  private events(): void {
    const { events } = this.deps;
    const { up, down, move, leave } = events;

    this.board.on('mouseup', up.bind(events));
    this.board.on('mousedown', down.bind(events));
    this.board.on('mousemove', move.bind(events));
    this.board.on('mouseleave', leave.bind(events));
  }
}
