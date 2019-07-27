var animation = {
  isOn: false,
  delay: 15
};
var bg = {};
var border = {
  c1L: 199,
  c1R: 264,
  c2L: 269,
  c2R: 330,
  c3L: 335,
  c3R: 400,
  r1B: 199,
  r1T: 134,
  r2B: 265,
  r2T: 204,
  r3B: 335,
  r3T: 270,
  col: [],
  row: []
};
var grid = {};
var gridList = [];
var gridSize = 5;
var mouse = {};
var state, whoStarts = "x";
var win = {
  length: 4, 
  whoWon: "none",
  xWinCounter: 0,
  oWinCounter: 0
};

function setup() {
  // %^&*
  setCanvasSize();
  // createCanvas(600, 400); // %^&*

  gameStarter();
  // gridList[0] = "x";
  // gridList[1] = "o";
  // gridList[2] = "x";
  // gridList[3] = "o";
  // gridList[4] = 0;
  // gridList[5] = "x";
  // gridList[6] = "x";
  // gridList[7] = "x";
  // gridList[8] = "o";

  // print("bg.top: " + bg.top);
  // print("bg.bottom: " + bg.bottom);
  // print("bg.mid: " + bg.mid);
  // print("grid.length: " + grid.length);
  // print("border.vMargin: " + border.vMargin);
  // print("border.hMargin: " + border.hMargin);
  // print("grid.weight: " + grid.weight);
  // print("grid.cell: " + grid.cell);
  // print("height: " + height); 
  // print("width: " + width);
}

function draw() {
  
  print("animation.state: " + animation.state);
  print("gridList: " + gridList);
  print("mouse place:" + mouse.place);
  // print("mouse x:" + mouse.x);
  // print("mouse y:" + mouse.y);
  print("state: " + state);
  // print("win.whoWon: " + win.whoWon);
  // print(animation.isOn);

  game();
}