// noprotect

// works as a driver for all other functions
function game() {
  drawBackground();
  
  isGameOver();
  gameState(state);
  
  if (win.whoWon != "none") {
    state = "end";
  } 
  
  if (state != "end") {
    if (state == "x" || state == "x start") {
      drawButton("x", win);
    } else if (state == "o" || state == "o start") {
      drawButton("o", win);
    } else if (state == "start") {
      drawButton("start", win);
    }
    if (animation.isOn && animation.state == "gridIn" && 
        animation.firstFrame >= frameCount - animation.delay) {
      drawGridAnimation(gridList, animation);
      if (animation.firstFrame == frameCount - animation.delay) {
        animationReset();
      }
    } else {
      drawGrid(gridList);
    }
  } else {
    drawButton("end", win);
    drawGrid(gridList);
    drawGameOver(win);
  }
}

// sets all the values to start the game
function gameStarter()  {
  // sets state to start 
  state = "start";
  
  // sets the values from functions
  // setCanvasSize(); // add it later
  setBackground();
  setBorder();
  setAnimationStart();
  setGridList();
}

// creates a gridList of needed size
function setGridList() {
  for (var i = 0; i < gridSize; i++) {
    for (var j = 0; j < gridSize; j++) {
      append(gridList, 0);
    }
  }
}

// sets the values to start the animation
function setAnimationStart() {
  animation.firstFrame = frameCount;
  animation.isOn = true;
  animation.state = "gridIn";
}

// sets the values for border
function setBorder() {
  if (bg.mid < width) {
    border.vMargin = round(bg.mid / 46 * 3);
    grid.length = bg.mid - border.vMargin * 2;
    border.hMargin = round((width - grid.length) / 2);
    grid.weight = floor(border.vMargin / (5 * (gridSize - 1)) * 4);
    
    while ((grid.length - grid.weight * (gridSize - 1)) % gridSize != 0) {
      border.vMargin++;
      grid.length = bg.mid - border.vMargin * 2;
      border.hMargin = floor((width - grid.length) / 2);
      grid.weight = floor(border.vMargin / (5 * (gridSize - 1)) * 4);
    }
  } else {
    border.hMargin = round(width / 46 * 3);
    grid.length = width - border.hMargin * 2;
    border.vMargin = floor((bg.mid - grid.length) / 2);
    grid.weight = floor(border.hMargin / (5 * (gridSize - 1)) * 4);
    
    while ((grid.length - grid.weight * (gridSize - 1)) % gridSize != 0) {
      border.hMargin++;
      grid.length = width - border.hMargin * 2;
      border.vMargin = floor((bg.mid - grid.length) / 2);
      grid.weight = floor(border.hMargin / (5 * (gridSize - 1)) * 4);
    }
  }
  grid.cell = (grid.length - grid.weight * (gridSize - 1)) / gridSize;
}

// sets the values for background
function setBackground() {
  bg = {
    top: round(height * 0.3),
    bottom: round(height / 8),
    mid: height - round(height * 0.3) - round(height / 8)
  };
  
  // makes bg.mid as divisible by 2 as width
  if (width % 2 != bg.mid % 2) {
    bg.top++;
    bg.mid--;
  }
}

// draws grid with O's and X's
function drawGrid(gridList) {
  push();
  fill(30, 160, 146);
  noStroke();
  
  push();
  translate(border.hMargin + grid.cell, 
            bg.top + border.vMargin);
  
  for (let i = 1; i < gridSize; i++) {
    rect(0, 0, grid.weight, grid.length);
    translate(grid.weight + grid.cell, 0);
  }
  pop();
  
  push();
  translate(border.hMargin, 
            bg.top + border.vMargin + grid.cell);
  
  for (let i = 1; i < gridSize; i++) {
    rect(0, 0, grid.length, grid.weight);
    translate(0, grid.weight + grid.cell);
  }
  pop();
  pop();

  // draws X or O in specific places
  for (var i = 0; i < gridList.length; i++) {
    let gridRow = i % gridSize;
    let gridCol = floor(i / gridSize);
    switch (gridList[i]) {
      case "x":
        drawX(gridRow, gridCol);
        break;
      case "o":
        drawO(gridRow, gridCol);
        break;
      case "a.x":
        drawXAnimation(gridRow, gridCol);
        break;
      case "a.o":
        drawOAnimation(gridRow, gridCol);
        break;
    }
  }
}

// draws a game over screen
function drawGameOver() {
  let whoWon = win.whoWon;
  
  // text style
  textSize(34);
  textAlign(CENTER);
  textStyle(BOLD);
  textFont("Arial");
  noStroke();
  fill(84);
  
  switch (whoWon) {
    case "x": 
      // text
  		text("WINNER!", width/2, 304)
      
      // X
      noFill();
      stroke(84);
      strokeWeight(16);
      line(width/2-48, 259, width/2+48, 163);
      line(width/2-48, 163, width/2+48, 259);
      break;
    case "o": 
      // text
  		text("WINNER!", width/2, 304)
      
      // O
      noFill();
      stroke(242, 235, 212);
      strokeWeight(16);
      ellipseMode(CORNERS);
      ellipse(width/2-48, 163, width/2+48, 259);
      break;
    case "tie":
      // text
  		text("DRAW!", width/2, 288)
      
      noFill();
      strokeWeight(12);
      ellipseMode(CORNERS);
      
      // X
      stroke(84);
      line(width/2-84, 247, width/2-12, 175);
      line(width/2-84, 175, width/2-12, 247);
      
      // O
      stroke(242, 235, 212);
      ellipse(width/2+12, 175, width/2+84, 247)
    	break;
  }
}

// NOTHING IS THERE
// makes an animation for Button highlight
function drawButtonAnimation(highlight, win, animation) {
  
}

// draws buttons to choose side
function drawButton(highlight, win) {
  noFill();
  strokeWeight(2);
  stroke(38, 188, 172);
  switch (highlight) {
    case "o":
      // RIGHT
      // green bottom outline
      rect(width/2+5, 50, 184, 32, 8);
      
      // white portion of the button
      noStroke();
      fill(255);
      rect(width/2+4, 45, 186, 36, 8);
      
      // ellipse
      stroke(0);
      strokeWeight(2);
      noFill();
      ellipseMode(CENTER);
      ellipse(width/2+28, 64, 12);
      
      // LEFT
      // drawing left button to choose side
      strokeWeight(1);
      stroke(232);
      rect(width/2-190.5, 45, 186, 38.3, 8)
      stroke(214);
      rect(width/2-190, 45, 185, 38, 8);
      noStroke();
      fill(255);
      rect(width/2-190, 45, 186, 38, 8);
      
      // X
      stroke(0);
      strokeWeight(2);
      line(width/2-172, 58, width/2-160, 70);
      line(width/2-160, 58, width/2-172, 70); 
      break;
    case "x":
      // LEFT
      // green bottom outline
      rect(width/2-189, 50, 184, 32, 8);
      
      // white portion of the button
      noStroke();
      fill(255);
      rect(width/2-190, 45, 186, 36, 8);
      
      // X
      stroke(0);
      strokeWeight(2);
      line(width/2-172, 58, width/2-160, 70);
      line(width/2-160, 58, width/2-172, 70);
      
      // RIGHT
      // drawing right button to choose side
      strokeWeight(1);
      stroke(232);
      rect(width/2+3.5, 45, 186, 38.3, 8)
      stroke(214);
      rect(width/2+4, 45, 185, 38, 8);
      noStroke();
      fill(255);
      rect(width/2+4, 45, 186, 38, 8);
      
      // ellipse
      stroke(0);
      strokeWeight(2);
      noFill();
      ellipseMode(CENTER);
      ellipse(width/2+28, 64, 12);
      break;
    default:
      // RIGHT
      // drawing right button to choose side
      strokeWeight(1);
      stroke(232);
      rect(width/2+3.5, 45, 186, 38.3, 8)
      stroke(214);
      rect(width/2+4, 45, 185, 38, 8);
      noStroke();
      fill(255);
      rect(width/2+4, 45, 186, 38, 8);
      
      // ellipse
      stroke(0);
      strokeWeight(2);
      noFill();
      ellipseMode(CENTER);
      ellipse(width/2+28, 64, 12);
      
      // LEFT
      // drawing left button to choose side
      strokeWeight(1);
      stroke(232);
      rect(width/2-190.5, 45, 186, 38.3, 8)
      stroke(214);
      rect(width/2-190, 45, 185, 38, 8);
      noStroke();
      fill(255);
      rect(width/2-190, 45, 186, 38, 8);
      
      // X
      stroke(0);
      strokeWeight(2);
      line(width/2-172, 58, width/2-160, 70);
      line(width/2-160, 58, width/2-172, 70);
      break;
  }
  
  // number of wins
  // setting style for a text
  textSize(25);
  textAlign(RIGHT, CENTER);
  textStyle(NORMAL);
  textFont("Arial");
  noStroke();
  fill(120);
  
  // RIGHT
  if (win.xWinCounter == 0) {
    text("-", width/2-14, 66);
  } else { 
    text(win.xWinCounter%100000000, width/2-24, 66);
  }
  
  // LEFT
  if (win.oWinCounter == 0) {
    text("-", width/2+180, 66);
  } else { 
    text(win.oWinCounter%100000000, width/2+170, 66);
  }
}