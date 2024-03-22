let img1, img2, img3;

const PARTICLE_SIZE =5;
const RESOLUTION = 5;
const MAX_FORCE = 10;
const MIN_FORCE = 0;

let particles = [];

function preload() {
  //load images
  img1 = loadImage('images/BlackWoman.png');
  img2 = loadImage('images/AfroPick.png');
  img3 = loadImage('images/Afro.png');
}

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  spawnParticles();
}

function draw() {
  background(153, 115, 0);
  
  //Afro
  //image(img3, 30, 50, width, height);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  
  //Black woman  
  image(img1, -10, 180, 500, 400);
  image(img3, 170, 190, 200, 150);
  
  //Afro pick
  image(img2, mouseX - 50, mouseY, 95, 95);
}

function spawnParticles() {
  for(i = 0; i < width; i+=RESOLUTION) {
    for(let j = 0; j < height; j+=RESOLUTION) {
      const color = img3.get(i,j);
      
      particles.push(p = new Particle(i, j, color));
    }
  }
}

class Particle {
  
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.targetX = x;
    this.targetY = y;
  }
  
  update() {
    let mouseVector = createVector(mouseX, mouseY);
    let currentVector = createVector(this.x,this.y);
    let targetVector = createVector(this.targetX, this.targetY);
    
    let fromMouseToParticle = p5.Vector.sub(currentVector, mouseVector);
    let distanceToMouse = fromMouseToParticle.mag();
    
    let fromParticleToTarget = p5.Vector.sub(targetVector, currentVector);
    let distanceToTarget = fromParticleToTarget.mag();
    
    let totalForce = createVector(0,0);
    
    if (distanceToMouse < 100) {
      let repulsionForce = map(distanceToMouse, 0, 100, MAX_FORCE, MIN_FORCE);         
      fromMouseToParticle.setMag(repulsionForce);
      totalForce.add(fromMouseToParticle);
    }
    
    if (distanceToMouse > 0) {
      let attractionForce = map(distanceToTarget, 0, 100, MIN_FORCE, MAX_FORCE);         
      fromParticleToTarget.setMag(attractionForce);
      totalForce.add(fromParticleToTarget);
    }
    
    this.x += totalForce.x;
    this.y += totalForce.y;
  }
  
  draw() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, PARTICLE_SIZE);
  }
}