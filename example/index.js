var SvgBoard = require('../dist');

var options = {
  canCreate,
  canResize,
  created,
  deleted,
  updated,
  shape: {
    fill: 'none',
    stroke: '#BADA55'
  },
  viewBox: {
    width: 1200,
    height: 560
  }
};

var board = new SvgBoard.init('whiteboard', options);

var elem1 = '<ellipse id="SvgjsSvg1010ellipse1490969466984" rx="74" ry="64" cx="254" cy="244" fill="none" stroke="#bada55" stroke-width="2" pointer-events="all"></ellipse>';
var elem2 = '<ellipse id="SvgjsSvg1012ellipse1490969496941" rx="70" ry="43" cx="142" cy="419" fill="none" stroke="#bada55" stroke-width="2" pointer-events="all"></ellipse>';

// board.container.loadOne(elem1);
// board.container.loadOne(elem2);

var elems = {
  SvgjsSvg1010ellipse1490969466984: {
    id: 'SvgjsSvg1010ellipse1490969466984',
    data: elem1
  },
  SvgjsSvg1012ellipse1490969496941: {
    id: 'SvgjsSvg1012ellipse1490969496941',
    data: elem2
  },
};
board.container.loadAll(elems);

function canCreate(e) {
  // e.preventDefault();
}
function canResize(e) {
  // e.preventDefault();
}

function deleted(object) {
  delete elems[object.id];
  board.container.loadAll(elems);
}

function created(object) {
  newShape(object);
  board.container.loadAll(elems);
}

function updated(object) {
  newShape(object);
  board.container.loadAll(elems);
}

function newShape(object) {
  elems[object.id] = {
    id: object.id,
    data: object.data,
    updatedAt: Date.now()
  };
}

global.action = function(event) {
  var value = event.target.value;
  if (value === 'Hand') {
    board.mouse.type = 'select';
  } else {
    var shape = shapes[value];
    board.mouse.type = 'create';
    board.changeShape(value, shapes[value]);
  }
}

global.fill = function(event) {
  board.options = { shape: { fill: event.target.value } };
}

global.stroke = function(event) {
  board.options = { shape: { stroke: event.target.value } };
}

global.undo = function() {
  board.history.undo();
}
global.redo = function() {
  board.history.redo();
}

var shapes = {
  Rect: 'forms',
  Circle: 'forms',
  Line: 'poly',
  Scribble: 'poly'
}
