/* ===================================
   AH Werkschema Manager - JavaScript
   Complete functionaliteit voor de webapp
   =================================== */

// ===================================
// DATA STORE
// ===================================

const DEFAULT_DAY_DISTRIBUTION = {
    0: 14, // Maandag
    1: 14, // Dinsdag
    2: 14, // Woensdag
    3: 14, // Donderdag
    4: 15, // Vrijdag
    5: 16, // Zaterdag
    6: 13  // Zondag
};

const DEFAULT_EMPLOYEES = [
    { id: 1, firstName: 'Jacco', lastName: 'Maas', function: 'MO', contractHours: 36.5, active: true, availability: [0,1,2,3,4], preferredTimes: {} },
    { id: 3, firstName: 'Sam', lastName: 'Viravouth', function: 'SL', contractHours: 36.5, active: true, availability: [0,1,2,3,4,5], preferredTimes: {} },
    { id: 4, firstName: 'Zubaid', lastName: 'Shinwari', function: 'SL', contractHours: 36.5, active: true, availability: [0,1,2,3,4,5], preferredTimes: {} },
    { id: 5, firstName: 'Stefan', lastName: '', function: 'SL', contractHours: 36.5, active: true, availability: [0,1,2,3,4,5], preferredTimes: {} },
    { id: 6, firstName: 'Viktor', lastName: 'Toth', function: 'SL', contractHours: 35, active: true, availability: [0,1,2,3,4,5], preferredTimes: {} },
    { id: 8, firstName: 'Laila', lastName: 'Bishir', function: 'MW', contractHours: 30, active: true, availability: [0,1,2,3,4,5], preferredTimes: {} },
    { id: 9, firstName: 'Yoselin', lastName: '', function: 'MW', contractHours: 25, active: true, availability: [0,1,2,3,4], preferredTimes: {} },
    { id: 10, firstName: 'Mina', lastName: '', function: 'MW', contractHours: 36.5, active: true, availability: [0,1,2,3,4,5], preferredTimes: {} },
    { id: 11, firstName: 'Saida', lastName: 'Hadouti', function: 'MW', contractHours: 25, active: true, availability: [0,1,2,3,4], preferredTimes: {} },
    { id: 12, firstName: 'Snesjana', lastName: '', function: 'MW', contractHours: 25, active: true, availability: [0,1,2,3,4], preferredTimes: {} },
    { id: 13, firstName: 'Johny', lastName: '', function: 'MW', contractHours: 25, active: true, availability: [0,1,2,3,4], preferredTimes: {} },
    { id: 14, firstName: 'Kamal', lastName: '', function: 'MW', contractHours: 30, active: true, availability: [0,1,2,3,4,5], preferredTimes: {} },
    { id: 15, firstName: 'Rachid', lastName: 'Ahrass', function: 'MW', contractHours: 36.5, active: true, availability: [0,1,2,3,4,5], preferredTimes: {} },
    { id: 16, firstName: 'Mike', lastName: 'Odafe', function: 'MW', contractHours: 36.5, active: true, availability: [0,1,2,3,4,5], preferredTimes: {} },
    { id: 17, firstName: 'Tony', lastName: 'Zogo', function: 'MW', contractHours: 30, active: true, availability: [0,1,2,3,4,5], preferredTimes: {} },
    { id: 19, firstName: 'Nermeen', lastName: 'Mamlouk', function: 'MW', contractHours: 24, active: true, availability: [0,1,2,3,4], preferredTimes: {} },
    { id: 21, firstName: 'Milan', lastName: 'Gebruers', function: 'MW', contractHours: 36.5, active: true, availability: [0,1,2,3,4,5], preferredTimes: {} },
    { id: 22, firstName: 'Shana', lastName: 'van Hooydonck', function: 'MV', contractHours: 30, active: true, availability: [0,1,2,3,4,5], preferredTimes: {} },
    { id: 24, firstName: 'Gretchen', lastName: '', function: 'KW', contractHours: 28, active: true, availability: [0,1,2,3,4], preferredTimes: {} },
    { id: 25, firstName: 'Nataliia', lastName: '', function: 'KW', contractHours: 28, active: true, availability: [0,1,2,3,4], preferredTimes: {} },
    { id: 27, firstName: 'Deniz', lastName: '', function: 'MW', contractHours: 24, active: true, availability: [0,1,2,3,4,5], preferredTimes: {} },
    { id: 28, firstName: 'Natacha', lastName: 'Reugemeuter', function: 'MW', contractHours: 24, active: true, availability: [0,1,2,3,4], preferredTimes: {} },
    { id: 29, firstName: 'Fatmir', lastName: 'Bilalovski', function: 'MW', contractHours: 24, active: true, availability: [0,1,2,3,4], preferredTimes: {} },
    { id: 30, firstName: 'Umer', lastName: '', function: 'MW', contractHours: 24, active: true, availability: [0,1,2,3,4,5], preferredTimes: {} },
    { id: 31, firstName: 'Muhammed', lastName: 'Armani', function: 'MW', contractHours: 24, active: true, availability: [0,1,2,3,4], preferredTimes: {} },
    { id: 32, firstName: 'Mo', lastName: 'Samar', function: 'MW', contractHours: 24, active: true, availability: [0,1,2,3,4], preferredTimes: {} },
    { id: 33, firstName: 'Sevgyul', lastName: '', function: 'MW', contractHours: 24, active: true, availability: [0,1,2,3,4], preferredTimes: {} },
    { id: 34, firstName: 'Lucas', lastName: '', function: 'MW', contractHours: 24, active: true, availability: [0,1,2,3,4,5], preferredTimes: {} },
    { id: 35, firstName: 'Oemaima', lastName: '', function: 'MW', contractHours: 24, active: true, availability: [0,1,2,3,4], preferredTimes: {} },
    { id: 36, firstName: 'Yasmina', lastName: 'Ibrahimin', function: 'MW', contractHours: 24, active: true, availability: [0,1,2,3,4], preferredTimes: {} },
    { id: 38, firstName: 'Yulia', lastName: '', function: 'IMW', contractHours: 36, active: true, availability: [0,1,2,3,4,5], preferredTimes: {} },
    { id: 39, firstName: 'Alaa', lastName: '', function: 'JOB', contractHours: 12, active: true, availability: [4,5,6], preferredTimes: {} },
    { id: 40, firstName: 'Asola', lastName: '', function: 'JOB', contractHours: 12, active: true, availability: [4,5,6], preferredTimes: {} },
    { id: 41, firstName: 'Ayoub', lastName: '', function: 'JOB', contractHours: 12, active: true, availability: [4,5,6], preferredTimes: {} },
    { id: 42, firstName: 'Rougia', lastName: '', function: 'JOB', contractHours: 12, active: true, availability: [5,6], preferredTimes: {} },
    { id: 43, firstName: 'Arno', lastName: '', function: 'JOB', contractHours: 12, active: true, availability: [5,6], preferredTimes: {} },
    { id: 44, firstName: 'Divine', lastName: '', function: 'JOB', contractHours: 12, active: true, availability: [5,6], preferredTimes: {} },
    { id: 45, firstName: 'Raha', lastName: '', function: 'JOB', contractHours: 12, active: true, availability: [5,6], preferredTimes: {} },
    { id: 46, firstName: 'Soumia', lastName: '', function: 'IMW', contractHours: 36, active: true, availability: [0,1,2,3,4,5], preferredTimes: {} },
    { id: 47, firstName: 'Younes', lastName: '', function: 'JOB', contractHours: 12, active: true, availability: [5,6], preferredTimes: {} }
];

const ALL_DAYS = [0,1,2,3,4,5,6];

// Status codes voor planning (niet-werk statussen)
const STATUS_CODES = {
    OA: { name: 'Onbetaald afwezig', color: '#999999', shortCode: 'OA' },
    TA: { name: 'Technische afwezigheid', color: '#FF9800', shortCode: 'TA' },
    VRIJ: { name: 'Vrije dag', color: '#4CAF50', shortCode: 'VRIJ' },
    ST: { name: 'Studie', color: '#2196F3', shortCode: 'ST' },
    ZK: { name: 'Ziekte', color: '#F44336', shortCode: 'ZK' },
    VL: { name: 'Verlof', color: '#9C27B0', shortCode: 'VL' }
};

const AppState = {
    currentStore: '3138',
    currentWeek: 52,
    currentYear: 2025,
    currentPage: 'dashboard',
    
    // Store data
    stores: {
        '3138': {
            id: '3138',
            name: 'Antwerpen Groenplaats',
            address: 'Groenplaats, Antwerpen',
            standardRevenue: 369312,
            maxDailyHours: 9,
            maxWeeklyHours: 36.5,
            openSunday: true,
            dayDistribution: { ...DEFAULT_DAY_DISTRIBUTION },
            openingHours: {
                0: { open: '07:00', close: '21:00' },
                1: { open: '07:00', close: '21:00' },
                2: { open: '07:00', close: '21:00' },
                3: { open: '07:00', close: '21:00' },
                4: { open: '07:00', close: '21:00' },
                5: { open: '07:00', close: '21:00' },
                6: { open: '07:00', close: '21:00' }
            }
        }
    },
    
    // Functions/Roles
    functions: [
        { id: 'SM', name: 'Supermarktmanager', level: 1 },
        { id: 'MO', name: 'Manager Operatie', level: 2 },
        { id: 'MV', name: 'Manager Vers', level: 2 },
        { id: 'MS', name: 'Manager Service', level: 2 },
        { id: 'SL', name: 'Shiftleider', level: 3 },
        { id: 'MW', name: 'Medewerker', level: 4 },
        { id: 'KW', name: 'Medewerker Kwaliteit', level: 4 },
        { id: 'Cas B', name: 'Caissière B', level: 5 },
        { id: 'Cas A', name: 'Caissière A', level: 5 },
        { id: 'JOB', name: 'Jobstudent', level: 6 },
        { id: 'IMW', name: 'Interim-Medewerker', level: 6 }
    ],
    
    // Tasks with norms (hours at €369.312 revenue)
    // priority: 1 = hoogste prioriteit (eerst doen)
    // linkedTasks: array van task IDs die samen uitgevoerd moeten worden
    tasks: [
        { id: 'act', name: 'Actieopbouw', category: 'houdbaar', normHours: 32.13, allowedDays: [...ALL_DAYS], priority: 3, linkedTasks: [] },
        { id: 'hl', name: 'Hardlopers vullen', category: 'houdbaar', normHours: 233.92, allowedDays: [...ALL_DAYS], priority: 2, linkedTasks: ['nh'] },
        { id: 'hv', name: 'Houdbaar vullen', category: 'houdbaar', normHours: 10.86, allowedDays: [...ALL_DAYS], priority: 4, linkedTasks: [] },
        { id: 'nh', name: 'Navulling Houdbaar', category: 'houdbaar', normHours: 15.5, allowedDays: [...ALL_DAYS], priority: 2, linkedTasks: ['hl'] },
        { id: 'rh', name: 'Restant Houdbaar', category: 'houdbaar', normHours: 8.2, allowedDays: [...ALL_DAYS], priority: 5, linkedTasks: [] },
        { id: 'vv', name: 'Vers vullen', category: 'vers', normHours: 45.6, allowedDays: [...ALL_DAYS], priority: 1, linkedTasks: ['br'] },
        { id: 'nv', name: 'Navulling Vers', category: 'vers', normHours: 22.14, allowedDays: [...ALL_DAYS], priority: 3, linkedTasks: [] },
        { id: 'rv', name: 'Restant Vers', category: 'vers', normHours: 165.31, allowedDays: [...ALL_DAYS], priority: 5, linkedTasks: [] },
        { id: 'br', name: 'Brood', category: 'vers', normHours: 28.5, allowedDays: [...ALL_DAYS], priority: 1, linkedTasks: ['vv'] },
        { id: 'dv', name: 'Diepvries vullen', category: 'diepvries', normHours: 10.84, allowedDays: [...ALL_DAYS], priority: 4, linkedTasks: [] },
        { id: 'nd', name: 'Navulling Diepvries', category: 'diepvries', normHours: 12.3, allowedDays: [...ALL_DAYS], priority: 3, linkedTasks: [] },
        { id: 'rd', name: 'Restant Diepvries', category: 'diepvries', normHours: 6.5, allowedDays: [...ALL_DAYS], priority: 5, linkedTasks: [] },
        { id: 'cas', name: 'Caissière', category: 'service', normHours: 85.0, allowedDays: [...ALL_DAYS], priority: 2, linkedTasks: [] },
        { id: 'kln', name: 'Klantenservice', category: 'service', normHours: 42.0, allowedDays: [...ALL_DAYS], priority: 3, linkedTasks: [] },
        { id: 'wkl', name: 'Winkelcontrole', category: 'service', normHours: 14.0, allowedDays: [...ALL_DAYS], priority: 4, linkedTasks: [] }
    ],
    
    // Day distribution percentages (legacy fallback, per-store vanaf nu)
    dayDistribution: { ...DEFAULT_DAY_DISTRIBUTION },
    
    // Employees per winkel (current store in AppState.employees)
    employees: [...DEFAULT_EMPLOYEES],
    employeesByStore: {
        '3138': [...DEFAULT_EMPLOYEES]
    },
    
    // Weekly schedule (shifts per day)
    schedule: {
        0: [], // Maandag
        1: [], // Dinsdag
        2: [], // Woensdag
        3: [], // Donderdag
        4: [], // Vrijdag
        5: [], // Zaterdag
        6: []  // Zondag
    },
    
    // Holidays/Events
    holidays: [
        { date: '2025-01-01', name: 'Nieuwjaar', multiplier: 0.5 },
        { date: '2025-01-06', name: 'Driekoningen', multiplier: 0.9 },
        { date: '2025-02-14', name: 'Valentijnsdag', multiplier: 1.1 },
        { date: '2025-04-20', name: 'Pasen', multiplier: 0.7 },
        { date: '2025-04-21', name: '2e Paasdag', multiplier: 0.8 },
        { date: '2025-05-01', name: 'Dag van de Arbeid', multiplier: 0.8 },
        { date: '2025-05-29', name: 'Hemelvaart', multiplier: 0.8 },
        { date: '2025-06-08', name: 'Pinksteren', multiplier: 0.7 },
        { date: '2025-06-09', name: '2e Pinksterdag', multiplier: 0.8 },
        { date: '2025-07-21', name: 'Nationale Feestdag', multiplier: 0.7 },
        { date: '2025-08-15', name: 'OLV Hemelvaart', multiplier: 0.8 },
        { date: '2025-11-01', name: 'Allerheiligen', multiplier: 0.8 },
        { date: '2025-11-11', name: 'Wapenstilstand', multiplier: 0.8 },
        { date: '2025-12-25', name: 'Kerstmis', multiplier: 0.5 },
        { date: '2025-12-26', name: '2e Kerstdag', multiplier: 0.7 }
    ],
    
    // Week-specific revenue data per store (based on Excel Instellingen HIDE)
    weeklyRevenue: {
        '3138': { // Antwerpen Groenplaats
            1: { revenue: 365380, event: 'Nieuwjaar' },
            2: { revenue: 380928 },
            3: { revenue: 366242 },
            4: { revenue: 372150 },
            5: { revenue: 368500 },
            6: { revenue: 370200 },
            7: { revenue: 365800 },
            8: { revenue: 371400 },
            9: { revenue: 368900 },
            10: { revenue: 382500, event: 'Krokusvakantie' },
            11: { revenue: 385200, event: 'Krokusvakantie' },
            12: { revenue: 369800 },
            13: { revenue: 367500 },
            14: { revenue: 371200 },
            15: { revenue: 368400 },
            16: { revenue: 395000, event: 'Pasen' },
            17: { revenue: 378500 },
            18: { revenue: 369200 },
            19: { revenue: 366800 },
            20: { revenue: 370500 },
            21: { revenue: 368100 },
            22: { revenue: 372800 },
            23: { revenue: 369312 },
            24: { revenue: 367900 },
            25: { revenue: 371600 },
            26: { revenue: 368200 },
            27: { revenue: 385000, event: 'Zomervakantie' },
            28: { revenue: 382500, event: 'Zomervakantie' },
            29: { revenue: 378900, event: 'Zomervakantie' },
            30: { revenue: 375200, event: 'Zomervakantie' },
            31: { revenue: 372800, event: 'Zomervakantie' },
            32: { revenue: 370500, event: 'Zomervakantie' },
            33: { revenue: 368200 },
            34: { revenue: 371800 },
            35: { revenue: 369500 },
            36: { revenue: 367200 },
            37: { revenue: 370800 },
            38: { revenue: 368500 },
            39: { revenue: 372100 },
            40: { revenue: 369800 },
            41: { revenue: 367400 },
            42: { revenue: 371000 },
            43: { revenue: 385500, event: 'Herfstvakantie' },
            44: { revenue: 382200, event: 'Herfstvakantie' },
            45: { revenue: 369600 },
            46: { revenue: 367300 },
            47: { revenue: 370900 },
            48: { revenue: 368600 },
            49: { revenue: 385000, event: 'Sinterklaas' },
            50: { revenue: 395000, event: 'Kerst' },
            51: { revenue: 410000, event: 'Kerstvakantie' },
            52: { revenue: 398000, event: 'Kerstvakantie' }
        }
    },
    
    // Schedules per store/year/week (for persistence)
    schedules: {}
};

function getCurrentDayDistribution() {
    const store = AppState.stores[AppState.currentStore];
    return store?.dayDistribution || AppState.dayDistribution || DEFAULT_DAY_DISTRIBUTION;
}

function getOpeningHoursForDay(dayIndex, storeId = AppState.currentStore) {
    const store = AppState.stores[storeId];
    const defaultHours = { open: '07:00', close: '21:00' };
    if (!store) return defaultHours;
    const hours = store.openingHours?.[dayIndex] || defaultHours;
    return {
        open: hours.open || defaultHours.open,
        close: hours.close || defaultHours.close
    };
}

function timeToMinutes(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return (h * 60) + (m || 0);
}

function minutesToTime(totalMinutes) {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function isTaskAllowedOnDay(taskId, dayIndex) {
    const task = AppState.tasks.find(t => t.id === taskId);
    if (!task) return true;
    const allowedDays = task.allowedDays || task.exclusiveDays;
    if (!allowedDays || allowedDays.length === 0) return true;
    return allowedDays.includes(dayIndex);
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

const Utils = {
    // Get week dates
    getWeekDates(weekNum, year) {
        const simple = new Date(year, 0, 1 + (weekNum - 1) * 7);
        const dow = simple.getDay();
        const isoWeekStart = simple;
        if (dow <= 4) {
            isoWeekStart.setDate(simple.getDate() - simple.getDay() + 1);
        } else {
            isoWeekStart.setDate(simple.getDate() + 8 - simple.getDay());
        }
        
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(isoWeekStart);
            date.setDate(isoWeekStart.getDate() + i);
            dates.push(date);
        }
        return dates;
    },
    
    // Format date
    formatDate(date, format = 'short') {
        const options = {
            short: { day: '2-digit', month: 'short' },
            long: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
            full: { day: '2-digit', month: '2-digit', year: 'numeric' }
        };
        return date.toLocaleDateString('nl-NL', options[format]);
    },
    
    // Get day name
    getDayName(dayIndex) {
        const days = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'];
        return days[dayIndex];
    },
    
    // Calculate hours between times
    calculateHours(startTime, endTime) {
        const [startH, startM] = startTime.split(':').map(Number);
        const [endH, endM] = endTime.split(':').map(Number);
        const startMinutes = startH * 60 + startM;
        const endMinutes = endH * 60 + endM;
        return ((endMinutes - startMinutes) / 60).toFixed(1);
    },
    
    // Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    },
    
    // Get function name by id
    getFunctionName(funcId) {
        const func = AppState.functions.find(f => f.id === funcId);
        return func ? func.name : funcId;
    },
    
    // Get task by id
    getTask(taskId) {
        return AppState.tasks.find(t => t.id === taskId);
    },
    
    // Get week revenue data for a specific store and week
    getWeekRevenue(storeId, weekNum, year) {
        const storeRevenue = AppState.weeklyRevenue[storeId];
        if (storeRevenue && storeRevenue[weekNum]) {
            return storeRevenue[weekNum];
        }
        // Fallback to standard revenue
        return { revenue: AppState.stores[storeId]?.standardRevenue || 369312 };
    },
    
    // Check if a specific date is a holiday
    getHolidayForDate(date) {
        const dateStr = date.toISOString().split('T')[0];
        return AppState.holidays.find(h => h.date === dateStr);
    },
    
    // Get holiday multiplier for a week (checks all days in the week)
    getWeekHolidayMultiplier(weekNum, year) {
        const weekDates = this.getWeekDates(weekNum, year);
        let minMultiplier = 1;
        let holidayName = null;
        
        weekDates.forEach(date => {
            const holiday = this.getHolidayForDate(date);
            if (holiday && holiday.multiplier < minMultiplier) {
                minMultiplier = holiday.multiplier;
                holidayName = holiday.name;
            }
        });
        
        return { multiplier: minMultiplier, holidayName };
    },
    
    // Check if employee function can do a task
    canDoTask(employeeId, taskId) {
        const emp = AppState.employees.find(e => e.id === employeeId);
        const task = AppState.tasks.find(t => t.id === taskId);
        if (!emp || !task) return false;
        
        // Function to category mapping for task eligibility
        const funcCapabilities = {
            'FM': ['houdbaar', 'vers', 'diepvries', 'service'],
            'AM': ['houdbaar', 'vers', 'diepvries', 'service'],
            'TL': ['houdbaar', 'vers', 'diepvries', 'service'],
            'VAK': ['houdbaar', 'vers', 'diepvries', 'service'],
            'MW': ['houdbaar', 'vers', 'diepvries', 'service'],
            'KAS': ['service'],
            'VERS': ['vers', 'diepvries'],
            'SUP': ['houdbaar', 'vers', 'diepvries', 'service']
        };
        
        const caps = funcCapabilities[emp.function] || ['houdbaar', 'vers', 'diepvries', 'service'];
        return caps.includes(task.category);
    },
    
    // Check if employee is available on a specific day
    isAvailable(employeeId, dayIndex) {
        const emp = AppState.employees.find(e => e.id === employeeId);
        if (!emp) return false;
        // Default to all days available if no availability set
        const availability = emp.availability || [0,1,2,3,4,5,6];
        return availability.includes(dayIndex);
    },
    
    // Get available employees for a specific day
    getAvailableEmployees(dayIndex) {
        return AppState.employees.filter(e => 
            e.active && this.isAvailable(e.id, dayIndex)
        );
    }
};

// ===================================
// CALCULATION ENGINE
// ===================================

const Calculator = {
    // Calculate task hours based on revenue
    calculateTaskHours(task, expectedRevenue, standardRevenue, holidayMultiplier = 1) {
        const ratio = expectedRevenue / standardRevenue;
        return task.normHours * ratio * holidayMultiplier;
    },
    
    // Calculate total budgeted hours
    calculateTotalBudget(expectedRevenue, standardRevenue, holidayMultiplier = 1) {
        let total = 0;
        AppState.tasks.forEach(task => {
            total += this.calculateTaskHours(task, expectedRevenue, standardRevenue, holidayMultiplier);
        });
        return total;
    },
    
    // Calculate daily hours
    calculateDailyHours(totalWeekHours, dayIndex) {
        const dayDist = getCurrentDayDistribution();
        return (totalWeekHours * dayDist[dayIndex]) / 100;
    },
    
    // Get scheduled hours for a day (net hours, minus break)
    getScheduledHours(dayIndex) {
        const shifts = AppState.schedule[dayIndex] || [];
        return shifts.reduce((total, shift) => {
            const grossHours = parseFloat(Utils.calculateHours(shift.startTime, shift.endTime));
            const breakHours = (shift.breakMinutes || 0) / 60;
            return total + (grossHours - breakHours);
        }, 0);
    },
    
    // Get total scheduled hours for week
    getTotalScheduledHours() {
        let total = 0;
        for (let i = 0; i < 7; i++) {
            total += this.getScheduledHours(i);
        }
        return total;
    },
    
    // Get employee scheduled hours this week (net hours)
    getEmployeeWeekHours(employeeId) {
        let total = 0;
        for (let i = 0; i < 7; i++) {
            const shifts = AppState.schedule[i] || [];
            shifts.forEach(shift => {
                if (shift.employeeId === employeeId) {
                    const grossHours = parseFloat(Utils.calculateHours(shift.startTime, shift.endTime));
                    const breakHours = (shift.breakMinutes || 0) / 60;
                    total += (grossHours - breakHours);
                }
            });
        }
        return total;
    }
};

// ===================================
// UI RENDERING FUNCTIONS
// ===================================

const UI = {
    // Show page
    showPage(pageName) {
        // Update nav
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('onclick')?.includes(pageName)) {
                item.classList.add('active');
            }
        });
        
        // Show page
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        const pageEl = document.getElementById(`page-${pageName}`);
        if (pageEl) {
            pageEl.classList.add('active');
        }
        
        AppState.currentPage = pageName;
        this.renderCurrentPage();
    },
    
    // Render current page content
    renderCurrentPage() {
        switch (AppState.currentPage) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'schedule':
                this.renderSchedule();
                break;
            case 'planning':
                this.renderPlanning();
                break;
            case 'employees':
                this.renderEmployees();
                break;
            case 'tasks':
                this.renderTasks();
                break;
            case 'budget':
                this.renderBudget();
                break;
            case 'reports':
                this.renderReports();
                break;
            case 'settings':
                this.renderSettings();
                break;
        }
    },
    
    // Render Dashboard
    renderDashboard() {
        const store = AppState.stores[AppState.currentStore];
        const weekData = Utils.getWeekRevenue(AppState.currentStore, AppState.currentWeek, AppState.currentYear);
        const holidayInfo = Utils.getWeekHolidayMultiplier(AppState.currentWeek, AppState.currentYear);
        
        const expectedRevenue = weekData.revenue;
        const holidayMultiplier = holidayInfo.multiplier;
        
        const totalBudget = Calculator.calculateTotalBudget(expectedRevenue, store.standardRevenue, holidayMultiplier);
        const totalScheduled = Calculator.getTotalScheduledHours();
        const budgetUsage = totalBudget > 0 ? Math.round((totalScheduled / totalBudget) * 100) : 0;
        
        // Update stats
        document.getElementById('statHours').textContent = `${totalScheduled.toFixed(0)} / ${totalBudget.toFixed(0)}`;
        document.getElementById('statBudget').textContent = budgetUsage + '%';
        document.getElementById('statRevenue').textContent = Utils.formatCurrency(expectedRevenue);
        
        const totalEmployees = AppState.employees.filter(e => e.active).length;
        const scheduledEmployees = this.getActiveEmployeesCount();
        document.getElementById('statEmployees').textContent = `${scheduledEmployees} / ${totalEmployees}`;
        
        // Show event/holiday if applicable
        const eventLabel = weekData.event || holidayInfo.holidayName;
        if (eventLabel) {
            document.getElementById('statRevenue').innerHTML = Utils.formatCurrency(expectedRevenue) + 
                `<br><small style="color: var(--secondary); font-size: 11px;">${eventLabel}</small>`;
        }
        
        // Render today's schedule
        this.renderTodaySchedule();
        
        // Render budget bars
        this.renderBudgetBars();
        
        // Render week mini grid
        this.renderWeekMiniGrid();
    },
    
    // Get active employees count
    getActiveEmployeesCount() {
        const scheduled = new Set();
        for (let i = 0; i < 7; i++) {
            (AppState.schedule[i] || []).forEach(shift => {
                scheduled.add(shift.employeeId);
            });
        }
        return scheduled.size;
    },
    
    // Render today's schedule
    renderTodaySchedule() {
        const today = new Date();
        const dayIndex = (today.getDay() + 6) % 7; // Convert to Monday = 0
        const shifts = AppState.schedule[dayIndex] || [];
        
        const container = document.getElementById('todaySchedule');
        document.getElementById('todayShifts').textContent = `${shifts.length} shifts`;
        
        if (shifts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="material-icons">event_busy</span>
                    <p>Geen shifts gepland voor vandaag</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = shifts.map(shift => {
            const emp = AppState.employees.find(e => e.id === shift.employeeId);
            return `
                <div class="today-shift-item">
                    <span class="today-shift-time">${shift.startTime} - ${shift.endTime}</span>
                    <span class="today-shift-employee">${emp ? emp.firstName + ' ' + emp.lastName : 'Onbekend'}</span>
                    <div class="today-shift-tasks">
                        ${(shift.tasks || []).map(t => `<span class="task-chip ${Utils.getTask(t)?.category || ''}">${t}</span>`).join('')}
                    </div>
                </div>
            `;
        }).join('');
    },
    
    // Render budget bars
    renderBudgetBars() {
        const store = AppState.stores[AppState.currentStore];
        const categories = ['houdbaar', 'vers', 'diepvries', 'service'];
        const colors = {
            houdbaar: '#1565C0',
            vers: '#2E7D32',
            diepvries: '#7B1FA2',
            service: '#E65100'
        };
        
        const container = document.getElementById('budgetBars');
        container.innerHTML = categories.map(cat => {
            const tasks = AppState.tasks.filter(t => t.category === cat);
            const budget = tasks.reduce((sum, t) => sum + t.normHours, 0);
            const scheduled = this.getScheduledHoursByCategory(cat);
            const percentage = budget > 0 ? Math.min((scheduled / budget) * 100, 100) : 0;
            
            return `
                <div class="budget-bar-item">
                    <div class="budget-bar-label">
                        <span>${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                        <span>${scheduled.toFixed(1)} / ${budget.toFixed(1)} uur</span>
                    </div>
                    <div class="budget-bar">
                        <div class="budget-bar-fill" style="width: ${percentage}%; background: ${colors[cat]}"></div>
                    </div>
                </div>
            `;
        }).join('');
    },
    
    // Get scheduled hours by category (net hours)
    getScheduledHoursByCategory(category) {
        let total = 0;
        const tasksInCategory = AppState.tasks.filter(t => t.category === category).map(t => t.id);
        
        for (let i = 0; i < 7; i++) {
            const shifts = AppState.schedule[i] || [];
            shifts.forEach(shift => {
                const grossHours = parseFloat(Utils.calculateHours(shift.startTime, shift.endTime));
                const breakHours = (shift.breakMinutes || 0) / 60;
                const netHours = grossHours - breakHours;
                const shiftTasks = shift.tasks || [];
                
                // Count how many tasks in this shift belong to this category
                const categoryTasksInShift = shiftTasks.filter(t => tasksInCategory.includes(t)).length;
                const totalTasksInShift = shiftTasks.length || 1;
                
                // Distribute shift hours proportionally across tasks
                total += (netHours * categoryTasksInShift) / totalTasksInShift;
            });
        }
        return total;
    },
    
    // Get scheduled hours for a specific task (net hours)
    getScheduledHoursForTask(taskId) {
        let total = 0;
        
        for (let i = 0; i < 7; i++) {
            const shifts = AppState.schedule[i] || [];
            shifts.forEach(shift => {
                const grossHours = parseFloat(Utils.calculateHours(shift.startTime, shift.endTime));
                const breakHours = (shift.breakMinutes || 0) / 60;
                const netHours = grossHours - breakHours;
                const shiftTasks = shift.tasks || [];
                
                if (shiftTasks.includes(taskId)) {
                    // Distribute hours proportionally across tasks in this shift
                    total += netHours / (shiftTasks.length || 1);
                }
            });
        }
        return total;
    },
    
    // Render week mini grid
    renderWeekMiniGrid() {
        const dates = Utils.getWeekDates(AppState.currentWeek, AppState.currentYear);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const container = document.getElementById('weekMiniGrid');
        container.innerHTML = dates.map((date, i) => {
            const isToday = date.getTime() === today.getTime();
            const hours = Calculator.getScheduledHours(i);
            const shifts = (AppState.schedule[i] || []).length;
            
            return `
                <div class="day-mini-card ${isToday ? 'today' : ''}">
                    <div class="day-name">${Utils.getDayName(i).substring(0, 2)}</div>
                    <div class="day-date">${Utils.formatDate(date, 'short')}</div>
                    <div class="day-hours">${hours.toFixed(1)}</div>
                    <div class="day-shifts">${shifts} shifts</div>
                </div>
            `;
        }).join('');
    },
    
    // Render Schedule
    renderSchedule() {
        const dates = Utils.getWeekDates(AppState.currentWeek, AppState.currentYear);
        const store = AppState.stores[AppState.currentStore];
        const weekData = Utils.getWeekRevenue(AppState.currentStore, AppState.currentWeek, AppState.currentYear);
        const holidayInfo = Utils.getWeekHolidayMultiplier(AppState.currentWeek, AppState.currentYear);
        
        const totalBudget = Calculator.calculateTotalBudget(weekData.revenue, store.standardRevenue, holidayInfo.multiplier);
        
        const container = document.getElementById('scheduleGrid');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        container.innerHTML = dates.map((date, dayIndex) => {
            const shifts = AppState.schedule[dayIndex] || [];
            const scheduledHours = Calculator.getScheduledHours(dayIndex);
            const budgetHours = Calculator.calculateDailyHours(totalBudget, dayIndex);
            const isToday = date.getTime() === today.getTime();
            
            return `
                <div class="schedule-day ${isToday ? 'is-today' : ''}">
                    <div class="schedule-day-header">
                        <div>
                            <h3>${Utils.getDayName(dayIndex)}${isToday ? '<span class="today-badge">VANDAAG</span>' : ''}</h3>
                            <span class="day-date">${Utils.formatDate(date, 'short')}</span>
                        </div>
                        <span class="hours-badge">${scheduledHours.toFixed(1)} / ${budgetHours.toFixed(1)}u</span>
                    </div>
                    <div class="schedule-day-content">
                        ${shifts.length === 0 ? `
                            <div class="empty-day" onclick="openAddShiftModal(${dayIndex})">
                                <span class="material-icons">add_circle_outline</span>
                                <p>Shift toevoegen</p>
                            </div>
                        ` : shifts.map(shift => this.renderShiftCard(shift)).join('')}
                        ${shifts.length > 0 ? `
                            <button class="btn btn-secondary btn-small" style="width: 100%; margin-top: 8px;" onclick="openAddShiftModal(${dayIndex})">
                                <span class="material-icons">add</span>
                                Toevoegen
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    },
    
    // Render shift card
    renderShiftCard(shift, currentDayIndex = null) {
        const emp = AppState.employees.find(e => e.id === shift.employeeId);
        
        // Handle status code shifts differently
        if (shift.isStatus && shift.statusCode) {
            const statusInfo = STATUS_CODES[shift.statusCode];
            return `
                <div class="shift-card status-card" data-shift-id="${shift.id}" data-day-index="${currentDayIndex ?? ''}"
                     onclick="editShift(${shift.id})" style="border-left: 4px solid ${statusInfo.color};">
                    <div class="shift-card-header">
                        <span class="shift-employee">${emp ? emp.firstName + ' ' + emp.lastName : 'Onbekend'}</span>
                        <span class="shift-function">${emp ? emp.function : ''}</span>
                    </div>
                    <div class="shift-time">
                        <span class="status-code-badge" style="background: ${statusInfo.color};">${statusInfo.shortCode}</span>
                        ${statusInfo.name}
                    </div>
                    ${shift.notes ? `<div class="shift-notes" style="margin-top: 4px; font-size: 11px; color: #666;">${shift.notes}</div>` : ''}
                </div>
            `;
        }
        
        // Regular work shift
        const grossHours = parseFloat(Utils.calculateHours(shift.startTime, shift.endTime));
        const breakHours = (shift.breakMinutes || 0) / 60;
        const netHours = (grossHours - breakHours).toFixed(1);
        
        return `
            <div class="shift-card" draggable="true" data-shift-id="${shift.id}" data-day-index="${currentDayIndex ?? ''}"
                 ondragstart="onShiftDragStart(event)" ondragend="onShiftDragEnd(event)" onclick="editShift(${shift.id})">
                <div class="shift-card-header">
                    <span class="shift-employee">${emp ? emp.firstName + ' ' + emp.lastName : 'Onbekend'}</span>
                    <span class="shift-function">${emp ? emp.function : ''}</span>
                </div>
                <div class="shift-time">
                    <span class="material-icons" style="font-size: 14px; vertical-align: middle;">schedule</span>
                    ${shift.startTime} - ${shift.endTime} (${netHours}u${shift.breakMinutes ? ` netto` : ''})
                </div>
                ${shift.breakMinutes ? `<div class="shift-break"><span class="material-icons" style="font-size: 12px;">coffee</span> ${shift.breakMinutes} min pauze</div>` : ''}
                <div class="shift-tasks">
                    ${(shift.tasks || []).map(t => {
                        const task = Utils.getTask(t);
                        return `<span class="task-chip ${task?.category || ''}">${t}</span>`;
                    }).join('')}
                </div>
                ${shift.notes ? `<div class="shift-notes" title="${shift.notes}"><span class="material-icons" style="font-size: 12px;">sticky_note_2</span> ${shift.notes.substring(0, 30)}${shift.notes.length > 30 ? '...' : ''}</div>` : ''}
            </div>
        `;
    },
    
    // Render Employees
    renderEmployees(filteredList = null) {
        const tbody = document.querySelector('#employeesTable tbody');
        const dayAbbr = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
        
        // Use filtered list or full list
        const employees = filteredList !== null ? filteredList : AppState.employees;
        
        // Update filter count
        const countEl = document.getElementById('employeeFilterCount');
        if (countEl) {
            if (filteredList !== null && filteredList.length !== AppState.employees.length) {
                countEl.innerHTML = `<strong>${filteredList.length}</strong> van ${AppState.employees.length} medewerkers`;
            } else {
                countEl.innerHTML = `<strong>${AppState.employees.length}</strong> medewerkers`;
            }
        }
        
        tbody.innerHTML = employees.map(emp => {
            const weekHours = Calculator.getEmployeeWeekHours(emp.id);
            const availability = emp.availability || [0,1,2,3,4,5,6];
            const availStr = availability.map(d => dayAbbr[d]).join(', ');
            
            return `
                <tr data-employee-id="${emp.id}">
                    <td>
                        <strong>${emp.firstName} ${emp.lastName}</strong>
                    </td>
                    <td>${Utils.getFunctionName(emp.function)}</td>
                    <td>${emp.contractHours} uur</td>
                    <td>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <div class="budget-bar" style="width: 80px;">
                                <div class="budget-bar-fill" style="width: ${Math.min((weekHours / emp.contractHours) * 100, 100)}%; background: ${weekHours > emp.contractHours ? '#F44336' : '#4CAF50'}"></div>
                            </div>
                            ${weekHours.toFixed(1)} uur
                        </div>
                    </td>
                    <td>
                        <span class="availability-display" title="Beschikbaar: ${availStr}">${availStr || 'Geen'}</span>
                    </td>
                    <td>
                        <span class="status-badge ${emp.active ? 'active' : 'inactive'}">
                            ${emp.active ? 'Actief' : 'Inactief'}
                        </span>
                    </td>
                    <td>
                        <button class="btn-icon" onclick="editEmployee(${emp.id})">
                            <span class="material-icons">edit</span>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
        
        // Show empty state if no employees match filter
        if (employees.length === 0) {
            const isFiltered = filteredList !== null && AppState.employees.length > 0;
            tbody.innerHTML = `
                <tr>
                    <td colspan="7">
                        ${isFiltered 
                            ? getEmptyState('search_off', 'Geen resultaten', 'Geen medewerkers gevonden die voldoen aan de filters.', 'Filters Wissen', 'clearEmployeeFilters()')
                            : getEmptyState('people', 'Geen medewerkers', 'Voeg je eerste medewerker toe om te beginnen met plannen.', 'Medewerker Toevoegen', 'openAddEmployeeModal()')}
                    </td>
                </tr>
            `;
        }
    },
    
    // Render Tasks
    renderTasks() {
        const categories = ['houdbaar', 'vers', 'diepvries', 'service'];
        
        categories.forEach(cat => {
            const tasks = AppState.tasks.filter(t => t.category === cat);
            const container = document.getElementById(`tasks${cat.charAt(0).toUpperCase() + cat.slice(1)}`);
            
            container.innerHTML = tasks.map(task => `
                <div class="task-item">
                    <div class="task-info">
                        <span class="task-abbr ${task.category}">${task.id}</span>
                        <div>
                            <div class="task-name">${task.name}</div>
                            <div class="task-hours">${task.normHours} uur/week (norm)</div>
                        </div>
                    </div>
                </div>
            `).join('');
        });
    },
    
    // Render Budget
    renderBudget() {
        const store = AppState.stores[AppState.currentStore];
        const weekData = Utils.getWeekRevenue(AppState.currentStore, AppState.currentWeek, AppState.currentYear);
        const holidayInfo = Utils.getWeekHolidayMultiplier(AppState.currentWeek, AppState.currentYear);
        
        // Update input fields with current values
        const expectedRevenueInput = document.getElementById('expectedRevenue');
        if (expectedRevenueInput && !expectedRevenueInput.dataset.userModified) {
            expectedRevenueInput.value = weekData.revenue;
        }
        
        const holidayFactorInput = document.getElementById('holidayFactor');
        if (holidayFactorInput && !holidayFactorInput.dataset.userModified) {
            holidayFactorInput.value = holidayInfo.multiplier;
        }
        
        const expectedRevenue = parseFloat(document.getElementById('expectedRevenue')?.value || weekData.revenue);
        const holidayFactor = parseFloat(document.getElementById('holidayFactor')?.value || holidayInfo.multiplier);
        
        // Show holiday banner if applicable
        const budgetContent = document.getElementById('budgetContent');
        const existingBanner = document.getElementById('holidayBanner');
        if (existingBanner) existingBanner.remove();
        
        if (holidayInfo.holidayName) {
            const banner = document.createElement('div');
            banner.id = 'holidayBanner';
            banner.className = 'holiday-banner';
            banner.innerHTML = `
                <span class="material-icons">celebration</span>
                <strong>Feestweek:</strong> ${holidayInfo.holidayName} - Budget factor: ${holidayInfo.multiplier}
            `;
            budgetContent?.parentElement?.insertBefore(banner, budgetContent);
        }
        
        // Render budget table
        const tbody = document.querySelector('#budgetTable tbody');
        let totalNorm = 0;
        let totalCalculated = 0;
        let totalScheduled = 0;
        
        tbody.innerHTML = AppState.tasks.map(task => {
            const calculated = Calculator.calculateTaskHours(task, expectedRevenue, store.standardRevenue, holidayFactor);
            const scheduled = this.getScheduledHoursForTask(task.id);
            const difference = scheduled - calculated;
            const percentage = calculated > 0 ? (scheduled / calculated) * 100 : 0;
            
            totalNorm += task.normHours;
            totalCalculated += calculated;
            totalScheduled += scheduled;
            
            // Determine warning status
            let warningClass = '';
            let warningIcon = '';
            if (percentage < 80) {
                warningClass = 'warning-under';
                warningIcon = '⚠️';
            } else if (percentage > 120) {
                warningClass = 'warning-over';
                warningIcon = '⚠️';
            }
            
            return `
                <tr class="${warningClass}">
                    <td>
                        <span class="task-chip ${task.category}" style="margin-right: 8px;">${task.id}</span>
                        ${task.name}
                    </td>
                    <td>${task.normHours.toFixed(2)}</td>
                    <td>${calculated.toFixed(2)}</td>
                    <td>${scheduled.toFixed(2)}</td>
                    <td>
                        <span style="color: ${difference >= 0 ? '#4CAF50' : '#F44336'}">
                            ${warningIcon} ${difference >= 0 ? '+' : ''}${difference.toFixed(2)}
                        </span>
                    </td>
                </tr>
            `;
        }).join('');
        
        // Add total row
        const totalDiff = totalScheduled - totalCalculated;
        const totalPct = totalCalculated > 0 ? (totalScheduled / totalCalculated) * 100 : 0;
        let totalWarning = '';
        if (totalPct < 90 || totalPct > 110) {
            totalWarning = `<br><small style="color: ${totalPct < 90 ? '#F44336' : '#FF9800'}">
                ${totalPct < 90 ? 'Onderbezet!' : 'Overbezet!'} (${totalPct.toFixed(0)}%)
            </small>`;
        }
        
        tbody.innerHTML += `
            <tr style="font-weight: bold; background: #F5F5F5;">
                <td>TOTAAL</td>
                <td>${totalNorm.toFixed(2)}</td>
                <td>${totalCalculated.toFixed(2)}</td>
                <td>${totalScheduled.toFixed(2)}</td>
                <td>
                    <span style="color: ${totalDiff >= 0 ? '#4CAF50' : '#F44336'}">
                        ${totalDiff >= 0 ? '+' : ''}${totalDiff.toFixed(2)}
                    </span>
                    ${totalWarning}
                </td>
            </tr>
        `;
        
        // Render day distribution
        this.renderDayDistribution(totalCalculated);
    },
    
    // Render day distribution
    renderDayDistribution(totalWeekHours) {
        const container = document.getElementById('dayDistribution');
        const dayDist = getCurrentDayDistribution();
        container.innerHTML = Object.entries(dayDist).map(([day, pct]) => {
            const hours = (totalWeekHours * pct) / 100;
            return `
                <div class="day-dist-card">
                    <div class="day-name">${Utils.getDayName(parseInt(day))}</div>
                    <div class="percentage">${pct}%</div>
                    <div class="hours">${hours.toFixed(1)} uur</div>
                </div>
            `;
        }).join('');
    },
    
    // Render Planning Overview (Employee × Day grid)
    renderPlanning() {
        const store = AppState.stores[AppState.currentStore];
        const weekData = Utils.getWeekRevenue(AppState.currentStore, AppState.currentWeek, AppState.currentYear);
        const holidayInfo = Utils.getWeekHolidayMultiplier(AppState.currentWeek, AppState.currentYear);
        
        // Update week number display
        const weekNumEl = document.getElementById('planningWeekNum');
        if (weekNumEl) weekNumEl.textContent = AppState.currentWeek;
        
        const totalBudget = Calculator.calculateTotalBudget(weekData.revenue, store.standardRevenue, holidayInfo.multiplier);
        
        // Get dates and find today
        const dates = Utils.getWeekDates(AppState.currentWeek, AppState.currentYear);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dayNames = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
        
        // Render table headers with today indicator
        const thead = document.getElementById('planningTableHead');
        thead.innerHTML = `
            <tr>
                <th>Medewerker</th>
                <th>Functie</th>
                ${dates.map((date, i) => {
                    const isToday = date.getTime() === today.getTime();
                    return `<th class="${isToday ? 'is-today-col' : ''}">${dayNames[i]}${isToday ? ' <span class="today-dot"></span>' : ''}</th>`;
                }).join('')}
                <th>Totaal</th>
                <th>Contract</th>
            </tr>
        `;
        
        // Build employee shift data
        const employeeData = AppState.employees
            .filter(e => e.active)
            .map(emp => {
                const dayHours = [];
                let totalHours = 0;
                
                for (let d = 0; d < 7; d++) {
                    const shifts = (AppState.schedule[d] || []).filter(s => s.employeeId === emp.id);
                    const dayTotal = shifts.reduce((sum, s) => sum + parseFloat(Utils.calculateHours(s.startTime, s.endTime)), 0);
                    dayHours.push({
                        hours: dayTotal,
                        shifts: shifts.map(s => `${s.startTime}-${s.endTime}`).join(', ')
                    });
                    totalHours += dayTotal;
                }
                
                return {
                    ...emp,
                    dayHours,
                    totalHours,
                    diff: totalHours - emp.contractHours
                };
            })
            .sort((a, b) => {
                const levelA = AppState.functions.find(f => f.id === a.function)?.level || 99;
                const levelB = AppState.functions.find(f => f.id === b.function)?.level || 99;
                return levelA - levelB;
            });
        
        // Render planning table
        const tbody = document.querySelector('#planningTable tbody');
        tbody.innerHTML = employeeData.map(emp => `
            <tr>
                <td><strong>${emp.firstName} ${emp.lastName}</strong></td>
                <td><span class="function-badge">${emp.function}</span></td>
                ${emp.dayHours.map((dh, i) => {
                    const isToday = dates[i].getTime() === today.getTime();
                    return `<td class="${dh.hours > 0 ? 'has-shift' : ''} ${isToday ? 'is-today-col' : ''}" title="${dh.shifts || 'Geen shift'}">
                        ${dh.hours > 0 ? dh.hours.toFixed(1) : '-'}
                    </td>`;
                }).join('')}
                <td><strong>${emp.totalHours.toFixed(1)}</strong></td>
                <td>
                    ${emp.contractHours}
                    <span class="${emp.diff >= 0 ? 'text-success' : 'text-danger'}" style="font-size: 11px;">
                        (${emp.diff >= 0 ? '+' : ''}${emp.diff.toFixed(1)})
                    </span>
                </td>
            </tr>
        `).join('');
        
        // Add totals row
        const dayTotals = [];
        for (let d = 0; d < 7; d++) {
            dayTotals.push(Calculator.getScheduledHours(d));
        }
        const grandTotal = dayTotals.reduce((a, b) => a + b, 0);
        
        tbody.innerHTML += `
            <tr class="totals-row">
                <td colspan="2"><strong>TOTAAL</strong></td>
                ${dayTotals.map((t, i) => {
                    const budget = Calculator.calculateDailyHours(totalBudget, i);
                    const pct = budget > 0 ? (t / budget) * 100 : 0;
                    const isToday = dates[i].getTime() === today.getTime();
                    return `<td class="${pct < 90 ? 'under-budget' : pct > 110 ? 'over-budget' : ''} ${isToday ? 'is-today-col' : ''}">
                        <strong>${t.toFixed(1)}</strong>
                        <br><small>${budget.toFixed(1)} budget</small>
                    </td>`;
                }).join('')}
                <td><strong>${grandTotal.toFixed(1)}</strong></td>
                <td><strong>${totalBudget.toFixed(1)}</strong></td>
            </tr>
        `;
        
        // Render day summary grid
        this.renderDaySummary(dayTotals, totalBudget);
    },
    
    // Render day summary cards
    renderDaySummary(dayTotals, totalBudget) {
        const container = document.getElementById('daySummaryGrid');
        const dayNames = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'];
        
        // Get dates and today
        const dates = Utils.getWeekDates(AppState.currentWeek, AppState.currentYear);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        container.innerHTML = dayTotals.map((scheduled, i) => {
            const budget = Calculator.calculateDailyHours(totalBudget, i);
            const pct = budget > 0 ? (scheduled / budget) * 100 : 0;
            const diff = scheduled - budget;
            const isToday = dates[i].getTime() === today.getTime();
            
            let statusClass = 'ok';
            let statusText = 'Op budget';
            if (pct < 90) {
                statusClass = 'under';
                statusText = 'Onderbezet';
            } else if (pct > 110) {
                statusClass = 'over';
                statusText = 'Overbezet';
            }
            
            const shiftsCount = (AppState.schedule[i] || []).length;
            
            return `
                <div class="day-summary-card ${statusClass} ${isToday ? 'is-today' : ''}">
                    <div class="day-name">${dayNames[i]}${isToday ? ' <span class="today-badge">NU</span>' : ''}</div>
                    <div class="day-hours">${scheduled.toFixed(1)}u</div>
                    <div class="day-budget">/ ${budget.toFixed(1)}u budget</div>
                    <div class="day-pct">${pct.toFixed(0)}%</div>
                    <div class="day-status">${statusText}</div>
                    <div class="day-shifts">${shiftsCount} shifts</div>
                </div>
            `;
        }).join('');
    },
    
    // Render Reports
    renderReports() {
        this.renderReportsSummary();
        this.renderHoursChart();
        this.renderBudgetChart();
        this.renderCategoryChart();
        this.renderContractChart();
    },
    
    // Render Reports Summary
    renderReportsSummary() {
        const container = document.getElementById('reportsSummary');
        const store = AppState.stores[AppState.currentStore];
        const weekData = Utils.getWeekRevenue(AppState.currentStore, AppState.currentWeek, AppState.currentYear);
        const holidayInfo = Utils.getWeekHolidayMultiplier(AppState.currentWeek, AppState.currentYear);
        
        const totalBudget = Calculator.calculateTotalBudget(weekData.revenue, store.standardRevenue, holidayInfo.multiplier);
        const totalScheduled = Calculator.getWeekTotalHours();
        const employeesScheduled = new Set();
        let shiftsCount = 0;
        
        for (let i = 0; i < 7; i++) {
            const dayShifts = AppState.schedule[i] || [];
            shiftsCount += dayShifts.length;
            dayShifts.forEach(shift => employeesScheduled.add(shift.employeeId));
        }
        
        const budgetDiff = totalScheduled - totalBudget;
        const budgetPercent = totalBudget > 0 ? ((totalScheduled / totalBudget) * 100).toFixed(0) : 0;
        
        container.innerHTML = `
            <div class="stat-card">
                <div class="stat-value">${totalScheduled.toFixed(1)}u</div>
                <div class="stat-label">Totaal Gepland</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${totalBudget.toFixed(1)}u</div>
                <div class="stat-label">Budget Uren</div>
            </div>
            <div class="stat-card">
                <div class="stat-value" style="color: ${budgetDiff > 0 ? '#F44336' : '#4CAF50'}">
                    ${budgetDiff > 0 ? '+' : ''}${budgetDiff.toFixed(1)}u (${budgetPercent}%)
                </div>
                <div class="stat-label">Budget Verschil</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${shiftsCount}</div>
                <div class="stat-label">Diensten</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${employeesScheduled.size}</div>
                <div class="stat-label">Medewerkers Ingepland</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">€${weekData.revenue.toLocaleString('nl-NL')}</div>
                <div class="stat-label">Verwachte Omzet</div>
            </div>
        `;
    },
    
    // Render hours chart
    renderHoursChart() {
        const container = document.getElementById('hoursChart');
        const topEmployees = AppState.employees
            .map(emp => ({
                ...emp,
                hours: Calculator.getEmployeeWeekHours(emp.id)
            }))
            .sort((a, b) => b.hours - a.hours)
            .slice(0, 10);
        
        const maxHours = Math.max(...topEmployees.map(e => e.hours), 1);
        
        container.innerHTML = `
            <div class="bar-chart">
                ${topEmployees.map(emp => `
                    <div class="bar-wrapper">
                        <div class="bar" style="height: ${(emp.hours / maxHours) * 200}px"></div>
                        <div class="bar-value">${emp.hours.toFixed(1)}u</div>
                        <div class="bar-label">${emp.name}</div>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    // Render budget chart
    renderBudgetChart() {
        const container = document.getElementById('budgetChart');
        const store = AppState.stores[AppState.currentStore];
        const weekData = Utils.getWeekRevenue(AppState.currentStore, AppState.currentWeek, AppState.currentYear);
        const holidayInfo = Utils.getWeekHolidayMultiplier(AppState.currentWeek, AppState.currentYear);
        
        const totalBudget = Calculator.calculateTotalBudget(weekData.revenue, store.standardRevenue, holidayInfo.multiplier);
        
        const days = [];

    // Drag & Drop handlers
    // (these are global functions defined below)
        for (let i = 0; i < 7; i++) {
            const budget = Calculator.calculateDailyHours(totalBudget, i);
            const scheduled = Calculator.getScheduledHours(i);
            days.push({ budget, scheduled, name: Utils.getDayName(i).substring(0, 2) });
        }
        
        const maxValue = Math.max(...days.map(d => Math.max(d.budget, d.scheduled)), 1);
        
        container.innerHTML = `
            <div class="bar-chart" style="padding-bottom: 40px;">
                ${days.map(day => `
                    <div class="bar-wrapper" style="position: relative;">
                        <div style="display: flex; gap: 4px; align-items: flex-end; height: 200px;">
                            <div class="bar" style="height: ${(day.budget / maxValue) * 200}px; background: #E0E0E0; width: 20px;"></div>
                            <div class="bar" style="height: ${(day.scheduled / maxValue) * 200}px; width: 20px;"></div>
                        </div>
                        <div class="bar-label">${day.name}</div>
                    </div>
                `).join('')}
            </div>
            <div style="display: flex; justify-content: center; gap: 20px; margin-top: 10px;">
                <span><span style="display: inline-block; width: 12px; height: 12px; background: #E0E0E0; margin-right: 4px;"></span>Budget</span>
                <span><span style="display: inline-block; width: 12px; height: 12px; background: #0066CC; margin-right: 4px;"></span>Gepland</span>
            </div>
        `;
    },
    
    // Render Category Chart
    renderCategoryChart() {
        const container = document.getElementById('categoryChart');
        
        // Get hours per category
        const categoryHours = {};
        AppState.schedule.forEach(shift => {
            const task = AppState.tasks.find(t => t.id === shift.taskId);
            if (task) {
                const category = task.category || 'Overig';
                const hours = Utils.calculateShiftHours(shift.startTime, shift.endTime, shift.breakMinutes || 0);
                categoryHours[category] = (categoryHours[category] || 0) + hours;
            }
        });
        
        const categories = Object.entries(categoryHours)
            .map(([name, hours]) => ({ name, hours }))
            .sort((a, b) => b.hours - a.hours);
        
        const maxHours = Math.max(...categories.map(c => c.hours), 1);
        const colors = ['#0066CC', '#FF6600', '#4CAF50', '#9C27B0', '#F44336', '#2196F3', '#FF9800'];
        
        if (categories.length === 0) {
            container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-secondary);">Geen diensten ingepland</div>';
            return;
        }
        
        container.innerHTML = `
            <div class="category-chart">
                ${categories.map((cat, i) => `
                    <div class="category-row">
                        <div class="category-name">${cat.name}</div>
                        <div class="category-bar-container">
                            <div class="category-bar" style="width: ${(cat.hours / maxHours) * 100}%; background: ${colors[i % colors.length]};"></div>
                        </div>
                        <div class="category-value">${cat.hours.toFixed(1)}u</div>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    // Render Contract Chart
    renderContractChart() {
        const container = document.getElementById('contractChart');
        
        // Get planned hours per employee
        const employeeData = AppState.employees
            .map(emp => ({
                name: `${emp.firstName} ${emp.lastName.charAt(0)}.`,
                contractHours: emp.contractHours,
                plannedHours: Calculator.getEmployeeWeekHours(emp.id)
            }))
            .filter(e => e.plannedHours > 0 || e.contractHours > 0)
            .sort((a, b) => b.plannedHours - a.plannedHours)
            .slice(0, 12);
        
        const maxHours = Math.max(...employeeData.map(e => Math.max(e.contractHours, e.plannedHours)), 1);
        
        if (employeeData.length === 0) {
            container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-secondary);">Geen data beschikbaar</div>';
            return;
        }
        
        container.innerHTML = `
            <div class="contract-chart">
                ${employeeData.map(emp => {
                    const diff = emp.plannedHours - emp.contractHours;
                    const diffColor = diff > 2 ? '#F44336' : diff < -2 ? '#FF9800' : '#4CAF50';
                    return `
                        <div class="contract-row">
                            <div class="contract-name" title="${emp.name}">${emp.name}</div>
                            <div class="contract-bar-container">
                                <div class="contract-bar-planned" style="width: ${(emp.plannedHours / maxHours) * 100}%;"></div>
                                <div class="contract-bar-contract" style="width: ${(emp.contractHours / maxHours) * 100}%;"></div>
                            </div>
                            <div class="contract-values">
                                <strong style="color: ${diffColor}">${emp.plannedHours.toFixed(1)}</strong> / ${emp.contractHours}u
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div style="display: flex; justify-content: center; gap: 20px; margin-top: 8px; font-size: 11px;">
                <span><span style="display: inline-block; width: 12px; height: 12px; background: #0066CC; opacity: 0.7; margin-right: 4px;"></span>Gepland</span>
                <span><span style="display: inline-block; width: 12px; height: 4px; background: #FF6600; margin-right: 4px;"></span>Contract</span>
            </div>
        `;
    },
    
    // Render Settings
    renderSettings() {
        const store = AppState.stores[AppState.currentStore];
        const days = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'];
        const dayDist = store.dayDistribution || getCurrentDayDistribution();
        
        // Store settings
        document.getElementById('settingStoreNumber').value = AppState.currentStore;
        document.getElementById('settingStoreName').value = store.name;
        document.getElementById('settingStandardRevenue').value = store.standardRevenue;
        
        // Work limits
        document.getElementById('settingMaxDaily').value = store.maxDailyHours;
        document.getElementById('settingMaxWeekly').value = store.maxWeeklyHours;
        document.getElementById('settingMaxDays').value = store.maxDaysPerWeek || 5;
        
        // Day distribution
        const container = document.getElementById('dayDistributionSettings');
        container.innerHTML = days.map((day, i) => `
            <div class="form-row" style="margin-bottom: 12px; align-items: center;">
                <div style="min-width: 100px;">${day}</div>
                <input type="number" 
                       id="dayDist${i}" 
                       value="${dayDist[i]}" 
                       min="0" max="100" step="1"
                       style="width: 80px;">
                <span>%</span>
            </div>
        `).join('') + `
            <div class="form-row" style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #eee;">
                <strong>Totaal:</strong>
                <span id="dayDistTotal">${Object.values(dayDist).reduce((a,b) => a+b, 0)}%</span>
            </div>
        `;
        
        const openingContainer = document.getElementById('openingHoursSettings');
        if (openingContainer) {
            openingContainer.innerHTML = days.map((day, i) => {
                const hours = (store.openingHours && store.openingHours[i]) || { open: '07:00', close: '21:00' };
                return `
                    <div class="form-row" style="margin-bottom: 12px; align-items: center;">
                        <div style="min-width: 100px;">${day}</div>
                        <input type="time" id="open${i}" value="${hours.open}" style="width: 120px;">
                        <span style="margin: 0 6px;">-</span>
                        <input type="time" id="close${i}" value="${hours.close}" style="width: 120px;">
                    </div>
                `;
            }).join('');
        }
        
        // Add event listeners for live total calculation
        for (let i = 0; i < 7; i++) {
            document.getElementById(`dayDist${i}`)?.addEventListener('input', updateDayDistTotal);
        }
    },
    
    // Update week display
    updateWeekDisplay() {
        document.getElementById('weekDisplay').textContent = `Week ${AppState.currentWeek} - ${AppState.currentYear}`;
    }
};

// Update day distribution total
function updateDayDistTotal() {
    let total = 0;
    for (let i = 0; i < 7; i++) {
        total += parseFloat(document.getElementById(`dayDist${i}`)?.value || 0);
    }
    const totalEl = document.getElementById('dayDistTotal');
    if (totalEl) {
        totalEl.textContent = `${total}%`;
        totalEl.style.color = total === 100 ? '#4CAF50' : '#F44336';
    }
}

// Save settings
function saveSettings() {
    const store = AppState.stores[AppState.currentStore];
    
    // Update store settings
    store.name = document.getElementById('settingStoreName').value;
    store.standardRevenue = parseFloat(document.getElementById('settingStandardRevenue').value);
    store.maxDailyHours = parseFloat(document.getElementById('settingMaxDaily').value);
    store.maxWeeklyHours = parseFloat(document.getElementById('settingMaxWeekly').value);
    store.maxDaysPerWeek = parseInt(document.getElementById('settingMaxDays').value);
    
    // Update day distribution
    let totalPct = 0;
    if (!store.dayDistribution) {
        store.dayDistribution = { ...DEFAULT_DAY_DISTRIBUTION };
    }
    for (let i = 0; i < 7; i++) {
        const val = parseFloat(document.getElementById(`dayDist${i}`)?.value || 0);
        store.dayDistribution[i] = val;
        totalPct += val;
    }
    
    if (Math.abs(totalPct - 100) > 0.01) {
        showToast('Waarschuwing: Dag distributie telt niet op tot 100%!', 'warning');
    }

    // Opening hours per day
    if (!store.openingHours) store.openingHours = {};
    let invalidOpening = false;
    for (let i = 0; i < 7; i++) {
        const openVal = document.getElementById(`open${i}`)?.value || '07:00';
        const closeVal = document.getElementById(`close${i}`)?.value || '21:00';
        store.openingHours[i] = { open: openVal, close: closeVal };
        if (timeToMinutes(openVal) >= timeToMinutes(closeVal)) {
            invalidOpening = true;
        }
    }
    if (invalidOpening) {
        showToast('Let op: openingstijd ligt na sluitingstijd op een van de dagen.', 'warning');
    }
    
    // Save to localStorage
    saveSettingsToStorage();
    showToast('Instellingen opgeslagen!');
}

// Export all data to JSON
function exportData() {
    const data = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        store: AppState.currentStore,
        stores: AppState.stores,
        employees: AppState.employees,
        employeesByStore: AppState.employeesByStore,
        tasks: AppState.tasks,
        schedules: AppState.schedules,
        dayDistribution: getCurrentDayDistribution()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `werkschema_export_${AppState.currentStore}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Data geëxporteerd!');
}

// Import data from JSON
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            
            if (!confirm('Dit zal alle huidige data overschrijven. Doorgaan?')) {
                return;
            }
            
            // Restore data
            if (data.employees) {
                AppState.employees = data.employees;
                AppState.employeesByStore[AppState.currentStore] = JSON.parse(JSON.stringify(data.employees));
            }
            if (data.tasks) AppState.tasks = data.tasks;
            if (data.schedules) AppState.schedules = data.schedules;
            if (data.stores) AppState.stores = data.stores;
            if (data.employeesByStore) {
                AppState.employeesByStore = data.employeesByStore;
                const current = AppState.employeesByStore[AppState.currentStore];
                if (current) {
                    AppState.employees = JSON.parse(JSON.stringify(current));
                }
            }
            const store = AppState.stores[AppState.currentStore];
            if (data.dayDistribution && store) {
                store.dayDistribution = data.dayDistribution;
            }
            
            // Load current week schedule
            loadScheduleFromStorage();
            
            // Save all to localStorage
            saveEmployeesToStorage();
            saveSettingsToStorage();
            
            showToast('Data geïmporteerd!');
            UI.renderCurrentPage();
        } catch (err) {
            showToast('Fout bij importeren: ' + err.message, 'error');
        }
    };
    reader.readAsText(file);
}

// Clear all data
function clearAllData() {
    if (!confirm('WAARSCHUWING: Dit wist ALLE roosters en data. Doorgaan?')) return;
    if (!confirm('Weet je het zeker? Dit kan niet ongedaan worden!')) return;
    
    localStorage.clear();
    showToast('Alle data gewist. Pagina wordt herladen...');
    setTimeout(() => location.reload(), 1500);
}

// Save settings to localStorage
function saveSettingsToStorage() {
    const currentStore = AppState.stores[AppState.currentStore];
    localStorage.setItem(`werkschema_settings_${AppState.currentStore}`, JSON.stringify({
        stores: AppState.stores,
        dayDistribution: currentStore?.dayDistribution // Legacy field for oudere exports
    }));
}

// Load settings from localStorage
function loadSettingsFromStorage() {
    const saved = localStorage.getItem(`werkschema_settings_${AppState.currentStore}`);
    if (saved) {
        try {
            const data = JSON.parse(saved);
            if (data.stores) AppState.stores = { ...AppState.stores, ...data.stores };
            const store = AppState.stores[AppState.currentStore];
            if (data.dayDistribution && store) {
                store.dayDistribution = data.dayDistribution;
            }
            if (store) {
                if (!store.dayDistribution) store.dayDistribution = { ...DEFAULT_DAY_DISTRIBUTION };
                if (!store.openingHours) {
                    store.openingHours = { ...AppState.stores[store.id]?.openingHours } || {
                        0: { open: '07:00', close: '21:00' },
                        1: { open: '07:00', close: '21:00' },
                        2: { open: '07:00', close: '21:00' },
                        3: { open: '07:00', close: '21:00' },
                        4: { open: '07:00', close: '21:00' },
                        5: { open: '07:00', close: '21:00' },
                        6: { open: '07:00', close: '21:00' }
                    };
                }
            }
        } catch (e) {
            console.warn('Could not load settings:', e);
        }
    }
}

// ===================================
// MODAL FUNCTIONS
// ===================================

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function openShortcutsModal() {
    openModal('shortcutsModal');
}

// ===================================
// SHIFT TEMPLATES FUNCTIONS
// ===================================

function openTemplatesModal() {
    renderTemplates();
    openModal('templatesModal');
}

function showSaveTemplateForm() {
    document.getElementById('saveTemplateForm').style.display = 'block';
    document.getElementById('templateName').focus();
}

function hideSaveTemplateForm() {
    document.getElementById('saveTemplateForm').style.display = 'none';
    document.getElementById('templateName').value = '';
    document.getElementById('templateDescription').value = '';
    document.getElementById('templateSourceDay').value = '0';
}

function saveTemplate() {
    const name = document.getElementById('templateName').value.trim();
    const description = document.getElementById('templateDescription').value.trim();
    const sourceDay = parseInt(document.getElementById('templateSourceDay').value);
    
    if (!name) {
        showToast('Geef een naam op voor het template!', 'error');
        return;
    }
    
    const shifts = AppState.schedule[sourceDay] || [];
    if (shifts.length === 0) {
        showToast('Geselecteerde dag heeft geen shifts om te kopiëren!', 'error');
        return;
    }
    
    const template = {
        id: Date.now(),
        name,
        description,
        createdAt: new Date().toISOString(),
        shifts: shifts.map(s => ({
            employeeId: s.employeeId,
            startTime: s.startTime,
            endTime: s.endTime,
            breakMinutes: s.breakMinutes,
            notes: s.notes,
            tasks: [...(s.tasks || [])]
        }))
    };
    
    // Save to localStorage
    const templates = getTemplatesFromStorage();
    templates.push(template);
    localStorage.setItem('ahShiftTemplates', JSON.stringify(templates));
    
    hideSaveTemplateForm();
    renderTemplates();
    showToast(`Template "${name}" opgeslagen!`);
}

function getTemplatesFromStorage() {
    const saved = localStorage.getItem('ahShiftTemplates');
    return saved ? JSON.parse(saved) : [];
}

function renderTemplates() {
    const templates = getTemplatesFromStorage();
    const container = document.getElementById('templatesGrid');
    
    if (templates.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <span class="material-icons">bookmark_border</span>
                <p>Nog geen templates opgeslagen</p>
                <small>Sla veelgebruikte shift-patronen op om ze later snel te hergebruiken</small>
            </div>
        `;
        return;
    }
    
    container.innerHTML = templates.map(template => {
        const created = new Date(template.createdAt).toLocaleDateString('nl-NL');
        return `
            <div class="template-card">
                <div class="template-header">
                    <h4>${template.name}</h4>
                    <div class="template-actions">
                        <button class="btn-icon" title="Toepassen op dag" onclick="showApplyTemplateOptions(${template.id})">
                            <span class="material-icons">play_arrow</span>
                        </button>
                        <button class="btn-icon" title="Verwijderen" onclick="deleteTemplate(${template.id})">
                            <span class="material-icons">delete</span>
                        </button>
                    </div>
                </div>
                <div class="template-info">
                    ${template.description ? `<p class="template-desc">${template.description}</p>` : ''}
                    <div class="template-meta">
                        <span><strong>${template.shifts.length}</strong> shifts</span>
                        <span>Aangemaakt: ${created}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function showApplyTemplateOptions(templateId) {
    const template = getTemplatesFromStorage().find(t => t.id === templateId);
    if (!template) return;
    
    const dayNames = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'];
    const options = dayNames.map((name, i) => `<option value="${i}">${name}</option>`).join('');
    
    showConfirm(
        `Template "${template.name}" Toepassen`,
        `<div style="text-align: left;">
            <p>Op welke dag wil je dit template toepassen?</p>
            <select id="applyTemplateDay" class="form-control" style="margin-top: 12px; width: 100%;">
                ${options}
            </select>
            <p style="margin-top: 12px; color: var(--text-secondary); font-size: 14px;">
                <strong>Let op:</strong> Bestaande shifts op die dag worden vervangen!
            </p>
        </div>`,
        () => {
            const targetDay = parseInt(document.getElementById('applyTemplateDay').value);
            applyTemplate(templateId, targetDay);
        },
        'Toepassen',
        true // Custom content
    );
}

function applyTemplate(templateId, targetDay) {
    const template = getTemplatesFromStorage().find(t => t.id === templateId);
    if (!template) return;
    
    // Save state for undo
    History.saveState();
    
    // Clear target day and apply template shifts
    AppState.schedule[targetDay] = template.shifts.map(shift => ({
        id: shiftIdCounter++,
        employeeId: shift.employeeId,
        startTime: shift.startTime,
        endTime: shift.endTime,
        breakMinutes: shift.breakMinutes,
        notes: shift.notes,
        tasks: [...(shift.tasks || [])]
    }));
    
    saveScheduleToStorage();
    closeModal('templatesModal');
    showToast(`Template "${template.name}" toegepast!`);
    UI.renderCurrentPage();
}

function deleteTemplate(templateId) {
    const templates = getTemplatesFromStorage();
    const template = templates.find(t => t.id === templateId);
    if (!template) return;
    
    showConfirm(
        'Template Verwijderen',
        `Weet je zeker dat je template "${template.name}" wilt verwijderen?`,
        () => {
            const updatedTemplates = templates.filter(t => t.id !== templateId);
            localStorage.setItem('ahShiftTemplates', JSON.stringify(updatedTemplates));
            renderTemplates();
            showToast('Template verwijderd!');
        },
        'Verwijderen'
    );
}

// ===================================
// DRAG & DROP FUNCTIONS FOR SHIFTS
// ===================================

function onShiftDragStart(e) {
    const el = e.currentTarget;
    const shiftId = parseInt(el.dataset.shiftId);
    // Find current day index by scanning schedule
    let fromDay = parseInt(el.dataset.dayIndex);
    if (isNaN(fromDay)) {
        for (let i = 0; i < 7; i++) {
            if ((AppState.schedule[i] || []).some(s => s.id === shiftId)) {
                fromDay = i;
                break;
            }
        }
    }
    const payload = JSON.stringify({ shiftId, fromDay });
    e.dataTransfer.setData('text/plain', payload);
    e.dataTransfer.effectAllowed = 'move';
    el.classList.add('dragging');
}

function onShiftDragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

function onDayDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const container = e.currentTarget;
    container.classList.add('drag-over');
}

function onDayDrop(e, targetDay) {
    e.preventDefault();
    const container = e.currentTarget;
    container.classList.remove('drag-over');
    try {
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const { shiftId, fromDay } = data;
        if (typeof shiftId !== 'number') return;
        if (typeof targetDay !== 'number') return;
        if (fromDay === targetDay) return; // No move if same day
        
        // Save state for undo
        History.saveState();
        
        // Find and move the shift
        const fromList = AppState.schedule[fromDay] || [];
        const idx = fromList.findIndex(s => s.id === shiftId);
        if (idx === -1) return;
        const [shift] = fromList.splice(idx, 1);
        if (!AppState.schedule[targetDay]) AppState.schedule[targetDay] = [];
        AppState.schedule[targetDay].push(shift);
        
        // Persist and re-render
        saveScheduleToStorage();
        showToast('Shift verplaatst');
        UI.renderCurrentPage();
    } catch (err) {
        console.warn('Drop parse error:', err);
    }
}

function renderTaskCheckboxesForDay(dayIndex, selectedTasks = []) {
    const tasksContainer = document.getElementById('shiftTasks');
    if (!tasksContainer) return;
    const dayName = Utils.getDayName(dayIndex);
    
    // Sort tasks by priority (1 = highest)
    const sortedTasks = [...AppState.tasks].sort((a, b) => a.priority - b.priority);
    
    tasksContainer.innerHTML = sortedTasks.map(task => {
        const allowed = isTaskAllowedOnDay(task.id, dayIndex);
        const warning = allowed ? '' : `<small style="color: #F44336; margin-left: 6px;">Niet op ${dayName}</small>`;
        const checked = selectedTasks.includes(task.id) ? 'checked' : '';
        const mutedStyle = allowed ? '' : 'style="opacity: 0.75"';
        
        // Show linked tasks info
        const linkedInfo = task.linkedTasks && task.linkedTasks.length > 0
            ? `<small style="color: #666; margin-left: 6px;">🔗 Gekoppeld met: ${task.linkedTasks.join(', ')}</small>`
            : '';
        
        return `
            <label class="task-checkbox" ${mutedStyle}>
                <input type="checkbox" value="${task.id}" ${checked} onchange="handleTaskSelection('${task.id}', this.checked)">
                <span class="task-chip ${task.category}">${task.id}</span>
                ${task.name}
                <span class="priority-badge priority-${task.priority}">${task.priority}</span>
                ${warning}
                ${linkedInfo}
            </label>
        `;
    }).join('');
}

// Handle task selection and auto-select linked tasks
function handleTaskSelection(taskId, isChecked) {
    const task = AppState.tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // If task is checked, also check its linked tasks
    if (isChecked && task.linkedTasks && task.linkedTasks.length > 0) {
        task.linkedTasks.forEach(linkedId => {
            const linkedCheckbox = document.querySelector(`#shiftTasks input[value="${linkedId}"]`);
            if (linkedCheckbox && !linkedCheckbox.checked) {
                linkedCheckbox.checked = true;
                // Recursively check linked tasks of linked tasks
                handleTaskSelection(linkedId, true);
            }
        });
    }
    
    // If task is unchecked, also uncheck tasks that have this as linked
    if (!isChecked) {
        AppState.tasks.forEach(t => {
            if (t.linkedTasks && t.linkedTasks.includes(taskId)) {
                const checkbox = document.querySelector(`#shiftTasks input[value="${t.id}"]`);
                if (checkbox && checkbox.checked) {
                    checkbox.checked = false;
                }
            }
        });
    }
}

// Toggle between work shift and status code mode
function toggleShiftType() {
    const type = document.getElementById('shiftType').value;
    const statusGroup = document.getElementById('statusCodeGroup');
    const workFields = document.getElementById('workShiftFields');
    
    if (type === 'status') {
        statusGroup.style.display = 'block';
        workFields.style.display = 'none';
    } else {
        statusGroup.style.display = 'none';
        workFields.style.display = 'block';
    }
}

function openAddShiftModal(dayIndex = 0) {
    // Reset editing state when opening as new
    editingShiftId = null;
    editingShiftDay = null;
    
    // Hide delete button for new shifts
    document.getElementById('deleteShiftBtn').style.display = 'none';
    
    // Reset to work shift mode
    document.getElementById('shiftType').value = 'work';
    toggleShiftType();
    
    // Set day first (needed for availability filter)
    document.getElementById('shiftDay').value = dayIndex;
    
    // Populate employee select (only available employees for this day)
    updateEmployeeSelectForDay(dayIndex);
    
    // Add day change listener to update employee list
    document.getElementById('shiftDay').onchange = (e) => {
        const newDay = parseInt(e.target.value);
        updateEmployeeSelectForDay(newDay);
        const currentSelected = Array.from(document.querySelectorAll('#shiftTasks input:checked')).map(cb => cb.value);
        renderTaskCheckboxesForDay(newDay, currentSelected.filter(id => isTaskAllowedOnDay(id, newDay)));
    };
    
    // Populate task checkboxes (uncheck all)
    renderTaskCheckboxesForDay(dayIndex);
    
    // Reset times and break
    const opening = getOpeningHoursForDay(dayIndex);
    const defaultStartMinutes = timeToMinutes(opening.open || '08:00');
    const defaultEndMinutes = Math.min(timeToMinutes(opening.close || '17:00'), defaultStartMinutes + (9 * 60));
    document.getElementById('shiftStart').value = minutesToTime(defaultStartMinutes);
    document.getElementById('shiftEnd').value = minutesToTime(defaultEndMinutes);
    document.getElementById('shiftBreak').value = '0';
    document.getElementById('shiftNotes').value = '';
    updateNetHours();
    
    // Add listeners for net hours calculation
    document.getElementById('shiftStart').onchange = updateNetHours;
    document.getElementById('shiftEnd').onchange = updateNetHours;
    document.getElementById('shiftBreak').onchange = updateNetHours;
    
    document.getElementById('shiftModalTitle').textContent = 'Shift Toevoegen';
    openModal('shiftModal');
}

// Calculate and display net hours
function updateNetHours() {
    const startTime = document.getElementById('shiftStart').value;
    const endTime = document.getElementById('shiftEnd').value;
    const breakMinutes = parseInt(document.getElementById('shiftBreak').value) || 0;
    
    const grossHours = parseFloat(Utils.calculateHours(startTime, endTime));
    const netHours = Math.max(0, grossHours - (breakMinutes / 60));
    
    document.getElementById('shiftNetHours').value = netHours.toFixed(2) + ' uur';
}

// Update employee dropdown based on day availability
function updateEmployeeSelectForDay(dayIndex) {
    const empSelect = document.getElementById('shiftEmployee');
    const availableEmps = Utils.getAvailableEmployees(dayIndex);
    const unavailableEmps = AppState.employees.filter(e => 
        e.active && !Utils.isAvailable(e.id, dayIndex)
    );
    
    let html = '';
    
    if (availableEmps.length > 0) {
        html += '<optgroup label="Beschikbaar">';
        html += availableEmps.map(e => 
            `<option value="${e.id}">${e.firstName} ${e.lastName} (${e.function})</option>`
        ).join('');
        html += '</optgroup>';
    }
    
    if (unavailableEmps.length > 0) {
        html += '<optgroup label="Niet beschikbaar">';
        html += unavailableEmps.map(e => 
            `<option value="${e.id}" style="color: #999;">${e.firstName} ${e.lastName} (${e.function}) ⚠️</option>`
        ).join('');
        html += '</optgroup>';
    }
    
    empSelect.innerHTML = html;
}

// ===================================
// SHIFT VALIDATION
// ===================================

function validateShift(employeeId, dayIndex, startTime, endTime, breakMinutes = 0, selectedTasks = []) {
    const errors = [];
    const warnings = [];
    const emp = AppState.employees.find(e => e.id === employeeId);
    const store = AppState.stores[AppState.currentStore];
    
    if (!emp) {
        errors.push('Medewerker niet gevonden');
        return { errors, warnings };
    }
    
    const grossHours = parseFloat(Utils.calculateHours(startTime, endTime));
    const shiftHours = grossHours - (breakMinutes / 60);

    const opening = getOpeningHoursForDay(dayIndex);
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    const openMinutes = timeToMinutes(opening.open);
    const closeMinutes = timeToMinutes(opening.close);
    
    if (!store.openSunday && dayIndex === 6) {
        errors.push('Winkel is gesloten op zondag voor deze winkel');
    }
    if (startMinutes < openMinutes) {
        errors.push(`Starttijd ligt voor openingstijd (${opening.open})`);
    }
    if (endMinutes > closeMinutes) {
        errors.push(`Eindtijd ligt na sluitingstijd (${opening.close})`);
    }
    
    selectedTasks.forEach(taskId => {
        if (!isTaskAllowedOnDay(taskId, dayIndex)) {
            const task = AppState.tasks.find(t => t.id === taskId);
            const taskName = task ? task.name : taskId;
            errors.push(`Taak ${taskName} is niet toegestaan op ${Utils.getDayName(dayIndex)}`);
        }
    });
    
    // Check availability (warning, not error)
    if (!Utils.isAvailable(employeeId, dayIndex)) {
        warnings.push(`${emp.firstName} is normaal niet beschikbaar op ${Utils.getDayName(dayIndex)}`);
    }
    
    // Check minimum shift duration
    if (shiftHours < 3) {
        errors.push('Shift moet minimaal 3 uur zijn');
    }
    
    // Check maximum daily hours
    if (shiftHours > store.maxDailyHours) {
        errors.push(`Shift mag maximaal ${store.maxDailyHours} uur zijn`);
    }
    
    // Check for overlapping shifts for same employee on same day
    const existingShifts = (AppState.schedule[dayIndex] || []).filter(s => 
        s.employeeId === employeeId && s.id !== editingShiftId
    );
    
    // Duplicate check - employee already has shift on this day
    if (existingShifts.length > 0) {
        warnings.push(`${emp.firstName} heeft al ${existingShifts.length} shift(s) op deze dag`);
    }
    
    for (const existing of existingShifts) {
        if (timesOverlap(startTime, endTime, existing.startTime, existing.endTime)) {
            errors.push(`Shift overlapt met bestaande shift (${existing.startTime}-${existing.endTime})`);
            break;
        }
    }
    
    // Check 11-hour rest period between consecutive days
    const restHoursNeeded = 11;
    
    // Check previous day's last shift
    if (dayIndex > 0) {
        const prevDayShifts = (AppState.schedule[dayIndex - 1] || []).filter(s => 
            s.employeeId === employeeId && s.id !== editingShiftId
        );
        if (prevDayShifts.length > 0) {
            // Find latest end time from previous day
            const latestEndPrev = prevDayShifts.reduce((latest, s) => {
                return s.endTime > latest ? s.endTime : latest;
            }, '00:00');
            
            const restHours = calculateRestHours(latestEndPrev, startTime);
            if (restHours < restHoursNeeded) {
                warnings.push(`Slechts ${restHours.toFixed(1)} uur rust na gisteren (aanbevolen: ${restHoursNeeded}u)`);
            }
        }
    }
    
    // Check next day's first shift
    if (dayIndex < 6) {
        const nextDayShifts = (AppState.schedule[dayIndex + 1] || []).filter(s => 
            s.employeeId === employeeId && s.id !== editingShiftId
        );
        if (nextDayShifts.length > 0) {
            // Find earliest start time from next day
            const earliestStartNext = nextDayShifts.reduce((earliest, s) => {
                return s.startTime < earliest ? s.startTime : earliest;
            }, '23:59');
            
            const restHours = calculateRestHours(endTime, earliestStartNext);
            if (restHours < restHoursNeeded) {
                warnings.push(`Slechts ${restHours.toFixed(1)} uur rust tot morgen (aanbevolen: ${restHoursNeeded}u)`);
            }
        }
    }
    
    // Check maximum days per week (5 days)
    let daysWorked = 0;
    for (let i = 0; i < 7; i++) {
        const dayShifts = (AppState.schedule[i] || []).filter(s => 
            s.employeeId === employeeId && (i !== dayIndex || s.id !== editingShiftId)
        );
        if (dayShifts.length > 0 || i === dayIndex) {
            daysWorked++;
        }
    }
    if (daysWorked > 5) {
        errors.push('Medewerker mag maximaal 5 dagen per week werken');
    }
    
    // Check total weekly hours vs contract
    let weekHours = shiftHours;
    for (let i = 0; i < 7; i++) {
        const dayShifts = (AppState.schedule[i] || []).filter(s => 
            s.employeeId === employeeId && s.id !== editingShiftId
        );
        dayShifts.forEach(s => {
            const sBreak = s.breakMinutes || 0;
            weekHours += parseFloat(Utils.calculateHours(s.startTime, s.endTime)) - (sBreak / 60);
        });
    }
    if (weekHours > store.maxWeeklyHours) {
        errors.push(`Overschrijdt max ${store.maxWeeklyHours} uur per week (nu: ${weekHours.toFixed(1)}u)`);
    }
    
    // Contract hours warning
    if (weekHours > emp.contractHours * 1.2) {
        warnings.push(`Meer dan 20% boven contracturen (${emp.contractHours}u)`);
    }
    
    // Break required for shifts > 6 hours (warning)
    if (grossHours > 6 && breakMinutes < 30) {
        warnings.push('Pauze van minimaal 30 min aanbevolen bij shifts > 6 uur');
    }
    
    return { errors, warnings };
}

// Calculate rest hours between end of one shift and start of next (across midnight)
function calculateRestHours(endTime, startTime) {
    const toMinutes = (time) => {
        const [h, m] = time.split(':').map(Number);
        return h * 60 + m;
    };
    
    const endMins = toMinutes(endTime);
    const startMins = toMinutes(startTime);
    
    // Rest hours = time from end to midnight + time from midnight to start
    const restMinutes = (24 * 60 - endMins) + startMins;
    return restMinutes / 60;
}

function timesOverlap(start1, end1, start2, end2) {
    const toMinutes = (time) => {
        const [h, m] = time.split(':').map(Number);
        return h * 60 + m;
    };
    
    const s1 = toMinutes(start1);
    const e1 = toMinutes(end1);
    const s2 = toMinutes(start2);
    const e2 = toMinutes(end2);
    
    return s1 < e2 && s2 < e1;
}

// ===================================
// UNDO/REDO HISTORY
// ===================================

const History = {
    past: [],
    future: [],
    maxSteps: 30,
    
    // Save current state to history
    saveState() {
        const currentState = JSON.stringify(AppState.schedule);
        
        // Don't save if same as last state
        if (this.past.length > 0 && this.past[this.past.length - 1] === currentState) {
            return;
        }
        
        this.past.push(currentState);
        
        // Limit history size
        if (this.past.length > this.maxSteps) {
            this.past.shift();
        }
        
        // Clear future on new action
        this.future = [];
        
        this.updateButtons();
    },
    
    // Undo last action
    undo() {
        if (this.past.length === 0) {
            showToast('Niets om ongedaan te maken', 'error');
            return;
        }
        
        // Save current state to future
        this.future.push(JSON.stringify(AppState.schedule));
        
        // Restore previous state
        const previousState = this.past.pop();
        AppState.schedule = JSON.parse(previousState);
        
        saveScheduleToStorage();
        UI.renderCurrentPage();
        showToast('Actie ongedaan gemaakt');
        this.updateButtons();
    },
    
    // Redo last undone action
    redo() {
        if (this.future.length === 0) {
            showToast('Niets om opnieuw te doen', 'error');
            return;
        }
        
        // Save current state to past
        this.past.push(JSON.stringify(AppState.schedule));
        
        // Restore future state
        const futureState = this.future.pop();
        AppState.schedule = JSON.parse(futureState);
        
        saveScheduleToStorage();
        UI.renderCurrentPage();
        showToast('Actie opnieuw uitgevoerd');
        this.updateButtons();
    },
    
    // Update button states
    updateButtons() {
        const undoBtn = document.getElementById('undoBtn');
        const redoBtn = document.getElementById('redoBtn');
        
        if (undoBtn) {
            undoBtn.disabled = this.past.length === 0;
            undoBtn.title = this.past.length > 0 ? `Ongedaan maken (${this.past.length})` : 'Niets om ongedaan te maken';
        }
        if (redoBtn) {
            redoBtn.disabled = this.future.length === 0;
            redoBtn.title = this.future.length > 0 ? `Opnieuw (${this.future.length})` : 'Niets om opnieuw te doen';
        }
    },
    
    // Clear history (e.g., when changing weeks)
    clear() {
        this.past = [];
        this.future = [];
        this.updateButtons();
    }
};

// Global undo/redo functions
function undo() { History.undo(); }
function redo() { History.redo(); }

// ===================================
// CRUD FUNCTIONS
// ===================================

let shiftIdCounter = 1;
let editingShiftId = null;
let editingShiftDay = null;

function saveShift() {
    const type = document.getElementById('shiftType').value;
    const employeeId = parseInt(document.getElementById('shiftEmployee').value);
    const dayIndex = parseInt(document.getElementById('shiftDay').value);
    const notes = document.getElementById('shiftNotes').value.trim();
    
    // If status code type, save simpler shift
    if (type === 'status') {
        const statusCode = document.getElementById('shiftStatusCode').value;
        
        // If editing, remove old shift first
        if (editingShiftId !== null) {
            AppState.schedule[editingShiftDay] = AppState.schedule[editingShiftDay].filter(s => s.id !== editingShiftId);
        }
        
        const shift = {
            id: editingShiftId || shiftIdCounter++,
            employeeId,
            statusCode,
            notes,
            isStatus: true
        };
        
        if (!AppState.schedule[dayIndex]) {
            AppState.schedule[dayIndex] = [];
        }
        AppState.schedule[dayIndex].push(shift);
        
        History.saveState();
        saveScheduleToStorage();
        closeModal('shiftModal');
        showToast(editingShiftId ? 'Status bijgewerkt!' : 'Status toegevoegd!');
        UI.renderSchedule();
        
        editingShiftId = null;
        editingShiftDay = null;
        return;
    }
    
    // Otherwise handle work shift
    const startTime = document.getElementById('shiftStart').value;
    const endTime = document.getElementById('shiftEnd').value;
    const breakMinutes = parseInt(document.getElementById('shiftBreak').value) || 0;
    
    const selectedTasks = [];
    document.querySelectorAll('#shiftTasks input:checked').forEach(cb => {
        selectedTasks.push(cb.value);
    });
    
    // Validation
    const validation = validateShift(employeeId, dayIndex, startTime, endTime, breakMinutes, selectedTasks);
    
    if (validation.errors.length > 0) {
        showToast(validation.errors[0], 'error');
        return;
    }
    
    // Show warnings but allow saving via confirm dialog
    if (validation.warnings.length > 0) {
        showConfirm(
            'Waarschuwingen',
            validation.warnings.join('\n\n'),
            () => doSaveShift(employeeId, dayIndex, startTime, endTime, breakMinutes, notes, selectedTasks),
            'Toch Opslaan'
        );
        return;
    }
    
    // No warnings, save directly
    doSaveShift(employeeId, dayIndex, startTime, endTime, breakMinutes, notes, selectedTasks);
}

function doSaveShift(employeeId, dayIndex, startTime, endTime, breakMinutes, notes, selectedTasks) {
    // If editing, remove old shift first
    if (editingShiftId !== null) {
        AppState.schedule[editingShiftDay] = AppState.schedule[editingShiftDay].filter(s => s.id !== editingShiftId);
    }
    
    const shift = {
        id: editingShiftId || shiftIdCounter++,
        employeeId,
        startTime,
        endTime,
        breakMinutes,
        notes,
        tasks: selectedTasks,
        isStatus: false
    };
    
    if (!AppState.schedule[dayIndex]) {
        AppState.schedule[dayIndex] = [];
    }
    AppState.schedule[dayIndex].push(shift);
    
    const wasEditing = editingShiftId !== null;
    
    // Reset editing state
    editingShiftId = null;
    editingShiftDay = null;
    
    // Save to history and localStorage
    History.saveState();
    saveScheduleToStorage();
    
    closeModal('shiftModal');
    showToast(wasEditing ? 'Shift bijgewerkt!' : 'Shift toegevoegd!');
    UI.renderCurrentPage();
}

function editShift(shiftId) {
    // Find shift
    for (let i = 0; i < 7; i++) {
        const shifts = AppState.schedule[i] || [];
        const shift = shifts.find(s => s.id === shiftId);
        if (shift) {
            // Store editing state (don't delete yet!)
            editingShiftId = shiftId;
            editingShiftDay = i;
            
            openAddShiftModal(i);
            document.getElementById('shiftEmployee').value = shift.employeeId;
            
            // Check if this is a status shift
            if (shift.isStatus && shift.statusCode) {
                document.getElementById('shiftType').value = 'status';
                document.getElementById('shiftStatusCode').value = shift.statusCode;
                document.getElementById('shiftNotes').value = shift.notes || '';
                toggleShiftType();
            } else {
                // Regular work shift
                document.getElementById('shiftType').value = 'work';
                document.getElementById('shiftStart').value = shift.startTime;
                document.getElementById('shiftEnd').value = shift.endTime;
                document.getElementById('shiftBreak').value = shift.breakMinutes || 0;
                document.getElementById('shiftNotes').value = shift.notes || '';
                updateNetHours();
                toggleShiftType();
                
                // Check tasks
                (shift.tasks || []).forEach(t => {
                    const cb = document.querySelector(`#shiftTasks input[value="${t}"]`);
                    if (cb) cb.checked = true;
                });
            }
            
            document.getElementById('shiftModalTitle').textContent = 'Shift Bewerken';
            
            // Show delete button when editing
            document.getElementById('deleteShiftBtn').style.display = 'flex';
            break;
        }
    }
}

function deleteShift() {
    if (!editingShiftId) {
        showToast('Geen shift om te verwijderen!', 'error');
        return;
    }
    
    showConfirm(
        'Shift Verwijderen',
        'Weet je zeker dat je deze shift wilt verwijderen? Dit kan niet ongedaan worden gemaakt.',
        () => {
            // Save to history before deleting
            History.saveState();
            
            const shifts = AppState.schedule[editingShiftDay] || [];
            const index = shifts.findIndex(s => s.id === editingShiftId);
            if (index !== -1) {
                AppState.schedule[editingShiftDay].splice(index, 1);
                saveScheduleToStorage();
                closeModal('shiftModal');
                showToast('Shift verwijderd!');
                UI.renderCurrentPage();
            }
            
            // Reset editing state
            editingShiftId = null;
            editingShiftDay = null;
        },
        'Verwijderen'
    );
}

// Employee editing state
let editingEmployeeId = null;

function saveEmployee() {
    const firstName = document.getElementById('empFirstName').value.trim();
    const lastName = document.getElementById('empLastName').value.trim();
    const func = document.getElementById('empFunction').value;
    const contractHours = parseFloat(document.getElementById('empContractHours').value);
    
    // Get availability from checkboxes
    const availability = [];
    document.querySelectorAll('#empAvailability input:checked').forEach(cb => {
        availability.push(parseInt(cb.value));
    });
    
    // Get preferred times
    const preferredTimes = {};
    document.querySelectorAll('#empPreferredTimes .preferred-time-row').forEach(row => {
        const dayIndex = parseInt(row.querySelector('input[data-type="start"]').getAttribute('data-day'));
        const startInput = row.querySelector('input[data-type="start"]');
        const endInput = row.querySelector('input[data-type="end"]');
        
        if (startInput.value && endInput.value) {
            preferredTimes[dayIndex] = {
                start: startInput.value,
                end: endInput.value
            };
        }
    });
    
    if (!firstName || !lastName) {
        showToast('Vul alle velden in!', 'error');
        return;
    }
    
    if (editingEmployeeId) {
        // Update existing employee
        const emp = AppState.employees.find(e => e.id === editingEmployeeId);
        if (emp) {
            emp.firstName = firstName;
            emp.lastName = lastName;
            emp.function = func;
            emp.contractHours = contractHours;
            emp.availability = availability;
            emp.preferredTimes = preferredTimes;
        }
        editingEmployeeId = null;
        showToast('Medewerker bijgewerkt!');
    } else {
        // Add new employee
        const newId = Math.max(...AppState.employees.map(e => e.id), 0) + 1;
        AppState.employees.push({
            id: newId,
            firstName,
            lastName,
            function: func,
            contractHours,
            availability,
            preferredTimes,
            active: true
        });
        showToast('Medewerker toegevoegd!');
    }
    
    saveEmployeesToStorage();
    closeModal('employeeModal');
    UI.renderEmployees();
}

function editEmployee(empId) {
    const emp = AppState.employees.find(e => e.id === empId);
    if (!emp) return;
    
    editingEmployeeId = empId;
    
    document.getElementById('empFirstName').value = emp.firstName;
    document.getElementById('empLastName').value = emp.lastName;
    document.getElementById('empFunction').value = emp.function;
    document.getElementById('empContractHours').value = emp.contractHours;
    
    // Set availability checkboxes
    const availability = emp.availability || [0,1,2,3,4,5,6];
    document.querySelectorAll('#empAvailability input').forEach(cb => {
        cb.checked = availability.includes(parseInt(cb.value));
    });
    
    // Set preferred times
    const preferredTimes = emp.preferredTimes || {};
    document.querySelectorAll('#empPreferredTimes .preferred-time-row').forEach(row => {
        const dayIndex = parseInt(row.querySelector('input[data-type="start"]').getAttribute('data-day'));
        const startInput = row.querySelector('input[data-type="start"]');
        const endInput = row.querySelector('input[data-type="end"]');
        
        if (preferredTimes[dayIndex]) {
            startInput.value = preferredTimes[dayIndex].start;
            endInput.value = preferredTimes[dayIndex].end;
        } else {
            startInput.value = '';
            endInput.value = '';
        }
    });
    
    document.getElementById('employeeModalTitle').textContent = 'Medewerker Bewerken';
    document.getElementById('deleteEmployeeBtn').style.display = 'flex';
    
    openModal('employeeModal');
}

function deleteEmployee() {
    if (!editingEmployeeId) return;
    
    const emp = AppState.employees.find(e => e.id === editingEmployeeId);
    const empName = emp ? `${emp.firstName} ${emp.lastName}` : 'deze medewerker';
    
    showConfirm(
        'Medewerker Verwijderen',
        `Weet je zeker dat je ${empName} wilt verwijderen? Alle geplande diensten van deze medewerker blijven behouden.`,
        () => {
            AppState.employees = AppState.employees.filter(e => e.id !== editingEmployeeId);
            saveEmployeesToStorage();
            closeModal('employeeModal');
            showToast('Medewerker verwijderd!');
            UI.renderEmployees();
            editingEmployeeId = null;
        },
        'Verwijderen'
    );
}

function openAddEmployeeModal() {
    editingEmployeeId = null;
    document.getElementById('empFirstName').value = '';
    document.getElementById('empLastName').value = '';
    document.getElementById('empFunction').value = 'MW';
    document.getElementById('empContractHours').value = 36;
    
    // Reset availability (default Ma-Vr)
    document.querySelectorAll('#empAvailability input').forEach(cb => {
        const day = parseInt(cb.value);
        cb.checked = day <= 4; // Ma-Vr checked
    });
    
    // Reset preferred times
    document.querySelectorAll('#empPreferredTimes input').forEach(input => {
        input.value = '';
    });
    
    document.getElementById('employeeModalTitle').textContent = 'Medewerker Toevoegen';
    document.getElementById('deleteEmployeeBtn').style.display = 'none';
    
    openModal('employeeModal');
}

// ===================================
// EMPLOYEE FILTER FUNCTIONS
// ===================================

function filterEmployees() {
    const searchTerm = (document.getElementById('employeeSearch')?.value || '').toLowerCase().trim();
    const functionFilter = document.getElementById('filterFunction')?.value || '';
    const statusFilter = document.getElementById('filterStatus')?.value || '';
    
    let filtered = AppState.employees.filter(emp => {
        // Search by name
        if (searchTerm) {
            const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
            if (!fullName.includes(searchTerm)) {
                return false;
            }
        }
        
        // Filter by function
        if (functionFilter && emp.function !== functionFilter) {
            return false;
        }
        
        // Filter by status
        if (statusFilter) {
            const isActive = emp.active !== false;
            if (statusFilter === 'active' && !isActive) return false;
            if (statusFilter === 'inactive' && isActive) return false;
        }
        
        return true;
    });
    
    UI.renderEmployees(filtered);
}

function clearEmployeeFilters() {
    const searchEl = document.getElementById('employeeSearch');
    const functionEl = document.getElementById('filterFunction');
    const statusEl = document.getElementById('filterStatus');
    
    if (searchEl) searchEl.value = '';
    if (functionEl) functionEl.value = '';
    if (statusEl) statusEl.value = '';
    
    UI.renderEmployees();
}

// ===================================
// AUTO-SCHEDULE FUNCTION
// ===================================

function autoSchedule() {
    if (!confirm('Dit zal het huidige rooster overschrijven. Doorgaan?')) {
        return;
    }
    
    // Save to history before auto-scheduling
    History.saveState();
    
    // Clear current schedule
    for (let i = 0; i < 7; i++) {
        AppState.schedule[i] = [];
    }
    
    const store = AppState.stores[AppState.currentStore];
    const weekData = Utils.getWeekRevenue(AppState.currentStore, AppState.currentWeek, AppState.currentYear);
    const holidayInfo = Utils.getWeekHolidayMultiplier(AppState.currentWeek, AppState.currentYear);
    
    const totalBudget = Calculator.calculateTotalBudget(weekData.revenue, store.standardRevenue, holidayInfo.multiplier);
    
    // Sort employees by function level
    const sortedEmployees = [...AppState.employees]
        .filter(e => e.active)
        .sort((a, b) => {
            const levelA = AppState.functions.find(f => f.id === a.function)?.level || 99;
            const levelB = AppState.functions.find(f => f.id === b.function)?.level || 99;
            return levelA - levelB;
        });
    
    // Track hours per employee
    const employeeHours = {};
    const employeeDays = {};
    sortedEmployees.forEach(emp => {
        employeeHours[emp.id] = 0;
        employeeDays[emp.id] = 0;
    });
    
    // Schedule each day based on availability
    for (let day = 0; day < 7; day++) {
        if (!store.openSunday && day === 6) continue;

        const opening = getOpeningHoursForDay(day);
        const openMinutes = timeToMinutes(opening.open);
        const closeMinutes = timeToMinutes(opening.close);
        const maxDayHours = Math.max(0, (closeMinutes - openMinutes) / 60);

        const dailyBudget = Calculator.calculateDailyHours(totalBudget, day);
        let currentScheduled = 0;
        
        // Get employees available on this day, sorted by remaining hours needed
        const availableEmps = sortedEmployees
            .filter(emp => {
                const availability = emp.availability || [0,1,2,3,4,5,6];
                return availability.includes(day) && 
                       employeeDays[emp.id] < 5 && 
                       employeeHours[emp.id] < emp.contractHours;
            })
            .sort((a, b) => {
                // Prioritize those who need more hours
                const aRemaining = a.contractHours - employeeHours[a.id];
                const bRemaining = b.contractHours - employeeHours[b.id];
                return bRemaining - aRemaining;
            });
        
        for (const emp of availableEmps) {
            if (currentScheduled >= dailyBudget) break;
            
            const remainingContract = emp.contractHours - employeeHours[emp.id];
            const remainingBudget = dailyBudget - currentScheduled;
            
            const hoursToSchedule = Math.min(
                remainingContract,
                store.maxDailyHours,
                remainingBudget,
                8, // Default max shift
                maxDayHours
            );
            
            if (hoursToSchedule >= 4) {
                // Find tasks this employee can do, sorted by priority (1 = highest)
                const empTasks = AppState.tasks
                    .filter(t => Utils.canDoTask(emp.id, t.id))
                    .filter(t => isTaskAllowedOnDay(t.id, day))
                    .sort((a, b) => a.priority - b.priority); // Sort by priority

                if (empTasks.length === 0) continue;
                
                const availableWindow = Math.max(0, closeMinutes - openMinutes - (hoursToSchedule * 60));
                const randomOffset = availableWindow > 0 ? Math.floor(Math.random() * availableWindow) : 0;
                const startMinutes = openMinutes + randomOffset;
                const endMinutes = startMinutes + Math.floor(hoursToSchedule * 60);
                const actualHours = (endMinutes - startMinutes) / 60;
                
                // Assign tasks based on priority and include linked tasks
                const assignedTasks = new Set();
                const numTasks = Math.min(empTasks.length, 1 + Math.floor(Math.random() * 2));
                
                for (let i = 0; i < numTasks && i < empTasks.length; i++) {
                    const task = empTasks[i];
                    assignedTasks.add(task.id);
                    
                    // Also add linked tasks
                    if (task.linkedTasks && task.linkedTasks.length > 0) {
                        task.linkedTasks.forEach(linkedId => {
                            const linkedTask = AppState.tasks.find(t => t.id === linkedId);
                            if (linkedTask && isTaskAllowedOnDay(linkedId, day) && Utils.canDoTask(emp.id, linkedId)) {
                                assignedTasks.add(linkedId);
                            }
                        });
                    }
                }
                
                AppState.schedule[day].push({
                    id: shiftIdCounter++,
                    employeeId: emp.id,
                    startTime: minutesToTime(startMinutes),
                    endTime: minutesToTime(endMinutes),
                    tasks: Array.from(assignedTasks)
                });
                
                employeeHours[emp.id] += actualHours;
                employeeDays[emp.id]++;
                currentScheduled += actualHours;
            }
        }
    }
    
    saveScheduleToStorage();
    showToast('Rooster automatisch gegenereerd!');
    UI.renderSchedule();
}

// Copy current week to another week
function copyWeekTo() {
    const targetWeek = prompt('Naar welk weeknummer wil je kopiëren?', AppState.currentWeek + 1);
    if (!targetWeek) return;
    
    const weekNum = parseInt(targetWeek);
    if (isNaN(weekNum) || weekNum < 1 || weekNum > 52) {
        showToast('Ongeldig weeknummer (1-52)', 'error');
        return;
    }
    
    if (weekNum === AppState.currentWeek) {
        showToast('Kan niet naar dezelfde week kopiëren', 'error');
        return;
    }
    
    // Copy current schedule to target week
    const scheduleKey = `werkschema_schedule_${AppState.currentStore}_${weekNum}_${AppState.currentYear}`;
    const currentScheduleCopy = JSON.parse(JSON.stringify(AppState.schedule));
    
    // Generate new IDs for copied shifts
    let newIdCounter = shiftIdCounter;
    for (let day = 0; day < 7; day++) {
        (currentScheduleCopy[day] || []).forEach(shift => {
            shift.id = newIdCounter++;
        });
    }
    shiftIdCounter = newIdCounter;
    
    localStorage.setItem(scheduleKey, JSON.stringify(currentScheduleCopy));
    showToast(`Week ${AppState.currentWeek} gekopieerd naar week ${weekNum}!`);
}

// Clear current week
function clearWeek() {
    const totalShifts = AppState.schedule.reduce((sum, day) => sum + day.length, 0);
    
    if (totalShifts === 0) {
        showToast('Het rooster is al leeg!', 'warning');
        return;
    }
    
    showConfirm(
        'Rooster Wissen',
        `Weet je zeker dat je alle ${totalShifts} diensten voor week ${AppState.currentWeek} wilt wissen? Dit kan niet ongedaan worden gemaakt.`,
        () => {
            // Save to history before clearing
            History.saveState();
            
            for (let i = 0; i < 7; i++) {
                AppState.schedule[i] = [];
            }
            
            saveScheduleToStorage();
            showToast('Rooster gewist!');
            UI.renderCurrentPage();
        },
        'Alles Wissen'
    );
}

// Print schedule
function printSchedule() {
    // Create print-friendly version
    const store = AppState.stores[AppState.currentStore];
    const dates = Utils.getWeekDates(AppState.currentWeek, AppState.currentYear);
    const dayNames = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'];
    
    let printHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Werkrooster Week ${AppState.currentWeek} - ${AppState.currentYear}</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: Arial, sans-serif; font-size: 11px; padding: 20px; }
                h1 { font-size: 18px; margin-bottom: 5px; color: #0066CC; }
                h2 { font-size: 14px; margin-bottom: 15px; color: #666; }
                .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #0066CC; padding-bottom: 10px; }
                .header-info { text-align: right; font-size: 10px; color: #666; }
                .day-section { margin-bottom: 15px; page-break-inside: avoid; }
                .day-header { background: #0066CC; color: white; padding: 5px 10px; font-weight: bold; font-size: 12px; }
                .day-date { font-weight: normal; font-size: 10px; margin-left: 10px; }
                table { width: 100%; border-collapse: collapse; margin-top: 5px; }
                th, td { border: 1px solid #ddd; padding: 4px 6px; text-align: left; }
                th { background: #f5f5f5; font-size: 10px; }
                .time { font-weight: bold; }
                .tasks { font-size: 9px; color: #666; }
                .totals { margin-top: 20px; background: #f9f9f9; padding: 10px; }
                .totals-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
                .total-item { text-align: center; }
                .total-value { font-size: 16px; font-weight: bold; color: #0066CC; }
                .total-label { font-size: 9px; color: #666; }
                .footer { margin-top: 20px; font-size: 9px; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 10px; }
                @media print {
                    body { padding: 10px; }
                    .day-section { page-break-inside: avoid; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div>
                    <h1>AH ${store.name}</h1>
                    <h2>Werkrooster Week ${AppState.currentWeek} - ${AppState.currentYear}</h2>
                </div>
                <div class="header-info">
                    Afgedrukt: ${new Date().toLocaleDateString('nl-NL')}<br>
                    Winkel: ${AppState.currentStore}
                </div>
            </div>
    `;
    
    // Add each day
    for (let d = 0; d < 7; d++) {
        const shifts = AppState.schedule[d] || [];
        const date = dates[d];
        const dateStr = date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' });
        const dayHours = Calculator.getScheduledHours(d);
        
        printHTML += `
            <div class="day-section">
                <div class="day-header">
                    ${dayNames[d]} <span class="day-date">${dateStr} • ${dayHours.toFixed(1)} uur • ${shifts.length} shifts</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th style="width: 25%;">Medewerker</th>
                            <th style="width: 15%;">Functie</th>
                            <th style="width: 20%;">Tijd</th>
                            <th style="width: 10%;">Uren</th>
                            <th style="width: 30%;">Taken</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        if (shifts.length === 0) {
            printHTML += `<tr><td colspan="5" style="text-align: center; color: #999;">Geen shifts gepland</td></tr>`;
        } else {
            // Sort shifts by start time
            const sortedShifts = [...shifts].sort((a, b) => a.startTime.localeCompare(b.startTime));
            
            sortedShifts.forEach(shift => {
                const emp = AppState.employees.find(e => e.id === shift.employeeId);
                const grossHours = parseFloat(Utils.calculateHours(shift.startTime, shift.endTime));
                const breakHours = (shift.breakMinutes || 0) / 60;
                const netHours = (grossHours - breakHours).toFixed(1);
                const tasks = (shift.tasks || []).join(', ') || '-';
                
                printHTML += `
                    <tr>
                        <td>${emp ? emp.firstName + ' ' + emp.lastName : 'Onbekend'}</td>
                        <td>${emp ? emp.function : ''}</td>
                        <td class="time">${shift.startTime} - ${shift.endTime}${shift.breakMinutes ? ' (' + shift.breakMinutes + 'min pauze)' : ''}</td>
                        <td>${netHours}u</td>
                        <td class="tasks">${tasks}</td>
                    </tr>
                `;
            });
        }
        
        printHTML += `</tbody></table></div>`;
    }
    
    // Add totals
    const totalHours = Calculator.getTotalScheduledHours();
    const weekData = Utils.getWeekRevenue(AppState.currentStore, AppState.currentWeek, AppState.currentYear);
    const holidayInfo = Utils.getWeekHolidayMultiplier(AppState.currentWeek, AppState.currentYear);
    const totalBudget = Calculator.calculateTotalBudget(weekData.revenue, store.standardRevenue, holidayInfo.multiplier);
    const budgetUsage = totalBudget > 0 ? Math.round((totalHours / totalBudget) * 100) : 0;
    
    // Count unique employees
    const uniqueEmps = new Set();
    for (let d = 0; d < 7; d++) {
        (AppState.schedule[d] || []).forEach(s => uniqueEmps.add(s.employeeId));
    }
    
    printHTML += `
        <div class="totals">
            <div class="totals-grid">
                <div class="total-item">
                    <div class="total-value">${totalHours.toFixed(1)}</div>
                    <div class="total-label">Totaal Uren</div>
                </div>
                <div class="total-item">
                    <div class="total-value">${totalBudget.toFixed(1)}</div>
                    <div class="total-label">Budget Uren</div>
                </div>
                <div class="total-item">
                    <div class="total-value">${budgetUsage}%</div>
                    <div class="total-label">Budget Gebruikt</div>
                </div>
                <div class="total-item">
                    <div class="total-value">${uniqueEmps.size}</div>
                    <div class="total-label">Medewerkers</div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            AH Werkschema Manager • Gegenereerd op ${new Date().toLocaleString('nl-NL')}
        </div>
        </body>
        </html>
    `;
    
    // Open print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printHTML);
    printWindow.document.close();
    printWindow.focus();
    
    // Print after load
    setTimeout(() => {
        printWindow.print();
    }, 250);
}

// Export to CSV
function exportToCSV() {
    const store = AppState.stores[AppState.currentStore];
    const dates = Utils.getWeekDates(AppState.currentWeek, AppState.currentYear);
    const dayNames = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'];
    
    // CSV Header
    let csv = 'Dag,Datum,Medewerker,Functie,Start,Eind,Pauze (min),Netto Uren,Taken,Notities\n';
    
    // Add rows for each shift
    for (let d = 0; d < 7; d++) {
        const shifts = AppState.schedule[d] || [];
        const date = dates[d].toLocaleDateString('nl-NL');
        
        if (shifts.length === 0) {
            csv += `${dayNames[d]},${date},Geen shifts gepland,,,,,,\n`;
        } else {
            const sortedShifts = [...shifts].sort((a, b) => a.startTime.localeCompare(b.startTime));
            
            sortedShifts.forEach(shift => {
                const emp = AppState.employees.find(e => e.id === shift.employeeId);
                const grossHours = parseFloat(Utils.calculateHours(shift.startTime, shift.endTime));
                const breakHours = (shift.breakMinutes || 0) / 60;
                const netHours = (grossHours - breakHours).toFixed(2);
                const tasks = (shift.tasks || []).join('; ');
                const notes = (shift.notes || '').replace(/"/g, '""'); // Escape quotes
                
                csv += `${dayNames[d]},${date},"${emp ? emp.firstName + ' ' + emp.lastName : 'Onbekend'}",${emp ? emp.function : ''},${shift.startTime},${shift.endTime},${shift.breakMinutes || 0},${netHours},"${tasks}","${notes}"\n`;
            });
        }
    }
    
    // Add summary
    csv += '\n';
    csv += 'SAMENVATTING\n';
    csv += `Winkel,${store.name}\n`;
    csv += `Week,${AppState.currentWeek}\n`;
    csv += `Jaar,${AppState.currentYear}\n`;
    csv += `Totaal Uren,${Calculator.getTotalScheduledHours().toFixed(2)}\n`;
    
    // Count unique employees
    const uniqueEmps = new Set();
    for (let d = 0; d < 7; d++) {
        (AppState.schedule[d] || []).forEach(s => uniqueEmps.add(s.employeeId));
    }
    csv += `Medewerkers,${uniqueEmps.size}\n`;
    
    // Download file
    downloadFile(csv, `AH_Rooster_Week${AppState.currentWeek}_${AppState.currentYear}.csv`, 'text/csv');
    showToast('CSV geëxporteerd!');
}

// Export to JSON
function exportToJSON() {
    const store = AppState.stores[AppState.currentStore];
    const dates = Utils.getWeekDates(AppState.currentWeek, AppState.currentYear);
    
    const exportData = {
        metadata: {
            exportDate: new Date().toISOString(),
            store: {
                id: AppState.currentStore,
                name: store.name
            },
            week: AppState.currentWeek,
            year: AppState.currentYear,
            weekDates: dates.map(d => d.toISOString().split('T')[0])
        },
        schedule: {},
        employees: AppState.employees.filter(e => {
            // Only include employees that have shifts this week
            for (let d = 0; d < 7; d++) {
                if ((AppState.schedule[d] || []).some(s => s.employeeId === e.id)) {
                    return true;
                }
            }
            return false;
        }),
        summary: {
            totalHours: Calculator.getTotalScheduledHours(),
            hoursPerDay: [],
            employeeCount: 0
        }
    };
    
    // Add schedule per day
    const dayNames = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'];
    const uniqueEmps = new Set();
    
    for (let d = 0; d < 7; d++) {
        const shifts = AppState.schedule[d] || [];
        shifts.forEach(s => uniqueEmps.add(s.employeeId));
        
        exportData.schedule[dayNames[d]] = {
            date: dates[d].toISOString().split('T')[0],
            shifts: shifts.map(shift => {
                const emp = AppState.employees.find(e => e.id === shift.employeeId);
                const grossHours = parseFloat(Utils.calculateHours(shift.startTime, shift.endTime));
                const netHours = grossHours - ((shift.breakMinutes || 0) / 60);
                
                return {
                    id: shift.id,
                    employee: emp ? {
                        id: emp.id,
                        name: emp.firstName + ' ' + emp.lastName,
                        function: emp.function
                    } : null,
                    startTime: shift.startTime,
                    endTime: shift.endTime,
                    breakMinutes: shift.breakMinutes || 0,
                    netHours: netHours,
                    tasks: shift.tasks || [],
                    notes: shift.notes || ''
                };
            }),
            totalHours: Calculator.getScheduledHours(d)
        };
        
        exportData.summary.hoursPerDay.push({
            day: dayNames[d],
            hours: Calculator.getScheduledHours(d)
        });
    }
    
    exportData.summary.employeeCount = uniqueEmps.size;
    
    // Download file
    const json = JSON.stringify(exportData, null, 2);
    downloadFile(json, `AH_Rooster_Week${AppState.currentWeek}_${AppState.currentYear}.json`, 'application/json');
    showToast('JSON geëxporteerd!');
}

// Helper function to download files
function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType + ';charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Import from JSON file
function importFromJSON(input) {
    const file = input.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            
            // Validate structure
            if (!data.metadata || !data.schedule) {
                throw new Error('Ongeldig bestandsformaat');
            }
            
            // Confirm import
            const weekInfo = `Week ${data.metadata.week} - ${data.metadata.year}`;
            if (!confirm(`Wil je het rooster importeren van ${weekInfo}?\n\nDit zal het huidige rooster voor die week overschrijven.`)) {
                input.value = '';
                return;
            }
            
            // Save history before import
            History.saveState();
            
            // Set week/year from import
            AppState.currentWeek = data.metadata.week;
            AppState.currentYear = data.metadata.year;
            
            // Clear current schedule
            for (let i = 0; i < 7; i++) {
                AppState.schedule[i] = [];
            }
            
            // Import shifts
            const dayNames = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'];
            let importedShifts = 0;
            let skippedShifts = 0;
            
            dayNames.forEach((dayName, dayIndex) => {
                const dayData = data.schedule[dayName];
                if (dayData && dayData.shifts) {
                    dayData.shifts.forEach(shift => {
                        // Find employee by name or id
                        let emp = null;
                        if (shift.employee) {
                            emp = AppState.employees.find(e => e.id === shift.employee.id);
                            if (!emp) {
                                // Try to find by name
                                emp = AppState.employees.find(e => 
                                    (e.firstName + ' ' + e.lastName) === shift.employee.name
                                );
                            }
                        }
                        
                        if (emp) {
                            AppState.schedule[dayIndex].push({
                                id: shiftIdCounter++,
                                employeeId: emp.id,
                                startTime: shift.startTime,
                                endTime: shift.endTime,
                                breakMinutes: shift.breakMinutes || 0,
                                notes: shift.notes || '',
                                tasks: shift.tasks || []
                            });
                            importedShifts++;
                        } else {
                            skippedShifts++;
                        }
                    });
                }
            });
            
            saveScheduleToStorage();
            UI.updateWeekDisplay();
            UI.renderCurrentPage();
            
            let message = `${importedShifts} shifts geïmporteerd!`;
            if (skippedShifts > 0) {
                message += ` (${skippedShifts} overgeslagen - medewerker niet gevonden)`;
            }
            showToast(message);
            
        } catch (err) {
            showToast('Fout bij importeren: ' + err.message, 'error');
        }
        
        input.value = '';
    };
    
    reader.readAsText(file);
}

// =================================== 
// NAVIGATION FUNCTIONS
// ===================================

function showPage(pageName) {
    UI.showPage(pageName);
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

function previousWeek() {
    // Save current schedule before switching
    saveScheduleToStorage();
    
    AppState.currentWeek--;
    if (AppState.currentWeek < 1) {
        AppState.currentWeek = 52;
        AppState.currentYear--;
    }
    
    // Clear history for new week
    History.clear();
    
    // Load schedule for new week or reset
    if (!loadScheduleFromStorage()) {
        // Reset schedule for new week
        for (let i = 0; i < 7; i++) {
            AppState.schedule[i] = [];
        }
    }
    
    UI.updateWeekDisplay();
    UI.renderCurrentPage();
}

function nextWeek() {
    // Save current schedule before switching
    saveScheduleToStorage();
    
    AppState.currentWeek++;
    if (AppState.currentWeek > 52) {
        AppState.currentWeek = 1;
        AppState.currentYear++;
    }
    
    // Clear history for new week
    History.clear();
    
    // Load schedule for new week or reset
    if (!loadScheduleFromStorage()) {
        // Reset schedule for new week
        for (let i = 0; i < 7; i++) {
            AppState.schedule[i] = [];
        }
    }
    
    UI.updateWeekDisplay();
    UI.renderCurrentPage();
}

function changeStore(storeId) {
    if (storeId === AppState.currentStore) return;

    // Persist current store data
    saveScheduleToStorage();
    saveEmployeesToStorage();

    AppState.currentStore = storeId;

    // Reload store-specific settings and data
    loadSettingsFromStorage();
    loadEmployeesFromStorage();

    if (!loadScheduleFromStorage()) {
        for (let i = 0; i < 7; i++) {
            AppState.schedule[i] = [];
        }
    }

    // Reset history and shift id counter for the new store/week
    History.clear();
    let maxId = 0;
    for (let i = 0; i < 7; i++) {
        (AppState.schedule[i] || []).forEach(shift => {
            if (shift.id > maxId) maxId = shift.id;
        });
    }
    shiftIdCounter = maxId + 1;

    UI.updateWeekDisplay();
    UI.renderCurrentPage();
}

function calculateBudget() {
    UI.renderBudget();
}

// ===================================
// TOAST NOTIFICATION
// ===================================

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const icon = toast.querySelector('.toast-icon');
    const msg = toast.querySelector('.toast-message');
    
    msg.textContent = message;
    
    // Handle different icon types
    if (type === 'success') {
        icon.textContent = 'check_circle';
        icon.style.color = '#4CAF50';
    } else if (type === 'error') {
        icon.textContent = 'error';
        icon.style.color = '#F44336';
    } else if (type === 'warning') {
        icon.textContent = 'warning';
        icon.style.color = '#FFA726';
    } else {
        icon.textContent = type; // Custom icon
        icon.style.color = '#4CAF50';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===================================
// CONFIRM DIALOG
// ===================================

let confirmCallback = null;

function showConfirm(title, message, onConfirm, confirmText = 'Bevestigen', isHtml = false) {
    document.getElementById('confirmTitle').textContent = title;
    const messageEl = document.getElementById('confirmMessage');
    
    if (isHtml) {
        messageEl.innerHTML = message;
    } else {
        messageEl.textContent = message;
    }
    
    document.getElementById('confirmBtn').innerHTML = `<span class="material-icons">check</span> ${confirmText}`;
    
    confirmCallback = onConfirm;
    document.getElementById('confirmModal').style.display = 'flex';
}

function closeConfirmModal(confirmed) {
    document.getElementById('confirmModal').style.display = 'none';
    
    if (confirmed && confirmCallback) {
        confirmCallback();
    }
    confirmCallback = null;
}

// ===================================
// LOADING OVERLAY
// ===================================

function showLoading(text = 'Laden...') {
    document.getElementById('loadingText').textContent = text;
    document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

// ===================================
// EMPTY STATE HELPER
// ===================================

function getEmptyState(icon, title, message, buttonText = null, buttonAction = null) {
    let html = `
        <div class="empty-state">
            <span class="material-icons">${icon}</span>
            <h3>${title}</h3>
            <p>${message}</p>
    `;
    
    if (buttonText && buttonAction) {
        html += `<button class="btn btn-primary" onclick="${buttonAction}">${buttonText}</button>`;
    }
    
    html += '</div>';
    return html;
}

// ===================================
// DARK MODE
// ===================================

function initDarkMode() {
    const savedTheme = localStorage.getItem('ahTheme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateDarkModeIcon(true);
    } else if (savedTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        updateDarkModeIcon(false);
    } else {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            updateDarkModeIcon(true);
        }
    }
}

function toggleDarkMode() {
    const isDark = document.documentElement.hasAttribute('data-theme');
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('ahTheme', 'light');
        updateDarkModeIcon(false);
        showToast('Lichte modus geactiveerd', 'light_mode');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('ahTheme', 'dark');
        updateDarkModeIcon(true);
        showToast('Donkere modus geactiveerd', 'dark_mode');
    }
}

function updateDarkModeIcon(isDark) {
    const btn = document.getElementById('darkModeToggle');
    if (btn) {
        btn.querySelector('.material-icons').textContent = isDark ? 'light_mode' : 'dark_mode';
        btn.title = isDark ? 'Lichte modus' : 'Donkere modus';
    }
}

// ===================================
// DATA PERSISTENCE (LocalStorage)
// ===================================

function getScheduleKey() {
    return `ahSchedule_${AppState.currentStore}_${AppState.currentYear}_${AppState.currentWeek}`;
}

function saveScheduleToStorage() {
    const key = getScheduleKey();
    const data = {
        schedule: AppState.schedule,
        savedAt: new Date().toISOString()
    };
    localStorage.setItem(key, JSON.stringify(data));
}

function loadScheduleFromStorage() {
    const key = getScheduleKey();
    const saved = localStorage.getItem(key);
    
    if (saved) {
        try {
            const data = JSON.parse(saved);
            AppState.schedule = data.schedule;
            return true;
        } catch (e) {
            console.error('Error loading schedule:', e);
        }
    }
    return false;
}

function saveEmployeesToStorage() {
    const snapshot = JSON.parse(JSON.stringify(AppState.employees));
    AppState.employeesByStore[AppState.currentStore] = snapshot;
    localStorage.setItem('ahEmployees_' + AppState.currentStore, JSON.stringify(snapshot));
}

function loadEmployeesFromStorage() {
    const saved = localStorage.getItem('ahEmployees_' + AppState.currentStore);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            AppState.employees = parsed;
            AppState.employeesByStore[AppState.currentStore] = JSON.parse(JSON.stringify(parsed));
            return true;
        } catch (e) {
            console.error('Error loading employees:', e);
        }
    }
    if (AppState.employeesByStore[AppState.currentStore]) {
        AppState.employees = JSON.parse(JSON.stringify(AppState.employeesByStore[AppState.currentStore]));
        return true;
    }
    // Fallback: seed with defaults
    AppState.employees = JSON.parse(JSON.stringify(DEFAULT_EMPLOYEES));
    AppState.employeesByStore[AppState.currentStore] = JSON.parse(JSON.stringify(DEFAULT_EMPLOYEES));
    return false;
}

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Set current date
    const now = new Date();
    document.getElementById('currentDate').textContent = Utils.formatDate(now, 'long');
    
    // Set current week
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
    AppState.currentWeek = Math.ceil((days + startOfYear.getDay() + 1) / 7);
    AppState.currentYear = now.getFullYear();
    
    UI.updateWeekDisplay();
    
    // Try to load from localStorage first
    loadSettingsFromStorage();
    const hasStoredSchedule = loadScheduleFromStorage();
    const hasStoredEmployees = loadEmployeesFromStorage();
    
    // Only generate sample data if nothing stored
    if (!hasStoredSchedule) {
        generateSampleData();
        saveScheduleToStorage();
    }
    
    // Update shift counter based on loaded data
    let maxId = 0;
    for (let i = 0; i < 7; i++) {
        (AppState.schedule[i] || []).forEach(shift => {
            if (shift.id > maxId) maxId = shift.id;
        });
    }
    shiftIdCounter = maxId + 1;
    
    // Initialize undo/redo buttons
    History.updateButtons();
    
    // Initialize dark mode from localStorage
    initDarkMode();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl+Z = Undo
        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
            e.preventDefault();
            undo();
        }
        // Ctrl+Shift+Z or Ctrl+Y = Redo
        if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
            e.preventDefault();
            redo();
        }
        // Shift+/ (question mark) = Open shortcuts modal
        if (e.shiftKey && (e.key === '/' || e.key === '?')) {
            e.preventDefault();
            openShortcutsModal();
        }
        // Ctrl/Cmd+P = Print schedule
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
            e.preventDefault();
            printSchedule();
        }
        // Ctrl/Cmd+F = Focus employee search (Employees page)
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
            const searchEl = document.getElementById('employeeSearch');
            if (searchEl) {
                e.preventDefault();
                showPage('employees');
                setTimeout(() => searchEl.focus(), 50);
            }
        }
        // Ctrl/Cmd+Alt+D = Toggle dark mode
        if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === 'd') {
            e.preventDefault();
            toggleDarkMode();
        }
    });
    
    // Employee filter event listeners
    const employeeSearch = document.getElementById('employeeSearch');
    const filterFunction = document.getElementById('filterFunction');
    const filterStatus = document.getElementById('filterStatus');
    
    if (employeeSearch) {
        employeeSearch.addEventListener('input', filterEmployees);
    }
    if (filterFunction) {
        filterFunction.addEventListener('change', filterEmployees);
    }
    if (filterStatus) {
        filterStatus.addEventListener('change', filterEmployees);
    }
    
    // Render initial page
    UI.renderDashboard();
    
    console.log('AH Werkschema Manager geladen!');
    console.log(`Week ${AppState.currentWeek} - ${AppState.currentYear}`);
    console.log(`Data ${hasStoredSchedule ? 'geladen uit opslag' : 'nieuw gegenereerd'}`);
});

// Generate sample data for demo
function generateSampleData() {
    const sampleShifts = [
        // Maandag
        { day: 0, empId: 1, start: '07:00', end: '15:30', tasks: ['wkl'] },
        { day: 0, empId: 2, start: '07:00', end: '15:30', tasks: ['hv', 'hl'] },
        { day: 0, empId: 5, start: '06:00', end: '14:30', tasks: ['act', 'hv'] },
        { day: 0, empId: 7, start: '08:00', end: '16:30', tasks: ['hv', 'nh'] },
        { day: 0, empId: 9, start: '12:00', end: '21:00', tasks: ['vv', 'rv'] },
        { day: 0, empId: 13, start: '09:00', end: '17:00', tasks: ['cas'] },
        { day: 0, empId: 15, start: '12:00', end: '21:00', tasks: ['cas', 'kln'] },
        // Dinsdag
        { day: 1, empId: 1, start: '07:00', end: '15:30', tasks: ['wkl'] },
        { day: 1, empId: 3, start: '06:00', end: '14:30', tasks: ['vv', 'br'] },
        { day: 1, empId: 6, start: '08:00', end: '16:30', tasks: ['hv', 'hl'] },
        { day: 1, empId: 8, start: '14:00', end: '21:00', tasks: ['dv', 'nd'] },
        { day: 1, empId: 10, start: '08:00', end: '16:30', tasks: ['rv', 'nv'] },
        { day: 1, empId: 14, start: '09:00', end: '17:00', tasks: ['cas'] },
        { day: 1, empId: 17, start: '16:00', end: '21:00', tasks: ['cas'] },
        // Woensdag
        { day: 2, empId: 2, start: '06:00', end: '14:30', tasks: ['act', 'hv'] },
        { day: 2, empId: 5, start: '14:00', end: '21:00', tasks: ['wkl'] },
        { day: 2, empId: 7, start: '06:00', end: '14:30', tasks: ['hl', 'nh'] },
        { day: 2, empId: 11, start: '08:00', end: '16:30', tasks: ['hv', 'rh'] },
        { day: 2, empId: 12, start: '07:00', end: '15:30', tasks: ['vv', 'br'] },
        { day: 2, empId: 16, start: '12:00', end: '21:00', tasks: ['cas', 'kln'] },
        // Donderdag
        { day: 3, empId: 1, start: '07:00', end: '15:30', tasks: ['wkl'] },
        { day: 3, empId: 3, start: '06:00', end: '14:30', tasks: ['vv', 'nv'] },
        { day: 3, empId: 4, start: '09:00', end: '17:00', tasks: ['kln'] },
        { day: 3, empId: 9, start: '08:00', end: '16:30', tasks: ['hv', 'hl'] },
        { day: 3, empId: 13, start: '12:00', end: '21:00', tasks: ['cas'] },
        { day: 3, empId: 18, start: '16:00', end: '21:00', tasks: ['dv'] },
        // Vrijdag
        { day: 4, empId: 2, start: '06:00', end: '14:30', tasks: ['act', 'hv'] },
        { day: 4, empId: 5, start: '07:00', end: '15:30', tasks: ['wkl'] },
        { day: 4, empId: 6, start: '14:00', end: '21:00', tasks: ['hl', 'nh'] },
        { day: 4, empId: 8, start: '06:00', end: '14:30', tasks: ['vv', 'br'] },
        { day: 4, empId: 10, start: '08:00', end: '16:30', tasks: ['rv', 'nv'] },
        { day: 4, empId: 14, start: '09:00', end: '17:00', tasks: ['cas'] },
        { day: 4, empId: 15, start: '12:00', end: '21:00', tasks: ['cas'] },
        { day: 4, empId: 19, start: '16:00', end: '21:00', tasks: ['dv', 'nd'] },
        // Zaterdag
        { day: 5, empId: 1, start: '07:00', end: '15:30', tasks: ['wkl'] },
        { day: 5, empId: 3, start: '06:00', end: '14:30', tasks: ['vv', 'br'] },
        { day: 5, empId: 7, start: '06:00', end: '14:30', tasks: ['act', 'hl'] },
        { day: 5, empId: 9, start: '08:00', end: '16:30', tasks: ['hv', 'nh'] },
        { day: 5, empId: 11, start: '12:00', end: '21:00', tasks: ['hl', 'rh'] },
        { day: 5, empId: 12, start: '07:00', end: '15:30', tasks: ['rv', 'nv'] },
        { day: 5, empId: 13, start: '09:00', end: '17:00', tasks: ['cas'] },
        { day: 5, empId: 16, start: '12:00', end: '21:00', tasks: ['cas', 'kln'] },
        { day: 5, empId: 17, start: '14:00', end: '21:00', tasks: ['dv'] },
        { day: 5, empId: 20, start: '14:00', end: '21:00', tasks: ['cas'] },
        // Zondag
        { day: 6, empId: 4, start: '08:00', end: '16:00', tasks: ['kln', 'wkl'] },
        { day: 6, empId: 6, start: '07:00', end: '15:00', tasks: ['vv', 'br'] },
        { day: 6, empId: 8, start: '07:00', end: '15:00', tasks: ['hv', 'hl'] },
        { day: 6, empId: 10, start: '12:00', end: '21:00', tasks: ['rv', 'nv'] },
        { day: 6, empId: 15, start: '09:00', end: '17:00', tasks: ['cas'] },
        { day: 6, empId: 18, start: '12:00', end: '21:00', tasks: ['cas'] },
        { day: 6, empId: 21, start: '12:00', end: '21:00', tasks: ['dv', 'nd'] }
    ];
    
    sampleShifts.forEach(s => {
        AppState.schedule[s.day].push({
            id: shiftIdCounter++,
            employeeId: s.empId,
            startTime: s.start,
            endTime: s.end,
            tasks: s.tasks
        });
    });
}
