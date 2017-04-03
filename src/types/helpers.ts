export type EventFunction = (event: MouseEvent) => void;
export type VoidFunction = () => void;

export interface Options {
  [key: string]: string|any;
}
