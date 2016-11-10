document.addEventListener("DOMContentLoaded", function(){

    var GameOfLife = function (width, height){
      this.boardWidth  = width;
      this.boardHeight = height;
      this.board = document.getElementById('board');
      this.cells = [];
      this.self;

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
      else if ((!this.cellOfXY(x,y).classList.contains("live")) && (sum >  3))  {return 0}
      else if   (this.cellOfXY(x,y).classList.contains("live"))                 {return 1}
      else                                                                      {return 0};
    }


    //game START

    var game = new GameOfLife(80,80);
    game.createBoard();
    game.firstGlider();
    console.log(game.computeCellNextState(0,0));
    console.log(game.computeCellNextState(0,1));
    console.log(game.computeCellNextState(0,2));
    console.log(game.computeCellNextState(1,0));
    console.log(game.computeCellNextState(1,1));
    console.log(game.computeCellNextState(1,2));
    console.log(game.computeCellNextState(2,0));
    console.log(game.computeCellNextState(2,1));
    console.log(game.computeCellNextState(2,2));

});
/*
Opiszmy najpierw metody, które musi wykonywać nasz program:

Metoda, która buduje odpowiednią planszę na podstawie podanych wartości szerokości i wysokości (ogranicza za pomocą styli CSS width i height sekcji, tworzy i dodaje do DOMu odpowiednią ilość divów, zapisuje je wszystkie do tablicy i dodaje im event umożliwiający zmianę ich stanu po kliknięciu myszką).
Metoda wyświetlająca stan początkowy (np. z pojedynczym gliderem) – do tego potrzebować będziemy metody do poruszania się po ciągu divów za pomocą współrzędnych x, y i metody setCellState, która przyjmuje parametry x, y i state.
Metoda computeCellNextState przyjmująca parametry x i y, która na podstawie stanu tej komórki oraz stanu jej sąsiadów oblicza, czy ma ona przeżyć, czy umrzeć, czy ożyć.
Metoda computeNextGeneration, która na podstawie aktualnego stanu wszystkich komórek stworzy i zapisze do zmiennej newGeneration nowy stan całej planszy (używając computeCellNextState).
Metoda printNextGeneration, która zastąpi obecny stan wszystkich komórek nowym stanem (przechowywanym w tempGeneration).
Metody start (w której zawrzemy wszystkie kroki początkowe), play (obsługująca event kliknięcia na button 'play' uruchomieniem animacji) i pause (obsługująca event kliknięcia na button 'pause' zatrzymaniem animacji).
I tyle! Przejdziemy teraz powoli przez wszystkie kroki, ale jeśli czujesz się na siłach móżesz spróbować napisać tę aplikację tylko na podstawie powyższego skróconego opisu.


4. Wskazywanie danej komórki za pomocą współrzędnych x i y

W tym momencie możemy wskazać konkretną komórkę tylko poprzez jej indeks w tablicy this.cells. Jednak komórki mają żyć lub umierać
w zależności od swoich sąsiadów, których najlepiej określić jako:

dla komórki o współrzędnych x, y:

1. sąsiad: x-1, y-1
2. sąsiad: x, y-1
3. sąsiad: x+1, y1
4. sąsiad: x-1, y
5. sąsiad: x+1, y
6. sąsiad: x-1, y+1
7. sąsiad: x, y+1
8. sąsiad: x+1, y+1
Do obiektu dodaj metodę, która przeliczy współrzędne x i y na indeks tablicy wg. odpowiedniego wzoru.
Metoda powinna zwracać element <div> o podanych współrzędnych.

podpowiedź:

indeks = x + y * width

5. Zdefiniowanie stanu początkowego

Aby łatwiej nam było sprawdzać, czy dobrze programujemy naszą animację stwórzmy metodę, która wyświetli nam w lewym górnym rogu planszy glidera.
W tym celu:

potrzebna nam będzie metoda setCellState(x, y, state), która komórce o zadanych współrzędnych zmieni stan (na podany w parametrze)
za pomocą prostego wyrażenia warunkowego oraz usuwania i dodawania odpowiedniej klasy
stwórz metodę firstGlider(), w której ożywisz wybrane przez Ciebie 5 komórek (za pomocą metody setCellState(x, y, 'live')), aby wyświetlić glidera
6. Kroki programu

Żeby poprawnie zastosować założenia Conwaya, musimy w tym samym momencie zmienić stan wszystkich komórek na nowy
(błędem byłoby zmienianie każdej komórki po kolei, bo przed chwilą zmieniona wpływałaby na zmianę kolejnej, jako jej sąsiada).
Zaplanujmy więc kroki, które musimy wykonywać, żeby animacja działała poprawnie:

wyliczenie przyszłego stanu komórki o współrzędnych x i y na podstawie jej sąsiadów
zapisanie do zmiennej (np. nextGeneration) wyliczonych przyszłych stanów wszystkich komórek po kolei
ustawienie nowego wyglądu wszystkich komórek na podstawie danych z tej zmiennej
Musimy więc stworzyć 3 metody:

computeCellNextState(x, y)
computeNextGeneration()
printNextGeneration()
Generowanie przyszłego stanu komórki

metoda ta powinna sprawdzić wszystkich ośmiu sąsiadów komórki o podanych współrzędnych i policzyć ilu z nich żyje
następnie zależnie od tego czy komórka ta jest żywa oraz od tego ilu sąsiadów żyje musimy ustalić jej przyszły stan
jeśli komórka ma być żywa niech nasza funkcja zwraca 1, w przypadku gdy ma być martwa, niech funkcja zwraca 0
Generowanie przyszłego wyglądu naszej planszy

musimy stworzyć zmienną, w której przechowamy cały stan przyszłej planszy – będzie to zbiór liczb 0 i 1,
a więc tworząc tę zmienną musimy ją zdefiniować jako pustą tablicę
metoda ta powinna przejść po wszystkich komórkach i sprawdzić dla nich przyszły stan za pomocą computeCellNextState(x, y)
– zwrócony wynik powinnien zostać dodany do tablicy w stworzonej przed chwilą zmiennej
ponieważ funkcji computeCellNextState(x, y) musimy podać współrzędne x i y, pamiętaj, aby do chodzenia po planszy użyć pętli w pętli (uważaj na to, żeby iść wiersz po wierszu, a nie kolumna po kolumnie)
po wykonaniu tej funkcji w zmiennej, którą zdefiniowaliśmy na początku, powinniśmy mieć dokładnie tyle elementów ile mamy komórek na planszy
Wyświetlanie nowego stanu tablicy

metoda ta powinna przejść po wszystkich komórkach i ustawić im nowy stan bazując na informacjach zapisanych w zmiennej stworzonej w poprzednim kroku
ponieważ informacje o tym, jaki stan trzeba ustawić mamy w jednowymiarowej tablicy, łatwiej będzie nam tym razem poruszać się po naszej planszy również jako po jednowymiarowej tablicy – którą zapisaliśmy na samym początku do atrybutu tego obiektu o nazwie cells
pamiętaj, że komórki ożywiamy lub uśmiercamy poprzez dodawanie i usuwanie odpowiedniej klasy
UWAGA: *żeby przetestować działanie pisanych w tym kroku metod ustawmy tymczasowo wydarzenie na przycisku play,
które po kliknięciu pokazuje kolejny krok animacji (czyli printNextGeneration();). *

7. Uruchomienie animacji – guziki play i pause

Ostatnim krokiem jest uruchomienie animacji, czyli ustawienie interwału, który co pewną liczbę milisekund wywoła pojedynczy krok gry. Dodaj odpowiedni event do guzika play. Uruchomiony interwał zapisz do zmiennej, aby móc go czyścić po kliknięciu w pause.

UWAGA: O ile dotychczas używaliśmy właściwości i metod obiektu GameOfLife() i odnosiliśmy się do nich używając słowa kluczowego this, w tym przypadku nie możemy tego zrobić: wewnątrz eventu lub interwału słowo kluczowe this przyjmuje inną wartość i nie wskazuje na obiekt. Aby to ominąć jako atrybut obiektu stwórz zmienną, np. o nazwie self, przypisz do niej wartość this, a potem wewnątrz metody obsługującej inetrwał używaj self.

8. Ostatnie poprawki

Jeśli doszedłeś do tego momentu, to znaczy, że twoja gra działa poprawnie. Brawo!

Nie zapomnij, że gra powinna powstawać na podstawie wymyślonych przez użytkownika wartości szerokość i wysokość. Twojej inwencji pozostawiamy, jak zapytać użytkownika o te wartości. Zapisz te wyniki do zmiennych i użyj ich jako parametrów przy powoływaniu obiektu twojej gry.

Pamiętaj, aby Twój obiekt wykonywał wszystkie niezbędne kroki początkowe (dla porządku możesz zamknąć je w jednej metodzie start()).

Jeśli chcesz, możesz zmienić event za pomocą którego użytkownik ożywia i uśmierca komórki – kliknięcie myszką będzie dokładne, ale trudne w użyciu, zamiast tego możesz użyć najechania myszką.

*/
