import { BoardMouseInterface, BoardEventsInterface, BoardOptionsInterface, ShapeContainerInterface, ShapeHistoryInterface } from './index';

export interface Dependencies {
  mouse?: BoardMouseInterface;
  events?: BoardEventsInterface;
  options?: BoardOptionsInterface;
  container?: ShapeContainerInterface;
  history?: ShapeHistoryInterface;
}
