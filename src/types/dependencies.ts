import { Mouse, BoardEvents, BoardOptions, ContainerInterface } from './index';

export interface Dependencies {
  mouse?: Mouse;
  events?: BoardEvents;
  options?: BoardOptions;
  container?: ContainerInterface;
}
