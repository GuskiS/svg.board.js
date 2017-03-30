import { Doc } from 'svg.js';
import { ShapeObject } from './';
import { Board } from './../board';
import * as ShapeElements from './../elements';
import {
  ShapeObjectContainer, ShapeObjectInterface, ShapeSvgContainer, ShapeSvgInterface,
  ContainerInterface, ElementAttributes
} from './../../types';

export class Container implements ContainerInterface {
  board: Board;
  added: ShapeSvgContainer = {};
  drawing: ShapeObjectInterface;
  selected: ShapeSvgInterface;
  handler: Function;

  constructor(board: Board) {
    this.board = board;
  }

  loadOne(data: string, updatedAt: string) {
    const nested = this.board.group.nested();
    nested.svg(data);
    this.events(nested.first() as ShapeSvgInterface, updatedAt);
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
      const { instance } = this.drawing;
      if (instance.node && newLength > oldLength) {
        const id = instance.node.id;
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
    this.board.group.clear();
    this.added = {};
  }

  select(e: Event): void {
    if (this.board.deps.mouse.type) {
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
      this.drawing = this.build(e);
      this.events(this.drawing.instance);
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

  private events(shape: ShapeSvgInterface, updatedAt: string = null): void {
    shape.updatedAt = updatedAt;
    this.added[shape.id()] = shape;

    // TODO: fix bug
    shape.mousedown(this.select);

    // shape.on('resizestart', whiteboardDelegate.deps.Events.shapeWillUpdate);
    // shape.on('resizedone', whiteboardDelegate.deps.Events.shapeWasUpdated);
    // shape.on('dragstart', whiteboardDelegate.deps.Events.shapeWillUpdate);
    // shape.on('dragend', whiteboardDelegate.deps.Events.shapeWasUpdated);
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
        this.loadOne(object.event.element, object.updatedAt);
      } else if (!existing.updatedAt) {
        existing.updatedAt = object.updatedAt;
      } else if (object.updatedAt !== existing.updatedAt) {
        existing.parent().remove();
        this.loadOne(object.event.element, object.updatedAt);
      }
    }
  }
}
