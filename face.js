// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

// The class for our "face", contains DNA sequence, fitness value, position on screen

// Fitness Function f(t) = t (where t is "time" mouse rolls over face)

// Create a new face


let hair_=[];
let face_=[];
let mouth_=[];
let eye_=[];
let nose_=[];

let bubbles = [];

function preload() {
  for (let i = 0; i < 5; i++) {
    hair_[i] = loadImage(`faceelements/hair_${i}.png`);
  }
  for (let i = 0; i < 5; i++) {
    face_[i] = loadImage(`faceelements/face_${i}.png`);
  }
  for (let i = 0; i < 5; i++) {
    mouth_[i] = loadImage(`faceelements/mouth_${i}.png`);
  }
  for (let i = 0; i < 5; i++) {
    eye_[i] = loadImage(`faceelements/eye_${i}.png`);
  }
  for (let i = 0; i < 5; i++) {
    nose_[i] = loadImage(`faceelements/nose_${i}.png`);
  }
}

class Face {
  constructor(dna_, x_, y_) {
    this.rolloverOn = false; // Are we rolling over this face?
    this.dna = dna_; // Face's DNA
    this.x = x_*2; // Position on screen
    this.y = y_*2;
    this.wh = 140; // Size of square enclosing face
    this.fitness = 1; // How good is this face?
    // Using java.awt.Rectangle (see: http://java.sun.com/j2se/1.4.2/docs/api/java/awt/Rectangle.html)
    this.r = new Rectangle(this.x - this.wh / 2, this.y - this.wh / 2, this.wh, this.wh);

  }

  // Display the face
  display() {
    // We are using the face's DNA to pick properties for this face
    // such as: head size, color, eye position, etc.
    // Now, since every gene is a floating point between 0 and 1, we map the values
    let genes = this.dna.genes;
    let r = map(genes[0], 0, 1, 0, 70);
    //let c = color(genes[1], genes[2], genes[3]);
    //let eye_size = map(genes[5], 0, 1, 0, 10);
    //let eyecolor = color(genes[4], genes[5], genes[6]);
    //let mouthColor = color(genes[7], genes[8], genes[9]);
    //let mouthw = map(genes[5], 0, 1, 0, 50);
    //let mouthh = map(genes[5], 0, 1, 0, 10);

    // hair
    let hairstyle = Math.floor(map(genes[0],0,1,0,5));
    let hairsize = map(genes[0], 0, 1, 80, 130);
    let hair_y = map(genes[4], 0, 1, -50, 15);
    let hair_x = map(genes[9], 0, 1, -50, 15);
    // face
    let facestyle = Math.floor(map(genes[1],0,1,0,5));
    let facesize = map(genes[0], 0, 1, 90, 120);
    let face_y = map(genes[0], 0, 1, -10, 20);
    let face_x = map(genes[3], 0, 1, -30, 20);
    // mouth
    let mouthstyle = Math.floor(map(genes[4],0,1,0,5));
    let mouthsize = map(genes[5], 0, 1, 80, 120);
    let mouth_y = map(genes[6], 0, 1, -30, 30);
    let mouth_x = map(genes[7], 0, 1, -30, 30);
    // eye
    let eyestyle = Math.floor(map(genes[7],0,1,0,5));
    let eyesize = map(genes[8], 0, 1, 80, 120);
    let eyesize1 = map(genes[14], 0, 1, 80, 120);
    let eye_y = map(genes[9], 0, 1, -30, 20);
    let eye_x = map(genes[14], 0, 1, -40, 30);
    let eye_y1 = map(genes[8], 0, 1, -30, 20);
    let eye_x1 = map(genes[3], 0, 1, -30, 30);
    // nose
    let nosestyle = Math.floor(map(genes[11],0,1,0,5));
    let nosesize = map(genes[12], 0, 1, 80, 120);
    let nose_y = map(genes[10], 0, 1, -20, 10);
    let nose_x = map(genes[13], 0, 1, -20, 10);



    // Once we calculate all the above properties, we use those variables to draw rects, ellipses, etc.
    push();
    translate(this.x, this.y);
    noStroke();

    // Draw the hair
    this.hair = hair_[hairstyle];
    image(this.hair,hair_x-30, hair_y-30, hairsize, hairsize);
    imageMode(CENTER);
    ///ellipseMode(CENTER);

    // Draw the head
//    fill(c);
//    ellipseMode(CENTER);
//    ellipse(0, 0, r, r);
    this.face = face_[facestyle];
    image(this.face,face_x, face_y, facesize, facesize);
    imageMode(CENTER);
    ///ellipseMode(CENTER);

    // Draw the eyes
//    fill(eyecolor);
//    rectMode(CENTER);
//    rect(-eye_x, -eye_y, eye_size, eye_size);
//    rect(eye_x, -eye_y, eye_size, eye_size);
    this.mouth = mouth_[mouthstyle];
    image(this.mouth,mouth_x, mouth_y, mouthsize, mouthsize);
    imageMode(CENTER);
    ///ellipseMode(CENTER);

    // Draw the mouth
//    fill(mouthColor);
//    rectMode(CENTER);
//    rect(mouth_x, mouth_y, mouthw, mouthh);
    this.eye = eye_[eyestyle];
    image(this.eye,eye_x, eye_y, eyesize, eyesize);
    image(this.eye,eye_x1, eye_y1, eyesize1, eyesize1);
    imageMode(CENTER);
    ///ellipseMode(CENTER);

    this.nose = nose_[nosestyle];
    image(this.nose,nose_x, nose_y, nosesize, nosesize);
    imageMode(CENTER);

    // Draw the bounding box
    stroke(0.25);
    if (this.rolloverOn) fill(0, 0.25);
    else noFill();
    rectMode(CENTER);
    rect(0, 0, this.wh, this.wh);
    pop();

    // Display fitness value
    textAlign(CENTER);
    if (this.rolloverOn) fill(0);
    else fill(0.25);
    text('' + floor(this.fitness), this.x, this.y + 120);
  }

  //getFitness() {
  //  return this.fitness;
//  }

  getDNA() {
    return this.dna;
  }

  // Increment fitness if mouse is rolling over face
  rollover(mx, my) {
    if (this.r.contains(mx, my)) {
      this.rolloverOn = true;
      this.fitness += 0.25;
    } else {
      this.rolloverOn = false;
    }
  }
}
