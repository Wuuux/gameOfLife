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
        var element = document.createElement('div'); //tworzymy nowego Diva
        this.board.appendChild(element);
      }
      this.board = document.getElementById('board');
      this.board.style.width  = ""+10*this.boardWidth+"px";
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



    //game START
    var play  = document.getElementById('play');
    var pause = document.getElementById('pause');
    var start = document.getElementById('start');
    var clock;
    var game = new GameOfLife();
    play.addEventListener('click',playGame);
    pause.addEventListener('click',pauseGame);
    start.addEventListener('click',startGame);

    function playGame(){
      clock = setInterval(myMove, 100);
    }

    function pauseGame(){
      clearInterval(clock);
    }

    function myMove(){
      game.computeNextGeneration();
      game.printNextGeneration();
    }

    function startGame(){
      if (!gra) {
        gra = true;
        var form = document.forms['game'];
        var x = parseInt(form.x.value);
        var y = parseInt(form.y.value);
        if ((x>=10) && (y>=10)) {
            document.getElementsByTagName('button')[0].style.display = 'inline';
            document.getElementsByTagName('button')[1].style.display = 'inline';
            document.getElementById('board').style.display = 'block';


            game.start(x,y);
            clock = setInterval(myMove, 10);
          }



      }
    }

    var gra = false;





});
/*


computeCellNextState(x, y)
computeNextGeneration()
printNextGeneration()


<<<<<<< HEAD
musimy stworzyć zmienną, w której przechowamy cały stan przyszłej planszy – będzie to zbiór liczb 0 i 1, a więc tworząc tę zmienną musimy
ją zdefiniować jako pustą tablicę
metoda ta powinna przejść po wszystkich komórkach i sprawdzić dla nich przyszły stan za pomocą computeCellNextState(x, y)
– zwrócony wynik powinnien zostać dodany do tablicy w stworzonej przed chwilą zmiennej
ponieważ funkcji computeCellNextState(x, y) musimy podać współrzędne x i y, pamiętaj, aby do chodzenia po planszy użyć pętli w pętli
(uważaj na to, żeby iść wiersz po wierszu, a nie kolumna po kolumnie)
=======
musimy stworzyć zmienną, w której przechowamy cały stan przyszłej planszy – będzie to zbiór liczb 0 i 1,
a więc tworząc tę zmienną musimy ją zdefiniować jako pustą tablicę
metoda ta powinna przejść po wszystkich komórkach i sprawdzić dla nich przyszły stan za pomocą computeCellNextState(x, y)
– zwrócony wynik powinnien zostać dodany do tablicy w stworzonej przed chwilą zmiennej
ponieważ funkcji computeCellNextState(x, y) musimy podać współrzędne x i y, pamiętaj, aby do chodzenia po planszy użyć pętli w pętli (uważaj na to, żeby iść wiersz po wierszu, a nie kolumna po kolumnie)
>>>>>>> origin/master
po wykonaniu tej funkcji w zmiennej, którą zdefiniowaliśmy na początku, powinniśmy mieć dokładnie tyle elementów ile mamy komórek na planszy
Wyświetlanie nowego stanu tablicy

metoda ta powinna przejść po wszystkich komórkach i ustawić im nowy stan bazując na informacjach zapisanych w zmiennej stworzonej w poprzednim kroku
ponieważ informacje o tym, jaki stan trzeba ustawić mamy w jednowymiarowej tablicy, łatwiej będzie nam tym razem poruszać się po naszej
planszy również jako po jednowymiarowej tablicy – którą zapisaliśmy na samym początku do atrybutu tego obiektu o nazwie cells
pamiętaj, że komórki ożywiamy lub uśmiercamy poprzez dodawanie i usuwanie odpowiedniej klasy
UWAGA: *żeby przetestować działanie pisanych w tym kroku metod ustawmy tymczasowo wydarzenie na przycisku play,
które po kliknięciu pokazuje kolejny krok animacji (czyli printNextGeneration();). *

7. Uruchomienie animacji – guziki play i pause

Ostatnim krokiem jest uruchomienie animacji, czyli ustawienie interwału, który co pewną liczbę milisekund wywoła pojedynczy krok gry.
Dodaj odpowiedni event do guzika play. Uruchomiony interwał zapisz do zmiennej, aby móc go czyścić po kliknięciu w pause.

UWAGA: O ile dotychczas używaliśmy właściwości i metod obiektu GameOfLife() i odnosiliśmy się do nich używając słowa kluczowego this,
w tym przypadku nie możemy tego zrobić: wewnątrz eventu lub interwału słowo kluczowe this przyjmuje inną wartość
i nie wskazuje na obiekt. Aby to ominąć jako atrybut obiektu stwórz zmienną, np. o nazwie self, przypisz do niej wartość this,
a potem wewnątrz metody obsługującej inetrwał używaj self.

8. Ostatnie poprawki

Jeśli doszedłeś do tego momentu, to znaczy, że twoja gra działa poprawnie. Brawo!

Nie zapomnij, że gra powinna powstawać na podstawie wymyślonych przez użytkownika wartości szerokość i wysokość.
Twojej inwencji pozostawiamy, jak zapytać użytkownika o te wartości.
Zapisz te wyniki do zmiennych i użyj ich jako parametrów przy powoływaniu obiektu twojej gry.

Pamiętaj, aby Twój obiekt wykonywał wszystkie niezbędne kroki początkowe (dla porządku możesz zamknąć je w jednej metodzie start()).

Jeśli chcesz, możesz zmienić event za pomocą którego użytkownik ożywia i uśmierca komórki – kliknięcie myszką będzie dokładne,
ale trudne w użyciu, zamiast tego możesz użyć najechania myszką.

*/
