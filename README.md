# september

To repozytorium startuje od podejścia **intent-driven development**: najpierw definiujemy intencję produktu i logikę biznesową, a dopiero potem dobieramy implementację techniczną. Folder `/intent` jest źródłem prawdy dla założeń domenowych i ma pierwszeństwo nad bieżącym stosem technologicznym.

## O projekcie

`Wrzesień` to minimalistyczna aplikacja webowa działająca jako PWA i zapisująca dane lokalnie w przeglądarce (`localStorage`).

Założenia interfejsu:
- magazyn rzeczy nie jest listą zobowiązań,
- propozycje to podpowiedzi, nie przydziały,
- brak dziennych targetów, streaków i liczników presji,
- rozróżnienie rzeczy z realnym terminem od „chciałbym zrobić”.

## Struktura

- `index.html` — UI aplikacji
- `styles.css` — minimalistyczne style
- `app.js` — logika aplikacji i zapis do `localStorage`
- `sw.js` — service worker do pracy offline
- `manifest.webmanifest` — konfiguracja PWA
- `AGENTS.md` — decyzje architektoniczne i ich uzasadnienie
- `intent/` — dokumenty intencji biznesowej

## Uruchomienie lokalne

Ponieważ to aplikacja statyczna, wystarczy prosty serwer HTTP:

```bash
python3 -m http.server 4173
```

Następnie otwórz:

`http://localhost:4173`

## Deploy na GitHub Pages

Projekt nie wymaga procesu build.
Wystarczy publikacja zawartości repozytorium jako statycznej strony (branch deployment).
