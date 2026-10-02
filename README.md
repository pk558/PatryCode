# PatryCode — kompletna paczka GitHub Pages

Statyczna strona PL/EN dla domeny https://patrycode.net. Nie wymaga npm, Node.js ani builda.

## Podmiana w repozytorium

1. Rozpakuj archiwum.
2. Skopiuj jego **zawartość** do katalogu głównego repozytorium, zastępując poprzednie pliki strony. Zachowaj katalog `.git` i istniejące ustawienia repozytorium. Nie wrzucaj całego ZIP-a ani dodatkowego katalogu nadrzędnego.
3. Dodaj wszystkie pliki, także `.nojekyll`, i zrób commit/push.
4. GitHub → Settings → Pages → Deploy from a branch → main (lub Twoja gałąź) → / (root).
5. Custom domain: `patrycode.net`. Plik `CNAME` zawiera tę domenę. Zachowaj działającą konfigurację DNS i HTTPS.

## Struktura

- `index.html`, `en/index.html` — treść i metadane strony PL/EN.
- `assets/css/style.css` — wygląd.
- `assets/js/script.js` — animacje, kropki sekcji i odsłanianie e-maila.
- `assets/images/` — lokalne grafiki projektów i istniejący podgląd social media.
- `assets/icons/` — favicon SVG/PNG, Apple Touch Icon oraz ikony manifestu.
- `favicon.ico` — favicon zgodny ze starszymi przeglądarkami.
- `site.webmanifest` — nazwa, kolory i ikony strony; bez service workera i trybu offline.
- `robots.txt` — dozwolone indeksowanie oraz wskazanie sitemapy.
- `sitemap.xml` — adresy stron PL/EN i ich powiązania językowe.
- `llms.txt` — krótki indeks w formacie Markdown dla narzędzi AI.
- `index.md`, `en/index.md` — tekstowe odpowiedniki obu wersji strony.
- `404.html` — strona błędu dla GitHub Pages.
- `CNAME`, `.nojekyll` — konfiguracja GitHub Pages.

## SEO

Obie wersje mają osobne tytuły, opisy i canonical, wzajemne hreflang z x-default, Open Graph, Twitter Card oraz dane strukturalne Person, WebSite i WebPage. W danych strukturalnych nie ma publicznego adresu e-mail, wymyślonych ocen ani danych firmy, których nie potwierdzono.

Po publikacji dodaj domenę w Google Search Console, potwierdź jej własność i zgłoś `https://patrycode.net/sitemap.xml`. Weryfikacja wymaga dostępu do Twojego konta lub DNS; paczka jej nie wykonuje. Indeksowanie i pozycje nie są gwarantowane.

`llms.txt` to konwencja/propozycja pomagająca wybranym narzędziom odczytać treść, a nie gwarancja obecności w odpowiedziach AI.

## Edycja

Zmieniaj równolegle tekst w `index.html` i `en/index.html`. Przy zmianach oferty lub projektów aktualizuj także `index.md`, `en/index.md` i `llms.txt`.

Przy zmianie domeny popraw `CNAME`, canonical, hreflang, OG, JSON-LD, manifest, sitemapę, robots.txt i linki w Markdown. Ta paczka jest skonfigurowana do publikacji w katalogu głównym `patrycode.net`.

Podgląd lokalny: `python -m http.server 8000`, następnie `http://localhost:8000/`.

E-mail jest odsłaniany dopiero po kliknięciu. To ogranicza proste scrapery i nie zapewnia pełnej ochrony. Font jest pobierany z Google Fonts, z lokalnym fontem zastępczym.

Materiały i opisy dotyczą PatryCode, SEPE i Śląskiego Ikarusa. Paczka nie dodaje odrębnej licencji na logotypy projektów.
