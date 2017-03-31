import { ShapeObject, ShapeEvents } from './';
import * as ShapeElements from './../elements';
import {
  BoardMainInterface, ElementAttributes, ShapeContainerInterface,
  ShapeObjectContainer, ShapeObjectInterface, ShapeSvgContainer, ShapeSvgInterface,
} from './../../types';

export class ShapeContainer implements ShapeContainerInterface {
  events: ShapeEvents;
  board: BoardMainInterface;
  added: ShapeSvgContainer = {};
  drawing: ShapeObjectInterface;
  selected: ShapeSvgInterface;
  handler: Function;

  constructor(board: BoardMainInterface) {
    this.board = board;
    this.events = new ShapeEvents(board);
  }

  loadOne(data: string, updatedAt: string): void {
    const nested = this.board.group.nested();
    nested.svg(data);
    this.initEvents(nested.first() as ShapeSvgInterface, updatedAt);
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
      if (this.drawing) {
        if (this.drawing.instance.node && newLength > oldLength) {
          const id = this.drawing.instance.node.id;
          oldKeys = oldKeys.filter((key) => key !== id);
        }
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
    this.board.group.clear();
    this.added = {};
  }

  select(e: Event): void {
    if (this.board.deps.mouse.select) {
      const shape = e.target['instance'];
      const current = this.selected && this.selected.id() !== shape.id(); // IE fix

      if (shape && (!this.selected || current)) {
        this.deselect();

        this.selected = shape
          .selectize({ radius: 10 })
          .resize(this.board.deps.options.minMax)
          .draggable();

        this.selected.remember('_draggable').start(e);
        this.moveSelectizeToParent();
      }
    }
  }

  deselect(): void {
    if (this.selected) {
      this.selected.selectize(false).resize('stop').draggable(false);
      this.selected = null;
    }
  }

  create(e: Event): void {
    if (e) {
      this.board.deps.options.createPre(e);

      if (!e.defaultPrevented) {
        this.drawing = this.build(e);
        this.initEvents(this.drawing.instance);
        this.drawing.instance.on('drawstop', this.events.create.bind(this.events));
      }
    }
  }

  private build(e: Event): ShapeObjectInterface {
    const { current, color, strokeWidth } = this.board.deps.options;
    const Element = ShapeElements[current];

    if (Element) {
      const nested = this.board.group.nested();
      const attrs = { fill: color, 'stroke-width': strokeWidth, stroke: color } as ElementAttributes;
      const shape = new Element(this.board, e, nested, attrs).build();

      attrs.id = nested.id() + shape.type + Date.now();
      return new ShapeObject(this.board, shape.attr(attrs), {});
    }
  }

  private initEvents(shape: ShapeSvgInterface, updatedAt: string = null): void {
    shape.updatedAt = updatedAt;
    this.added[shape.id()] = shape;

    shape.mousedown(this.select.bind(this));
    const { updatePre, updatePost } = this.events;

    shape.on('resizestart', updatePre.bind(this.events));
    shape.on('resizedone', updatePost.bind(this.events));
    shape.on('dragstart', updatePre.bind(this.events));
    shape.on('dragend', updatePost.bind(this.events));
  }

  private moveSelectizeToParent(): void {
    // const selectize = this.selected.remember('_selectHandler').nested;
    // this.board.group.add(selectize);
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
      const existing = this.added[object.uid];

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
