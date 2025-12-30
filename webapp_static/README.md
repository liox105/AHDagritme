# AH Werkschema Manager - Static Website
## Antwerpen Groenplaats

### Installatie op Synology NAS (Web Station)

1. **Upload naar NAS:**
   - Open File Station op je Synology
   - Ga naar `/web` of de map waar Web Station draait
   - Maak een nieuwe folder: `ah-werkschema`
   - Upload alle files uit deze folder naar `ah-werkschema`

2. **Web Station Configureren:**
   - Open Web Station in de Synology DSM
   - Ga naar "Web Service Portal"
   - Klik "Create" voor een nieuwe website
   - Kies:
     - **Portal Type:** Name-based
     - **Hostname:** `werkschema` (of een andere naam naar keuze)
     - **Port:** HTTP 80
     - **Document Root:** `/web/ah-werkschema`
     - **Backend Server:** Geen (pure HTML/JS)
   - Klik "OK"

3. **Toegang:**
   - Open je browser
   - Ga naar: `http://[NAS-IP-ADRES]/ah-werkschema`
   - Of via hostname: `http://werkschema.[NAS-IP-ADRES]`

### Bestanden in deze folder:
- `index.html` - Hoofdpagina
- `app.js` - JavaScript applicatie logica
- `styles.css` - Styling
- `README.md` - Deze instructies

### Features:
- ✅ Werknemers van Groenplaats
- ✅ Planning per dag/week
- ✅ Dashboard met statistieken
- ✅ Undo/Redo functionaliteit
- ✅ LocalStorage voor data persistentie
- ✅ Print functie
- ✅ Dark mode

### Ondersteuning:
Alle data wordt lokaal opgeslagen in de browser (LocalStorage).
Geen database of backend nodig!

### Browser Compatibiliteit:
- Chrome/Edge (Aanbevolen)
- Firefox
- Safari
- Opera

**Versie:** 1.0  
**Datum:** 30 december 2025  
**Winkel:** 3138 - Antwerpen Groenplaats
