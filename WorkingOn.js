// checks if the click position was inside the grid
function mousePosInGrid() {
  if (mouseX >= border.hMargin && 
      mouseX <= width - border.hMargin &&
      mouseY >= bg.top + border.vMargin && 
      mouseY <= height - bg.bottom - border.vMargin) {
    // checks in which col click position is
    for (let i = 0; i < gridSize; i++) {
      if (mouseX >= border.hMargin + (grid.cell + grid.weight) * i && 
          mouseX <= border.hMargin + (grid.cell + grid.weight) * i + grid.cell) {
        // checks in which row click position is 
        for (let j = 0; j < gridSize; j++) {
          if (mouseY >= bg.top + border.vMargin + (grid.cell + grid.weight) * j && 
              mouseY <= bg.top + border.vMargin + (grid.cell + grid.weight) * j + grid.cell) {
            rect(border.hMargin + (grid.cell + grid.weight) * i,
                 bg.top + border.vMargin + (grid.cell + grid.weight) * j,
                 grid.cell, grid.cell);
            return i + j * gridSize;
          }
        }
      }
    }
  }
  return "";
}

// mouse clicked actions
function touchStarted() {
  mouse.x = "";
  mouse.y = "";
  mouse.place = "";
  
  //$%^&*
  // button clicks
  if (state == "end" || state == "start" || state == "x start" || state == "o start") {
    if (mouseX >= width/2 - 190 && mouseX <= width/2 - 4 &&
        mouseY >= 45 && mouseY <= 83) {
      if (state != "x start") {
      	mouse.place = "left";
      }
    }
    if (mouseX >= width/2 + 4 && mouseX <= width/2 + 190 &&
        mouseY >= 45 && mouseY <= 83) {
      if (state != "o start") {
      	mouse.place = "right";
      }
    }
  }
  
  // grid clicks
  if (state != "end") {
    mouse.place = mousePosInGrid();
  } else {
    if (mouseX >= 0 && mouseX <= width &&
      mouseY >= bg.top && mouseY <= height - bg.bottom) {
      mouse.place = "gridForRestart";
    }
  }
  
  // restart game button
  if (mouseX >= 0 && mouseX <= width &&
    mouseY >= height - bg.bottom && mouseY <= height) {
    mouse.place = "restart";
  }
  mouse.x = mouseX;
  mouse.y = mouseY;
  
  return false;
}
function touchEnded() {
  // button clicks
  if (state == "end" || state == "start" || state == "x start" || state == "o start") {
    if (mouseX >= width/2 - 190 && mouseX <= width/2 - 4 &&
        mouseY >= 45 && mouseY <= 83) {
      if (isAllowedClick("left")) {
        if (state == "end") {
          restartGame();
        }
        state = "x start";
        whoStarts = "x";
      }
    }
    if (mouseX >= width/2 + 4 && mouseX <= width/2 + 190 &&
        mouseY >= 45 && mouseY <= 83) {
      if (isAllowedClick("right")) {
        if (state == "end") {
          restartGame();
        }
        state = "o start";
        whoStarts = "o";
      }
    }
  }
  
  // grid clicks
  if (!animation.isOn && state != "end") {
    print("suck")
    if (isAllowedClick(mousePosInGrid()) && gridList[mousePosInGrid()] == 0) {
      print("hellergjhfgiudshgijhdfskgjhdfkghdfskghdfskjghkfghdskghdsfko");
      if (state == "start" || state == "x" || state == "x start") {
          gridList[mousePosInGrid()] = "a.x";
          animation.state = "x";
        } else {
          gridList[mousePosInGrid()] = "a.o";
          animation.state = "o";
        }
        animation.isOn = true;
        animation.firstFrame = frameCount
    }
    /*
    if (gridList[0] == 0 &&
      	mouseX >= border.c1L && mouseX <= border.c1R &&
        mouseY >= border.r1T && mouseY <= border.r1B) {
      if (isAllowedClick(mouse, "0")) {
        if (state == "start" || state == "x" || state == "x start") {
          gridList[0] = "a.x";
          animation.state = "x";
        } else {
          gridList[0] = "a.o";
          animation.state = "o";
        }
        animation.isOn = true;
        animation.firstFrame = frameCount;
      }
    }
    else if (gridList[1] == 0 &&
             mouseX >= border.c2L && mouseX <= border.c2R &&
             mouseY >= border.r1T && mouseY <= border.r1B) {
      if (isAllowedClick(mouse, "1")) {
        if (state == "start" || state == "x" || state == "x start") {
          gridList[1] = "a.x";
          animation.state = "x";
        } else {
          gridList[1] = "a.o";
          animation.state = "o";
        }
        animation.isOn = true;
        animation.firstFrame = frameCount;
      }
    }
    else if (gridList[2] == 0 &&
             mouseX >= border.c3L && mouseX <= border.c3R &&
             mouseY >= border.r1T && mouseY <= border.r1B) {
      if (isAllowedClick(mouse, "2")) {
        if (state == "start" || state == "x" || state == "x start") {
          gridList[2] = "a.x";
          animation.state = "x";
        } else {
          gridList[2] = "a.o";
          animation.state = "o";
        }
        animation.isOn = true;
        animation.firstFrame = frameCount;
      }
    }
    else if (gridList[3] == 0 &&
             mouseX >= border.c1L && mouseX <= border.c1R &&
             mouseY >= border.r2T && mouseY <= border.r2B) {
      if (isAllowedClick(mouse, "3")) {
        if (state == "start" || state == "x" || state == "x start") {
          gridList[3] = "a.x";
          animation.state = "x";
        } else {
          gridList[3] = "a.o";
          animation.state = "o";
        }
        animation.isOn = true;
        animation.firstFrame = frameCount;
      }
    }
    else if (gridList[4] == 0 &&
             mouseX >= border.c2L && mouseX <= border.c2R &&
             mouseY >= border.r2T && mouseY <= border.r2B) {
      if (isAllowedClick(mouse, "4")) {
        if (state == "start" || state == "x" || state == "x start") {
          gridList[4] = "a.x";
          animation.state = "x";
        } else {
          gridList[4] = "a.o";
          animation.state = "o";
        }
        animation.isOn = true;
        animation.firstFrame = frameCount;
      }
    }
    else if (gridList[5] == 0 &&
             mouseX >= border.c3L && mouseX <= border.c3R &&
             mouseY >= border.r2T && mouseY <= border.r2B) {
      if (isAllowedClick(mouse, "5")) {
        if (state == "start" || state == "x" || state == "x start") {
          gridList[5] = "a.x";
          animation.state = "x";
        } else {
          gridList[5] = "a.o";
          animation.state = "o";
        }
        animation.isOn = true;
        animation.firstFrame = frameCount;
      }
    }
    else if (gridList[6] == 0 &&
             mouseX >= border.c1L && mouseX <= border.c1R &&
             mouseY >= border.r3T && mouseY <= border.r3B) {
      if (isAllowedClick(mouse, "6")) {
        if (state == "start" || state == "x" || state == "x start") {
          gridList[6] = "a.x";
          animation.state = "x";
        } else {
          gridList[6] = "a.o";
          animation.state = "o";
        }
        animation.isOn = true;
        animation.firstFrame = frameCount;
      }
    }
    else if (gridList[7] == 0 &&
             mouseX >= border.c2L && mouseX <= border.c2R &&
             mouseY >= border.r3T && mouseY <= border.r3B) {
      if (isAllowedClick(mouse, "7")) {
        if (state == "start" || state == "x" || state == "x start") {
          gridList[7] = "a.x";
          animation.state = "x";
        } else {
          gridList[7] = "a.o";
          animation.state = "o";
        }
        animation.isOn = true;
        animation.firstFrame = frameCount;
      }
    }
    else if (gridList[8] == 0 &&
             mouseX >= border.c3L && mouseX <= border.c3R &&
             mouseY >= border.r3T && mouseY <= border.r3B) {
      if (isAllowedClick(mouse, "8")) {
        if (state == "start" || state == "x" || state == "x start") {
          gridList[8] = "a.x";
          animation.state = "x";
        } else {
          gridList[8] = "a.o";
          animation.state = "o";
        }
        animation.isOn = true;
        animation.firstFrame = frameCount;
      }
    }
    */
  } else if (state == "end") {
    if (mouseY >= bg.top && mouseY <= height - bg.bottom) {
      if (isAllowedClick("gridForRestart")) {
      	restartGame();
      }
    }
  }
  
  // restart game button
  if (mouseY >= height - bg.bottom && mouseY <= height) {
    if (isAllowedClick("restart")) {
    	restartGame();
    }
  }
  
  return false;
}