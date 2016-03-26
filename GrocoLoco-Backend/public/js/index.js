var svgCanvas = document.querySelector('svg'),
  svgNS = 'http://www.w3.org/2000/svg',
  rectangles = [];
  var x = 0, y = 0;

function Rectangle(x, y, w, h, svgCanvas) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.stroke = 5;
  this.el = document.createElementNS(svgNS, 'rect');
  this.el.setAttribute('id', rectangles.length)
  this.el.setAttribute('class', 'click-nav')
  this.el.setAttribute('data-index', rectangles.length);
  this.el.setAttribute('class', 'edit-rectangle');
  rectangles.push(this);

  this.draw();
  svgCanvas.appendChild(this.el);
}

Rectangle.prototype.draw = function() {
  this.el.setAttribute('x', this.x + this.stroke / 2);
  this.el.setAttribute('y', this.y + this.stroke / 2);
  this.el.setAttribute('width', this.w - this.stroke);
  this.el.setAttribute('height', this.h - this.stroke);
  this.el.setAttribute('stroke-width', this.stroke);
}

interact('.edit-rectangle')
  // change how interact gets the
  // dimensions of '.edit-rectangle' elements
  // .rectChecker(function(element) {
  //   // find the Rectangle object that the element belongs to
  //   var rectangle = rectangles[element.getAttribute('data-index')];

  //   // return a suitable object for interact.js
  //   return {
  //     left: rectangle.x,
  //     top: rectangle.y,
  //     right: rectangle.x + rectangle.w,
  //     bottom: rectangle.y + rectangle.h
  //   };
  // })
  .on('doubletap', function(event){
    // console.log(event)
    // console.log('Adding items')
    event.currentTarget.classList.toggle('switch-bg');
    event.preventDefault();
    // console.log(event.currentTarget)
    blox = event.currentTarget.id
    // $("#modal").modal()
    // console.log(this)
  })
  .inertia({
    // don't jump to the resume location
    // https://github.com/taye/interact.js/issues/13
    zeroResumeDelta: true
  })
  .restrict({
    // restrict to a parent element that matches this CSS selector
    drag: 'svg',
    // only restrict before ending the drag
    endOnly: true,
    // consider the element's dimensions when restricting
    elementRect: {
      top: 0,
      left: 0,
      bottom: 1,
      right: 1
    }
  })
  .draggable({
    // snap: {
    //       targets: [
    //         interact.snap({ x: 10, y: 10 })
    //       ],
    //       range: Infinity,
    //       relativePoints: [ { x: 0, y: 0 } ]
    //     },
    max: Infinity
    // onmove: function(event) {
    //   var rectangle = rectangles[event.target.getAttribute('data-index')];
    //   console.log(rectangle)
    //   rectangle.x += event.dx;
    //   rectangle.y += event.dy;
    //   console.log(rectangle)

    //   rectangle.draw();
    // }
  }).on('dragmove', function(event){
    x += event.dx;
    y += event.dy;

    event.target.style.webkitTransform =
    event.target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';
  })
  .resizable({
    max: Infinity,
    onmove: function(event) {
      var rectangle = rectangles[event.target.getAttribute('data-index')];
      console.log(rectangle)

      rectangle.w = Math.max(rectangle.w + event.dx, 10);
      rectangle.h = Math.max(rectangle.h + event.dy, 10);
      rectangle.draw();
    }
  });

interact.maxInteractions(Infinity);
var i = 0;
for ( i = 0; i < 0; i++) {
  new Rectangle(50 + 100 * i, 80, 80, 80, svgCanvas);
}

function addShape(){
  new Rectangle(50 + 100 * i, 90, 90, 90, svgCanvas);
  i++
}


interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '#yes-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active');
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target');
    draggableElement.classList.add('can-drop');
    draggableElement.textContent = 'Dragged in';
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('can-drop');
    event.relatedTarget.textContent = 'Dragged out';
  },
  ondrop: function (event) {
    event.relatedTarget.textContent = 'Dropped';
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
  }
});

