# Webseite Gohl Consulting und Elster Dental Consulting

Dieses Projekt enthält die Webseite von **Gohl Consulting** (Beratung
Allgemeinmedizin) und **Elster Dental Consulting GmbH** (Beratung Zahnmedizin),
betreut von **AO Consulting GmbH**.

Es sind zwei Markenbereiche unter einer gemeinsamen Auswahl-Startseite.
Die Seite ist **statisch**: nur HTML, CSS, Bilder und Schriften. Kein WordPress,
keine Datenbank, keine Plugins. Nichts, das regelmäßig aktualisiert werden muss.

**Stand: Entwurf.** Die Seite ist noch nicht freigegeben und nicht live.

## So ist das Projekt aufgebaut

| Ordner / Datei | Was drin ist |
|---|---|
| `website/` | **Die eigentliche Webseite.** Nur was hier liegt, geht online. |
| `website/index.html` | Auswahl-Startseite mit zwei Kacheln |
| `website/elster-dental.html` | Markenbereich Zahnmedizin (dunkel) |
| `website/gohl-consulting.html` | Markenbereich Allgemeinmedizin (hell) |
| `website/impressum-*.html`, `website/datenschutz-*.html`, `website/gleichstellung-*.html` | Rechtsseiten je Marke |
| `website/assets/` | Design (`stil.css`), Skripte, Einwilligungsbanner, Barrierefreiheits-Widget |
| `website/img/` | Logos als SVG, Fotos als WebP mit JPG-Rückfall |
| `website/fonts/` | Poppins, lokal, keine Verbindung zu Google |
| `doku/entwurf-dokumentation.md` | Ausführliche Dokumentation des Entwurfs |
| `doku/projektstand.md` | Stand je Stufe, Blocker, was der Kunde noch liefern muss |
| `doku/livegang-anleitung.md` | Schritt für Schritt zum echten Server |
| `.github/workflows/` | Die Automatik: Vorschau und Livegang |

## Wo die Seite zu sehen ist

- **Vorschau-Adresse** (immer der aktuelle Stand aus diesem Projekt):
  **https://gohl.vorschau.ao-consult.de/**
  Die Vorschau ist für Suchmaschinen gesperrt (`noindex`).
  Nach einer Änderung dauert es 1 bis 2 Minuten.
- **Echte Adresse:** noch nicht entschieden (siehe „Vor dem Livegang zu erledigen").

## So werden Änderungen gemacht

Zwei Stufen: `main` = Vorschau, `live` = echte Seite. **Nichts geht ohne Freigabe live.**

1. Änderung beschreiben (z. B. „neue Telefonnummer", „anderes Foto bei Frau Gohl").
2. Claude bekommt den Zugangsschlüssel (Passwort-Manager von AO Consulting) und
   die Beschreibung, ändert die Dateien in `website/` und lädt sie hoch.
3. Die Automatik zeigt den neuen Stand nach 1 bis 2 Minuten auf der Vorschau-Adresse.
4. Passt alles: Freigabe. Dann wird `main` nach `live` übernommen und die
   Automatik lädt die Dateien per FTPS zum Hoster.

Jede Änderung ist im Reiter **Commits** protokolliert und kann rückgängig gemacht werden.

## Wichtige Regeln

- **Niemals externe Schriften, Skripte, Karten oder Tracker einbinden.** Die
  Datenschutzerklärung sagt aus, dass die Seite ohne Fremdanfragen lädt. Das muss wahr bleiben.
- Neue Bilder als **WebP + JPG**, sprechender Dateiname (klein, Bindestriche),
  `width` und `height` im HTML.
- Portraits im Verhältnis **4:5**. Ein 4:3-Kasten schneidet Köpfe ab.
- Impressum und Datenschutz nur nach Rücksprache mit der Kundin ändern.
- Nach jeder Bildänderung: Handybreite 390 px prüfen.

## Vor dem Livegang zu erledigen

- [ ] Domain entscheiden: eine Domain für beide Marken oder zwei. Danach
      `canonical`, `robots.txt` und `sitemap.xml` überall eintragen.
- [ ] Impressum vervollständigen: Registergericht, Registernummer, USt-IdNr.
      beider Firmen, Telefonnummer Elster Dental Consulting GmbH.
- [ ] Beide Datenschutzerklärungen vervollständigen, Hoster-Angaben und
      Auftragsverarbeitungsvertrag.
- [ ] Schriftliche Bildeinwilligung für alle Personenbilder.
- [ ] Fachliche Freigabe der Leistungstexte durch die Kundin.
- [ ] Beleg für die Aussage „über 10 Jahre Erfahrung", sonst bleibt sie draußen.
- [ ] Kontaktformular scharf schalten (PHP mit Honeypot, Empfänger abgestimmt).
      Das Formular verschickt im Entwurf noch nichts.
- [ ] Entwurfs-Hinweise (gelbe Kästen) entfernen.

Details in `doku/projektstand.md` und `doku/livegang-anleitung.md`.
