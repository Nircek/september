# Wrzesień — specyfikacja interakcji v0.1

Status: implementacja wymienna.
Cel: narzędzie ma przejąć część kosztu pamiętania frameworku i prezentować informacje w sposób, który nie zamienia magazynu spraw w listę zobowiązań.

## 1. Podstawowe obiekty

### Rzecz

Minimalnie:

* nazwa / opis,
* opcjonalny naturalny tryb wykonywania:

  * termin,
  * blok,
  * iteracja,
  * eksploracja,
* opcjonalny termin,
* opcjonalne notatki,
* status:

  * przechowywana,
  * aktualnie dostępna,
  * zakończona,
  * odłożona / nieważna.

Klasyfikacja nie musi być obowiązkowa w momencie dodawania.

Szybkie zapisanie rzeczy jest ważniejsze niż kompletność metadanych.

## 2. Dodawanie rzeczy

Najłatwiejsza akcja w całym systemie.

Cel:

> „pojawiło mi się coś w głowie → odkładam to tutaj → nie muszę dalej o tym pamiętać”.

Dodanie nie może automatycznie:

* aktywować zadania,
* przypisać go do dnia,
* stworzyć presji wykonania,
* wymagać pełnej klasyfikacji.

Po zapisaniu narzędzie powinno komunikować raczej:

> „zapisane”

niż:

> „dodano do zadań”.

## 3. Magazyn

Istnieje pełny widok wszystkich rzeczy.

Nie powinien być domyślnym widokiem używanym przy każdym wejściu do narzędzia.

Powinien służyć głównie do:

* przeglądu,
* edycji,
* wyszukiwania,
* refleksji co kilka dni,
* upewnienia się, że rzecz została zapisana.

Nie powinien używać wizualnych mechanizmów sugerujących zaległość, jeśli nie istnieje prawdziwy termin.

Unikać:

* czerwonych badge’y bez powodu,
* „12 pozostało”,
* pasków dziennego postępu,
* streaków,
* ocen produktywności.

## 4. Wejście do aplikacji

Domyślnie aplikacja nie pokazuje całego backlogu.

Najpierw może zadać krótkie pytanie o aktualną intencję lub stan.

Przykładowe wejścia:

### „Chcę coś zrobić”

Narzędzie pomaga znaleźć rzecz dopasowaną do obecnego stanu.

### „Coś mi się przypomniało”

Natychmiast otwiera szybkie dodawanie.

### „Chcę tylko sprawdzić magazyn”

Pokazuje pełną zawartość bez sugerowania, że trzeba coś wybrać.

### „Nie wiem”

Może rozpocząć minimalny check-in stanu.

## 5. Check-in stanu

Nie powinien być ankietą.

Maksymalnie kilka prostych decyzji.

Powinien próbować ustalić głównie:

* czy użytkownik chce teraz działać,
* czy nadal tkwi w poprzednim kontekście,
* czy ma zasoby na decyzje,
* czy potrzebuje raczej czegoś mechanicznego / prostego / eksploracyjnego.

Nie musi dokładnie modelować emocji.

Celem nie jest diagnoza stanu, tylko ograniczenie przestrzeni wyboru.

## 6. Proponowanie rzeczy

Narzędzie może pokazać mały podzbiór magazynu pasujący do aktualnej sytuacji.

Bardzo ważne:

propozycja ≠ przydział.

Język interfejsu powinien mówić:

* „może pasować”,
* „masz teraz dostępne”,
* „chcesz którąś otworzyć?”,

a nie:

* „dzisiaj musisz”,
* „twoje zadania na dziś”,
* „zostały 3”.

Powinna istnieć łatwa odpowiedź:

> „nic z tego”.

Bez konsekwencji.

## 7. Brak automatycznego dziennego planu

Aplikacja nie losuje ani nie wybiera rano zestawu obowiązkowych zadań.

Nie utrzymuje kategorii:

> „nieukończone zadania z wczoraj”

chyba że rzeczywiście istniał termin.

Nowy dzień nie wymaga resetu ani planowania.

## 8. Otworzenie rzeczy

Po wybraniu rzeczy narzędzie pokazuje przede wszystkim sposób podejścia do niej.

Przykład dla BLOKU:

> „To wygląda jak rzecz, którą warto wejść i domknąć jednym ciągiem. Masz teraz przestrzeń na taki blok?”

Przykład dla ITERACJI:

> „Nie musisz tego kończyć. Jaki fragment byłby sensowną pojedynczą iteracją?”

Przykład dla EKSPLORACJI:

> „Nie musisz jeszcze znać rozwiązania. Możesz po prostu zwiększyć orientację.”

Przykład dla TERMINU:

> „Czy termin jest już zabezpieczony w kalendarzu?”

Framework jest więc ładowany kontekstowo, tylko w miejscu, gdzie jest potrzebny.

## 9. Rozpoczęcie pracy

Nie wymaga deklarowania z góry:

* ile czasu będę pracować,
* ile wykonam,
* czy na pewno skończę.

Może istnieć akcja:

> „wchodzę w to”

która jedynie oznacza bieżący kontekst.

## 10. Po wykonaniu fragmentu

System pyta o aktualny stan rzeczy, nie o sukces dnia.

Możliwe odpowiedzi:

* skończone,
* zrobiłem sensowny kawałek,
* chcę kontynuować,
* sposób wykonywania okazał się zły,
* pojawiła się blokada,
* jednak nie teraz.

„Zrobiłem sensowny kawałek” jest pełnoprawnym wynikiem dla rzeczy iteracyjnej lub eksploracyjnej.

## 11. Flow po zakończeniu

Po zakończeniu rzeczy aplikacja może zapytać:

> „chcesz jeszcze coś?”

Jeżeli tak, proponuje kolejny mały zestaw.

Jeżeli nie, zamyka sesję.

Nie pokazuje podsumowania typu:

> „wykonałeś tylko 1 z 4”.

Jeżeli użytkownik ma dobry flow, może przechodzić przez dowolną liczbę rzeczy.

## 12. Obsługa myśli „czemu jeszcze tego nie zrobiłem?”

Powinna istnieć szybka ścieżka wejścia dla konkretnej rzeczy.

Po jej otworzeniu narzędzie pomaga odpowiedzieć:

> „czy mogę to sensownie zrobić teraz?”

Jeśli nie:

* poprzedni kontekst,
* brak zasobów,
* blokada,
* inny powód.

Po zapisaniu odpowiedzi rzecz wraca do magazynu.

Nie tworzy się kara, zaległość ani dodatkowy reminder wyłącznie dlatego, że została otwarta.

## 13. Zmiana typu rzeczy

Typ zadania powinien być łatwy do zmiany.

Możliwe nawet podczas pracy:

> „to jednak nie jest ITERACJA, tylko BLOK”

albo:

> „to jeszcze nie jest zadanie, tylko EKSPLORACJA”.

Zmiana jest traktowana jako zdobyta informacja.

## 14. Terminy

Jeżeli rzecz ma prawdziwy deadline, aplikacja powinna jasno to odróżnić od zwykłego „chciałbym zrobić we wrześniu”.

Idealnie narzędzie nie konkuruje z kalendarzem.

Może jedynie pokazywać:

* termin istnieje,
* termin został zabezpieczony,
* termin wymaga jeszcze przeniesienia do kalendarza.

## 15. Powrót po przerwie

Jeżeli aplikacja nie była używana przez tydzień:

nie pokazuje:

> „masz 17 zaległych rzeczy”.

Powrót wygląda dokładnie tak samo jak zwykle:

> „co chcesz teraz zrobić?”

lub:

> „jak jest teraz?”

Brak używania aplikacji nie generuje długu wobec aplikacji.

## 16. Refleksja nad systemem

Osobny, opcjonalny widok.

Ma zbierać obserwacje takie jak:

* ta rzecz była źle sklasyfikowana,
* ten ekran powoduje presję,
* tego pytania nigdy nie używam,
* przy takim stanie pomaga mi coś mechanicznego,
* system nie przewidział tej sytuacji.

To dane do kolejnej iteracji frameworku.

Nie należy mieszać ich z codziennym wykonywaniem zadań.

## 17. Cel interfejsu

Każdy element interfejsu powinien przejść test:

> Czy ten element pomaga przechować kontekst lub podjąć decyzję?

Jeżeli jedynie:

* ocenia,
* mierzy produktywność,
* pokazuje zaległości bez możliwości działania,
* wymaga zarządzania samym systemem,

należy mocno zakwestionować jego istnienie.

## 18. Najważniejsze invarianty

Implementacja może się całkowicie zmienić, ale powinna zachować:

1. magazyn ≠ dzisiejsza lista,
2. propozycja ≠ zobowiązanie,
3. ważne ≠ teraz,
4. niewykonane ≠ zawalone,
5. termin ≠ „chciałbym zrobić”,
6. system pyta o stan przed narzuceniem pracy,
7. sposób wykonywania zależy od charakteru rzeczy,
8. brak używania systemu nie tworzy zaległości,
9. framework jest pokazywany kontekstowo, a nie wymagany z pamięci,
10. system ma ograniczać presję poznawczą, a nie tylko lepiej organizować zadania.
