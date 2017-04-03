var SvgBoard = require('../lib/index.js');

var options = {
  createPre,
  updatePre
};

var board = new SvgBoard.init('whiteboard', options);

var elem1 = '<ellipse id="SvgjsSvg1010ellipse1490969466984" rx="74" ry="64" cx="254" cy="244" fill="none" stroke="#bada55" stroke-width="2" pointer-events="all"></ellipse>';
var elem2 = '<ellipse id="SvgjsSvg1012ellipse1490969496941" rx="70" ry="43" cx="142" cy="419" fill="none" stroke="#bada55" stroke-width="2" pointer-events="all"></ellipse>';

// board.deps.container.loadOne(elem1);
// board.deps.container.loadOne(elem2);

var elems = {
  SvgjsSvg1010ellipse1490969466984: {
    data: elem1
  },
  SvgjsSvg1012ellipse1490969496941: {
    data: elem2
  },
};
board.deps.container.loadAll(elems);

function createPre(e) {
  // e.preventDefault();
}
function updatePre(e) {
  // e.preventDefault();
}

global.action = function(event) {
  var value = event.target.value;
  if (value === 'Hand') {
    board.mouse.type = 'select';
  } else {
    var shape = shapes[value];
    board.mouse.type = 'draw';
    board.changeShape(event.target.value, shape.category, shape.options);
  }
}

global.fill = function(event) {
  board.options = { shape: { fill: event.target.value } };
}

var shapes = {
  Rect: {
    category: 'forms',
    options: {
      fill: 'blue',
    }
  },
  Circle: {
    category: 'forms',
    options: {
      fill: '#BADA55',
      stroke: '#BADA55',
    }
  },
  Line: {
    category: 'poly',
    options: {
      fill: '#BADA55',
      stroke: '#BADA55',
    }
  },
  Scribble: {
    category: 'poly',
    options: {
      fill: 'none',
      stroke: 'orange',
    }
  },
}
