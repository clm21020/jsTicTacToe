function Board() {
  this.winningMark = null;
  this.grid = [
    ['','',''],
    ['','',''],
    ['','','']
  ];
}

Board.prototype.coord = function(pos) {
  return this.grid[pos[0]][pos[1]];
};

Board.prototype.marksWin = function(mark1, mark2, mark3) {
  if (mark1 === '') {
    return false;
  } else if (mark1 === mark2 && mark2 === mark3) {
    this.winningMark = mark1;
    return true;
  }

  return false;
};

Board.DIAG = [
  [[0,0], [1,1], [2,2]],
  [[0,2], [1,1], [2,0]]
];

Board.prototype.diagWin = function(){
  for (var i = 0; i < Board.DIAG.length; i++) {
    var mark1 = this.coord(Board.DIAG[i][0]);
    var mark2 = this.coord(Board.DIAG[i][1]);
    var mark3 = this.coord(Board.DIAG[i][2]);

    if (this.marksWin(mark1, mark2, mark3)) {
      return true;
    }
  }

  return false;
};

Board.prototype.rowWin = function(){
  for (var i = 0; i < this.grid.length; i++) {
    var mark1 = this.coord([i, 0]);
    var mark2 = this.coord([i, 1]);
    var mark3 = this.coord([i, 2]);

    if (this.marksWin(mark1, mark2, mark3)){
      return true;
    }
  }

  return false;
};

Board.prototype.colWin = function(){
  for (var i = 0; i < this.grid.length; i++) {
    var mark1 = this.coord([0, i]);
    var mark2 = this.coord([1, i]);
    var mark3 = this.coord([2, i]);

    if (this.marksWin(mark1, mark2, mark3)) {
      return true;
    }
  }

  return false;
};

Board.prototype.won = function() {
  if (this.rowWin() || this.colWin() || this.diagWin()) {
    return true;
  } else {
    return false;
  }
};

Board.prototype.winner = function() {
  return this.winningMark;
};

Board.prototype.empty = function(pos) {
  return this.coord(pos).length === 0;
};

Board.prototype.placeMark = function(pos, mark) {
  if (pos.length != 2 || pos[0] > 2 || pos[1] > 2) {
    throw "That's not a valid spot on the board.";
  } else if (!this.empty(pos)){
    throw "That spot isn't empty.";
  } else {
    this.grid[pos[0]][pos[1]] = mark;
  }
};

Board.prototype.printBoard = function() {
  console.log(this.grid[0]);
  console.log(this.grid[1]);
  console.log(this.grid[2]);
};

Board.prototype.fullBoard = function() {
  for (var i = 0; i < this.grid.length; i++) {
    for (var j = 0; j < this.grid.length; j++) {
      if (this.coord([i,j]) === '') {
        return false;
      }
    }
  }
  return true;
};

module.exports = Board;
