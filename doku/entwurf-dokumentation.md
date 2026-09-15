# Gohl Consulting und Elster Dental Consulting, Website-Entwurf

**Stand:** 15.09.2026 · **Version:** 0.7 · **Ersteller:** AO Consulting GmbH

Entwurf zur Abstimmung. Noch nicht für den Livegang bestimmt.
**Keine Rechtsberatung.** Impressum und Datenschutzerklärung sind Gerüste mit
sichtbar markierten Lücken.

---

## 1. Zwei Fassungen, eine Quelle

| Datei | Wofür |
|---|---|
| `../vorschau-gohl-elster.html` | **Zum Ansehen.** Eine einzige Datei, alles eingebettet. Doppelklick genügt, es wird kein Server gebraucht und nichts aus dem Netz geladen. |
| `website/` | **Die Fassung für den Livegang.** Sieben Einzelseiten mit gemeinsamem `assets`-Ordner. Nur hier wird gearbeitet. |

Die Vorschaudatei wird erzeugt, nicht gepflegt. Nach jeder Änderung an den
Einzelseiten einmal `python3 werkzeuge/bau-einzeldatei.py` laufen lassen, dann
ist sie wieder aktuell. Handkorrekturen in der Vorschaudatei gehen beim
nächsten Lauf verloren.

Die Einzelseiten wollen einen Server: im Ordner `website/` ein
`python3 -m http.server 8000` starten und `http://localhost:8000` aufrufen.
Über `file://` melden die Schrift-Preloads einen CORS-Fehler. Das ist eine
Eigenart des Protokolls und tritt über HTTP nicht auf. Genau deshalb gibt es
die Vorschaudatei.

---

## 2. Aufbau

```
Projekt-Gohl-Elster/04_stufe-4_.../output/
├── vorschau-gohl-elster.html         eine Datei zum Doppelklicken
├── werkzeuge/bau-einzeldatei.py      erzeugt genau diese Datei
└── website/
    ├── index.html                    Auswahl-Startseite, zwei Kacheln
    ├── elster-dental.html            Markenbereich Zahnmedizin (dunkel)
    ├── gohl-consulting.html          Markenbereich Allgemeinmedizin (hell)
    ├── impressum-elster-dental.html
    ├── datenschutz-elster-dental.html
    ├── impressum-gohl-consulting.html
    ├── datenschutz-gohl-consulting.html
    ├── gleichstellung-elster-dental.html
    ├── gleichstellung-gohl-consulting.html
    ├── assets/
    │   ├── schrift.css               Poppins, lokal eingebunden
    │   ├── stil.css                  gemeinsames Stylesheet beider Marken
    │   ├── skript.js                 Navigation, FAQ, Formular, Einblenden
    │   ├── barrierefreiheit.css/.js  AO-Standardmodul
    │   └── einwilligung.css/.js      AO-Standardmodul
    ├── fonts/                        Poppins 300 bis 700, WOFF2, 92 KB
    ├── img/                          Logos als SVG, Fotos als WebP und JPG
    ├── robots.txt, sitemap.xml       Vorlagen, Domain anpassen
    └── LIESMICH.md
```

---

## 3. Gestaltung

**Farben** (unverändert von der bestehenden Kundenseite übernommen):

| Rolle | Wert |
|---|---|
| Anthrazit | `#1A1A1A` |
| Creme | `#FAF8F5` |
| Gold hell (auf Dunkel) | `#C9A961` |
| Gold mittel (große Schrift auf Hell) | `#A9812E` |
| Gold dunkel (Fließtext und Links auf Hell) | `#8A6A1F` |
| Fließtextgrau | `#555C66` |
| Logo Elster | `#BD911D` aus der Originaldatei |
| Logo Gohl | `#A58213` aus der Originaldatei |

Das mittlere Gold erreicht auf Creme nur 3,4:1 und wird deshalb ausschließlich
für große Schrift und Flächen verwendet. Für Fließtext und Links steht das
dunklere Gold mit 4,7:1 bereit. Beide Werte sind berechnet, nicht geschätzt.

**Schrift:** Poppins, lokal ausgeliefert, keine Verbindung zu Google.

**Markenunterscheidung:** Gesteuert über `data-marke` am `html`-Element.
`elster` schaltet auf die dunkle Grundstimmung, `gohl` auf die helle. Beide
nutzen dieselben Bausteine, deshalb wirkt jede Änderung sofort in beiden
Bereichen. Auch die Auswahl-Startseite nimmt diese Trennung auf: die linke
Kachel steht auf Anthrazit, die rechte auf Creme.

---

## 4. Logos und Bilder

**Die Logos liegen als echte Vektoren vor.** Die gelieferten
Illustrator-Dateien sind PDF-basiert und wurden verlustfrei nach SVG gewandelt.
Dadurch sind sie auf jeder Größe und auf jedem Bildschirm scharf, ohne dass
mehrere Pixelgrößen gepflegt werden müssen.

| Datei | Verwendung |
|---|---|
| `elster-dental-consulting-logo-gold.svg` | Kopf und Fußzeile Elster, linke Kachel der Startseite |
| `elster-dental-consulting-logo-creme.svg` | Reserve für Anwendungen auf goldenem Grund |
| `gohl-consulting-logo-gold.svg` | Kopf und Fußzeile Gohl, rechte Kachel der Startseite |
| `gohl-consulting-logo-creme.svg` | Reserve für Anwendungen auf dunklem oder goldenem Grund |

Die beiden Logos haben sehr unterschiedliche Seitenverhältnisse: Elster ist
breit und flach, Gohl hoch. Bei gleicher Höhe wirkt Gohl deutlich kleiner.
Deshalb bekommt jede Marke eine eigene Logohöhe im Stylesheet.

**Favicons** entstehen aus dem echten Signet. Das äußere SVG ist 64 mal 64
Pixel groß, ein inneres SVG beschneidet auf den Bildteil des Logos, die
Wortmarke liegt außerhalb und wird abgeschnitten. Dazu je ein PNG in 32 und
180 Pixeln als Rückfall. Die Auswahl-Startseite trägt weiterhin ein neutrales
goldenes Zeichen, weil sie zu keiner der beiden Marken gehört. Wenn Ihnen dort
eines der beiden Signete lieber ist, tausche ich es.

**Fotos.** Acht Motive im Einsatz, jedes nur einmal je Seite. Alle als WebP mit
JPG-Rückfall, lange Kante 1600 px, sprechende Dateinamen, einzelne Alt-Texte,
`width` und `height` gesetzt.

| Datei | Verwendung |
|---|---|
| `auswahl-zahnmedizin-elster-dental-consulting` | linke Kachel der Startseite, Beratungsgespräch |
| `auswahl-allgemeinmedizin-gohl-consulting` | rechte Kachel der Startseite, Porträt Isabel Gohl |
| `praxisberatung-zahnarztpraxis-brandenburg-beratungsgespraech` | Hero Elster Dental, Beratungsgespräch |
| `isabel-gohl-gruenderin-elster-dental-consulting` | Über uns, Elster Dental |
| `franz-schrader-geschaeftsfuehrer-elster-dental-consulting` | Über uns, Elster Dental |
| `praxisberatung-arztpraxis-brandenburg-isabel-gohl` | Hero Gohl Consulting |
| `isabel-gohl-gruenderin-gohl-consulting` | Über uns, Gohl Consulting |
| `praxisberatung-zahnarztpraxis-brandenburg-isabel-gohl` | derzeit nicht verwendet, Reserve |

Der Bildausschnitt ist über `object-position` so gesetzt, dass das Gesicht auch
dann im Bild bleibt, wenn eine Querformatvorlage in ein Hochformat läuft. Auf
der Startseite sitzt das Gesicht bewusst rechts, damit Logo und Text links auf
ruhiger Fläche stehen.

**Bildrechte:** Geklärt. AO Consulting holt die schriftliche Einwilligung der
abgebildeten Personen und die Bestätigung der Nutzungsrechte grundsätzlich bei
jedem Projekt ein, das liegt für dieses Projekt vor.

### Zwei Geschäftsführer, nicht ein Gesicht

Die Elster Dental Consulting GmbH wird von **Isabel Gohl und Franz Schrader**
geführt. Der erste Entwurf war komplett um Isabel Gohl herum gebaut, mit ihr als
alleiniger Gründerin. Das ist korrigiert:

- Der Abschnitt „Über uns" auf der Elster-Seite heißt jetzt „Zwei Köpfe, ein
  Fokus" und zeigt beide Geschäftsführer nebeneinander.
- Die Texte sprechen in der Wir-Form von der GmbH, nicht in der Ich-Form von
  einer Person.
- Die Startseite sagt nicht mehr „eine Ansprechpartnerin", sondern „eine
  Handschrift". In der Fußzeile steht, wer welches Unternehmen führt.
- Im JSON-LD sind beide als `founder` mit der Rolle Geschäftsführung ausgezeichnet.

**Bilder sind jetzt ausgeglichen.** Das Porträt von Franz Schrader und zwei
Aufnahmen aus einem Beratungsgespräch liegen vor und sind eingesetzt:

- Hero der Elster-Seite: Beratungsgespräch, Herr Schrader im Bild.
- Linke Kachel der Startseite: zweite Aufnahme aus demselben Gespräch.
- Über uns: beide Porträts nebeneinander, gleich groß.
- Die rechte Kachel der Startseite und der gesamte Gohl-Bereich bleiben bei
  Isabel Gohl. Dort ist das richtig, das ist ihr Einzelunternehmen.

Auf jeder Kachel und in jedem Hero ist der Bildausschnitt so gesetzt, dass das
Gesicht neben dem Text steht und nicht dahinter. Auf der Elster-Kachel hätte der
mittige Zuschnitt sonst den Hinterkopf der Gesprächspartnerin gezeigt.

**Beide Karten sind bewusst gleich aufgebaut.** Gleiche Bildgröße, gleiche
Rollenbezeichnung „Geschäftsführung", gleiche Zeile darunter. Der gemeinsame
Schwerpunkt Zahnmedizin steht einmal im Vorspann der Sektion, nicht zweimal
fast wortgleich in den Karten. Das Porträt von Herrn Schrader ist auf das
Seitenverhältnis 3:4 zugeschnitten und dabei auf die gemessene Motivmitte
zentriert, nicht auf die Bildmitte. Sonst stand er in der Karte links.

**Optional:** Wenn die beiden sich inhaltlich unterscheiden sollen, genügen je
zwei Sätze, dann bekommt jede Karte ein eigenes Profil.

**Bildrechte:** Die drei neuen Aufnahmen kamen über AO Consulting und stammen
aus einem professionellen Shooting. Einwilligung der abgebildeten Personen und
Nutzungsrechte für beide Firmen liegen vor, das gehört bei AO Consulting zum
Standardablauf jedes Projekts. Kein offener Punkt.

Gohl Consulting bleibt bewusst persönlich: das ist das Einzelunternehmen
„Isabel Gohl Consulting", dort ist die Ich-Form richtig.

### Fußzeile und Gleichstellungshinweis

Auf **jeder** der neun Seiten steht jetzt dasselbe:

- Copyright mit automatisch gesetztem Jahr.
- Impressum, Datenschutz, **Gleichstellungshinweis** und Cookie-Einstellungen.
- Darunter, eine Stufe leiser und mittig, die Signatur
  „Made by **AO Consulting**" mit Verweis auf ao-consult.de. Das Zeichen dreht
  sich beim Überfahren, der Name wechselt auf Creme. Dezent genug, dass es die
  Pflichtangaben nicht verdrängt, und trotzdem erkennbar.

Den **Gleichstellungshinweis** gibt es je Marke als eigene Seite, im gleichen
Rahmen wie Impressum und Datenschutz, beide auf `noindex`.

**Der Fuß der Auswahlseite ist anders gebaut als der in den Markenbereichen.**
Dort stehen zwei gleichwertige Säulen nebeneinander: links Elster Dental
Consulting, rechts Isabel Gohl Consulting, jede mit eigenem Logo, Anschrift,
Telefon, E-Mail, Geschäftsführung beziehungsweise Inhaberin und den eigenen
Rechtslinks. Darunter eine gemeinsame Schlusszeile. So muss niemand raten,
welche Angabe zu welcher Firma gehört.

Damit der Trennstrich über den Rechtslinks in beiden Karten auf **derselben
Höhe** sitzt, steht das Logo in einem Feld mit fester Höhe und die Rechtszeile
wird über `margin-top:auto` an den unteren Kartenrand geschoben. Ohne das
verschiebt schon der unterschiedliche Logozuschnitt alles darunter.
Nachgemessen bei 1920, 1440, 1280, 1024 und 768 Pixeln: Abweichung 0 Pixel.

Zum Wortlaut: Auf der Bestandsseite stand „wird die männliche Form verwendet".
Das passt nicht zu unseren Texten, die durchgängig „Zahnärztinnen und Zahnärzte"
schreiben. Deshalb steht dort jetzt die Formulierung aus dem AO-Hausstandard:
vereinfachte Personenbezeichnungen, gemeint sind alle Geschlechter. Wenn der
alte Wortlaut bleiben soll, tausche ich ihn zurück.

---

## 5. Was der AO-Standard verlangt und wie es umgesetzt ist

| Punkt | Stand |
|---|---|
| Barrierefreiheits-Widget unten rechts | eingebaut, Farben an die Marke angepasst |
| Sprunglinks, Fokusringe, `aria-expanded`, Escape schließt Menü | umgesetzt |
| Genau eine h1 je Seite, lückenlose Hierarchie | geprüft, fehlerfrei |
| FAQ-Fragen als echte `h3` im `summary` | umgesetzt |
| Sichtbarer FAQ-Text deckungsgleich mit `FAQPage`-Markup | automatisch abgeglichen |
| Bilder als WebP mit Rückfall, `width`, `height`, Alt-Texte | umgesetzt |
| Logos als SVG, freigestellt, transparenter Hintergrund | umgesetzt |
| Schriften lokal, kein Zugriff auf fremde Hosts | gemessen, null Fremdzugriffe |
| Favicon, 32er PNG, Apple-Touch-Icon | je Marke aus dem echten Signet |
| Icons mittig im Feld, gleiche Felder gleich große Zeichen | gemessen, Abweichung 0 px |
| Barrierefreiheits-Knopf hebt sich vom Untergrund ab | hell 16,4:1, dunkel 7,7:1 |
| Copyright, Gleichstellungshinweis und AO-Signatur in jeder Fußzeile | umgesetzt |
| Formular verschickt nichts, prüft Pflichtfelder, Danke-Ansicht | umgesetzt |
| Responsive bei 1920 bis 390 px | geprüft, kein horizontales Scrollen |
| Einwilligungsbanner | siehe Punkt 6 |

**Bewusste Abweichung:** Der Auftrag nannte eine einzelne `index.html` mit
eingebettetem CSS. Aus der Auswahl-Startseite plus zwei Markenbereichen plus
vier Rechtsseiten sind sieben Seiten geworden. Der AO-Standard verlangt für
mehrseitige Projekte gemeinsame Dateien in `assets/`, sonst laufen die Seiten
auseinander. Die eine Datei zum Doppelklicken gibt es trotzdem, siehe Punkt 1.

**Offener Prüfpunkt:** Die Datenschutz-Checkbox im Formular ist 24 px hoch und
liegt damit unter der 44-px-Regel. Die klickbare Fläche ist die zugehörige
Beschriftung, die Zeile selbst ist 44 px hoch. Größere Kästchen wirken in der
Praxis klobig. Wenn das anders gewünscht ist, bitte melden.

---

## 6. Einwilligungsbanner: warum derzeit keins erscheint

Die Seite lädt nichts von fremden Servern. Keine Karte, kein Video, keine
Schriften von Google, keine Analyse. Gespeichert werden nur die Einstellungen
des Barrierefreiheits-Widgets und, sobald es eines gibt, die Einwilligung
selbst. Beides liegt im lokalen Speicher des Browsers und verlässt das Gerät
nicht.

Damit gibt es nichts, wofür eine Einwilligung nötig wäre. Ein Banner wäre eine
Unterbrechung ohne Zweck. Das Modul ist trotzdem eingebaut und über
„Cookie-Einstellungen" in jeder Fußzeile erreichbar. Dort sieht der Besucher,
was gespeichert wird.

**Sobald eine Karte, ein Video, eine Terminbuchung oder eine Reichweitenmessung
dazukommt**, wird im Kopf der jeweiligen Seite eine Kategorie ohne `pflicht:true`
ergänzt. Das Banner erscheint dann automatisch. Wer es schon jetzt sehen will,
setzt in `window.AO_EINWILLIGUNG` zusätzlich `immerZeigen: true`.

**Drei Änderungen am Standardmodul**, die zurück in die gemeinsame Fassung
sollten:

1. Der Einleitungstext des Banners nannte fest Google, unabhängig davon, was die
   Seite wirklich lädt. Das widerspricht der eigenen Datenschutzerklärung. Der
   Text richtet sich jetzt nach den konfigurierten Kategorien und ist über
   `konf.einleitung` überschreibbar.
2. In der Vorgabe-Konfiguration stand noch ein fremder Kundenname.
3. Ohne einwilligungspflichtigen Dienst erscheint kein Banner mehr.

---

## 7. Was noch fehlt

### 7.1 Rechtliche Pflichtangaben

Alle Lücken sind auf den Seiten **gelb markiert**. Erfunden wurde nichts.

**Impressum Elster Dental Consulting GmbH**

- Telefonnummer (steht auf der bestehenden Seite als „folgt")
- Registergericht und Registernummer
- Umsatzsteuer-Identifikationsnummer
- Erklärung zur Verbraucherstreitbeilegung nach § 36 VSBG

**Impressum Isabel Gohl Consulting**

- Registereintrag: prüfen, ob es einen gibt. Falls nicht, Abschnitt entfernen
- Umsatzsteuer-Identifikationsnummer oder Hinweis auf § 19 UStG
- Erklärung zur Verbraucherstreitbeilegung nach § 36 VSBG

**Beide Datenschutzerklärungen** waren auf der bestehenden Seite leer
(„Folgt bei Abschlussarbeiten der Webseite"). Das Gerüst steht jetzt, es fehlen:

- Name und Anschrift des Hosters, dazu der Auftragsverarbeitungsvertrag nach Art. 28 DSGVO
- Speicherdauer der Server-Logfiles beim Hoster
- technischer Versandweg des Kontaktformulars und Speicherdauer der Anfragen
- Angabe, ob eine Datenschutzbeauftragte benannt ist
- Datum der Freigabe

Berufsrechtliche Angaben wie Kammer oder Aufsichtsbehörde sind hier **nicht**
nötig. Beide Unternehmen beraten, sie behandeln nicht. Aus demselben Grund
fehlt § 18 Abs. 2 MStV, der nur für journalistisch-redaktionelle Angebote gilt.

### 7.2 Inhaltliche Entscheidungen

- **Domain.** In `canonical`, `og:url`, `robots.txt` und `sitemap.xml` steht
  überall `www.gohl-consulting.de` als Platzhalter. Zu klären: eine Domain für
  beide Marken oder je eine eigene. Bei zwei Domains ändert sich die Struktur,
  dann wird aus der Auswahlseite eine Weiche.
- **Rechtsform Gohl.** Das Impressum nennt „Isabel Gohl Consulting", die Seite
  spricht von „Gohl Consulting". Der Auftritt verwendet jetzt durchgängig „Gohl
  Consulting" als Marke und „Isabel Gohl Consulting" als Firma im Impressum und
  in der Fußzeile. Bitte bestätigen.
- **Geschäftsführung Elster.** Im Impressum stehen Isabel Gohl und Franz
  Schrader. Auf der Seite erscheint nur Isabel Gohl als Gründerin. Soll Herr
  Schrader im Bereich „Über uns" auftauchen?
- **„Über 10 Jahre Erfahrung"** stand auf der bestehenden Seite und wurde
  **nicht** übernommen. Nach AO-Standard darf keine Zahl auf die Seite, die
  nicht mit Quelle und Freigabe belegt ist. Wenn die Angabe stimmt und belegbar
  ist, kommt sie gern zurück.
- **Fachliche Freigabe.** Alle Texte beschreiben Abläufe auf allgemeiner Ebene,
  ohne Fristen, Preise oder Zusagen. Trotzdem muss die Kundin prüfen, ob die
  Leistungen wirklich so angeboten werden. Das ist ein Haftungsthema, keine
  Formalie.
- ~~**Bildrechte.**~~ Erledigt. Einwilligung der abgebildeten Personen und
  Nutzungsrechte für beide Firmen liegen über AO Consulting vor.

### 7.3 Vor dem Livegang

- Formular an ein echtes Ziel anschließen und Ende zu Ende testen. Der
  Prüfblock in `skript.js` wird dann entfernt.
- Auftragsverarbeitungsvertrag zwischen AO Consulting und der Kundin schließen,
  sobald wir über das Formular Daten verarbeiten.
- Netzwerkmitschnitt als Nachweis, dass vor einer Einwilligung nichts von
  Dritten lädt. Aktuell lädt gar nichts von Dritten.
- Screenreader-Test und Kontrastmessung anbieten.

---

## 8. Was auf der bestehenden Seite aufgefallen ist

- Die FAQ im Dentalbereich enthielt die Fragen von Gohl Consulting, inklusive
  „Was macht Gohl Consulting genau?". Beide Bereiche zeigten dieselben fünf
  Fragen. Im Entwurf hat jeder Bereich eigene Fragen.
- Die Bildmotive waren zwei Stockfotos von amerikanischen Hochhausfassaden.
  Sie sind ersetzt.
- Bilder hatten keine Alt-Texte.

---

## 9. Geprüft wurde automatisiert

Über HTTP mit Playwright, nicht über `file://`. Bei 1920, 1512, 1440, 1280,
1241, 1240, 1024, 768 und 390 px.

Genau eine h1 je Seite · lückenlose Überschriftenhierarchie · alle Bilder laden
und liefern WebP aus · Alt-Texte vorhanden · `width` und `height` gesetzt ·
JSON-LD parst · FAQ-Markup deckungsgleich mit dem sichtbaren Text · keine
Konsolenfehler · kein Zugriff auf einen fremden Host · keine fehlenden Dateien ·
kein `href="#"` · kein horizontales Scrollen · Menüpunkte ohne internen Umbruch
und auf einer Linie · Burger-Menü öffnet, schließt mit Escape, gibt den Fokus
zurück und verdeckt weder Logo noch Knopf · Formularprüfung und Danke-Ansicht ·
Widerruf über die Fußzeile.

Die Vorschaudatei wurde zusätzlich über `file://` geprüft: alle sieben Seiten
erreichbar, Markenwechsel, Anker innerhalb der Seiten, Formularprüfung,
Barrierefreiheits-Widget, Poppins geladen, keine Konsolenfehler und keine
einzige Anfrage nach außen.

Ergebnis: keine offenen Fehler.

**Zwei Dinge, die beim Bauen aufgefallen sind und behoben wurden:**

- Die Einblend-Animation blendet die Abschnitte nur dann aus, wenn das Skript
  wirklich läuft und der Besucher Animationen nicht abbestellt hat. Sonst bliebe
  die Seite bei blockiertem JavaScript leer. Gelöst über `data-animiert` am
  `html`-Element.
- In der Vorschaudatei wird die Zeichenfolge `</script` innerhalb des
  eingebetteten JavaScripts maskiert. Ohne das beendet der Parser den
  Skriptblock mitten im Code, und das Einwilligungsmodul startet nicht.

---

## 10. Was sich seit Version 0.6 geändert hat

| Punkt | Änderung |
|---|---|
| Logos Auswahlseite | von 50 auf 74 px (Elster) und von 68 auf 96 px (Gohl), damit sie gegen die Ziffer daneben bestehen |
| Logos Kopfbereich | von 44 auf 56 px und von 54 auf 70 px, Leiste von 78 auf 88 px |
| Handy | eigene Regel für das Gohl-Logo ergänzt. Vorher gewann der Markenselektor und das Logo wäre aus der Leiste gelaufen |
| Fuß Auswahlseite | zweispaltig, je Firma alle Kontakt- und Rechtsangaben, Trennstriche auf gleicher Höhe |
| Einleitungssatz Fuß | allgemeiner gefasst, wer wen führt steht jetzt bei der jeweiligen Firma |
| Über uns Elster | „Beratung für Zahnarztpraxen in Brandenburg" ersetzt durch „Schwerpunkt Beratung Zahnmedizin" |
| Navigation | Trefferfläche der Menüpunkte auf 44 px gebracht |
| Kontaktformular | Telefon ist jetzt Pflichtfeld. Damit sind Vorname, Nachname, E-Mail, Telefon und Nachricht Pflicht, dazu die Datenschutz-Checkbox |
| Vorschaudatei | das Hinweisband am unteren Rand ist entfernt, auch im Bauskript |

**Hinweis zur Pflicht-Telefonnummer:** Nach dem Grundsatz der Datenminimierung
(Art. 5 Abs. 1 lit. c DSGVO) darf ein Kontaktformular nur die Daten verlangen,
die für die Antwort nötig sind. Bei einer reinen Anfrage genügt in der Regel die
E-Mail-Adresse. Die Pflichtnummer ist auf ausdrücklichen Kundenwunsch gesetzt.
Sie lässt sich begründen, wenn die Erstberatung tatsächlich telefonisch
stattfindet. Ein Halbsatz im Formular, der das sagt, wäre die saubere Fassung.
