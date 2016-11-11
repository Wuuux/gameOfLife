document.addEventListener("DOMContentLoaded", function(){

    var GameOfLife = function (){
      this.boardWidth   = 10;
      this.boardHeight  = 10;
      this.board = document.getElementById('board');
      this.cells = [];
      this.self;
      this.nextGeneration = [];

    };


    GameOfLife.prototype.createBoard = function() {

      function live(){
          this.classList.toggle('live');
      }

      for(var i = 0; i < (this.boardWidth * this.boardHeight); i++){
        var element = document.createElement('div');
        this.board.appendChild(element);
      }
      this.board = document.getElementById('board');
      this.board.style.width  = ""+10*this.boardWidth +"px";
      this.board.style.height = ""+10*this.boardHeight+"px";
      this.cells = document.querySelectorAll('#board div');
      for(var i = 0; i < this.cells.length; i++){
        this.cells[i].addEventListener('click',live);
      }
    };

    GameOfLife.prototype.cellOfXY = function(x,y) {
      return this.cells[x+y*this.boardWidth];
    }

    GameOfLife.prototype.setCellState = function(x, y, state) {
      if (state=='live')  {this.cellOfXY(x,y).classList.add('live')}
      else                {this.cellOfXY(x,y).classList.remove('live')}
    }

    GameOfLife.prototype.firstGlider = function() {
      this.setCellState(1,0,'live');
      this.setCellState(2,1,'live');
      this.setCellState(0,2,'live');
      this.setCellState(1,2,'live');
      this.setCellState(2,2,'live');
    }

    GameOfLife.prototype.computeCellNextState = function(x,y){
      var sum = 0;
      if (((x-1) >= 0)                 && ((y-1) >= 0)                  && (this.cellOfXY(x-1,y-1).classList.contains("live"))) sum++;
      if (((x)   >= 0)                 && ((y-1) >= 0)                  && (this.cellOfXY(x,  y-1).classList.contains("live"))) sum++;
      if (((x+1) <= this.boardWidth-1) && ((y-1) >= 0)                  && (this.cellOfXY(x+1,y-1).classList.contains("live"))) sum++;
      if (((x-1) >= 0)                 && ((y)   >= 0)                  && (this.cellOfXY(x-1,  y).classList.contains("live"))) sum++;
      if (((x+1) <= this.boardWidth-1) && ((y)   >= 0)                  && (this.cellOfXY(x+1,  y).classList.contains("live"))) sum++;
      if (((x-1) >= 0)                 && ((y+1) <= this.boardHeight-1) && (this.cellOfXY(x-1,y+1).classList.contains("live"))) sum++;
      if (((x)   >= 0)                 && ((y+1) <= this.boardHeight-1) && (this.cellOfXY(x,  y+1).classList.contains("live"))) sum++;
      if (((x+1) <= this.boardWidth-1) && ((y+1) <= this.boardHeight-1) && (this.cellOfXY(x+1,y+1).classList.contains("live"))) sum++;

      if      ( (this.cellOfXY(x,y).classList.contains("live")) && (sum <  2))  {return 0}
      else if ((!this.cellOfXY(x,y).classList.contains("live")) && (sum == 3))  {return 1}
      else if ( (this.cellOfXY(x,y).classList.contains("live")) && (sum >  3))  {return 0}
      else if   (this.cellOfXY(x,y).classList.contains("live"))                 {return 1}
      else                                                                      {return 0};
    }

    GameOfLife.prototype.computeNextGeneration = function(){
      for(var i = 0; i < this.boardHeight; i++){
        for(var j = 0; j < this.boardWidth; j++){
        this.nextGeneration[j+i*this.boardWidth] = this.computeCellNextState(j,i);
        }
      }
    }

    GameOfLife.prototype.printNextGeneration = function(){
      for(var i = 0; i < this.cells.length; i++){
        if (this.nextGeneration[i] == 1) {this.cells[i].classList.add('live')}
        else                             {this.cells[i].classList.remove('live')};
      }
    }

    GameOfLife.prototype.start = function(x,y){
      this.boardWidth   = x;
      this.boardHeight  = y;
      this.createBoard();
      this.firstGlider();
    }



    //game
    var play  = document.getElementById('play');
    var pause = document.getElementById('pause');
    var start = document.getElementById('start');
    var clock;
    var playFlag = false;
    var game = new GameOfLife();
    var gameFlag = false;
    play.addEventListener('click',playGame);
    pause.addEventListener('click',pauseGame);
    start.addEventListener('click',startGame);

    function playGame(){
      if (playFlag == false) {
        clock = setInterval(myMove, 100);
        playFlag = true;
      };
    }

    function pauseGame(){
      if (playFlag == true) {
        clearInterval(clock);
        playFlag = false;
      };
    }

    function myMove(){
      game.computeNextGeneration();
      game.printNextGeneration();
    }

    function startGame(){
      if (!gameFlag) {
        gra = true;
        var form = document.forms['game'];
        var x = parseInt(form.x.value);
        var y = parseInt(form.y.value);
        if ((x>=10) && (y>=10)) {
            document.getElementsByTagName('button')[0].style.display = 'inline';
            document.getElementsByTagName('button')[1].style.display = 'inline';
            document.getElementById('board').style.display = 'block';
            document.getElementById('form').style.display = 'none';
            game.start(x,y);
          }
      }
    }
});
