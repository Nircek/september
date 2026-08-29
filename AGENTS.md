# Decyzje architektoniczne

## 1) Stack: statyczna aplikacja (HTML + CSS + Vanilla JS), bez builda
**Decyzja:** brak frameworka i brak kroku kompilacji.

**Uzasadnienie:** to minimalizuje koszt utrzymania, redukuje liczbę punktów awarii i upraszcza deploy na GitHub Pages. Przy małym zakresie funkcjonalnym aplikacji logika w jednym module JS jest czytelna i łatwa do modyfikacji.

## 2) Dane tylko w `localStorage` z jedną wersjonowaną strukturą
**Decyzja:** całość stanu trzymana pod kluczem `september.v1`, model oparty o listę obiektów `items`.

**Uzasadnienie:** spełnia wymóg pełnej lokalności i offline, a wersjonowany klucz ułatwia przyszłe migracje bez blokowania rozwoju (np. `september.v2`).

## 3) PWA jako app shell + service worker cache-first dla zasobów
**Decyzja:** cache plików aplikacji (`index`, `css`, `js`, `manifest`, ikona) oraz fallback na `index.html` dla nawigacji.

**Uzasadnienie:** po pierwszym załadowaniu aplikacja działa bez sieci, a strategia jest prosta i przewidywalna przy statycznym deployu na GitHub Pages.

## 4) Interfejs pull-based, bez metryk produktywności
**Decyzja:** start od intencji użytkownika i check-in, brak dashboardu zaległości, brak streaków i dziennych targetów.

**Uzasadnienie:** bezpośrednio realizuje invarianty z `/intent`, oddziela magazyn od „dzisiejszej listy” i zmniejsza presję poznawczą.

## 5) Typ rzeczy i status edytowalne w każdym momencie
**Decyzja:** pełna edycja metadanych w widoku magazynu, bez wymuszania klasyfikacji przy dodawaniu.

**Uzasadnienie:** wspiera ewolucję założeń i łatwe korygowanie błędnej klasyfikacji bez przebudowy modelu danych.

## 6) Ścieżka terminów: wsparcie, nie zastępowanie kalendarza
**Decyzja:** dla typu `TERMIN` przechowywany jest termin oraz flaga „zabezpieczony w kalendarzu”.

**Uzasadnienie:** aplikacja zachowuje rozróżnienie „deadline vs chciałbym zrobić”, ale nie przejmuje roli systemu kalendarzowego.
