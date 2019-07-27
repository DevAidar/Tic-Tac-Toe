// noprotect

// returns who won
function isGameOver() {
  let haveWon = false;
  if (state != "end") {
    for (let i = 0; i < gridList.length; i++) {
      if (!haveWon) {
        haveWon = isWin(haveWon, i);
      }
    }
    if (!haveWon && gridList.indexOf(0) == -1 && 
        gridList.indexOf("a.x") == -1 && gridList.indexOf("a.o") == -1) {
      win.whoWon = "tie";
      whoStarts = (whoStarts == "x") ? "o" : "x";
    }
  }
}

// checks if is a win
function isWin(haveWon, i) {
  if (gridList[i] != 0 &&
    gridList[i] != "a.x" &&
    gridList[i] != "a.o") {
    // checks for Vertical win
    if (!haveWon &&
      gridSize - floor(i / gridSize) >= win.length) {
      haveWon = isVerticalWin(i);
    }

    // checks for Horizontal win 
    if (!haveWon &&
      gridSize - i % gridSize >= win.length) {
      haveWon = isHorizontalWin(i);
    }

    // checks for Diagonal win 
    if (!haveWon &&
      gridSize - i % gridSize >= win.length) {
      haveWon = isDiagonalWin(i);
    }
  }
  return haveWon;
}

// checks for Diagonal win and returns bool
function isDiagonalWin(i) {
  let haveWon = false;
  if (!haveWon && 
    gridSize - floor(i / gridSize) >= win.length) {
    haveWon = isDecliningDiagonalWin(i);
  }
  if (!haveWon && 
    floor(i / gridSize) >= win.length) {
    haveWon = isRisingDiagonalWin(i);
  }
  return haveWon;
}

// checks for / Diagonal win and returns bool
function isRisingDiagonalWin(i) {
  let foundUnequal = false;
  // checks if it is winning condition
  for (let j = 1; j < win.length; j++) {
    if (!foundUnequal &&
      gridList[i] != gridList[i - (gridSize - 1) * j]) {
      foundUnequal = true;
    }
  }
  setWinValues(foundUnequal, i);
  return !foundUnequal;
}

// checks for \ Diagonal win and returns bool
function isDecliningDiagonalWin(i) {
  let foundUnequal = false;
  // checks if it is winning condition
  for (let j = 1; j < win.length; j++) {
    if (!foundUnequal &&
      gridList[i] != gridList[i + (gridSize + 1) * j]) {
      foundUnequal = true;
    }
  }
  setWinValues(foundUnequal, i);
  return !foundUnequal;
}

// checks for Vertical win and returns bool
function isVerticalWin(i) {
  let foundUnequal = false;
  // checks if it is winning condition
  for (let j = 1; j < win.length; j++) {
    if (!foundUnequal &&
      gridList[i] != gridList[i + gridSize * j]) {
      foundUnequal = true;
    }
  }
  setWinValues(foundUnequal, i);
  return !foundUnequal;
}

// checks for Horizontal win and returns bool
function isHorizontalWin(i) {
  let foundUnequal = false;
  // checks if it is winning condition
  for (let j = 1; j < win.length; j++) {
    if (!foundUnequal &&
      gridList[i] != gridList[i + j]) {
      foundUnequal = true;
    }
  }
  setWinValues(foundUnequal, i);
  return !foundUnequal;
}

// sets the win. values
function setWinValues(foundUnequal, i) {
  if (!foundUnequal) {
    win.whoWon = gridList[i];
    if (gridList[i] == "x") {
      win.xWinCounter++;
    } else {
      win.oWinCounter++;
    }
    whoStarts = (whoStarts == "x") ? "o" : "x";
  }
}

// creates canvas with size not less than a specified ammount
function setCanvasSize() {
  if (windowWidth < 300 && windowHeight < 300) {
    createCanvas(300, 300);
  } else if (windowHeight < 300) {
    createCanvas(300, windowHeight);
  } else if (windowWidth < 300) {
    createCanvas(windowWidth, 300);
  } else {
    createCanvas(windowWidth, windowHeight); 
  }
}

// resets all the needed values to start a new game
function restartGame() {
  // resets the gridList
  gridList = [];
  for (var i = 0; i < gridSize; i++) {
    for (var j = 0; j < gridSize; j++) {
      append(gridList, 0);
    }
  }
  
  // starts the animation of a grid
  animation.state = "gridIn";
  animation.isOn = true;
  animation.firstFrame = frameCount;
  
  // sets a starter values
  if (whoStarts == "x") {
    state = "x start";
  } else {
    state = "o start";
  }
  win.whoWon = "none";
}

// draws X on a specific place 
function drawX(row, col) {
  push();
  stroke(84);
  strokeWeight(grid.weight);
  strokeCap(SQUARE);
  translate(border.hMargin + (grid.cell + grid.weight) * row,
            bg.top + border.vMargin + (grid.cell + grid.weight) * col);
  
  line(round(grid.cell / 4.5), round(grid.cell / 4.5),
       grid.cell - round(grid.cell / 4.5), grid.cell - round(grid.cell / 4.5));
  line(round(grid.cell / 4.5), grid.cell - round(grid.cell / 4.5),
       grid.cell - round(grid.cell / 4.5), round(grid.cell / 4.5));
  pop();
  }

// draws an animation of X
function drawXAnimation(row, col) {
  push();
  strokeWeight(grid.weight);
  stroke(84);
  strokeCap(SQUARE);
  translate(border.hMargin + (grid.cell + grid.weight) * row,
    bg.top + border.vMargin + (grid.cell + grid.weight) * col);

  let frame = frameCount - animation.firstFrame;
  let length = grid.cell - round(grid.cell / 4.5) * 2;
  let step = -cos(frame * PI / animation.delay) * length / 2 + length / 2;

  line(round(grid.cell / 4.5), round(grid.cell / 4.5),
    round(grid.cell / 4.5) + step, round(grid.cell / 4.5) + step);
  line(grid.cell - round(grid.cell / 4.5), round(grid.cell / 4.5),
    grid.cell - round(grid.cell / 4.5) - step, round(grid.cell / 4.5) + step);

  if (frame == animation.delay) {
    animationReset();
    gridList[row + col * gridSize] = "x";
    stateChanger();
  }
  pop();
}

// draw O on a specific place 
function drawO(row, col) {
  push();
  noFill();
  stroke(242, 235, 212);
  strokeWeight(grid.weight);
  ellipseMode(CORNERS);
  translate(border.hMargin + (grid.cell + grid.weight) * row,
    bg.top + border.vMargin + (grid.cell + grid.weight) * col);

  ellipse(round(grid.cell / 4.5), round(grid.cell / 4.5),
    grid.cell - round(grid.cell / 4.5), grid.cell - round(grid.cell / 4.5));
  pop();
}

// draws an animation of O
function drawOAnimation(row, col) {
  push();
  noFill();
  stroke(242, 235, 212);
  strokeWeight(grid.weight);
  strokeCap(SQUARE);
  ellipseMode(CORNERS);
  translate(border.hMargin + (grid.cell + grid.weight) * row,
    bg.top + border.vMargin + (grid.cell + grid.weight) * col);

  var frame = frameCount - animation.firstFrame;
  var step = -cos(frame * PI / animation.delay) * PI + PI;

  arc(round(grid.cell / 4.5), round(grid.cell / 4.5),
      grid.cell - round(grid.cell / 4.5), grid.cell - round(grid.cell / 4.5),
      -(PI / 2), -(PI / 2) + step);
  
  if (frame == animation.delay) {
    ellipse(round(grid.cell / 4.5), round(grid.cell / 4.5),
      grid.cell - round(grid.cell / 4.5), grid.cell - round(grid.cell / 4.5));

    animationReset();
    gridList[row + col * gridSize] = "o";
    stateChanger();
  }
  pop();
}

// makes a animation of appearing of the grid on the screen
function drawGridAnimation(gridList, animation) {
  push();
  fill(30, 160, 146);
  noStroke();
  rectMode(CORNERS);
  
  var frame = frameCount-animation.firstFrame;
  var step = -cos(frame * PI / animation.delay) * grid.length / 4 + grid.length / 4;
  
  push();
  translate(border.hMargin + grid.cell, 
            bg.top + border.vMargin);
  
  for (let i = 1; i < gridSize; i++) {
    rect(0, grid.length / 2 - step, 
         grid.weight, grid.length / 2 + step);
    translate(grid.weight + grid.cell, 0);
  }
  pop();
  
  push();
  translate(border.hMargin, 
            bg.top + border.vMargin + grid.cell);
  
  for (let i = 1; i < gridSize; i++) {
    rect(grid.length / 2 - step, 0, 
         grid.length / 2 + step, grid.weight);
    translate(0, grid.weight + grid.cell);
  }
  pop();
  pop();
}

// changes the state of the game to a proper one
function stateChanger() {
  if (state == "start" || state == "x" || state == "x start") {
    state = "o";
  } else { // if (state == "o" || state == "o start")
    state = "x";
  }
}

// chekcs if the click is in bounds
function isAllowedClick(place) {
  return (mouseX >= mouse.x - 4 && mouseX <= mouse.x + 4 &&
          mouseY >= mouse.y - 4 && mouseY <= mouse.y + 4 &&
          mouse.place == place);
}

// resets animation after it is done
function animationReset() {
  animation.isOn = false;
  animation.state = "none";
}

// draws background
function drawBackground() {
  background(38, 188, 172);
  
  // drawing white lines 
  fill(248);
  noStroke();
  rect(0, height - bg.bottom, width, bg.bottom);
  rect(0, 0, width, bg.top);
  
  // changing cursor
  if (state == "end" && mouseY >= 120) {
    cursor(HAND);
  } else if (mouseY >= 350) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
  
  // writes RESTART GAME at the bottom
  textSize(14);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textFont("Arial");
  noStroke();
  fill(38, 188, 172);
  text("RESTART GAME", width/2 , 375);
}

// writes the game state as a text
function gameState(state) {
  
  // style for a text
  textSize(12);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  textFont("Arial");
  noStroke();
  fill(120);
  
  switch (state) {
    case "start":
    case "x start":
    case "o start":
      text("Start game", width/2 , 101.5);
      break;
    case "end": 
      text("Game Over", width/2 , 101.5);
      break;
    case "tie":
      text("Tie", width/2 , 101.5);
      break;
    case "x":
      text("Turn" , width/2 + 10, 101.5);
      stroke(0);
      strokeWeight(1.5);
      line(width/2 - 25, 106.5, width/2 - 15, 96.5);
      line(width/2 - 15, 106.5, width/2 - 25, 96.5);
      break;
    case "o":
      text("Turn" , width/2 + 10, 101.5);
      stroke(0);
      strokeWeight(1.5);
      noFill();
      ellipseMode(CENTER);
      ellipse(width/2 - 20, 101.5, 10);
      break;
  }
}