# Aanpassingen AH Werkschema WebApp
## Vergelijking met Excel Functionaliteit

---

## 🔴 KRITIEKE ONTBREKENDE FUNCTIONALITEIT

### 1. **Omzet-gebaseerde Berekeningen**
**Excel**: Gebruikt `VLOOKUP` om verwachte omzet per week op te halen uit database
**App**: Heeft alleen statische `standardRevenue` waarde

**Wat ontbreekt:**
- Geen weekspecifieke omzet lookup
- Geen feestdag database (Instellingen HIDE sheet)
- Geen automatische omzet aanpassing op basis van weeknummer

**Fix nodig:**
```javascript
// Toevoegen aan AppState:
weeklyRevenue: {
    1: { revenue: 365380, isHoliday: false },
    2: { revenue: 380928, isHoliday: false },
    3: { revenue: 366242, isHoliday: true, event: 'Nieuwjaar' },
    // ... voor alle 52 weken
}

// Calculator functie aanpassen:
getWeekRevenue(weekNum, year, storeId) {
    const weekData = AppState.weeklyRevenue[weekNum];
    if (!weekData) return AppState.stores[storeId].standardRevenue;
    return weekData.revenue;
}
```

---

### 2. **Feestdag Multiplicator Systeem**
**Excel**: Gebruikt `5/6 factor` voor feestdagen (83.3% van normale uren)
**App**: Heeft handmatige dropdown met 3 opties, maar wordt **niet automatisch toegepast**

**Wat ontbreekt:**
- Geen automatische detectie van feestdagen per week
- Geen database van feestdagen (zoals Excel Instellingen HIDE L:N columns)
- Calculator gebruikt de `holidayMultiplier` parameter niet in task berekeningen

**Fix nodig:**
```javascript
// In Calculator.calculateTaskHours - HUIDIGE CODE:
calculateTaskHours(task, expectedRevenue, standardRevenue, holidayMultiplier = 1) {
    const ratio = expectedRevenue / standardRevenue;
    return task.normHours * ratio * holidayMultiplier;  // ✅ Dit is correct
}

// Maar deze wordt NERGENS aangeroepen met holidayMultiplier!
// In Calculator.calculateTotalBudget - PROBLEEM:
calculateTotalBudget(expectedRevenue, standardRevenue, holidayMultiplier = 1) {
    let total = 0;
    AppState.tasks.forEach(task => {
        total += this.calculateTaskHours(task, expectedRevenue, standardRevenue, holidayMultiplier);
    });
    return total;
}

// Deze functie wordt aangeroepen zonder holidayMultiplier parameter!
// Bijvoorbeeld in UI.renderDashboard (regel 345):
const totalBudget = Calculator.calculateTotalBudget(store.standardRevenue, store.standardRevenue);
// ❌ Geen holidayMultiplier meegegeven!
```

**Oplossing:**
1. Voeg feestdag database toe
2. Haal feestdag status op in alle budget berekeningen
3. Geef multiplier door aan alle calculator functies

---

### 3. **Dag Distributie Percentages**
**Excel**: Kan per winkel aangepast worden in Instellingen sheet (14%, 14%, 14%, etc.)
**App**: Hardcoded in `AppState.dayDistribution`

**Wat ontbreekt:**
- Geen mogelijkheid om percentages per winkel aan te passen
- Geen UI voor het wijzigen van dag verdeling
- Geen validatie dat totaal 100% is

**Fix nodig:**
```javascript
// Verplaats dayDistribution naar stores object:
stores: {
    '3138': {
        // ... andere properties
        dayDistribution: {
            0: 14, // Maandag
            1: 14, // Dinsdag
            2: 14, // Woensdag
            3: 14, // Donderdag
            4: 15, // Vrijdag
            5: 16, // Zaterdag
            6: 13  // Zondag
        }
    }
}

// UI toevoegen in Settings pagina om deze aan te passen
```

---

### 4. **Taak Normuren Berekening**
**Excel**: Berekent uren als `normHours × (verwachteOmzet / standaardOmzet) × feestdagFactor`
**App**: Doet dit in theorie, maar gebruikt de VERKEERDE standaard omzet

**Probleem in code:**
```javascript
// In app.js regel 237-239:
calculateTaskHours(task, expectedRevenue, standardRevenue, holidayMultiplier = 1) {
    const ratio = expectedRevenue / standardRevenue;
    return task.normHours * ratio * holidayMultiplier;
}
```

**Huidige gebruik (regel 345 in renderDashboard):**
```javascript
const totalBudget = Calculator.calculateTotalBudget(
    store.standardRevenue,  // ❌ Gebruikt STANDAARD als verwacht
    store.standardRevenue   // ✅ Correct als standaard
);
// Dit geeft ALTIJD ratio = 1, dus uren zijn ALTIJD gelijk aan norm!
```

**Excel doet:**
```excel
=IFERROR(M10*($M$3/$M$2), 0)
M10 = norm uren (bijv. 32.13)
$M$3 = Verwachte omzet deze week (bijv. 400.000)
$M$2 = Standaard omzet (369.312)
```

**Fix:**
```javascript
// Haal de juiste verwachte omzet op:
const weekData = getWeekRevenue(AppState.currentWeek, AppState.currentYear, AppState.currentStore);
const totalBudget = Calculator.calculateTotalBudget(
    weekData.revenue,              // ✅ Verwachte omzet
    store.standardRevenue,         // ✅ Standaard omzet
    weekData.isHoliday ? 5/6 : 1  // ✅ Feestdag factor
);
```

---

### 5. **Taak Tijdscategorie "Norm" vs "Verwacht" vs "Werkelijk"**
**Excel**: Heeft 3 kolommen in Begroting sheet:
- **Kolom M**: Norm (basis uren bij standaard omzet)
- **Kolom N**: Berekend (aangepast voor verwachte omzet + feestdag)
- **Kolom K**: Werkelijk (som van alle dagsheets)

**App**: Heeft alleen de berekende waarde, geen vergelijking

**Fix nodig:**
- Toon alle 3 waarden in Budget pagina
- Bereken verschil tussen berekend en werkelijk
- Kleuren coding: groen (onder budget), rood (over budget)

---

### 6. **Cross-Sheet Referenties Ontbreken**
**Excel**: Dagsheets (Ma, Di, etc.) berekenen totalen die terug naar Begroting gaan
**App**: Shifts worden opgeslagen, maar totalen per taak worden NIET berekend

**Wat ontbreekt:**
```javascript
// Excel cel BA42 op Ma sheet = totaal uren voor taak "act" op maandag
// In app.js:
getScheduledHoursByTask(taskId, dayIndex) {
    const shifts = AppState.schedule[dayIndex] || [];
    return shifts.reduce((total, shift) => {
        const taskMatch = (shift.tasks || []).includes(taskId);
        if (taskMatch) {
            return total + parseFloat(Utils.calculateHours(shift.startTime, shift.endTime));
        }
        return total;
    }, 0);
}
```

Dit wordt wel gebruikt in `getScheduledHoursByCategory` (regel 442), maar die returnt altijd 0!

```javascript
// app.js regel 441-445:
getScheduledHoursByCategory(category) {
    // Simplified - in real app would track tasks per shift
    return 0;  // ❌ ALTIJD 0!
}
```

**Dit moet geïmplementeerd worden!**

---

### 7. **Planning Sheet Consolidatie**
**Excel**: Planning sheet toont alle medewerkers met hun shifts per dag in grid
**App**: Heeft geen equivalent van Planning sheet

**Wat ontbreekt:**
- Geen overzicht per medewerker over hele week
- Geen status codes (OA, TA, VRIJ, ST)
- Geen validatie dat medewerkers niet meer dan 5 dagen werken
- Geen contract uren vs werkelijke uren vergelijking

**Fix nodig:**
- Nieuwe pagina "Planning Overzicht"
- Grid met medewerkers (rijen) × dagen (kolommen)
- Toon shift tijden + totaal uren per medewerker
- Validatie regels

---

### 8. **Medewerker Sheet Override Systeem**
**Excel**: Medewerker sheet kan voorkeurstijden per medewerker instellen
**App**: Heeft geen medewerker beschikbaarheid systeem

**Wat ontbreekt:**
- Geen beschikbaarheid per medewerker per dag
- Geen voorkeurstijden
- Geen validatie bij rooster maken

**Fix nodig:**
```javascript
employeeAvailability: {
    1: { // employee_id
        0: { available: true, preferredStart: '08:00', preferredEnd: '17:00' }, // Maandag
        1: { available: false }, // Dinsdag
        // etc.
    }
}
```

---

## 🟡 BELANGRIJKE FUNCTIONALITEIT VERBETERINGEN

### 9. **Auto-Schedule Algoritme Te Simpel**
**Huidige code** (app.js regel 916-975):
```javascript
function autoSchedule() {
    // Verdeelt alleen uren random over dagen
    // Checkt geen taken
    // Checkt geen functies
    // Optimale tijd allocatie ontbreekt
}
```

**Excel logica** (complexer):
- Taken hebben vaste tijden (bijv. brood vroeg in ochtend)
- Taken hebben exclusieve dagen (bijv. act alleen op bepaalde dagen)
- Functies kunnen alleen bepaalde taken doen
- Optimalisatie voor minimize gaps tussen shifts

**Verbeteringen:**
1. Implementeer task time preferences
2. Check employee function vs task requirements
3. Groepeer taken voor zelfde medewerker
4. Minimaliseer aantal medewerkers (lagere kosten)

---

### 10. **Shift Validatie Onvolledig**
**Huidige validaties:**
- Geen check op overlap shifts voor zelfde medewerker
- Geen check op minimale rust tussen shifts (11 uur)
- Geen check op pauze tijd (verplicht na 6 uur)
- Geen check op maximaal 5 werkdagen per week

**Fix nodig:**
```javascript
function validateShift(shift, existingShifts, employee) {
    const errors = [];

    // Check overlap
    const overlap = existingShifts.find(s =>
        s.employeeId === employee.id &&
        s.day === shift.day &&
        timesOverlap(s.startTime, s.endTime, shift.startTime, shift.endTime)
    );
    if (overlap) errors.push('Shift overlapt met bestaande shift');

    // Check rust tussen shifts
    const previousShift = getLastShift(employee.id, shift.day - 1);
    if (previousShift) {
        const restHours = calculateRestHours(previousShift.endTime, shift.startTime);
        if (restHours < 11) errors.push('Minimaal 11 uur rust tussen shifts');
    }

    // Check pauze
    const shiftHours = calculateHours(shift.startTime, shift.endTime);
    if (shiftHours > 6 && !shift.breakMinutes) {
        errors.push('Pauze verplicht bij shifts > 6 uur');
    }

    // Check werkdagen
    const workDays = countWorkDays(employee.id, currentWeek);
    if (workDays >= 5) errors.push('Maximaal 5 werkdagen per week');

    return errors;
}
```

---

### 11. **Budget Pagina Incomplete**
**Excel Begroting sheet** heeft:
- Input velden voor verwachte omzet
- Feestdag factor selector
- Tabel met ALLE taken + norm/berekend/werkelijk/verschil
- Dag verdeling tabel
- Totalen

**App Budget pagina** (regel 596-662):
- Heeft input velden ✅
- Berekent taken ✅
- Maar "Gepland" kolom is altijd 0 ❌
- Verschil is altijd negatief ❌
- Totalen kloppen niet ❌

**Probleem:**
```javascript
// app.js regel 620:
<td>0.00</td>  // ❌ Hardcoded 0 voor "Gepland"

// Zou moeten zijn:
const scheduled = this.getScheduledHoursForTask(task.id);
<td>${scheduled.toFixed(2)}</td>
```

---

### 12. **Sample Data Te Beperkt**
**Huidige sample data** (generateSampleData, regel 1063-1134):
- Alleen shifts met start/end tijden
- Taken zijn toegewezen maar worden niet gebruikt in berekeningen
- Geen realistische verdeling

**Probleem:**
Sample data is niet representatief voor een echte werkweek

**Verbetering:**
1. Genereer shifts op basis van budget berekening
2. Wijs taken toe op basis van functie
3. Vul alle 7 dagen evenwichtig
4. Zorg dat totalen kloppen met budget

---

### 13. **Taken Pagina Toon Alleen Lijst**
**Excel Werkschema - Instelling** heeft:
- Exclusieve dagen (checkboxes)
- Vaste tijd
- Volgorde/priority
- Koppel (linked tasks)

**App Tasks pagina** toont:
- Alleen naam + normuren
- Geen settings

**Fix:**
Maak taken bewerkbaar met alle Excel velden

---

### 14. **Reports Pagina Te Simpel**
**Huidige charts:**
- Top 10 medewerkers (bar chart) - OK
- Budget vs werkelijk per dag (bar chart) - OK maar data klopt niet

**Excel heeft:**
- Per taak analyse
- Per categorie analyse (houdbaar, vers, diepvries, service)
- Trend analyse over meerdere weken
- Productiviteit metrics

**Toevoegen:**
- Taak completion rate
- Budget variance trend
- Employee efficiency score
- Category breakdown pie chart

---

### 15. **Settings Pagina Onvolledig**
**Huidige settings:**
- Winkelnummer (read-only)
- Winkelnaam
- Standaard omzet
- Openingstijden (niet bewerkbaar!)
- Max uren (niet bewerkbaar!)

**Excel Instellingen sheet heeft:**
- Openingstijden per dag (bewerkbaar)
- Dag percentages (bewerkbaar)
- Max uren configuraties (bewerkbaar)

**Fix:**
Maak alle velden bewerkbaar met save functionaliteit

---

## 🟢 KLEINE VERBETERINGEN & BUG FIXES

### 16. **Dashboard Statistieken Kloppen Niet**
```javascript
// app.js regel 350-353:
document.getElementById('statHours').textContent = totalScheduled.toFixed(0);
document.getElementById('statBudget').textContent = budgetUsage + '%';
document.getElementById('statRevenue').textContent = Utils.formatCurrency(store.standardRevenue);
document.getElementById('statEmployees').textContent = this.getActiveEmployeesCount();
```

**Problemen:**
- `statRevenue` toont altijd standaard omzet, niet week-specifieke verwachte omzet
- `statBudget` wordt berekend als percentage, maar totaalBudget kan 0 zijn (division by zero)
- `statEmployees` telt unieke employees in schedule, maar als schedule leeg is = 0 (misleidend)

**Fix:**
```javascript
const expectedRevenue = getWeekRevenue(AppState.currentWeek, AppState.currentYear, AppState.currentStore);
document.getElementById('statRevenue').textContent = Utils.formatCurrency(expectedRevenue);

const budgetUsage = totalBudget > 0 ? Math.round((totalScheduled / totalBudget) * 100) : 0;
document.getElementById('statBudget').textContent = budgetUsage + '%';

const totalEmployees = AppState.employees.filter(e => e.active).length;
document.getElementById('statEmployees').textContent = `${this.getActiveEmployeesCount()} / ${totalEmployees}`;
```

---

### 17. **Budget Bars Altijd Leeg**
```javascript
// app.js regel 424:
const scheduled = this.getScheduledHoursByCategory(cat);
```

Deze functie returnt altijd 0 (regel 444), dus bars zijn altijd leeg!

**Fix:**
Implementeer deze functie correct:
```javascript
getScheduledHoursByCategory(category) {
    let total = 0;
    for (let i = 0; i < 7; i++) {
        const shifts = AppState.schedule[i] || [];
        shifts.forEach(shift => {
            (shift.tasks || []).forEach(taskId => {
                const task = Utils.getTask(taskId);
                if (task && task.category === category) {
                    total += parseFloat(Utils.calculateHours(shift.startTime, shift.endTime));
                }
            });
        });
    }
    return total;
}
```

**OPMERKING**: Dit is een simplificatie. Excel berekent per taak hoeveel uur eraan besteed is, niet per shift. Een shift kan meerdere taken bevatten, dus je moet de tijd verdelen.

---

### 18. **Week Navigatie Past Geen Data Aan**
```javascript
// app.js regel 989-1007:
function previousWeek() {
    AppState.currentWeek--;
    if (AppState.currentWeek < 1) {
        AppState.currentWeek = 52;
        AppState.currentYear--;
    }
    UI.updateWeekDisplay();
    UI.renderCurrentPage();
}
```

**Probleem:**
- Week verandert, maar schedule data blijft hetzelfde
- Budget wordt niet herberekend voor nieuwe week
- Verwachte omzet wordt niet aangepast

**Fix:**
1. Sla schedules op per week in AppState
2. Laad correct schedule bij week change
3. Herbereken budget met juiste week data

---

### 19. **Shift Editor Mist Belangrijke Velden**
**Huidige modal** (index.html regel 426-475):
- Medewerker ✅
- Dag ✅
- Start/Eind tijd ✅
- Taken ✅

**Ontbreekt:**
- Pauze tijd (break_minutes)
- Functie override (als medewerker andere functie doet die dag)
- Notities veld

**Fix:**
Voeg toe aan modal:
```html
<div class="form-group">
    <label>Pauze (minuten)</label>
    <input type="number" id="shiftBreak" value="0" step="15" min="0">
</div>
<div class="form-group">
    <label>Notities</label>
    <textarea id="shiftNotes" rows="3"></textarea>
</div>
```

---

### 20. **Delete/Edit Shift Werkt Niet Correct**
```javascript
// app.js regel 837-861:
function editShift(shiftId) {
    // ...
    // Remove old shift when saving
    AppState.schedule[i] = shifts.filter(s => s.id !== shiftId);
    break;
}
```

**Probleem:**
Shift wordt verwijderd bij edit openen, niet bij save!
Als gebruiker annuleert, is shift al weg.

**Fix:**
```javascript
let editingShiftId = null;

function editShift(shiftId) {
    editingShiftId = shiftId;
    // ... populate form
    // DON'T delete yet
}

function saveShift() {
    // ... create shift object

    if (editingShiftId) {
        // Update existing
        for (let i = 0; i < 7; i++) {
            const index = AppState.schedule[i].findIndex(s => s.id === editingShiftId);
            if (index !== -1) {
                AppState.schedule[i][index] = shift;
                break;
            }
        }
        editingShiftId = null;
    } else {
        // Add new
        AppState.schedule[dayIndex].push(shift);
    }
}
```

---

### 21. **No Persistence (Data Verdwijnt bij Refresh)**
**Grootste probleem**: Alle data zit in JavaScript memory

**Oplossing op korte termijn:**
```javascript
// Save to localStorage
function saveState() {
    localStorage.setItem('ahScheduleState', JSON.stringify(AppState));
}

// Load from localStorage
function loadState() {
    const saved = localStorage.getItem('ahScheduleState');
    if (saved) {
        Object.assign(AppState, JSON.parse(saved));
    }
}

// Call saveState() na elke wijziging
// Call loadState() bij DOMContentLoaded
```

---

### 22. **Datum Berekening Kan Fout Zijn**
```javascript
// app.js regel 164-181:
getWeekDates(weekNum, year) {
    const simple = new Date(year, 0, 1 + (weekNum - 1) * 7);
    // ... ISO week calculation
}
```

**Probleem:**
Simpele berekening werkt niet altijd correct voor ISO week nummers.
Excel gebruikt `WEEKNUM(date, 21)` = ISO 8601 week nummering

**Fix:**
Gebruik een library zoals `date-fns`:
```javascript
import { getWeek, startOfWeek, addDays } from 'date-fns';

getWeekDates(weekNum, year) {
    const jan1 = new Date(year, 0, 1);
    const weekStart = startOfWeek(jan1, { weekStartsOn: 1 }); // Monday
    const targetWeek = addDays(weekStart, (weekNum - 1) * 7);

    const dates = [];
    for (let i = 0; i < 7; i++) {
        dates.push(addDays(targetWeek, i));
    }
    return dates;
}
```

---

### 23. **Employee Contract Hours Niet Gebruikt in Validatie**
```javascript
// Employee heeft contractHours property, maar:
employees: [
    { id: 1, firstName: 'Jan', lastName: 'Jansen', function: 'SM', contractHours: 38, active: true },
    // ...
]
```

**Maar:**
- Geen validatie dat geplande uren ≤ contract uren
- Geen warning als medewerker te veel/te weinig uren krijgt
- Geen totaal contract uren vs totaal benodigde uren vergelijking

**Fix:**
```javascript
function validateEmployeeHours(employeeId) {
    const emp = AppState.employees.find(e => e.id === employeeId);
    const scheduled = Calculator.getEmployeeWeekHours(employeeId);

    if (scheduled > emp.contractHours) {
        return { valid: false, error: `${emp.firstName} heeft ${scheduled}u gepland maar contract is ${emp.contractHours}u` };
    }

    return { valid: true };
}
```

---

### 24. **Geen Undo/Redo Functionaliteit**
Bij wijzigen van shifts is er geen manier om terug te gaan.

**Toevoegen:**
```javascript
const history = {
    past: [],
    present: null,
    future: []
};

function saveToHistory() {
    history.past.push(JSON.parse(JSON.stringify(AppState.schedule)));
    if (history.past.length > 50) history.past.shift(); // Max 50 undo steps
    history.future = [];
}

function undo() {
    if (history.past.length === 0) return;
    history.future.push(AppState.schedule);
    AppState.schedule = history.past.pop();
    UI.renderCurrentPage();
}

function redo() {
    if (history.future.length === 0) return;
    history.past.push(AppState.schedule);
    AppState.schedule = history.future.pop();
    UI.renderCurrentPage();
}
```

---

### 25. **Export/Import Functionaliteit Ontbreekt Volledig**
Excel heeft:
- Export naar Excel (alle sheets)
- Import vanuit Excel
- Print functionaliteit

App heeft:
- Niets van dit alles

**Toevoegen:**
```javascript
function exportToExcel() {
    // Gebruik een library zoals SheetJS (xlsx)
    const wb = XLSX.utils.book_new();

    // Voeg sheets toe
    const wsSchedule = XLSX.utils.json_to_sheet(convertScheduleToRows());
    XLSX.utils.book_append_sheet(wb, wsSchedule, "Planning");

    // Download
    XLSX.writeFile(wb, `AH_Schema_Week${AppState.currentWeek}_${AppState.currentYear}.xlsx`);
}

function importFromExcel(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Parse sheets en update AppState
        parseExcelData(workbook);
    };
    reader.readAsArrayBuffer(file);
}
```

---

## 📋 SAMENVATTING PRIORITEITEN

### 🔴 HOOGSTE PRIORITEIT (Kritiek voor functionaliteit)
1. **Omzet per week database** - zonder dit kloppen alle berekeningen niet
2. **Feestdag systeem** - essentieel voor correcte uren berekening
3. **Budget berekeningen fixen** - scheduled hours voor taken berekenen
4. **Data persistence** - localStorage of backend
5. **Week navigatie met juiste data** - elke week moet eigen schedule hebben

### 🟡 HOGE PRIORITEIT (Belangrijke verbeteringen)
6. **Auto-schedule algoritme verbeteren**
7. **Shift validatie compleet maken**
8. **Planning overzicht pagina** (zoals Excel Planning sheet)
9. **Medewerker beschikbaarheid systeem**
10. **Settings pagina bewerkbaar maken**

### 🟢 MEDIUM PRIORITEIT (Gebruikerservaring)
11. **Budget pagina afmaken** (werkelijke uren tonen)
12. **Reports uitbreiden**
13. **Undo/redo functionaliteit**
14. **Delete/edit shift fix**
15. **Shift editor uitbreiden** (pauze, notities)

### 🔵 LAGE PRIORITEIT (Nice to have)
16. **Export/import Excel**
17. **Print functionaliteit**
18. **Dashboard statistics verfijnen**
19. **Sample data realistischer maken**
20. **Datum berekening met date-fns**

---

## 🎯 IMPLEMENTATIE VOLGORDE

### **FASE 1: Foundation Fixes (Week 1)**
1. Voeg week revenue database toe aan AppState
2. Voeg feestdag database toe
3. Fix Calculator functies om juiste omzet + feestdag factor te gebruiken
4. Implementeer localStorage persistence
5. Fix week navigatie om schedule per week op te slaan

### **FASE 2: Budget & Berekeningen (Week 2)**
6. Implementeer getScheduledHoursForTask() correct
7. Fix budget pagina om werkelijke uren te tonen
8. Fix budget bars op dashboard
9. Voeg budget warnings toe (over/under budget)

### **FASE 3: Validatie & Auto-schedule (Week 3)**
10. Voeg alle shift validaties toe
11. Implementeer employee contract hours check
12. Verbeter auto-schedule algoritme met:
    - Task time preferences
    - Function requirements
    - Optimization for minimal employees

### **FASE 4: UI Verbeteringen (Week 4)**
13. Planning overzicht pagina toevoegen
14. Settings bewerkbaar maken
15. Medewerker beschikbaarheid UI
16. Fix shift edit/delete bug
17. Voeg undo/redo toe

### **FASE 5: Advanced Features (Week 5)**
18. Reports uitbreiden
19. Export/import Excel
20. Print functionaliteit
21. Sample data generator verbeteren

---

## 📊 EXCEL vs APP FEATURE MATRIX

| Feature | Excel | App | Status | Prioriteit |
|---------|-------|-----|--------|-----------|
| Multi-store support | ✅ | ✅ | OK | - |
| Week selection | ✅ | ✅ | Gedeeltelijk (geen data per week) | 🔴 |
| Week-specific revenue | ✅ | ❌ | ONTBREEKT | 🔴 |
| Holiday database | ✅ | ❌ | ONTBREEKT | 🔴 |
| Holiday multiplier | ✅ | ⚠️ | UI bestaat maar niet gebruikt | 🔴 |
| Task norms | ✅ | ✅ | OK | - |
| Budget calculation | ✅ | ⚠️ | Werkt maar met foute data | 🔴 |
| Day distribution % | ✅ | ⚠️ | Hardcoded, niet bewerkbaar | 🟡 |
| Daily schedules (Ma-Zo) | ✅ | ✅ | OK | - |
| Shift management | ✅ | ✅ | OK maar bugs | 🟡 |
| Task assignment | ✅ | ✅ | OK | - |
| Employee management | ✅ | ✅ | OK | - |
| Employee availability | ✅ | ❌ | ONTBREEKT | 🟡 |
| Planning overview | ✅ | ❌ | ONTBREEKT | 🟡 |
| Budget vs actual | ✅ | ⚠️ | Altijd 0 | 🔴 |
| Task time totals | ✅ | ⚠️ | Berekening niet geïmplementeerd | 🔴 |
| Auto-schedule | ❌ | ⚠️ | Basis versie | 🟡 |
| Shift validation | ⚠️ | ⚠️ | Basis validatie | 🟡 |
| Opening hours config | ✅ | ⚠️ | Niet bewerkbaar | 🟡 |
| Settings management | ✅ | ⚠️ | Beperkt | 🟡 |
| Reports | ✅ | ⚠️ | Basis charts | 🟢 |
| Export to Excel | ✅ | ❌ | ONTBREEKT | 🟢 |
| Import from Excel | ✅ | ❌ | ONTBREEKT | 🟢 |
| Print functionality | ✅ | ❌ | ONTBREEKT | 🔵 |
| Multi-week view | ✅ | ❌ | ONTBREEKT | 🔵 |
| Data persistence | ✅ (file) | ❌ | ONTBREEKT | 🔴 |

---

## 💡 AANBEVOLEN ARCHITECTUUR WIJZIGINGEN

### **1. State Management Herstructureren**
Huidige AppState is plat. Voor schaalbaarheid:

```javascript
const AppState = {
    // Config (niet wijzigend)
    config: {
        functions: [...],
        tasks: [...],
        stores: {...},
        holidays: {...]
    },

    // User session
    session: {
        currentStore: '3138',
        currentWeek: 52,
        currentYear: 2025,
        currentPage: 'dashboard',
        user: { role: 'manager', name: '...' }
    },

    // Data per week (historie)
    schedules: {
        '3138': {  // store_id
            '2025': {  // year
                52: {  // week
                    expectedRevenue: 369312,
                    isHoliday: false,
                    schedule: { 0: [...], 1: [...], ... },
                    status: 'draft' // draft, approved, published
                },
                1: { ... },
                // etc.
            }
        }
    },

    // Employees per store
    employees: {
        '3138': [...],
        '3002': [...],
        // etc.
    },

    // Settings per store
    settings: {
        '3138': {
            dayDistribution: {...},
            openingHours: {...},
            maxDailyHours: 9,
            maxWeeklyHours: 36.5
        }
    }
};
```

### **2. Calculator Herstructureren**
Maak een centrale BudgetEngine:

```javascript
class BudgetEngine {
    constructor(store, week, year) {
        this.store = store;
        this.week = week;
        this.year = year;
        this.weekData = this.getWeekData();
    }

    getWeekData() {
        // Haal omzet + feestdag data op
    }

    calculateTaskBudget(task) {
        // Bereken uren voor 1 taak
    }

    calculateTotalBudget() {
        // Som alle taken
    }

    calculateDailyBudget(dayIndex) {
        // Verdeel over dagen
    }

    getActualHours(schedule) {
        // Bereken werkelijke uren uit schedule
    }

    getVariance() {
        // Budget vs werkelijk
    }
}
```

### **3. Validation Engine Apart Houden**
```javascript
class ValidationEngine {
    constructor(rules) {
        this.rules = rules;
    }

    validateShift(shift, context) { ... }
    validateSchedule(schedule, budget) { ... }
    validateEmployee(employee, schedule) { ... }
}
```

---

## 🚀 QUICK WINS (Te doen in < 2 uur)

1. **Fix budget bars** - Implementeer getScheduledHoursByCategory()
2. **Fix delete shift** - Verwijder shift bij save, niet bij edit open
3. **Fix dashboard revenue** - Toon verwachte omzet ipv standaard
4. **LocalStorage toevoegen** - Save/load AppState
5. **Toast notifications** - Zijn al geïmplementeerd maar worden weinig gebruikt
6. **Validatie errors tonen** - Toon waarom shift niet gemaakt kan worden
7. **Loading states** - Toon spinner tijdens berekeningen
8. **Empty states** - Betere lege state teksten
9. **Confirm dialogs** - Voor delete acties
10. **Keyboard shortcuts** - Ctrl+S voor save, Ctrl+Z voor undo

---

**Dit document bevat alle aanpassingen die nodig zijn om de app op gelijke functionaliteit te brengen met het Excel bestand. Start met de 🔴 prioriteiten!**
