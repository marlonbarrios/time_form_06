let canvas;
let walls = [];
let ray;
let particle;
let curve;

function setup() {
  //template for canvas while printing and exporting/exhition on web/minimal
  canvas = createCanvas(512, 512); // will export as 512x512
  canvas.style("margin", "auto");
  canvas.style("margin-top", "5%");
  canvas.style("display", "flex");
  canvas.style("justify-content", "center");
  canvas.style("align-items", "center");
  canvas.style("border-radius", "10px");
  canvas.style("position", "relative");
  canvas.style("box-shadow", "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)");
  // canvas.style("zoom", "0.5");
  canvas.style('dpi', '300');
  canvas.style('bleed', '1/8');



  //loop that created the hours as randomly placed obstacles (vertical lines of remadom sizes)
  for (let i = 0; i < 24; i++) {
    let x1 = width / 24 + i * width / 24;
    let x2 = width / 24 + i * width / 24;
    let y1 = random(height / 3, height);
    let curve = map(i, 0, 24, 0, random(0, height / 2));
    let y2 = height - curve;
    //as baoundaries or walls
    walls.push(new Boundary(x1, y1, x2, y2));

  }

  //walls around the whole` 
  walls.push(new Boundary(-1, -1, width, -1));
  walls.push(new Boundary(width, -1, width, height));
  walls.push(new Boundary(width, height, -1, height));
  walls.push(new Boundary(-1, height, -1, -1));
  particle = new Particle();

  noCursor();
}


function draw() {
  //clear();
  background(255);
  strokeWeight(2);


  for (let wall of walls) {
    wall.show();
  }
  let sc = second();
  let mn = minute();
  let hr = hour();


  let x = map(hr, 0, 24, 0, width);
  let y = map(mn, 0, 60, 0, height);

  particle.update(x, y);
  particle.show();
  particle.look(walls);

  fill(255);
  let seconds = map(sc, 0, 60, 0, x);
  strokeWeight(8);
  line(x, 0, x, height);
  line(0, y, x, y);
  ellipse(seconds, y, 80);
}


function keyPressed() {
  if (key == 'S' || key == 's') {
    saveCanvas(canvas, 'ray-casting-clock', 'png');
  }
}
    



