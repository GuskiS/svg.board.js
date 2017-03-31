export type EventFunction = (e: Event) => void;
export type VoidFunction = () => void;

export interface Options {
  [key: string]: string|any;
}
