var Board = require("./board");

function Game(reader) {
  this.reader = reader;
  this.board = new Board();
  this.currentPlayer = "X";
}

Game.prototype.run = function(completionCallback) {
  console.log();
  this.board.printBoard();
  console.log();
  var currGame = this;
  this.reader.question("Player " + this.currentPlayer + " : Place Mark (row,col)", function (posStr) {
    var pos = currGame.parsePos(posStr);

    try {
      currGame.board.placeMark(pos, currGame.currentPlayer);
    } catch(err) {
      console.log(err);
      currGame.run(completionCallback);
      return;
    }

    if (currGame.board.fullBoard() || currGame.board.won()) {
      completionCallback();
      return;
    } else {
      currGame.currentPlayer = (currGame.currentPlayer === "X") ? "O" : "X";
    }

    currGame.run(completionCallback);
  });
};

Game.prototype.parsePos = function(posStr) {
  var pos = posStr.split(",");
  pos = pos.map(function(num) {
    return parseInt(num);
  });
  return pos;
};


module.exports = Game;
