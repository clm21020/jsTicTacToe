var TTT = require("./ttt");

var completionCallback = function (){
  this.board.printBoard();
  if (this.board.won()) {
    console.log(this.currentPlayer + " won!");
  } else {
    console.log("It's a tie!");
  }
  this.reader.close();
};

var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var game = new TTT.Game(reader);
game.run(completionCallback.bind(game));
