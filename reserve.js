// returns who won
function isGameOver(gridList, state, win) {
  if (state != "end") {
    // checks the win with the middle element
    if (gridList[4] != 0 && 
      	(gridList[4] == gridList[1] && gridList[4] == gridList[7] || 
    		 gridList[4] == gridList[3] && gridList[4] == gridList[5] || 
         gridList[4] == gridList[0] && gridList[4] == gridList[8] || 
         gridList[4] == gridList[2] && gridList[4] == gridList[6])) {
      win.whoWon = gridList[4];
      if (gridList[4] == "x") {
        win.xWinCounter ++
      } else {
        win.oWinCounter ++;
      }
      if (this.whoStarts == "x") {
        this.whoStarts = "o";
      } else {
        this.whoStarts = "x";
      }
    }
    // checks the win in [0, 1, 2]
    else if (gridList[1] != 0 && 
        gridList[1] == gridList[0] && gridList[1] == gridList[2]) {
      win.whoWon = gridList[1];
      if (gridList[1] == "x") {
        win.xWinCounter ++
      } else {
        win.oWinCounter ++;
      }
    }
    // checks the win in [2, 5, 8]
    else if (gridList[5] != 0 && 
        gridList[5] == gridList[2] && gridList[5] == gridList[8]) {
      win.whoWon = gridList[5];
      if (gridList[5] == "x") {
        win.xWinCounter ++
      } else {
        win.oWinCounter ++;
      }
    }
    // checks the win in [6, 7, 8]
    else if (gridList[7] != 0 && 
        gridList[7] == gridList[6] && gridList[7] == gridList[8]) {
      win.whoWon = gridList[7];
      if (gridList[7] == "x") {
        win.xWinCounter ++
      } else {
        win.oWinCounter ++;
      }
    }
    // checks the win in [0, 3, 6]
    else if (gridList[3] != 0 && 
        gridList[3] == gridList[0] && gridList[3] == gridList[6]) {
      win.whoWon = gridList[3];
      if (gridList[3] == "x") {
        win.xWinCounter ++
      } else {
        win.oWinCounter ++;
      }
    } 
    
    // checks if it is a tie, or to continue the game 
    else {
      var found0 = false, foundA = false;
      for (var i = 0; i < gridList.length; i++) {
        if (!found0 && gridList[i] == 0) {
          found0 = true;
        }
        if (!found0 && (gridList[i] == "a.o" || gridList[i] == "a.x"))  {
          foundA = true;
        }
      }

      if (found0 || foundA) {
        win.whoWon = "none";
      } else {
        win.whoWon = "tie";
      }
    }
  }
  return win;
}

