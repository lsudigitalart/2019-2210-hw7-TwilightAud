var chillvibes;
var playTime, loadTime;
var amp, level;
var bgcolor;
var fft;

function preload() {
  chillvibes = loadSound("chillvibes.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (chillvibes.isLoaded()) {
    loadTime = millis();
    print(loadTime);
    chillvibes.play();
  }

  amp = new p5.Amplitude();
  fft = new p5.FFT();
}

function draw() {
  background(255);
  noStroke();
  playTime = millis() - loadTime;
  // print(playTime);
  level = amp.getLevel();
  // print(level);

  mappedColor = map(level, 0, 1, 0, 255);

  cSize = map(level, 0, 1, 0, width);

  let lerping = lerpColor(color("red"), color("blue"), level)
  // fill(lerping);


  // strokeWidth(10);
  if (playTime > 5800) {
    for (var i = 0; i < width; i++) {
      // grad1 = lerpColor(color("lust"), color("yellow"), map(i, 0, width, 0, 1));
      grad1 = lerpColor(color(217, 46, 32), color("yellow"), level);
      stroke(grad1);
      line(i, 0, i, height);
    }
  }
 noStroke();
  fill(lerpColor(color(46, 17, 107), color(217, 46, 32), level));
  circle(0, 0, millis()/100);
  fill(50, 0, 50);
  circle(0, 0, millis()/500);
  

  fill(0);
  // background(mappedColor);
  
  
  circle(random(windowWidth/2, windowWidth/2), random(windowHeight/2, windowHeight/2), cSize);
  
  var spectrum = fft.analyze();
  var trebleVol = fft.getEnergy("treble");
  var midVol = fft.getEnergy("mid");
  var bassVol = fft.getEnergy("bass");


  fill(255);
  circle(random(windowWidth/3, windowWidth/3.5), random(windowHeight/3.5, windowHeight/3), trebleVol);
  circle(windowWidth/2, windowHeight/1.2, midVol);
  circle(random(windowWidth/1.45, windowWidth/1.5), random(windowHeight/3.5, windowHeight/3), bassVol);


}

function resizeCanvas(){
  windowResized(windowWidth,windowHeight);
}