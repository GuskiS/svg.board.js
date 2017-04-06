import { ShapeObject, ShapeEvents, ShapeValidations } from './';
import * as ShapeElements from './../elements';
import {
  BoardMainInterface, ElementAttributes, ShapeContainerInterface,
  ShapeObjectContainer, ShapeObjectInterface, ShapeSvgContainer, ShapeSvgInterface,
} from './../../types';

export class ShapeContainer implements ShapeContainerInterface {
  added: ShapeSvgContainer = {};
  drawing: ShapeObjectInterface;
  selected: ShapeSvgInterface;
  handler: Function;

  private _events: ShapeEvents;
  private _validations: ShapeValidations;
  private _board: BoardMainInterface;

  constructor(board: BoardMainInterface) {
    this._board = board;
    this._events = new ShapeEvents(board);
    this._validations = new ShapeValidations(board);
  }

  loadOne(data: string, updatedAt: string): void {
    const nested = this._board.group.nested();
    nested.svg(data);
    this.initEvents(nested.first() as ShapeSvgInterface, updatedAt);

    const selectize = this.selectize;
    if (selectize) {
      selectize.front();
    }
  }

  loadAll(objects: ShapeObjectContainer): void {
    const newKeys = Object.keys(objects);
    const newLength = newKeys.length;
    let oldKeys = Object.keys(this.added);
    const oldLength = oldKeys.length;

    if (!newLength && oldLength) {
      this.deleteAll();
    } else if (newLength) {
      // Current shape exclude
      if (this.drawing && this.drawing.instance.node && newLength > oldLength) {
        const id = this.drawing.instance.node.id;
        oldKeys = oldKeys.filter((key) => key !== id);
      }

      this.removeOld(objects, oldKeys);
      this.addNewOrChange(objects);
    }
  }

  deleteOne(id: string): void {
    this.added[id].parent().remove();
    delete this.added[id];
  }

  deleteAll(): void {
    this._board.group.clear();
    this.added = {};
  }

  select(event: MouseEvent): void {
    if (this._board.mouse.select) {
      const shape = event.target['instance'];

      this.deselect();
      this.selected = shape
        .selectize({ radius: 10 })
        .resize()
        .draggable();

      (<any>this.selected.parent()).front();
      this.selected.remember('_draggable').start(event);
      this.moveSelectizeToParent();
    }
  }

  deselect(): void {
    if (this.selected) {
      this.selected.selectize(false).resize('stop').draggable(false);
      this.selected = null;
    }
  }

  create(event: MouseEvent): void {
    this._validations.canCreate(event, () => {
      this.drawing = this.build(event);
      this.initEvents(this.drawing.instance);
      this.drawing.instance.on('drawstop', this._events.create.bind(this._events));
    });
  }

  update(shape: ShapeSvgInterface): void {
    const event = new MouseEvent('mouseup', { cancelable: true });
    this._validations.canUpdate(event, () => {
      this._events.updatePre(event, shape);
      shape.attr(this._board.options.shape);
      this._events.updatePost(event, shape);
    });
  }

  private build(event: MouseEvent): ShapeObjectInterface {
    const Element = ShapeElements[this._board.options.current];

    if (Element) {
      const nested = this._board.group.nested() as ShapeSvgInterface;
      const shape = new Element(this._board, event, nested);
      const instance = shape.build;

      if (this._board.options.scribble) {
        instance.remember('_paintHandler').drawCircles = () => {};
      }

      shape.options = { id: nested.id() + instance.type + Date.now() };
      return new ShapeObject(instance.attr(shape.options), {});
    }
  }

  private initEvents(shape: ShapeSvgInterface, updatedAt: string = null): void {
    shape.updatedAt = updatedAt;
    this.added[shape.id()] = shape;

    shape.mousedown(this.select.bind(this));
    const { updatePre, updatePost } = this._events;

    shape.on('dragmove', this._validations.canDrag.bind(this._events));
    shape.on('resizestart', (event: MouseEvent) => {
      this._validations.canResize(event, updatePre.bind(this._events, event));
    });

    shape.on('resizedone', updatePost.bind(this._events));
    shape.on('dragstart', updatePre.bind(this._events));
    shape.on('dragend', updatePost.bind(this._events));
  }

  private moveSelectizeToParent(): void {
    const selectize = this.selectize;
    this._board.group.add(selectize);
  }

  private get selectize(): ShapeSvgInterface {
    return this.selected && this.selected.remember('_selectHandler').nested as any;
  }

  private removeOld(objects: ShapeObjectContainer, keys: string[]): void {
    keys.forEach((key: string) => {
      if (!objects[key]) {
        this.deleteOne(key);
      }
    });
  }

  private addNewOrChange(objects: ShapeObjectContainer): void {
    for (const id in objects) {
      const object = objects[id];
      const existing = this.added[object.id];

      if (!existing) {
        this.loadOne(object.data, object.updatedAt);
      } else if (!existing.updatedAt) {
        existing.updatedAt = object.updatedAt;
      } else if (object.updatedAt !== existing.updatedAt) {
        existing.parent().remove();
        this.loadOne(object.data, object.updatedAt);
      }
    }
  }
}
