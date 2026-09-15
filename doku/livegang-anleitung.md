# Livegang-Anleitung: Von der Vorschau zur echten Webseite

*Für alle bei AO Consulting, die die Puchmayr-Webseite (oder eine ähnliche statische
Seite) live schalten sollen. Ohne Vorwissen lesbar. Stand: 04.09.2026.*

---

## 1. Das Bild im Kopf: drei Bausteine

```
 Kunde schickt Änderung
         │
         ▼
 ┌───────────────┐      Automatik       ┌──────────────────────┐
 │    GitHub     │ ───────────────────▶ │  Vorschau-Adresse    │  (kostenlos, github.io)
 │  "Aktenschrank"│                      └──────────────────────┘
 │  Claude arbeitet│      Automatik       ┌──────────────────────┐
 │  hier          │ ───────────────────▶ │  Deutscher Hoster    │  → www.puchmayr.de
 └───────────────┘      (FTPS)           │  (All-Inkl o. ä.)    │
                                         └──────────────────────┘
```

- **GitHub** ist der Ort, an dem das Original der Seite liegt. Jede Änderung wird
  protokolliert und kann rückgängig gemacht werden. **Hier arbeitet Claude.**
- **Vorschau-Adresse:** GitHub zeigt den aktuellen Stand kostenlos unter
  `https://puchmayr.vorschau.ao-consult.de/`. Für den Kunden zum Anschauen. Für
  Google gesperrt. Server in den USA, deshalb nicht für die echte Domain.
  Jede Kundenseite bekommt so eine Adresse: `<kunde>.vorschau.ao-consult.de`. Der
  DNS-Teil ist einmalig für alle erledigt (Stern-Eintrag bei Raidboxes, Domain im
  Firmenprofil bestätigt). Pro Projekt nur: Settings → Pages → Custom domain →
  `<kunde>.vorschau.ao-consult.de` → Save → Haken „Enforce HTTPS".
- **Deutscher Hoster:** Der echte Server, auf dem `www.puchmayr.de` läuft.
  Server in Deutschland, Vertrag zur Auftragsverarbeitung (AV-Vertrag), ca. 5–10 € im Monat.

**Warum nicht direkt Claude → Hoster?** Claude hat aus Sicherheitsgründen keinen
Zugang zum Server. Der Weg geht immer über GitHub. Vorteil: eine Stelle, ein
Protokoll, und der Hoster-Zugang liegt nur bei GitHub (verschlüsselt), nicht bei Claude.

---

## 2. Was vor dem Livegang noch fertig werden muss

Diese Punkte stehen offen. Erst wenn sie erledigt sind, wird die Domain umgestellt.

| # | Punkt | Wer | Erledigt? |
|---|---|---|---|
| 1 | **Hoster bestellen** (Abschnitt 3) | AO Consulting | ☐ |
| 2 | **Automatik GitHub → Hoster einrichten** (Abschnitt 4) | AO Consulting + Claude | ☐ |
| 3 | **Kontaktformular anschließen** (Abschnitt 5) | Claude | ☐ |
| 4 | **Datenschutzerklärung fertigstellen** (Abschnitt 6) | Kunde + Claude, dann Anwalt | ☐ |
| 5 | **Gelben Hinweiskasten** auf Impressum und Datenschutz entfernen | Claude | ☐ |
| 6 | **Texte der fünf neuen Leistungsseiten** vom Kunden fachlich freigeben lassen | Kunde | ☐ |
| 7 | **Adressen angleichen:** Die alte Seite hat Adressen wie `/vollkeramik/`, die neue `vollkeramik.html`. Auf dem Server sorgt die Datei `website/.htaccess` dafür, dass beides geht. Vor dem Livegang testen. | Claude | ☐ |
| 8 | **Domain umstellen** (Abschnitt 7) | AO Consulting, ggf. Kunde | ☐ |
| 9 | Nach dem Livegang: Search Console, Google-Profil (Abschnitt 8) | AO Consulting | ☐ |

---

## 3. Unser Hoster: All-Inkl Server L v6

**Entscheidung 07.09.2026:** AO Consulting betreibt einen eigenen Managed Server bei All-Inkl
(Server L v6, 99,95 € / Monat, bis 500 Kundenkonten). Grund: 197 aktive Kundenseiten bei
Raidboxes zu je mindestens 6 € / Monat; jede umgezogene Seite spart Geld, ab ca. 17 Seiten ist
der Server bezahlt.

| Was | Wert | Wo abgelegt |
|---|---|---|
| Servername (technisch) | `dd57728.kasserver.com` | – |
| MembersArea (Vertrag, Rechnungen) | all-inkl.com/members, Login = Kundennummer `884831` | Passwort-Manager „Kundenwebseiten" |
| KAS Hauptkonto (Verwaltung) | kas.all-inkl.com, Login `w0220b7d` | Passwort-Manager „Kundenwebseiten" |
| Monitoring | all-inkl.com/monitor, Login `dd57728.srv` | Passwort-Manager „Kundenwebseiten" |
| Verträge, AGB, AV-Vertrag | PDFs | OneDrive `KI/Kundenwebseiten/00_AO-Hosting` |

**Pro Kunde ein eigenes Konto (Unteraccount) im KAS**, mit eigenem KAS-Login `w0…`, eigenem
Webspace, eigenem FTP-Nutzer und eigenen Postfächern. Vorteile: sauber getrennt, bei
Kundenaustritt übergebbar, ein verlorener FTP-Zugang betrifft nur eine Seite.

Wichtig zu wissen: **All-Inkl liefert eine Seite erst aus, wenn ihre echte Domain im Konto
eingetragen ist.** Es gibt keine technische Test-Adresse (die `w0….kasserver.com`-Adressen zeigen
nur „503"). Zum Testen und für Kundenfreigaben dient deshalb immer die GitHub-Vorschau
`<kunde>.vorschau.ao-consult.de`; die Seite auf dem Server prüft Claude technisch über die
Server-IP, bevor die Domain umgestellt wird.

### Kundenkonto anlegen (KAS Hauptkonto → Accounts → Account anlegen)

1. Reiter **„ohne Domain"** (die Domain kommt am Livegang-Tag dazu).
2. Account-Beschreibung `<Kunde>`, Kontaktmailadresse `bahovic@ao-consult.de`, KAS-Passwort
   generieren → Passwort-Manager „All-Inkl KAS – <Kunde>".
3. Ressourcen (nur Obergrenzen, kostet nichts): Domains 2, Subdomains 2, Speicher 5000 MB,
   Postfächer 5, Weiterleitungen 5, Datenbanken 1, FTP-Nutzer 2, Cronjobs 1.
4. Software-Installation **Nein**, Logfiles **„IP wird komplett anonymisiert"**, löschen nach
   **7** Tagen (das ist die Angabe für die Datenschutzerklärung), Statistik keine.
5. Speichern → KAS zeigt den Login des neuen Kontos (`w0…`).

### FTP-Zugang für die Automatik (im Kundenkonto! Accounts → Login-Pfeil beim Konto)

FTP → FTP-Nutzer anlegen: Beschreibung `GitHub Automatik <Kunde>`, Verzeichnis `/`, Passwort
generieren → Passwort-Manager „All-Inkl FTP – <Kunde> (GitHub Automatik)". KAS vergibt den
Benutzernamen (z. B. `f018bc20`). Kontrolle: oben muss „Login: w0… (<Kunde>)" stehen, nicht das
Hauptkonto.

## 4. Automatik einrichten: GitHub lädt zum Hoster hoch

Einmalig pro Kundenseite, ca. 5 Minuten.

1. Im GitHub-Projekt: **Settings → Secrets and variables → Actions → New repository secret**, vier Mal:

   | Name | Wert |
   |---|---|
   | `FTP_SERVER` | `<KAS-Login des Kundenkontos>.kasserver.com`, z. B. `w0220b8a.kasserver.com` |
   | `FTP_BENUTZER` | FTP-Benutzername aus KAS, z. B. `f018bc20` |
   | `FTP_PASSWORT` | FTP-Passwort aus dem Passwort-Manager |
   | `FTP_ORDNER` | `./` |

2. Freigabe: „Gib die Änderungen bei <Kunde> frei" (Claude übernimmt `main` nach `live`). Die
   Automatik „Livegang (Upload zum Hoster)" lädt verschlüsselt (FTPS, Werkzeug lftp) hoch. Grüner
   Haken = Dateien liegen auf dem Server. Kontrolle: KAS → FTP → WebFTP.
3. Rotes Kreuz: Fehlertext lesen (Claude kann ihn über GitHub auslesen). Häufig: Passwort oder
   Benutzername vertauscht.

**Hinweis zur Technik:** Das verbreitete Upload-Werkzeug „FTP-Deploy-Action" scheitert bei
All-Inkl an der TLS-Datenverbindung (`ECONNRESET`). Deshalb nutzt die Automatik `lftp`.

## 4a. Standardablauf Livegang (Reihenfolge einhalten)

**Bauen und abstimmen (Wochen):** GitHub-Projekt, Kunde prüft unter
`<kunde>.vorschau.ao-consult.de`, Freigaben (Texte, Rechtstexte). Server und Domain spielen
noch keine Rolle; die alte Seite bleibt online.

**Vorab beim Kunden abfragen (spart am Livegang-Tag Stunden):**
- Wer verwaltet die Domain, wer bekommt die Domain-Rechnung?
- Gibt es ein eigenes All-Inkl-Konto (z. B. für E-Mail)? → Wenn ja, liegt die Domain dort
  und kann in unserem Server-Konto **nicht** angelegt werden („bereits in einem anderen
  KAS-Account angelegt"). Dann entweder: Seite läuft im Kundenkonto (Kunde legt uns FTP-Nutzer
  an, Secrets zeigen dorthin) oder die Domain wird zu uns übertragen.
- Wohin sollen Formular-Anfragen gehen? Welche Absenderadresse darf die Seite nutzen?

**Livegang-Tag (ca. 1 Stunde):**
1. KAS: Kundenkonto, FTP-Nutzer, Domain eintragen (Domain → Neue Domain anlegen → Name + Endung,
   Webspace `/`, PHP aktuell). Das ist nach außen unsichtbar, solange DNS auf den alten Hoster zeigt.
2. Secrets ins Projekt, Freigabe nach `live` → Dateien auf dem Server.
3. Claude prüft die Seite über die Server-IP (als käme die Anfrage über die echte Domain):
   Startseite, Unterseiten, `.htaccess`-Weiterleitungen, Kontaktformular (`kontakt.php`).
4. Postfach/Weiterleitung für die Absenderadresse des Formulars anlegen (KAS → E-Mail).
5. DNS umstellen: A-Record (und AAAA) der Domain auf die Server-IP, **MX nicht anfassen**.
   Nach 1–24 h zeigt die Domain auf den Server. KAS → Domain → SSL: Let's Encrypt aktivieren.
6. Echte Seite prüfen (https, Schloss, alle Unterseiten, Formular einmal echt testen).
7. Eine Woche beobachten, dann alten Hoster kündigen.

---

## 5. Kontaktformular anschließen

Im Entwurf **verschickt das Formular nichts**. Es prüft nur die Eingaben und zeigt
„Danke". Für den Livegang braucht es einen kleinen Versand-Baustein.

**Empfohlener Weg:** Eine kleine PHP-Datei (`kontakt.php`) auf dem Hoster, die die
Nachricht per E-Mail an `oliver.puchmayr@puchmayr.de` schickt. Vorteile: Daten
bleiben auf dem deutschen Server, kein Drittanbieter, kein Google reCAPTCHA.
Spamschutz über ein unsichtbares Feld („Honeypot") und eine Zeitprüfung.

**Stand Puchmayr 07.09.2026:** `website/kontakt.php` ist gebaut und auf der Vorschau (Versand simuliert). Auf dem Server aktiv, sobald die Domain eingetragen ist. Absenderadresse `formular@puchmayr.de` muss dann als Postfach existieren.

**Aufgabe für Claude bei anderen Kunden:**
„Baue `website/kontakt.php` für das Kontaktformular. Versand an
oliver.puchmayr@puchmayr.de, Absender `formular@puchmayr.de`, Honeypot und
Zeitprüfung als Spamschutz, Bestätigungsseite in der CI. Passe `assets/skript.js`
so an, dass das Formular an `kontakt.php` sendet. Ergänze Abschnitt 5 der
Datenschutzerklärung (Kontaktformular, Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO,
Speicherdauer)."

Hinweis: Die Absender-Adresse `formular@puchmayr.de` muss beim Hoster als Postfach
oder Weiterleitung existieren, sonst landen die Mails im Spam.

**Alternative ohne PHP:** Ein deutscher Formulardienst. Prüfen, ob AV-Vertrag und
Serverstandort passen. Der PHP-Weg ist einfacher und günstiger.

---

## 6. Datenschutzerklärung fertigstellen

In `website/datenschutz.html` sind Stellen markiert. Es fehlen:

1. **Hoster:** Aktuell steht dort **Raidboxes**. Muss auf den neuen Hoster geändert
   werden (Name, Anschrift, Link zur Datenschutzerklärung des Hosters, AV-Vertrag vorhanden).
2. **Speicherdauer der Server-Logfiles:** beim neuen Hoster nachlesen (All-Inkl: in
   der Datenschutzerklärung von all-inkl.com bzw. KAS-Einstellung „Logfiles").
3. **Einwilligungslösung:** Aktuell steht teils noch **Borlabs Cookie** (WordPress).
   Die neue Seite nutzt ein **eigenes Banner ohne Cookies** (Speicherung nur im
   Browser des Besuchers, `localStorage`). Abschnitt 6 entsprechend anpassen.
4. **Kontaktformular:** Abschnitt zum Versand ergänzen (siehe 5).
5. **Datenschutzbeauftragter:** vom Kunden bestätigen lassen, dass keiner benannt ist
   (unter 20 Beschäftigte mit ständiger automatisierter Verarbeitung: nicht Pflicht;
   Puchmayr hat 30 Beschäftigte, aber die meisten arbeiten nicht am Bildschirm; **der Kunde
   muss das klären**).
6. **Analyse-Werkzeuge:** vom Kunden bestätigen lassen, dass keine kommen. Falls
   doch (z. B. Matomo), vorher Claude informieren, das Banner braucht dann eine
   Kategorie „Statistik".
7. **Datum „Stand"** einsetzen.
8. **Gelben Hinweiskasten** oben entfernen (auch im Impressum).

Danach den Text **anwaltlich prüfen lassen**. Wir geben keine Rechtsberatung.

Aufgabe für Claude, wenn die Angaben da sind: „Trage in `datenschutz.html` ein:
Hoster = …, Logfile-Speicherdauer = …, kein DSB, keine Analyse, Stand = …; ersetze
Borlabs durch das eigene Banner; entferne den gelben Hinweiskasten in
`datenschutz.html` und `impressum.html`."

---

## 7. Domain umstellen: puchmayr.de zeigt auf den neuen Server

**Vorher klären: Wo liegt die Domain?** Die Domain (`puchmayr.de`) und der
Webspace (Raidboxes) sind zwei getrennte Dinge. Die Domain liegt bei einem
„Registrar". Herausfinden:

- Den Kunden fragen: „Bei wem zahlen Sie die Jahresgebühr für puchmayr.de?"
  (häufig: IONOS, Strato, united-domains, All-Inkl, Raidboxes-Partner)
- Oder Claude fragen: „Welche Nameserver hat puchmayr.de?" Das gibt einen Hinweis
  auf den Anbieter.

**Zwei Wege:**

**Weg A: Domain bleibt, wo sie ist, und zeigt auf den neuen Server** (schneller,
kein Umzug):
1. Beim neuen Hoster die **IP-Adresse** des Servers nachlesen (KAS → Domain → „Server-IP").
2. Beim Registrar in die **DNS-Einstellungen** gehen.
3. Den **A-Record** für `puchmayr.de` und `www.puchmayr.de` auf die neue IP setzen.
   Falls es einen **AAAA-Record** (IPv6) gibt: auf die IPv6 des neuen Hosters setzen oder löschen.
4. **E-Mail-Einträge (MX) NICHT anfassen!** Sonst kommt beim Kunden keine E-Mail mehr an.
5. Nach 1–24 Stunden zeigt die Domain auf den neuen Server. Der Hoster stellt das
   SSL-Zertifikat automatisch aus (KAS: „SSL" → Let's Encrypt aktivieren).

**Weg B: Domain zum neuen Hoster umziehen** (aufgeräumter, dauert 1–5 Tage):
1. Beim alten Registrar den **AuthCode** (auch „Auth-Info") anfordern.
2. Beim neuen Hoster „Domain umziehen" → AuthCode eingeben.
3. Vorher **alle DNS-Einträge (vor allem MX für E-Mail) notieren** und beim neuen
   Hoster identisch anlegen.

**Danach:**
- `https://www.puchmayr.de` aufrufen. Schloss da? Seite da? Alle Unterseiten?
- Alte Adressen testen: `https://www.puchmayr.de/vollkeramik/` muss die
  Vollkeramik-Seite zeigen (macht die `.htaccess`).
- **Raidboxes erst kündigen, wenn alles seit einer Woche sauber läuft.**

---

## 8. Nach dem Livegang

1. **Google Search Console:** Domain `puchmayr.de` anmelden (falls nicht schon),
   `https://www.puchmayr.de/sitemap.xml` einreichen.
2. **Rich Results Test** (search.google.com/test/rich-results) mit der Startseite
   und einer Leistungsseite: FAQ und LocalBusiness müssen grün sein.
3. **Google Business Profile:** „über 40 Jahre" auf **60 Jahre** korrigieren
   (Gründung 1966 ist belegt). Adresse, Öffnungszeiten, Telefon müssen identisch zur Webseite sein.
4. **Kontaktformular einmal echt testen** und prüfen, dass die Mail beim Kunden ankommt.
5. **Datenschutzerklärung** noch einmal komplett lesen: Stimmt alles mit dem, was die Seite tut?
6. Kunde informieren, Zugangsdaten (Hoster, GitHub-Hinweis) im Passwort-Manager ablegen.

---

## 9. Laufender Betrieb: So läuft eine Änderung

1. Änderung kommt vom Kunden (Mail, Anruf, Sprachmemo).
2. Neue Claude-Sitzung öffnen, den **GitHub-Zugangsschlüssel** aus dem
   Passwort-Manager einfügen und die Änderung beschreiben, z. B.:
   „Projekt github.com/aoconsultinggmbh/puchmayr-website. Hier der Schlüssel: github_pat_…
   Bitte auf der Startseite die Öffnungszeiten auf Mo–Do 7–17 Uhr, Fr 7–14 Uhr ändern."
3. Claude ändert die Datei und lädt sie hoch. Nach 1–2 Minuten ist sie auf der
   **Vorschau** zu sehen, die echte Seite bleibt noch unverändert.
4. Vorschau prüfen (ggf. Link an den Kunden). Wenn alles passt: „Gib die
   Änderungen frei" – Claude übernimmt den Stand nach `live`, die Automatik lädt
   ihn auf den echten Server. Kurz auf der echten Seite prüfen. Fertig.

Wenn etwas schiefgeht: In GitHub → „Commits" den letzten Eintrag ansehen. Claude kann
jede Änderung mit einem Satz rückgängig machen („Mach den letzten Commit rückgängig").

---

## 10. Kosten im Überblick

| Posten | Kosten |
|---|---|
| GitHub (Firmenprofil, öffentliches Projekt) | 0 € |
| Vorschau-Adresse (GitHub Pages) | 0 € |
| All-Inkl Server L v6 (für alle Kundenseiten) | 99,95 € / Monat |
| Domain puchmayr.de | ca. 10–20 € / Jahr (zahlt der Kunde vermutlich schon) |
| Raidboxes (WordPress) | **entfällt** nach dem Umzug |

*Preise sind Richtwerte vom September 2026, bitte beim Anbieter prüfen.*
