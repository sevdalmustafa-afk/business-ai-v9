# Business AI v9 – installierbare iPhone-PWA

Dies ist eine **lokale Offline-Demo**, keine echte autonome Handelsplattform. Es gibt **keine** Anbindung an Banken, Stripe, Krypto-Wallets, KI-APIs oder Hetzner. Die angezeigten Verkäufe und Gewinne sind selbst eingegebene Simulationen. Echte Warenkäufe sind unmöglich.

## Ohne Laptop veröffentlichen (iPhone)

1. Auf dem iPhone ein GitHub-Konto erstellen oder anmelden. Ein **öffentliches Repository** für diese Demo anlegen, z. B. `business-ai-demo`. **Keine Zugangsdaten, Schlüssel oder privaten Geschäftsdaten hochladen.**
2. Die ZIP-Datei in der iPhone-App **Dateien** entpacken. Der enthaltene Ordner `BusinessAI_v9_PWA` enthält `index.html`, `app.js`, `style.css`, `sw.js`, `manifest.webmanifest`, `icons/` und `.github/workflows/pages.yml`.
3. Alle Dateien **mit ihrer Ordnerstruktur** in das Repository auf Branch `main` hochladen. Die GitHub-Weboberfläche auf dem iPhone kann das Hochladen von Ordnerstrukturen erschweren. Alternativ über eine iPhone-Git-App mit GitHub-Zugriff committen und pushen; die App kann kostenpflichtig sein. Die Dateien müssen im **Repository-Stamm** liegen, nicht in einem zusätzlichen Unterordner.
4. Im Repository unter **Settings → Pages → Build and deployment** als Quelle **GitHub Actions** auswählen. Der Workflow `.github/workflows/pages.yml` veröffentlicht bei Push auf `main` (gegebenenfalls unter Actions den Workflow manuell starten).
5. Nach erfolgreichem Deployment die HTTPS-Adresse öffnen, normalerweise `https://DEINNAME.github.io/business-ai-demo/`. Die genaue Adresse steht in GitHub unter Settings → Pages.
6. Die Website in **Safari** öffnen → Teilen-Symbol → **Zum Home-Bildschirm** → **Hinzufügen**. Das Business-AI-Symbol erscheint wie eine App auf dem iPhone.

**Wichtig:** Die Installation benötigt eine öffentlich erreichbare HTTPS-Website (oder einen anderen geeigneten Host). Die ZIP-Datei direkt in Dateien zu öffnen reicht für Service Worker und Installation nicht. GitHub Pages ist für eine öffentliche Demo geeignet, **nicht** für einen privaten Produktionsserver mit Geheimnissen. Das Projekt enthält keine API-Schlüssel und keine Serverfunktionen.

## Bedienung

- **Buchungen:** simulierte Umsätze, Kosten, Rückstellungen und Rückerstattungen erfassen.
- **Übersicht:** Demo-Gewinn = max(0, Demo-Umsatz − Kosten − Rückstellungen − Rückerstattungen).
- **Handel:** Budget = 30 % des Demo-Gewinns abzüglich bisher simulierter Einkäufe; maximal 25 € pro simuliertem Kauf; Zustimmung und positive Bruttomarge erforderlich.
- **Regeln:** Schutzlimits anzeigen, lokale Demo-Daten zurücksetzen.

Daten liegen ausschließlich im Browser-Speicher (localStorage), nicht in einer Cloud. Bei Browserdaten-Löschung oder Gerätewechsel können sie verschwinden. Keine echte Finanzbuchhaltung, kein Belegsystem, keine Steuerberechnung. Eine echte Version braucht einen authentifizierten Backend-Dienst, geprüfte Zahlungsanbieter-Webhooks, revisionssichere Buchungen, Steuer- und Rückerstattungsreserven und eine getrennte Einkaufsfreigabe.
