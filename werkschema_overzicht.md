# Albert Heijn Werkschema & Dagritme Systeem
## Antwerpen Groenplaats - Complete Overzicht

---

## 📋 Algemene Informatie

**Bestandsnaam:** AH203138202023202520OP2020Antwerpen20Groenplaats20DagritmeONLINE20100.53_unprotected.xlsx

**Doel:** Dit is een uitgebreid personeelsplanning- en taakbeheerssysteem voor de Albert Heijn winkel in Antwerpen Groenplaats. Het systeem helpt bij het plannen van dagelijkse taken, budgettering van uren, en personeelsbeheer.

**Aantal Sheets:** 17 werkbladen

---

## 🏢 Winkelinformatie

**Adres:** Groenplaats, Antwerpen  
**Winkelnummer:** 3138  
**Standaard Omzet:** €369.312  
**Openingstijden:**
- Maandag t/m Zondag: 07:00 - 21:00
- Zondag geopend: Ja
- Pick-Up-Point: Nee

**Maximale Werktijden:**
- Per dag: 9 uur (exclusief pauze)
- Per week: 36,5 uur (exclusief pauze)

---

## 📊 Structuur van het Excel Bestand

### 1. **Werkschema - Instelling** 
📐 *Dimensies: 172 rijen × 42 kolommen*

**Functie:** Definitie van alle taken en activiteiten

**Belangrijke Kolommen:**
- **Omschrijving taak:** Volledige naam van de taak
- **Afkorting:** Korte code voor de taak
- **Koppel:** Relaties tussen taken
- **Plustijd:** Extra tijd nodig voor bepaalde taken
- **Exclusieve Dag:** Taken die alleen op bepaalde dagen uitgevoerd worden (Ma, Di, Wo, Do, Vr, Za, Zo)
- **Vaste tijd:** Taken met een gefixeerde tijdsduur
- **Volgorde:** Prioritering van taken
- **Rekentijd:** Berekende tijd per taak

**Doel:** Dit sheet fungeert als de master-database voor alle taken die in de winkel uitgevoerd moeten worden.

---

### 2. **Werkschema - Rekening**
📐 *Dimensies: 46 rijen × 16 kolommen*

**Functie:** Dagoverzicht van taken per medewerker

**Structuur:**
- Kolommen voor elke dag van de week (Ma t/m Zo)
- Per dag twee kolommen: taak-afkorting en naam van de medewerker
- Taakcodes zoals:
  - `hv` - Houdbaar vullen
  - `dv` - Diepvries vullen
  - `vv` - Vers vullen
  - `nh` - Navulling Houdbaar
  - `nd` - Navulling Diepvries
  - `nv` - Navulling Vers
  - `rh` - Restant Houdbaar
  - `rd` - Restant Diepvries
  - `rv` - Restant Vers
  - `br` - Brood

**Doel:** Dit is het dagelijks werkrooster dat laat zien welke medewerker welke taak uitvoert per dag.

---

### 3. **Instellingen HIDE**
📐 *Dimensies: 1429 rijen × 14 kolommen*

**Functie:** Verborgen database met winkelinformatie en feestdagen

**Bevat 475 datapunten met:**
- **Winkelnummers:** 3002 t/m 3138 (verschillende AH-winkels)
- **Winkelnamen:** Pelt, Antwerpen Hessenplein, Antwerpen Hoboken, Beveren, Olen, etc.
- **Adressen en contactgegevens**
- **Datums en evenementen:**
  - Kerstvakantie (30 dec 2024 - 5 jan 2025)
  - Nieuwjaar (1 jan 2025)
  - Driekoningen (6 jan 2025)
  - Valentijnsdag (14 feb 2025)
  - Krokusvakantie (3-8 mrt 2025)
  - En meer...
- **Weeknummers**
- **Omzetcijfers** per winkel (€365.000 - €400.000 gemiddeld)
- **Feestdag indicatoren**

**Doel:** Dit sheet wordt gebruikt voor automatische berekeningen gebaseerd op feestdagen en evenementen die de planning beïnvloeden.

---

### 4. **Ma, Di, Wo, Do, Vr, Za, Zo** (7 sheets)
📐 *Dimensies: 87 rijen × 91 kolommen per dag*

**Functie:** Gedetailleerde dagplanning per weekdag

**Structuur:**
- Grote tabellen met veel kolommen voor uursgewijze planning
- Bevat planning voor verschillende tijdsblokken gedurende de dag
- Vermoedelijk uurregistratie en taaktoewijzing per uur

**Doel:** Dit zijn de kernsheets waar de daadwerkelijke uurplanning per dag wordt ingevuld.

---

### 5. **Planning**
📐 *Dimensies: 105 rijen × 38 kolommen*

**Functie:** Hoofdplanningsoverzicht

**Bevat:**
- Functies en rollen
- Totalen per functie
- Wekelijks overzicht

**Doel:** Consolidatie van alle dagplanningen in één overzicht.

---

### 6. **Medewerker**
📐 *Dimensies: 107 rijen × 37 kolommen*

**Functie:** Database van alle medewerkers en hun functies

**Medewerker Functies:**

| Nr | Functie | Afkorting |
|---|---|---|
| 1 | Supermarktmanager | SM |
| 2 | Manager Operatie | MO |
| 3 | Manager Vers | MV |
| 4 | Manager Service | MS |
| 5 | Shiftleider | SL |
| 6 | Medewerker Operatie | MW |
| 7 | Medewerker Vers | MW |
| 8 | Medewerker Kwaliteit | KW |
| 9 | Caissière B | Cas B |
| 10 | Caissière A | Cas A |
| 11 | Jobstudent | JOB |
| 12 | Interim-Medewerker | IMW |
| 13 | Interim - Jobstudent | IJOB |

**Doel:** Alle beschikbare personeelsleden met hun functie en beschikbaarheid.

---

### 7. **Instellingen**
📐 *Dimensies: 69 rijen × 30 kolommen*

**Functie:** Configuratie-instellingen voor het systeem

**Bevat:**

**Algemene Vragen:**
- Is de winkel standaard op zondag geopend? → Ja
- Is er een Pick-Up-Point aanwezig? → Nee
- Maximaal geplande tijd per dag: 9 uur (excl. pauze)
- Maximaal geplande tijd per week: 36,5 uur (excl. pauze)

**Openingstijden:**

| Dag | Open | Sluit |
|---|---|---|
| Maandag | 07:00 | 21:00 |
| Dinsdag | 07:00 | 21:00 |
| Woensdag | 07:00 | 21:00 |
| Donderdag | 07:00 | 21:00 |
| Vrijdag | 07:00 | 21:00 |
| Zaterdag | 07:00 | 21:00 |
| Zondag | 07:00 | 21:00 |

**Verdeling Uren:**
- Percentage-verdeling van urenbudget per dag van de week
- Gebruikt voor automatische budgetberekeningen

**Doel:** Master-configuratie voor alle berekeningen en instellingen.

---

### 8. **Begroting**
📐 *Dimensies: 72 rijen × 29 kolommen*

**Functie:** Budgettering en urenplanning

**Belangrijke Gegevens:**
- **Standaardomzet:** €369.312
- **Verwachte omzet:** Variabel per periode

**Taakcategorieën met Normen:**

#### Houdbaar (Droge waren)
- **act** - Actieopbouw: 32,13 uur (standaard norm)
- **hl** - Hardlopers vullen: 233,92 uur
- **hv** - Houdbaar vullen: 10,86 uur (Verzorging)
- **nh** - Navulling Houdbaar
- **rh** - Restant Houdbaar

#### Vers
- **nv** - Navulling Vers: 22,14 uur (Voorbereiding en afwerking Vers)
- **rv** - Restant Vers: 165,31 uur (Vullen Vers)
- **vv** - Vers vullen

#### Diepvries
- **dv** - Diepvries vullen: 10,84 uur (Vullen Diepvries)
- **nd** - Navulling Diepvries

**Kolommen:**
- Planning per dag (Maandag t/m Zondag)
- Totaal per taak
- Begroting met normen (standaard en verwacht)
- Simulatie vs Begroting vergelijking

**Doel:** Dit sheet berekent hoeveel uren per taak nodig zijn op basis van omzet en normen. Het vergelijkt de geplande uren met het budget.

---

### 9. **Werkschema**
📐 *Dimensies: 177 rijen × 9 kolommen*

**Functie:** Papieren werkschema template

**Bevat:**
- Herkenning schifttaak (controle taken)
- Uitvoering per dag van de week
- Paraaf-kolom voor handtekening
- Genummerde taken (1, 2, 3, 4, etc.)

**Doel:** Dit is een printvriendelijke versie voor handmatig gebruik op de werkvloer. Het bevat een lijst van taken die afgevinkt kunnen worden.

---

### 10. **Aanpassen Werkschema**
📐 *Dimensies: 182 rijen × 29 kolommen*

**Functie:** Interface voor het wijzigen van het werkschema

**Structuur:**
- 181 rijen met instelbare parameters
- Kolommen voor elke dag (Ma t/m Zo)
- Bewerkbare velden voor aanpassingen

**Doel:** Dit sheet wordt gebruikt door managers om het werkschema aan te passen aan specifieke behoeften of onvoorziene omstandigheden.

---

### 11. **Access**
📐 *Dimensies: 4 rijen × 3 kolommen*

**Functie:** Toegangsbeheer en synchronisatie

**Bevat:**
- Melding: "Deze pagina wordt enkel gebruikt door het hoofdkantoor"
- Google Sheets link voor centrale synchronisatie
- Winkelnummer: 3138
- Datum: 2025-06-02 00:00:00

**Doel:** Dit sheet wordt gebruikt door het hoofdkantoor voor centrale controle en data-synchronisatie met andere systemen (mogelijk Google Sheets integratie).

---

## 🔄 Hoe het Systeem Werkt

### Workflow:

1. **Begroting Instellen**
   - Verwachte omzet invoeren
   - Systeem berekent automatisch benodigde uren per taak op basis van normen

2. **Taken Definiëren (Werkschema - Instelling)**
   - Alle taken worden gedefinieerd met afkortingen
   - Tijdsberekeningen worden gekoppeld
   - Dagspecifieke taken worden ingesteld

3. **Dagplanning Maken (Ma t/m Zo sheets)**
   - Per dag wordt uurgewijze planning gemaakt
   - Taken worden toegewezen aan specifieke tijdsblokken

4. **Medewerkers Toewijzen (Werkschema - Rekening)**
   - Taken worden gekoppeld aan specifieke medewerkers
   - Per dag overzicht wie wat doet

5. **Planning Consolideren (Planning sheet)**
   - Alle dagplanningen worden samengevat
   - Totalen per functie worden berekend

6. **Monitoring & Aanpassing**
   - Werkschema kan aangepast worden via "Aanpassen Werkschema"
   - Simulatie vs Begroting vergelijking toont afwijkingen

7. **Uitvoering (Werkschema sheet)**
   - Printvriendelijke versie voor op de werkvloer
   - Medewerkers vinken af welke taken uitgevoerd zijn

---

## 📈 Belangrijke Kenmerken

### Automatische Berekeningen:
- ✅ Urenbudget op basis van omzet
- ✅ Normtijden per taak
- ✅ Dag-verdeling gebaseerd op percentages
- ✅ Feestdag- en evenementencompensatie

### Flexibiliteit:
- ✅ Aanpasbaar per dag
- ✅ Verschillende medewerkerstypes
- ✅ Seizoensgebonden planning

### Integratie:
- ✅ Link met Google Sheets
- ✅ Hoofdkantoor toegang
- ✅ Multi-winkel database

---

## 🎯 Belangrijkste Taakcategorieën

### Houdbaar (Droge Waren)
- Actieopbouw en -afbouw
- Hardlopers bijvullen
- Regulier vullen
- Navulling verwerken
- Restanten verwerken

### Vers
- Vers bereiden en presenteren
- Vers vullen
- Navulling verwerken
- Restanten verwerken en afprijzen

### Diepvries
- Diepvries vullen
- Navulling verwerken

### Service
- Kassa's bemensen
- Klantenservice
- Winkelcontrole en schoonmaak

---

## 💡 Gebruiksdoelen

Dit Excel-systeem wordt gebruikt voor:

1. **Personeelsplanning**
   - Wie werkt wanneer?
   - Welke functie heeft welke uren nodig?

2. **Taakbeheer**
   - Welke taken moeten gedaan worden?
   - Hoeveel tijd kost elke taak?

3. **Budgetbeheer**
   - Hoeveel uren hebben we budget voor?
   - Blijven we binnen budget?

4. **Operationele Efficiëntie**
   - Optimale verdeling van werk over de week
   - Balans tussen personeelsbezetting en verwachte drukte

5. **Compliance & Registratie**
   - Vastlegging van wie wat doet
   - Handtekeningen voor verantwoordelijkheid

6. **Hoofdkantoor Controle**
   - Centrale monitoring via Access sheet
   - Vergelijking tussen winkels

---

## 🔧 Technische Details

**Formules:** Het bestand bevat extensive Excel-formules voor:
- Automatische urenberekeningen
- VLOOKUP's voor medewerkergegevens
- Voorwaardelijke opmaak voor planning
- SUM/SUMIF voor totalen
- Datum-afhankelijke berekeningen

**Opmaak:** 
- Kleurcodering per functie/taak
- Voorwaardelijke opmaak voor overschrijdingen
- Print-layout voor werkschema's

**Beveiliging:**
- Sommige sheets zijn verborgen (HIDE)
- Hoofdkantoor-toegang beperkt
- Bestandsnaam suggereert dat dit een "unprotected" versie is

---

## 📝 Conclusie

Dit is een uitgebreid en professioneel personeelsplanningssysteem dat:
- Complete dagplanning mogelijk maakt van openingstijd tot sluiting
- Automatisch urenbudget berekent op basis van omzet
- Taken optimaal verdeelt over medewerkers
- Rekening houdt met feestdagen en evenementen
- Zowel digitale als papieren workflow ondersteunt
- Centrale controle vanuit het hoofdkantoor mogelijk maakt

Het systeem is specifiek ontwikkeld voor de Albert Heijn retail-omgeving en integreert personeelsbeheer, taakbeheer en financiële planning in één tool.

---

**Laatst bijgewerkt:** Gebaseerd op data t/m juni 2025  
**Versie:** 100.53 (unprotected)
