import { Mouse, BoardEventsInterface, BoardOptionsInterface, ContainerInterface, HistoryInterface } from './index';

export interface Dependencies {
  mouse?: Mouse;
  events?: BoardEventsInterface;
  options?: BoardOptionsInterface;
  container?: ContainerInterface;
  history?: HistoryInterface;
}
