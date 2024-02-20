// If web successfully connects
console.log("Web successfully connects");

// loader
var loader = document.querySelector(".loader");
window.addEventListener("load", vanish);
function vanish() {
  loader.classList.add("loader-hidden");
}

// back to top
const backToTopButton = document.querySelector("#back-to-top-btn");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  if (window.pageYOffset > 300) {
    // Show backToTopButton
    if (!backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnExit");
      backToTopButton.classList.add("btnEntrance");
      backToTopButton.style.display = "block";
    }
  } else {
    // Hide backToTopButton
    if (backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnEntrance");
      backToTopButton.classList.add("btnExit");
      setTimeout(function () {
        backToTopButton.style.display = "none";
      }, 250);
    }
  }
}

backToTopButton.addEventListener("click", smoothScrollBackToTop);

function smoothScrollBackToTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 750;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}

// smooth scrolling
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const section = document.querySelector(link.getAttribute("href"));
    section.scrollIntoView({ behavior: "smooth" });
  });
});

// make scroll effect from left to right
const observerleft = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show-left");
    } else {
      entry.target.classList.remove("show-left");
    }
  });
});

const hiddenElementsleft = document.querySelectorAll(".hidden-left");
hiddenElementsleft.forEach((el) => observerleft.observe(el));

// make scroll effect from right to left
const observerRight = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show-right");
    } else {
      entry.target.classList.remove("show-right");
    }
  });
});

const hiddenElementsRight = document.querySelectorAll(".hidden-right");
hiddenElementsRight.forEach((el) => observerRight.observe(el));

// mouse effect code
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colorss = ["#ffffff"];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colorss[index % colorss.length];
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();

// cloud effect
(function () {
  var lastTime = 0;
  var vendors = ["ms", "moz", "webkit", "o"];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    window.cancelRequestAnimationFrame = window[vendors[x] + "CancelRequestAnimationFrame"];
  }
  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
})();

var layers = [],
  objects = [],
  world = document.getElementById("world"),
  viewport = document.getElementById("viewport"),
  d = 0,
  p = 400,
  worldXAngle = 0,
  worldYAngle = 0;

viewport.style.webkitPerspective = p;
viewport.style.MozPerspective = p;
viewport.style.oPerspective = p;

generate();

function createCloud() {
  var div = document.createElement("div");
  div.className = "cloudBase";
  var x = 256 - Math.random() * 512;
  var y = 256 - Math.random() * 512;
  var z = 256 - Math.random() * 512;
  var t = "translateX( " + x + "px ) translateY( " + y + "px ) translateZ( " + z + "px )";
  div.style.webkitTransform = div.style.MozTransform = div.style.msTransform = div.style.oTransform = div.style.transform = t;
  world.appendChild(div);

  for (var j = 0; j < 5 + Math.round(Math.random() * 10); j++) {
    var cloud = document.createElement("div");
    cloud.style.opacity = 0;
    cloud.style.opacity = 0.8;
    cloud.className = "cloudLayer";

    var x = 256 - Math.random() * 512;
    var y = 256 - Math.random() * 512;
    var z = 100 - Math.random() * 200;
    var a = Math.random() * 360;
    var s = 0.25 + Math.random();
    x *= 0.2;
    y *= 0.2;
    cloud.data = {
      x: x,
      y: y,
      z: z,
      a: a,
      s: s,
      speed: 0.1 * Math.random(),
    };
    var t = "translateX( " + x + "px ) translateY( " + y + "px ) translateZ( " + z + "px ) rotateZ( " + a + "deg ) scale( " + s + " )";
    cloud.style.webkitTransform = cloud.style.MozTransform = cloud.style.msTransform = cloud.style.oTransform = cloud.style.transform = t;

    div.appendChild(cloud);
    layers.push(cloud);
  }

  return div;
}

viewport.addEventListener("mousewheel", onContainerMouseWheel);
viewport.addEventListener("DOMMouseScroll", onContainerMouseWheel);

viewport.addEventListener("mousemove", function (e) {
  worldYAngle = -(0.5 - e.clientX / viewport.clientWidth) * 180;
  worldXAngle = (0.5 - e.clientY / viewport.clientWidth) * 180;
  updateView();
});

function generate() {
  objects = [];
  if (world.hasChildNodes()) {
    while (world.childNodes.length >= 1) {
      world.removeChild(world.firstChild);
    }
  }
  for (var j = 0; j < 5; j++) {
    objects.push(createCloud());
  }
}

function updateView() {
  var t = "translateZ( " + d + "px ) rotateX( " + worldXAngle + "deg) rotateY( " + worldYAngle + "deg)";
  world.style.webkitTransform = world.style.MozTransform = world.style.msTranform = world.style.oTransform = world.style.transform = t;
}

function onContainerMouseWheel(event) {
  event = event ? event : window.event;
  d = d - (event.detail ? event.detail * -5 : event.wheelDelta / 8);
  updateView();
}

function update() {
  for (var j = 0; j < layers.length; j++) {
    var layer = layers[j];
    layer.data.a += layer.data.speed;
    var t =
      "translateX( " +
      layer.data.x +
      "px ) translateY( " +
      layer.data.y +
      "px ) translateZ( " +
      layer.data.z +
      "px ) rotateY( " +
      -worldYAngle +
      "deg ) rotateX( " +
      -worldXAngle +
      "deg ) rotateZ( " +
      layer.data.a +
      "deg ) scale( " +
      layer.data.s +
      ")";
    layer.style.webkitTransform = layer.style.MozTransform = layer.style.msTranform = layer.style.oTransform = layer.style.transform = t;
  }

  requestAnimationFrame(update);
}

update();

// earth 3d
var scene;

settings = {
  POINTS: 200,
  RADIUS: 200,
  ROTATION: 0.006,
  MAX_SPEED: 2,
  FOV: 800,
  Z_MAX: 388,
  MAX_SPEED: 0.015,
  MAX_FORCE: 0.1,
  MAX_SIZE: 5,
  DESIRED_SEPARATION: 0.5,
  NEIGHBOR_RADIUS: 50,
  SEPARATION_WEIGHT: 2,
  ALIGNMENT_WEIGHT: 1,
  COHESION_WEIGHT: 1,
};

var PointStyle = {
  earth: 0,
  water: 1,
  cloud: 2,
};

var Radii = [140, 120, 170];
var Scales = [15, 20, 6];
var colors = ["#27ae60", "#2980b9", "#ecf0f1"];

Scene = function (canvas_id) {
  this.init(canvas_id);
};

Scene.prototype.init = function (canvas_id) {
  this.current_time = new Date().getTime();
  this.dt = 0;
  this.canvas = document.getElementById(canvas_id);

  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;

  this.width = this.canvas.width;
  this.height = this.canvas.height;

  this.ctx = this.canvas.getContext("2d");

  this.ctx.clearRect(0, 0, this.width, this.height);
  this.ctx.fillStyle = "rgba(75, 181, 241, 1)";
  this.ctx.fillRect(0, 0, this.width, this.height);

  this.points = new Array();

  this.clouds = new Array();

  //water/earth
  for (var i = 0; i < 1800; i++) {
    if (i > 1600) type = 0;
    else type = 1;

    theta = Math.random() * 2 * Math.PI;
    phi = Math.acos(Math.random() * 2 - 1);
    x0 = Radii[type] * Math.sin(phi) * Math.cos(theta);
    y0 = Radii[type] * Math.sin(phi) * Math.sin(theta);
    z0 = Radii[type] * Math.cos(phi);
    var sign = Math.random() > 0.5 ? 1 : -1;

    vel = new Vector();

    var point = new Point(new Vector(x0, y0, z0), vel, theta, phi, this.ctx);

    point.type = type;

    this.points.push(point);
  }

  //clouds
  for (var i = 0; i < 200; i++) {
    var type = 2;
    theta = Math.random() * 2 * Math.PI;
    phi = Math.acos(Math.random() * 2 - 1);
    x0 = Radii[type] * Math.sin(phi) * Math.cos(theta);
    y0 = Radii[type] * Math.sin(phi) * Math.sin(theta);
    z0 = Radii[type] * Math.cos(phi);
    var sign = Math.random() > 0.5 ? 1 : -1;

    var vel = new Vector((sign * Math.random()) / 200, (sign * Math.random()) / 200, 0);

    var point = new Point(new Vector(x0, y0, z0), vel, theta, phi, this.ctx);

    point.type = type;

    this.clouds.push(point);
  }
};

Scene.prototype.enable = function () {
  var that = this;

  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
  })();

  this.animate(new Date().getTime());

  function doResize() {
    that.canvasResize();
  }

  var endResize;

  window.onresize = function (e) {
    clearTimeout(endResize);
    endResize = setTimeout(doResize, 100);
  };

  return this;
};

Scene.prototype.animate = function (time) {
  var that = this;
  this.animationFrame = requestAnimFrame(function () {
    that.animate(new Date().getTime());
  });
  this.update(time);
};

Scene.prototype.disable = function () {
  window.cancelAnimationFrame(this.animationFrame);

  return this;
};

Scene.prototype.canvasResize = function () {
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;

  this.width = this.canvas.width;
  this.height = this.canvas.height;
};

Scene.prototype.update = function (time) {
  this.dt = time - this.current_time;

  this.current_time = time;

  this.draw();

  for (i in this.points) {
    this.points[i].step();
  }

  this.points.sort(zSort);

  for (i in this.points) {
    this.points[i].draw();
  }

  for (i in this.clouds) {
    this.clouds[i].step(this.clouds);
  }

  this.clouds.sort(zSort);

  for (i in this.clouds) {
    this.clouds[i].draw();
  }
};

Scene.prototype.draw = function () {
  //this.ctx.clearRect(0, 0, this.width, this.height);
  this.ctx.fillStyle = "rgba(75, 181, 241, 1)";
  this.ctx.fillRect(0, 0, this.width, this.height);
};

/*
 *
 */
Point = function (location, velocity, theta, phi, ctx) {
  this.init(location, velocity, theta, phi, ctx);
};

Point.prototype.init = function (location, velocity, theta, phi, ctx) {
  this.pos = location.copy();
  this.vel = velocity.copy();
  this.theta = theta;
  this.phi = phi;
  this.ctx = ctx;
};

Point.prototype.step = function (neighbors) {
  if (this.type == PointStyle.cloud) {
    var z = this.pos.z;
    var acceleration = this.flock(neighbors);
    this.vel.add(acceleration).limit(settings.MAX_SPEED);
    this.pos.add(this.vel);
    this.pos.z = z;
    this.rotateX(this.vel.x);
    this.rotateY(this.vel.y);
    this.rotateY(settings.ROTATION / 2);
  } else {
    this.rotateY(settings.ROTATION);
  }
};

Point.prototype.rotateY = function (angle) {
  x = this.pos.x;
  z = this.pos.z;

  cosRY = Math.cos(angle);
  sinRY = Math.sin(angle);
  tempz = z;
  tempx = x;

  x = tempx * cosRY + tempz * sinRY;
  z = tempx * -sinRY + tempz * cosRY;
  this.pos.x = x;
  this.pos.z = z;
};

Point.prototype.rotateX = function (angle) {
  y = this.pos.y;
  z = this.pos.z;

  cosRY = Math.cos(angle);
  sinRY = Math.sin(angle);
  tempz = z;
  tempy = y;

  y = tempy * cosRY + tempz * sinRY;
  z = tempy * -sinRY + tempz * cosRY;
  this.pos.y = y;
  this.pos.z = z;
};

Point.prototype.rotateZ = function (angle) {
  x = this.pos.x;
  y = this.pos.y;

  cosRY = Math.cos(angle);
  sinRY = Math.sin(angle);
  tempy = y;
  tempx = x;

  x = tempx * cosRY + tempy * sinRY;
  y = tempx * -sinRY + tempy * cosRY;
  this.pos.x = x;
  this.pos.y = y;
};

Point.prototype.flock = function (neighbors) {
  var separation = this.separate(neighbors).multiply(settings.SEPARATION_WEIGHT);
  var alignment = this.align(neighbors).multiply(settings.ALIGNMENT_WEIGHT);
  var cohesion = this.cohere(neighbors).multiply(settings.COHESION_WEIGHT);

  return separation.add(alignment).add(cohesion);
};

Point.prototype.cohere = function (neighbors) {
  var sum = new Vector(0, 0);
  var count = 0;

  for (boid in neighbors) {
    var d = this.pos.distance(neighbors[boid].pos);
    if (d > 0 && d < settings.NEIGHBOR_RADIUS) {
      if (Math.abs(this.pos.z - neighbors[boid].pos.z) < 20) {
        sum.add(neighbors[boid].pos);
        count++;
      }
    }
  }

  if (count > 0) return this.steer_to(sum.divide(count));
  else return sum;
};

Point.prototype.steer_to = function (target) {
  var desired = Vector.subtract(target, this.pos);
  var d = desired.magnitude();
  var steer;

  if (d > 0) {
    desired.normalize();

    if (d < 100) desired.multiply(settings.MAX_SPEED * (d / 100));
    else desired.multiply(settings.MAX_SPEED);

    steer = desired.subtract(this.vel);
    steer.limit(settings.MAX_FORCE);
  } else {
    steer = new Vector(0, 0);
  }

  return steer;
};

Point.prototype.align = function (neighbors) {
  var mean = new Vector();
  var count = 0;
  for (boid in neighbors) {
    var d = this.pos.distance(neighbors[boid].pos);
    if (d > 0 && d < settings.NEIGHBOR_RADIUS) {
      if (Math.abs(this.pos.z - neighbors[boid].pos.z) < 20) {
        mean.add(neighbors[boid].vel);
        count++;
      }
    }
  }

  if (count > 0) mean.divide(count);

  mean.limit(settings.MAX_FORCE);

  return mean;
};

Point.prototype.separate = function (neighbors) {
  var mean = new Vector();
  var count = 0;

  for (boid in neighbors) {
    var d = this.pos.distance(neighbors[boid].pos);
    if (d > 0 && d < settings.DESIRED_SEPARATION) {
      if (Math.abs(this.pos.z - neighbors[boid].pos.z) < 20) {
        mean.add(Vector.subtract(this.pos, neighbors[boid].pos).normalize().divide(d));
        count++;
      }
    }
  }

  if (count > 0) mean.divide(count);

  return mean;
};

Point.prototype.influence = function () {
  var g = new Vector();

  return g;
};

Point.prototype.draw = function () {
  x3d = this.pos.x;
  y3d = this.pos.y;
  z3d = this.pos.z;
  var scale = settings.FOV / (settings.FOV + z3d);
  var x2d = x3d * scale + this.ctx.canvas.width / 4;
  var y2d = y3d * scale + this.ctx.canvas.height / 2;

  if (this.pos.z > 25) return;

  this.ctx.save();
  this.ctx.fillStyle = colors[this.type];
  this.ctx.beginPath();
  this.ctx.arc(x2d, y2d, Math.abs(scale * Scales[this.type]), 0, 2 * Math.PI, false);
  this.ctx.closePath();
  this.ctx.fill();
  this.ctx.restore();
};

Vector = (function () {
  var name, _fn, _i, _len, _ref;
  _ref = ["add", "subtract", "multiply", "divide"];
  _fn = function (name) {
    return (Vector[name] = function (a, b) {
      return a.copy()[name](b);
    });
  };
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    name = _ref[_i];
    _fn(name);
  }
  function Vector(x, y, z) {
    var _ref;
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (z == null) {
      z = 0;
    }
    (_ref = [x, y, z]), (this.x = _ref[0]), (this.y = _ref[1]), (this.z = _ref[2]);
  }
  Vector.prototype.copy = function () {
    return new Vector(this.x, this.y, this.z);
  };
  Vector.prototype.magnitude = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  };
  Vector.prototype.normalize = function () {
    var m;
    m = this.magnitude();
    if (m > 0) {
      this.divide(m);
    }
    return this;
  };
  Vector.prototype.limit = function (max) {
    if (this.magnitude() > max) {
      this.normalize();
      return this.multiply(max);
    } else {
      return this;
    }
  };
  Vector.prototype.heading = function () {
    return -1 * Math.atan2(-1 * this.y, this.x);
  };
  Vector.prototype.eucl_distance = function (other) {
    var dx, dy, dz;
    dx = this.x - other.x;
    dy = this.y - other.y;
    dz = this.z - other.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  };
  Vector.prototype.distance = function (other, dimensions) {
    var dx, dy, dz;
    if (dimensions == null) {
      dimensions = false;
    }
    dx = Math.abs(this.x - other.x);
    dy = Math.abs(this.y - other.y);
    dz = Math.abs(this.z - other.z);
    if (dimensions) {
      dx = dx < dimensions.width / 2 ? dx : dimensions.width - dx;
      dy = dy < dimensions.height / 2 ? dy : dimensions.height - dy;
    }
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  };
  Vector.prototype.subtract = function (other) {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
    return this;
  };
  Vector.prototype.add = function (other) {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
    return this;
  };
  Vector.prototype.divide = function (n) {
    var _ref;
    (_ref = [this.x / n, this.y / n, this.z / n]), (this.x = _ref[0]), (this.y = _ref[1]), (this.z = _ref[2]);
    return this;
  };
  Vector.prototype.multiply = function (n) {
    var _ref;
    (_ref = [this.x * n, this.y * n, this.z * n]), (this.x = _ref[0]), (this.y = _ref[1]), (this.z = _ref[2]);
    return this;
  };
  Vector.prototype.dot = function (other) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  };
  Vector.prototype.projectOnto = function (other) {
    return other.copy().multiply(this.dot(other));
  };
  Vector.prototype.wrapRelativeTo = function (location, dimensions) {
    var a, d, key, map_d, v, _ref;
    v = this.copy();
    _ref = {
      x: "width",
      y: "height",
    };
    for (a in _ref) {
      key = _ref[a];
      d = this[a] - location[a];
      map_d = dimensions[key];
      if (Math.abs(d) > map_d / 2) {
        if (d > 0) {
          v[a] = (map_d - this[a]) * -1;
        } else {
          v[a] = this[a] + map_d;
        }
      }
    }
    return v;
  };
  Vector.prototype.invalid = function () {
    return this.x === Infinity || isNaN(this.x) || this.y === Infinity || isNaN(this.y) || this.z === Infinity || isNaN(this.z);
  };
  return Vector;
})();

function initialize() {
  scene = new Scene("c");
  scene.enable();
}

function zSort(a, b) {
  return b.pos.z - a.pos.z;
}

window.onload = function () {
  initialize();
};
