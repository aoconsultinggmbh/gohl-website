/* ============================================================================
   GOHL CONSULTING & ELSTER DENTAL CONSULTING
   Gemeinsames Skript fuer alle Seiten.

   Jeder Block prueft zuerst, ob sein Element ueberhaupt vorhanden ist.
   Sonst wirft eine Rechtsseite ohne Formular einen Fehler in der Konsole.

   einwilligung.js wird vor dieser Datei eingebunden. Diese Datei laedt
   nichts von Dritten, sie braucht die Schnittstelle also nur fuer den
   Widerruf in der Fusszeile.
   ============================================================================ */

(function () {
  'use strict';

  var wenigerBewegung = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     1  Kopfbereich: Schattenkante erst nach dem Scrollen
     ------------------------------------------------------------------------ */
  var kopf = document.querySelector('.kopf');

  if (kopf) {
    var setzeKopf = function () {
      kopf.setAttribute('data-gescrollt', window.scrollY > 8 ? 'ja' : 'nein');
    };
    setzeKopf();
    window.addEventListener('scroll', setzeKopf, { passive: true });
  }

  /* ------------------------------------------------------------------------
     2  Burger-Menue
     aria-expanded und aria-controls sitzen am Umschalter, Escape schliesst,
     der Fokus geht danach zurueck auf den Knopf.
     ------------------------------------------------------------------------ */
  var burger = kopf ? kopf.querySelector('.nav__burger') : null;
  var liste = kopf ? kopf.querySelector('.nav__liste') : null;

  if (burger && liste) {
    if (!liste.id) liste.id = 'hauptmenue';
    burger.setAttribute('aria-controls', liste.id);
    burger.setAttribute('aria-expanded', 'false');

    var schliesseMenue = function (fokusZurueck) {
      kopf.removeAttribute('data-menue');
      burger.setAttribute('aria-expanded', 'false');
      if (fokusZurueck) burger.focus();
    };

    burger.addEventListener('click', function () {
      var offen = burger.getAttribute('aria-expanded') === 'true';
      if (offen) {
        schliesseMenue(false);
      } else {
        kopf.setAttribute('data-menue', 'offen');
        burger.setAttribute('aria-expanded', 'true');
      }
    });

    liste.addEventListener('click', function (e) {
      if (e.target.closest('a')) schliesseMenue(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        schliesseMenue(true);
      }
    });
  }

  /* ------------------------------------------------------------------------
     3  Einblenden beim Scrollen
     Wer Animationen abbestellt hat, sieht die Inhalte sofort.
     ------------------------------------------------------------------------ */
  var zuBeleben = document.querySelectorAll('.auf');

  if (zuBeleben.length) {
    if (wenigerBewegung || !('IntersectionObserver' in window)) {
      zuBeleben.forEach(function (el) { el.setAttribute('data-sichtbar', 'ja'); });
    } else {
      // Erst jetzt werden die Elemente ausgeblendet. Ohne diesen Schalter
      // bliebe die Seite leer, falls das Skript nicht laeuft.
      document.documentElement.setAttribute('data-animiert', 'ja');
      var beobachter = new IntersectionObserver(function (eintraege) {
        eintraege.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.setAttribute('data-sichtbar', 'ja');
          beobachter.unobserve(e.target);
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

      zuBeleben.forEach(function (el) { beobachter.observe(el); });
    }
  }

  /* ------------------------------------------------------------------------
     4  Aktiver Menuepunkt beim Scrollen
     ------------------------------------------------------------------------ */
  var menuepunkte = kopf ? kopf.querySelectorAll('.nav__liste a[href^="#"]') : [];

  if (menuepunkte.length && 'IntersectionObserver' in window) {
    var zuordnung = {};
    Array.prototype.forEach.call(menuepunkte, function (a) {
      var ziel = document.querySelector(a.getAttribute('href'));
      if (ziel) zuordnung[ziel.id] = a;
    });

    var abschnittsWaechter = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        var a = zuordnung[e.target.id];
        if (!a) return;
        if (e.isIntersecting) {
          Array.prototype.forEach.call(menuepunkte, function (x) { x.removeAttribute('aria-current'); });
          a.setAttribute('aria-current', 'page');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    Object.keys(zuordnung).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) abschnittsWaechter.observe(el);
    });
  }

  /* ------------------------------------------------------------------------
     5  Kontaktformular
     Im Entwurf verschickt das Formular nichts. Es prueft die Pflichtfelder
     und zeigt danach die Danke-Ansicht. Vor dem Livegang wird action auf
     das Zielskript gesetzt und dieser Block entfernt.
     ------------------------------------------------------------------------ */
  var formular = document.querySelector('.form form');

  if (formular) {
    var danke = document.querySelector('.danke');

    var zeigeFehler = function (feld, text) {
      var huelle = feld.closest('.feld') || feld.closest('.zustimmung');
      if (!huelle) return;
      huelle.classList.add('feld--fehler');
      feld.setAttribute('aria-invalid', 'true');
      var alt = huelle.querySelector('.feld__fehler');
      if (alt) alt.remove();
      var hinweis = document.createElement('span');
      hinweis.className = 'feld__fehler';
      hinweis.textContent = text;
      huelle.appendChild(hinweis);
    };

    var raeumeFehler = function () {
      formular.querySelectorAll('.feld--fehler').forEach(function (h) {
        h.classList.remove('feld--fehler');
        var s = h.querySelector('.feld__fehler');
        if (s) s.remove();
      });
      formular.querySelectorAll('[aria-invalid]').forEach(function (f) {
        f.removeAttribute('aria-invalid');
      });
    };

    formular.addEventListener('submit', function (e) {
      e.preventDefault();
      raeumeFehler();

      var ersterFehler = null;

      formular.querySelectorAll('[required]').forEach(function (feld) {
        var leer = feld.type === 'checkbox' ? !feld.checked : !feld.value.trim();
        var mailFalsch = feld.type === 'email' && feld.value.trim() &&
                         !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(feld.value.trim());

        if (leer) {
          zeigeFehler(feld, feld.type === 'checkbox'
            ? 'Bitte stimmen Sie der Verarbeitung Ihrer Daten zu.'
            : 'Bitte füllen Sie dieses Feld aus.');
          if (!ersterFehler) ersterFehler = feld;
        } else if (mailFalsch) {
          zeigeFehler(feld, 'Bitte prüfen Sie Ihre E-Mail-Adresse.');
          if (!ersterFehler) ersterFehler = feld;
        }
      });

      if (ersterFehler) {
        ersterFehler.focus();
        return;
      }

      if (danke) {
        formular.hidden = true;
        danke.setAttribute('data-sichtbar', 'ja');
        danke.setAttribute('tabindex', '-1');
        danke.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     6  Jahreszahl in der Fusszeile
     ------------------------------------------------------------------------ */
  document.querySelectorAll('[data-jahr]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
