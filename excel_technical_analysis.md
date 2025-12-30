# Excel Werkschema - Technische Analyse & Formula Breakdown
## Hoe het Excel bestand precies werkt

---

## 🔍 Overzicht van de Data Flow

```
┌─────────────────┐
│  Access Sheet   │  ← Master control (week/datum selectie)
│  (C3 = winkel)  │
│  (C4 = datum)   │
└────────┬────────┘
         │
         ├──────────────────────────────────────────┐
         │                                          │
         ▼                                          ▼
┌─────────────────────┐                  ┌─────────────────────┐
│ Instellingen HIDE   │                  │   Instellingen      │
│ (Feestdagen DB)     │                  │   (Percentages)     │
└──────────┬──────────┘                  └──────────┬──────────┘
           │                                        │
           │                                        │
           ▼                                        ▼
┌─────────────────────┐                  ┌─────────────────────┐
│   Begroting         │◄─────────────────│   Ma/Di/Wo/Do/Vr/   │
│   (Budget calc)     │                  │   Za/Zo (Dagsheets) │
└──────────┬──────────┘                  └──────────┬──────────┘
           │                                        │
           │                                        │
           └────────────────┬───────────────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │    Planning     │
                  │  (Week overzicht)│
                  └─────────────────┘
```

---

## 📊 Sheet 1: Access (Master Control)

### Functie
Dit is het **controle-paneel** van het hele systeem. Hier selecteert de gebruiker:
- **C3**: Winkelnummer (bijv. 3138)
- **C4**: Datum van de week (bijv. 2025-06-02)

### Hoe het werkt
```excel
Access!C3 = 3138              → Selecteert winkel Antwerpen Groenplaats
Access!C4 = 2025-06-02        → Selecteert week 23 van 2025
```

**Deze cellen worden door het HELE systeem gebruikt als referentie!**

Elke formule die begint met `Access!C3` of `Access!C4` haalt de geselecteerde winkel/datum op.

---

## 📊 Sheet 2: Instellingen HIDE (Database)

### Functie
Enorme **opzoektabel** met:
- 475 rijen data
- Alle winkels in België
- Feestdagen en evenementen
- Verwachte omzet per week

### Structuur
```
Kolom A: Winkelnummer (3002-3138)
Kolom B: Winkelnaam
Kolom C-E: Adres info
Kolom H: Datum
Kolom I: Evenement (Kerstvakantie, Nieuwjaar, etc.)
Kolom L: Weeknummer
Kolom M: Omzet
Kolom N: Feestdag indicator (0 of 1)
```

### Voorbeeld Data
```
Wnr  | Naam               | Week | Omzet     | Feestdag
3138 | Antwerpen Groenpl. | 1    | 365380    | 0
3138 | Antwerpen Groenpl. | 2    | 380928    | 0
3138 | Antwerpen Groenpl. | 3    | 366242    | 1  ← Nieuwjaar
```

### Hoe het gebruikt wordt
```excel
# In Begroting sheet:
=VLOOKUP(WEEKNUM(Access!C4,21), 'Instellingen HIDE'!$L$2:$N$54, 3, FALSE)
```

**Vertaling:**
1. `WEEKNUM(Access!C4,21)` → Bereken weeknummer van geselecteerde datum
2. Zoek dit weeknummer op in kolom L (Instellingen HIDE)
3. Haal waarde uit kolom 3 (Omzet) op
4. Dit wordt de verwachte omzet voor die week

---

## 📊 Sheet 3: Begroting (Budget Calculator)

### Functie
Dit is de **rekenmachine** van het systeem. Hier gebeurt:
1. Omzetberekening op basis van week
2. Urenberekening per taak
3. Verdeling over weekdagen
4. Budget vs Werkelijk vergelijking

### Key Formulas Uitgelegd

#### 1. Feestdag Indicator
```excel
Cell O1: =IFERROR(IF(Access!C4="", 0, 
         VLOOKUP(WEEKNUM(Access!C4,21), 'Instellingen HIDE'!$L$2:$N$54, 3, FALSE)), 0)
```
**Wat doet dit?**
- Checkt of de geselecteerde week een feestdag bevat
- Returns 0 (geen feestdag) of 1 (feestdag)
- Wordt gebruikt voor aanpassingen (bijv. 5/6 uren op feestdagen)

#### 2. Verwachte Omzet
```excel
Cell M3: =IF(Access!C4="", 
         IF(Begroting!N3="", Begroting!M2, Begroting!N3),
         IF(Begroting!N3="", Begroting!O3, Begroting!N3))
```
**Logica:**
- Als geen datum geselecteerd → gebruik standaard omzet (M2)
- Als wel datum → haal omzet op uit Instellingen HIDE
- Anders → gebruik handmatig ingevoerde omzet (N3)

#### 3. Taak Uren van Dagsheets
```excel
# Actieopbouw (act)
D10: =Ma!$BA$42    → Maandag uren
E10: =Di!$BA$42    → Dinsdag uren
F10: =Wo!$BA$42    → Woensdag uren
...
K10: =SUM(D10:J10) → Totaal week
```

**Wat gebeurt hier?**
- Elke dagsheet (Ma, Di, etc.) heeft berekeningen in kolom BA
- Row 42 = totale uren voor taak "actieopbouw" (act)
- Begroting haalt deze waarden op en sommeert ze

#### 4. Norm Berekening
```excel
Cell N10: =IFERROR(M10*($M$3/$M$2), 0)
```
**Formule breakdown:**
- `M10` = Norm uren per €100K (bijv. 32.13 uur)
- `$M$3` = Verwachte omzet deze week (bijv. €369.312)
- `$M$2` = Standaard omzet (€369.312)
- **Resultaat**: (32.13 × 369312/369312) = 32.13 uur

**Bij andere omzet:**
Als verwachte omzet €400.000:
- (32.13 × 400000/369312) = 34.78 uur

#### 5. Feestdag Correctie
```excel
Cell N12: =IF(O1=1, 5/6, 1) * M12
```
**Betekenis:**
- Als O1 = 1 (feestdag) → vermenigvuldig met 5/6 (= 83.3%)
- Anders → vermenigvuldig met 1 (= 100%)
- **Reden**: Op feestdagen zijn minder uren nodig

**Voorbeeld:**
- Normale dag: 10 uur × 1 = 10 uur
- Feestdag: 10 uur × 5/6 = 8.33 uur

---

## 📊 Sheet 4: Instellingen (Configuration)

### Functie
Configuratie van:
- Openingstijden per dag
- Percentage verdeling van uren over weekdagen
- Maximum uren per dag/week

### Percentage Verdeling
```excel
Cell F22: 14%    → Maandag krijgt 14% van totale uren
Cell G22: 14%    → Dinsdag krijgt 14% van totale uren
Cell H22: 14%    → Woensdag krijgt 14% van totale uren
...
Cell M22: =SUM(F22:L22) → Moet 100% zijn
```

### Uren per Dag Berekening
```excel
Cell F23: =Begroting!$N$71 * Instellingen!F22
```
**Voorbeeld:**
- Totaal budget week = 245 uur (Begroting!N71)
- Maandag percentage = 14% (F22)
- **Maandag uren** = 245 × 0.14 = 34.3 uur

---

## 📊 Sheet 5-11: Ma, Di, Wo, Do, Vr, Za, Zo (Daily Schedules)

### Functie
Dit zijn de **werkelijke roosters** waar medewerkers en tijden ingevuld worden.

### Structuur
Elke dagsheet heeft:
- **Kolom A**: Sorteervolgorde
- **Kolom B**: Medewerker naam
- **Kolom C**: Start tijd
- **Kolom D**: Eind tijd
- **Kolom E**: Totaal uren
- **Kolommen verder**: Taken per tijdsblok

### Hoofd Formula (Cell A13)
```excel
=IFERROR(
  IF(VLOOKUP($B13, $BC$13:$CL$86, 36, FALSE) > 5, 0,
    IF(COUNTIF($B$13:$B$63, $B13) > 1, 0, 1)
  ), 1
) + IF(B13<>0, 0, IF(AV13>0, 0.000001, 0))
```

**Wat doet dit?** (Complex!)
1. Checkt of medewerker meer dan 5 dagen werkt
2. Checkt voor duplicaten
3. Geeft sorteernummer
4. Gebruikt voor automatische ordering van shifts

### Week Info
```excel
Cell A1: =CONCATENATE("Planning week ", 
         IF(Access!C4="B", "BASIS", 
         IF(Access!C4="", "BASIS", WEEKNUM(Access!C4,21))))
```
**Output**: "Planning week 23"

### Budget Vergelijking
```excel
Cell N4: =Instellingen!F23    → Gebudgetteerde uren Maandag
Cell N3: =Ma!AV65              → Werkelijk geplande uren
Cell N5: =N4-N3                → Verschil (+ = over budget)
```

### Taken Berekening (Kolom BA)
Elke dag heeft in kolom BA (rij 14-43) de totale uren per taak:
```
BA14: Actieopbouw (act)
BA15: Diepvries (dv)
BA16: Vers vullen (vv)
BA17: Navulling houdbaar (nh)
...
BA42: TOTAAL alle taken
```

Deze worden opgeteld en doorgestuurd naar Begroting sheet!

---

## 📊 Sheet 12: Planning (Week Overview)

### Functie
**Consolidated view** van alle dagen in één overzicht.

### Medewerker Lookup
```excel
Cell B6: =IF(Medewerker!C8="", "", Medewerker!C8)
```
Haalt medewerker naam op uit Medewerker sheet.

### Tijd Lookup van Dagsheet
```excel
Cell E6: =IFERROR(
         IF(Medewerker!I8="",
            VLOOKUP($B6, Ma!$B$13:$E$63, 3, FALSE),
            Medewerker!I8
         ), "")
```

**Logica:**
1. Check eerst Medewerker sheet (kolom I8) voor override
2. Zo niet → zoek medewerker naam ($B6) op in Maandag sheet
3. Haal kolom 3 op (= start tijd)
4. Anders → toon leeg

### Uren Berekening
```excel
Cell G6: =IF(F6="OA", 0,
         IF(F6="TA", 0,
         IF(F6="VRIJ", 0,
         IF(F6="ST", 0,
         IFERROR(IF(F6="","",(F6/F6)*VLOOKUP($B6,Ma!$B$13:$H$63,6,FALSE)),0)
         ))))
```

**Betekenis:**
- OA = Onbetaald afwezig → 0 uren
- TA = Technische afwezigheid → 0 uren
- VRIJ = Vrije dag → 0 uren
- ST = Studie → 0 uren
- Anders → haal uren op uit dagsheet (kolom 6)

---

## 📊 Sheet 13: Medewerker (Employee Database)

### Functie
Master lijst van alle medewerkers met hun:
- Naam
- Functie
- Beschikbaarheid per dag
- Contract uren

### Override Systeem
Medewerker sheet kan de automatische planning overriden:
```
Kolom I8: Maandag override (start tijd)
Kolom M8: Dinsdag override (start tijd)
Kolom Q8: Woensdag override (start tijd)
...
```

Als deze cellen gevuld zijn, gebruikt Planning deze waarden i.p.v. dagsheet waarden.

---

## 🔄 Complete Calculation Flow

### Stap-voor-stap hoe een rooster berekend wordt:

**1. Gebruiker selecteert week**
```
Access!C4 = "2025-06-02" (maandag week 23)
```

**2. Systeem haalt feestdag & omzet op**
```
Begroting!O1 = VLOOKUP(weeknummer, feestdagen) → 0 (geen feestdag)
Begroting!M3 = VLOOKUP(weeknummer, omzet) → €369.312
```

**3. Berekent uren per taak**
```
Taak "act" = 32.13 uur (norm) × (369312/369312) × 1 = 32.13 uur
Taak "hl" = 233.92 uur × (369312/369312) × 1 = 233.92 uur
...
TOTAAL = 850 uur (bijvoorbeeld)
```

**4. Verdeelt over weekdagen**
```
Maandag = 850 × 14% = 119 uur
Dinsdag = 850 × 14% = 119 uur
...
```

**5. Manager vult dagsheets in**
- Kiest medewerkers
- Vult start/eind tijden in
- Wijst taken toe

**6. Dagsheets berekenen totalen**
```
Ma!BA42 = SUM(alle shifts maandag) = 115 uur
Di!BA42 = SUM(alle shifts dinsdag) = 118 uur
...
```

**7. Begroting vergelijkt**
```
Budget Maandag: 119 uur
Werkelijk Maandag: 115 uur
Verschil: +4 uur (onder budget)
```

**8. Planning consolideert**
Planning sheet trekt alles samen in één overzicht voor de manager.

---

## 🎯 Belangrijkste Formule Patterns

### 1. Conditional Feestdag Berekening
```excel
=IF(feestdag_indicator=1, berekening × 5/6, berekening × 1)
```
**Gebruik**: Verlaag uren op feestdagen met 17%

### 2. Omzet-gebaseerde Scaling
```excel
=norm_uren × (verwachte_omzet / standaard_omzet)
```
**Gebruik**: Schaal uren op/af bij hogere/lagere omzet

### 3. Cross-Sheet Referencing
```excel
=Ma!$BA$42
```
**Gebruik**: Haal berekende waarden op van andere sheets

### 4. VLOOKUP met WEEKNUM
```excel
=VLOOKUP(WEEKNUM(datum, 21), tabel, kolom, FALSE)
```
**Gebruik**: Zoek data op basis van weeknummer

### 5. IFERROR Wrapper
```excel
=IFERROR(complexe_formule, 0)
```
**Gebruik**: Voorkom #N/A errors, toon 0 als geen data

### 6. Nested IF voor Status Codes
```excel
=IF(code="OA", 0, IF(code="VRIJ", 0, IF(code="ST", 0, berekening)))
```
**Gebruik**: Handle speciale medewerker statussen

---

## 🔧 Kritische Cell Referenties

### Access Sheet (Master Control)
```
C3 → Winkelnummer (3138)
C4 → Datum van week (2025-06-02)
```

### Begroting Sheet
```
M2 → Standaard omzet (€369.312)
M3 → Verwachte omzet deze week
N71 → Totaal budget uren
O1 → Feestdag indicator (0 of 1)
```

### Instellingen
```
F22:L22 → Percentages per weekdag
F23:L23 → Berekende uren per weekdag
```

### Dagsheets (Ma, Di, etc.)
```
BA14:BA42 → Totaal uren per taak
AV65 → Grand total geplande uren
B13:E63 → Medewerker planning grid
```

---

## 💡 Smart Features in het Excel

### 1. Automatische Sortering
Medewerkers worden automatisch gesorteerd op:
- Functie niveau
- Aantal werkdagen
- Alfabetische volgorde

### 2. Duplicate Detection
```excel
=COUNTIF($B$13:$B$63, $B13) > 1
```
Checkt of een medewerker meerdere keren ingepland is.

### 3. Budget Warnings
```excel
=N5    # Verschil budget vs werkelijk
```
Als negatief (rood) → Over budget!
Als positief (groen) → Onder budget

### 4. Feestdag Compensation
Automatische 17% reductie op feestdagen:
```
Normaal: 10 uur
Feestdag: 10 × 5/6 = 8.33 uur
```

### 5. Flexible Overrides
Managers kunnen automatische planning overriden via:
- Medewerker sheet (voorkeurs tijden)
- Direct in dagsheets (ad-hoc wijzigingen)

---

## 🎨 Visualisatie van Dependencies

```
       ┌────────────────────────────┐
       │      Access (C3, C4)       │
       │   [Winkel & Week select]   │
       └──────────┬─────────────────┘
                  │
        ┌─────────┴──────────┐
        │                    │
        ▼                    ▼
┌──────────────┐    ┌──────────────┐
│ Instellingen │    │ Instellingen │
│    HIDE      │    │  (Settings)  │
│              │    │              │
│ • Feestdagen │    │ • Percentages│
│ • Omzet/week │    │ • Open hours │
└──────┬───────┘    └──────┬───────┘
       │                   │
       │    ┌──────────────┘
       │    │
       ▼    ▼
  ┌──────────────┐
  │   Begroting  │
  │              │
  │ • Calc norms │
  │ • Feestdag × │
  │ • Budget tot │
  └──────┬───────┘
         │
         ├─────────────────────────────┐
         │                             │
         ▼                             ▼
  ┌──────────────┐            ┌──────────────┐
  │  Ma - Zo     │            │  Planning    │
  │  (7 sheets)  │────────────│              │
  │              │            │ • Week view  │
  │ • Shifts     │            │ • Per person │
  │ • Tasks      │            │ • Totals     │
  │ • Totals→BA  │            └──────────────┘
  └──────────────┘
```

---

## 📝 Excel Best Practices gebruikt in dit systeem

### 1. Named Ranges (Impliciet)
Vaste cel-referenties zoals `$BA$42` werken als named ranges.

### 2. Absolute vs Relative References
- `$BA$42` → Absoluut (blijft altijd BA42)
- `B13` → Relatief (verschuift bij kopiëren)
- `$B13` → Mixed (kolom vast, rij relatief)

### 3. Error Handling
Alle VLOOKUP formules zijn gewrapped in `IFERROR()`.

### 4. Centralized Control
Access sheet = single source of truth voor week/winkel.

### 5. Modular Design
Elke sheet heeft een specifieke functie, communiceren via referenties.

### 6. Validation via Formulas
```excel
=IF(verschil < 0, "OVER BUDGET!", "OK")
```

### 7. Color Coding
- Blauw = Input velden
- Groen = Berekend vanuit andere sheets
- Rood = Warnings/over budget
- Grijs = Disabled/niet van toepassing

---

## 🚀 Hoe dit te vertalen naar code

### 1. Database Structuur
```sql
-- Vervang Access sheet
stores (id, number, name)
weeks (date, week_number, year)

-- Vervang Instellingen HIDE
holidays (date, name, multiplier)
revenue_forecast (store_id, week_number, revenue)

-- Vervang Begroting
task_norms (task_id, hours_per_100k)
budget_distribution (day_of_week, percentage)
```

### 2. Calculation Functions
```javascript
function calculateTaskHours(normHours, expectedRevenue, standardRevenue, isHoliday) {
  const baseHours = normHours * (expectedRevenue / standardRevenue);
  const multiplier = isHoliday ? 5/6 : 1;
  return baseHours * multiplier;
}

function distributeDailyHours(totalWeekHours, dayPercentage) {
  return totalWeekHours * (dayPercentage / 100);
}
```

### 3. Sheet Replacement
- **Access** → UI State / URL params
- **Instellingen HIDE** → Database table
- **Begroting** → Backend API calculations
- **Ma-Zo** → Daily schedule UI components
- **Planning** → Week overview component
- **Medewerker** → Employee management

---

## 📊 Samenvatting: Kernformules

### Budget Berekening
```excel
Totaal_uren = SUM(alle_taken)
Taak_uren = norm × (omzet/standaard_omzet) × feestdag_factor
```

### Dag Distributie
```excel
Dag_uren = totaal_week_uren × dag_percentage
```

### Feestdag Factor
```excel
Factor = IF(is_feestdag, 5/6, 1)  # = 83.3% of 100%
```

### Budget vs Werkelijk
```excel
Verschil = gebudgetteerd - werkelijk_gepland
Status = IF(verschil < 0, "OVER BUDGET", "OK")
```

---

## 🎯 Conclusie

Dit Excel systeem is **zeer geavanceerd** met:
- ✅ Dynamische week/winkel selectie
- ✅ Automatische omzet lookups
- ✅ Feestdag compensatie
- ✅ Cross-sheet calculations
- ✅ Budget tracking
- ✅ Override mogelijkheden
- ✅ Error handling
- ✅ Duplicate detection

**De kern**: Alles is gebaseerd op VLOOKUP's, cross-sheet referenties en omzet-driven berekeningen!

---

**Dit document is een complete technical breakdown van hoe het Excel bestand werkt!** 
Nu weet je exact welke formules gebruikt worden en hoe alle sheets met elkaar communiceren. 🎓
