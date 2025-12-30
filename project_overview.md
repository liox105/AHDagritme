# Project Overview: Albert Heijn Werkschema & Dagritme Management System
## Complete Specificaties & Regels voor Development

---

## 🎯 Project Definitie

### Projectnaam
**AH Werkschema Manager** (Codename: AHWM)

### Doel
Een web-based personeelsplanning- en taakbeheersysteem voor Albert Heijn supermarkten dat automatisch urenschema's genereert op basis van omzet, taken optimaliseert, en realtime planning mogelijk maakt.

### Scope
- Multi-store management systeem
- Automatische urenberekening op basis van omzet en normen
- Dagelijkse en wekelijkse personeelsplanning
- Taakbeheer en -toewijzing
- Budget monitoring en rapportage
- Mobile-first interface voor managers en medewerkers
- Hoofdkantoor dashboard voor centrale controle

---

## 🏗️ Technische Stack Aanbeveling

### Backend
```yaml
Framework: Node.js + Express.js (of Python + FastAPI)
Database: PostgreSQL (relationele data) + Redis (caching)
API: REST API met optionele GraphQL
Authentication: JWT met refresh tokens
Real-time: WebSocket (Socket.io) voor live updates
Queue System: Bull/BullMQ voor asynchrone taken
File Processing: Node-xlsx/openpyxl voor Excel import/export
```

### Frontend
```yaml
Framework: React.js + TypeScript
State Management: Redux Toolkit of Zustand
UI Library: Material-UI of Tailwind CSS + Headless UI
Data Tables: TanStack Table (React Table v8)
Charts: Recharts of Chart.js
Date/Time: date-fns of Day.js
Forms: React Hook Form + Zod validation
Routing: React Router v6
```

### DevOps
```yaml
Containerization: Docker + Docker Compose
CI/CD: GitHub Actions of GitLab CI
Hosting: AWS/Azure/Google Cloud
Monitoring: Sentry + LogRocket
Testing: Jest + React Testing Library + Playwright
```

---

## 📊 Database Schema

### Core Tables

#### 1. **stores**
```sql
CREATE TABLE stores (
    store_id VARCHAR(10) PRIMARY KEY,
    store_number INTEGER UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(200),
    postal_code VARCHAR(10),
    city VARCHAR(100),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    is_pickup_point BOOLEAN DEFAULT false,
    sunday_open BOOLEAN DEFAULT true,
    max_daily_hours DECIMAL(4,2) DEFAULT 9.00,
    max_weekly_hours DECIMAL(4,2) DEFAULT 36.50,
    standard_revenue DECIMAL(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_store_number ON stores(store_number);
```

#### 2. **opening_hours**
```sql
CREATE TABLE opening_hours (
    id SERIAL PRIMARY KEY,
    store_id VARCHAR(10) REFERENCES stores(store_id),
    day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Monday
    open_time TIME NOT NULL,
    close_time TIME NOT NULL,
    is_active BOOLEAN DEFAULT true,
    UNIQUE(store_id, day_of_week)
);
```

#### 3. **employees**
```sql
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    store_id VARCHAR(10) REFERENCES stores(store_id),
    employee_number VARCHAR(20) UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    function_id INTEGER REFERENCES functions(function_id),
    is_active BOOLEAN DEFAULT true,
    hire_date DATE,
    contract_hours DECIMAL(4,2), -- Contracted hours per week
    max_daily_hours DECIMAL(4,2) DEFAULT 9.00,
    max_weekly_hours DECIMAL(4,2) DEFAULT 36.50,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_employee_store ON employees(store_id);
CREATE INDEX idx_employee_function ON employees(function_id);
```

#### 4. **functions**
```sql
CREATE TABLE functions (
    function_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    abbreviation VARCHAR(10) NOT NULL,
    hourly_rate DECIMAL(6,2),
    level INTEGER, -- Hierarchy level (1=highest)
    color_code VARCHAR(7), -- Hex color for UI
    description TEXT,
    is_active BOOLEAN DEFAULT true
);

-- Initial data
INSERT INTO functions (name, abbreviation, level) VALUES
('Supermarktmanager', 'SM', 1),
('Manager Operatie', 'MO', 2),
('Manager Vers', 'MV', 2),
('Manager Service', 'MS', 2),
('Shiftleider', 'SL', 3),
('Medewerker Operatie', 'MW', 4),
('Medewerker Vers', 'MW', 4),
('Medewerker Kwaliteit', 'KW', 4),
('Caissière B', 'Cas B', 5),
('Caissière A', 'Cas A', 5),
('Jobstudent', 'JOB', 6),
('Interim-Medewerker', 'IMW', 6),
('Interim - Jobstudent', 'IJOB', 6);
```

#### 5. **task_definitions**
```sql
CREATE TABLE task_definitions (
    task_id SERIAL PRIMARY KEY,
    abbreviation VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50), -- 'houdbaar', 'vers', 'diepvries', 'service'
    is_active BOOLEAN DEFAULT true,
    base_time_minutes INTEGER, -- Base time for task
    has_variable_time BOOLEAN DEFAULT false, -- If time varies by revenue
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial data
INSERT INTO task_definitions (abbreviation, name, category) VALUES
('act', 'Actieopbouw', 'houdbaar'),
('hl', 'Hardlopers vullen', 'houdbaar'),
('hv', 'Houdbaar vullen', 'houdbaar'),
('nh', 'Navulling Houdbaar', 'houdbaar'),
('rh', 'Restant Houdbaar', 'houdbaar'),
('vv', 'Vers vullen', 'vers'),
('nv', 'Navulling Vers', 'vers'),
('rv', 'Restant Vers', 'vers'),
('dv', 'Diepvries vullen', 'diepvries'),
('nd', 'Navulling Diepvries', 'diepvries'),
('rd', 'Restant Diepvries', 'diepvries'),
('br', 'Brood', 'vers'),
('cas', 'Caissière', 'service'),
('kln', 'Klantenservice', 'service'),
('wkl', 'Winkelcontrole', 'service');
```

#### 6. **task_norms**
```sql
CREATE TABLE task_norms (
    norm_id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES task_definitions(task_id),
    store_id VARCHAR(10) REFERENCES stores(store_id), -- NULL = default for all
    norm_type VARCHAR(20) DEFAULT 'standard', -- 'standard', 'expected', 'actual'
    hours_per_100k_revenue DECIMAL(10,4), -- Hours needed per €100k revenue
    fixed_hours DECIMAL(6,2), -- Fixed hours regardless of revenue
    valid_from DATE,
    valid_until DATE,
    notes TEXT,
    UNIQUE(task_id, store_id, norm_type, valid_from)
);

-- Initial norms based on Excel data
INSERT INTO task_norms (task_id, norm_type, hours_per_100k_revenue) VALUES
(1, 'standard', 8.70),  -- act: 32.13 hours / 369.312k = 8.70 per 100k
(2, 'standard', 63.34), -- hl: 233.92 hours / 369.312k
(3, 'standard', 2.94),  -- hv: 10.86 hours / 369.312k
-- etc.
```

#### 7. **task_settings**
```sql
CREATE TABLE task_settings (
    setting_id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES task_definitions(task_id),
    store_id VARCHAR(10) REFERENCES stores(store_id),
    exclusive_days INTEGER[], -- Array of day numbers [0,1,2,3,4,5,6]
    fixed_time TIME, -- If task has fixed time
    priority INTEGER DEFAULT 100, -- Sorting order
    can_overlap BOOLEAN DEFAULT true, -- Can be done simultaneously with other tasks
    min_employees INTEGER DEFAULT 1,
    max_employees INTEGER,
    requires_function_ids INTEGER[], -- Array of function IDs that can do this
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 8. **schedules**
```sql
CREATE TABLE schedules (
    schedule_id SERIAL PRIMARY KEY,
    store_id VARCHAR(10) REFERENCES stores(store_id),
    week_number INTEGER NOT NULL,
    year INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'proposed', 'approved', 'published'
    expected_revenue DECIMAL(12,2),
    total_budgeted_hours DECIMAL(8,2),
    total_scheduled_hours DECIMAL(8,2),
    created_by INTEGER REFERENCES employees(employee_id),
    approved_by INTEGER REFERENCES employees(employee_id),
    approved_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(store_id, week_number, year)
);

CREATE INDEX idx_schedule_week ON schedules(store_id, year, week_number);
```

#### 9. **daily_schedules**
```sql
CREATE TABLE daily_schedules (
    daily_schedule_id SERIAL PRIMARY KEY,
    schedule_id INTEGER REFERENCES schedules(schedule_id),
    date DATE NOT NULL,
    day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
    expected_revenue DECIMAL(10,2),
    budgeted_hours DECIMAL(6,2),
    scheduled_hours DECIMAL(6,2),
    actual_hours DECIMAL(6,2), -- Filled after execution
    revenue_percentage DECIMAL(5,2), -- % of weekly revenue expected
    notes TEXT,
    UNIQUE(schedule_id, date)
);

CREATE INDEX idx_daily_schedule_date ON daily_schedules(date);
```

#### 10. **shifts**
```sql
CREATE TABLE shifts (
    shift_id SERIAL PRIMARY KEY,
    daily_schedule_id INTEGER REFERENCES daily_schedules(daily_schedule_id),
    employee_id INTEGER REFERENCES employees(employee_id),
    function_id INTEGER REFERENCES functions(function_id),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    break_minutes INTEGER DEFAULT 0,
    total_hours DECIMAL(4,2) GENERATED ALWAYS AS (
        EXTRACT(EPOCH FROM (end_time - start_time)) / 3600 - (break_minutes / 60.0)
    ) STORED,
    status VARCHAR(20) DEFAULT 'scheduled', -- 'scheduled', 'confirmed', 'completed', 'cancelled'
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_shift_employee ON shifts(employee_id);
CREATE INDEX idx_shift_date ON shifts(daily_schedule_id);
```

#### 11. **shift_tasks**
```sql
CREATE TABLE shift_tasks (
    shift_task_id SERIAL PRIMARY KEY,
    shift_id INTEGER REFERENCES shifts(shift_id),
    task_id INTEGER REFERENCES task_definitions(task_id),
    start_time TIME,
    end_time TIME,
    estimated_duration_minutes INTEGER,
    actual_duration_minutes INTEGER, -- Filled after completion
    status VARCHAR(20) DEFAULT 'planned', -- 'planned', 'in_progress', 'completed', 'skipped'
    priority INTEGER DEFAULT 100,
    notes TEXT,
    completed_by INTEGER REFERENCES employees(employee_id),
    completed_at TIMESTAMP
);

CREATE INDEX idx_shift_task_shift ON shift_tasks(shift_id);
CREATE INDEX idx_shift_task_status ON shift_tasks(status);
```

#### 12. **holidays_events**
```sql
CREATE TABLE holidays_events (
    event_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    is_holiday BOOLEAN DEFAULT false,
    is_vacation_period BOOLEAN DEFAULT false,
    revenue_multiplier DECIMAL(4,2) DEFAULT 1.00, -- Expected revenue impact
    staffing_multiplier DECIMAL(4,2) DEFAULT 1.00, -- Staffing requirement impact
    affects_stores VARCHAR(10)[], -- NULL = all stores, or specific store_ids
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_event_date ON holidays_events(date);

-- Initial data from Excel
INSERT INTO holidays_events (name, date, is_holiday, revenue_multiplier) VALUES
('Nieuwjaar', '2025-01-01', true, 0.5),
('Driekoningen', '2025-01-06', false, 0.9),
('Valentijnsdag', '2025-02-14', false, 1.1),
('Pasen', '2025-04-20', true, 0.7),
('Koningsdag', '2025-04-27', true, 0.8);
-- Add vacation periods
INSERT INTO holidays_events (name, date, is_vacation_period, revenue_multiplier) 
SELECT 'Kerstvakantie', date, true, 1.2
FROM generate_series('2024-12-30'::date, '2025-01-05'::date, '1 day'::interval) date;
```

#### 13. **budget_distribution**
```sql
CREATE TABLE budget_distribution (
    distribution_id SERIAL PRIMARY KEY,
    store_id VARCHAR(10) REFERENCES stores(store_id),
    day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
    percentage DECIMAL(5,2) NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
    valid_from DATE,
    valid_until DATE,
    UNIQUE(store_id, day_of_week, valid_from)
);

-- Default distribution (equal = 14.29% per day)
-- Can be adjusted based on historical data
```

#### 14. **employee_availability**
```sql
CREATE TABLE employee_availability (
    availability_id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(employee_id),
    date DATE,
    day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6), -- NULL if specific date
    is_available BOOLEAN DEFAULT true,
    start_time TIME,
    end_time TIME,
    max_hours DECIMAL(4,2),
    reason VARCHAR(50), -- 'vacation', 'sick', 'personal', 'preferred'
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_availability_employee ON employee_availability(employee_id);
CREATE INDEX idx_availability_date ON employee_availability(date);
```

#### 15. **user_accounts**
```sql
CREATE TABLE user_accounts (
    user_id SERIAL PRIMARY KEY,
    employee_id INTEGER UNIQUE REFERENCES employees(employee_id),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL, -- 'admin', 'hq_manager', 'store_manager', 'shift_leader', 'employee'
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_email ON user_accounts(email);
CREATE INDEX idx_user_role ON user_accounts(role);
```

#### 16. **audit_log**
```sql
CREATE TABLE audit_log (
    log_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES user_accounts(user_id),
    action VARCHAR(50) NOT NULL, -- 'create', 'update', 'delete', 'approve', 'publish'
    entity_type VARCHAR(50) NOT NULL, -- 'schedule', 'shift', 'task', etc.
    entity_id INTEGER,
    old_data JSONB,
    new_data JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_user ON audit_log(user_id);
CREATE INDEX idx_audit_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_date ON audit_log(created_at);
```

---

## 🔧 Business Logic & Calculation Rules

### 1. **Urenberekening op basis van Omzet**

```javascript
/**
 * Calculate required hours for a task based on revenue
 * @param {number} expectedRevenue - Expected revenue in euros
 * @param {object} taskNorm - Task norm object with hours_per_100k_revenue
 * @param {number} taskNorm.hours_per_100k_revenue - Hours per 100k revenue
 * @param {number} taskNorm.fixed_hours - Fixed hours (optional)
 * @returns {number} Required hours (rounded to 2 decimals)
 */
function calculateTaskHours(expectedRevenue, taskNorm) {
    let hours = 0;
    
    // Variable hours based on revenue
    if (taskNorm.hours_per_100k_revenue) {
        hours += (expectedRevenue / 100000) * taskNorm.hours_per_100k_revenue;
    }
    
    // Fixed hours (always required regardless of revenue)
    if (taskNorm.fixed_hours) {
        hours += taskNorm.fixed_hours;
    }
    
    return Math.round(hours * 100) / 100;
}

/**
 * Calculate daily hours distribution
 * @param {number} weeklyHours - Total weekly hours
 * @param {array} distribution - Array of 7 percentages (Monday=0)
 * @returns {array} Array of hours per day
 */
function distributeDailyHours(weeklyHours, distribution) {
    return distribution.map(percentage => 
        Math.round(weeklyHours * (percentage / 100) * 100) / 100
    );
}

/**
 * Apply holiday/event multiplier to revenue
 * @param {number} baseRevenue - Base expected revenue
 * @param {number} multiplier - Holiday multiplier (default 1.0)
 * @returns {number} Adjusted revenue
 */
function applyEventMultiplier(baseRevenue, multiplier = 1.0) {
    return Math.round(baseRevenue * multiplier * 100) / 100;
}
```

### 2. **Validation Rules**

```javascript
/**
 * Schedule validation rules
 */
const VALIDATION_RULES = {
    // Employee constraints
    MAX_DAILY_HOURS: 9,
    MAX_WEEKLY_HOURS: 36.5,
    MIN_BREAK_MINUTES: 30, // For shifts > 6 hours
    MIN_REST_BETWEEN_SHIFTS: 11 * 60, // 11 hours in minutes
    
    // Shift constraints
    MIN_SHIFT_LENGTH: 2, // hours
    MAX_SHIFT_LENGTH: 9, // hours
    
    // Task constraints
    MAX_CONCURRENT_TASKS: 3, // per employee
    
    // Budget constraints
    BUDGET_WARNING_THRESHOLD: 0.95, // Warn if using >95% of budget
    BUDGET_HARD_LIMIT: 1.10, // Cannot exceed 110% of budget
};

/**
 * Validate employee shift
 * @param {object} shift - Shift object
 * @param {array} existingShifts - Employee's existing shifts
 * @returns {object} { valid: boolean, errors: string[] }
 */
function validateShift(shift, existingShifts) {
    const errors = [];
    
    // Calculate shift duration
    const duration = calculateShiftDuration(shift.start_time, shift.end_time, shift.break_minutes);
    
    // Check shift length
    if (duration < VALIDATION_RULES.MIN_SHIFT_LENGTH) {
        errors.push(`Shift is too short (min ${VALIDATION_RULES.MIN_SHIFT_LENGTH}h)`);
    }
    if (duration > VALIDATION_RULES.MAX_SHIFT_LENGTH) {
        errors.push(`Shift is too long (max ${VALIDATION_RULES.MAX_SHIFT_LENGTH}h)`);
    }
    
    // Check daily hours
    const dailyHours = existingShifts
        .filter(s => isSameDay(s.date, shift.date))
        .reduce((sum, s) => sum + s.total_hours, 0) + duration;
    
    if (dailyHours > VALIDATION_RULES.MAX_DAILY_HOURS) {
        errors.push(`Exceeds max daily hours (${VALIDATION_RULES.MAX_DAILY_HOURS}h)`);
    }
    
    // Check weekly hours
    const weeklyHours = existingShifts
        .filter(s => isSameWeek(s.date, shift.date))
        .reduce((sum, s) => sum + s.total_hours, 0) + duration;
    
    if (weeklyHours > VALIDATION_RULES.MAX_WEEKLY_HOURS) {
        errors.push(`Exceeds max weekly hours (${VALIDATION_RULES.MAX_WEEKLY_HOURS}h)`);
    }
    
    // Check rest between shifts
    const conflictingShift = existingShifts.find(s => {
        const timeBetween = Math.abs(
            new Date(s.end_time) - new Date(shift.start_time)
        ) / 60000; // minutes
        return timeBetween < VALIDATION_RULES.MIN_REST_BETWEEN_SHIFTS;
    });
    
    if (conflictingShift) {
        errors.push('Insufficient rest between shifts (min 11h)');
    }
    
    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Validate schedule budget
 * @param {number} scheduledHours - Total scheduled hours
 * @param {number} budgetedHours - Total budgeted hours
 * @returns {object} { valid: boolean, percentage: number, warning: string }
 */
function validateBudget(scheduledHours, budgetedHours) {
    const percentage = scheduledHours / budgetedHours;
    
    return {
        valid: percentage <= VALIDATION_RULES.BUDGET_HARD_LIMIT,
        percentage: Math.round(percentage * 100),
        warning: percentage > VALIDATION_RULES.BUDGET_WARNING_THRESHOLD 
            ? `Using ${Math.round(percentage * 100)}% of budget`
            : null
    };
}
```

### 3. **Auto-scheduling Algorithm**

```javascript
/**
 * Automatic schedule generation algorithm
 * This is a simplified version - production would be more sophisticated
 */
class ScheduleGenerator {
    constructor(store, weekData, employees, tasks, norms) {
        this.store = store;
        this.weekData = weekData;
        this.employees = employees;
        this.tasks = tasks;
        this.norms = norms;
        this.schedule = [];
    }
    
    /**
     * Generate complete week schedule
     * @returns {array} Array of shifts
     */
    generate() {
        // Step 1: Calculate task requirements for each day
        const dailyRequirements = this.calculateDailyRequirements();
        
        // Step 2: Prioritize tasks
        const prioritizedTasks = this.prioritizeTasks(dailyRequirements);
        
        // Step 3: Assign tasks to time slots
        const timeSlots = this.createTimeSlots();
        
        // Step 4: Match employees to tasks
        const assignments = this.matchEmployeesToTasks(prioritizedTasks, timeSlots);
        
        // Step 5: Optimize schedule
        const optimized = this.optimizeSchedule(assignments);
        
        // Step 6: Validate and adjust
        return this.validateAndAdjust(optimized);
    }
    
    /**
     * Calculate hours needed per task per day
     */
    calculateDailyRequirements() {
        return this.weekData.days.map(day => {
            const requirements = {};
            
            this.tasks.forEach(task => {
                const norm = this.norms.find(n => n.task_id === task.task_id);
                if (!norm) return;
                
                // Check if task is allowed on this day
                const settings = this.getTaskSettings(task.task_id);
                if (settings.exclusive_days && 
                    !settings.exclusive_days.includes(day.day_of_week)) {
                    return;
                }
                
                // Calculate hours
                const hours = calculateTaskHours(day.expected_revenue, norm);
                
                requirements[task.task_id] = {
                    task,
                    hours,
                    priority: settings.priority || 100,
                    time_preference: this.getTimePreference(task, day)
                };
            });
            
            return {
                date: day.date,
                day_of_week: day.day_of_week,
                requirements
            };
        });
    }
    
    /**
     * Get preferred time for task (e.g., restocking early morning)
     */
    getTimePreference(task, day) {
        const preferences = {
            'houdbaar': { start: '06:00', end: '10:00' },
            'vers': { start: '05:00', end: '09:00' },
            'diepvries': { start: '06:00', end: '09:00' },
            'service': { start: '08:00', end: '21:00' }
        };
        
        return preferences[task.category] || { 
            start: this.store.opening_time, 
            end: this.store.closing_time 
        };
    }
    
    /**
     * Create time slots (30-minute intervals)
     */
    createTimeSlots() {
        const slots = [];
        const start = parseTime(this.store.opening_time);
        const end = parseTime(this.store.closing_time);
        
        for (let time = start; time < end; time += 30) {
            slots.push({
                start: formatTime(time),
                end: formatTime(time + 30),
                available_employees: [...this.employees]
            });
        }
        
        return slots;
    }
    
    /**
     * Match employees to tasks based on function and availability
     */
    matchEmployeesToTasks(tasks, timeSlots) {
        const assignments = [];
        
        // Sort tasks by priority
        const sortedTasks = tasks.flatMap(day => 
            Object.values(day.requirements)
        ).sort((a, b) => a.priority - b.priority);
        
        for (const taskReq of sortedTasks) {
            // Find eligible employees
            const eligible = this.employees.filter(emp => 
                this.canDoTask(emp, taskReq.task)
            );
            
            // Find best employee (least scheduled this week)
            const employee = this.selectBestEmployee(eligible);
            
            if (employee) {
                // Find available time slot
                const slot = this.findTimeSlot(
                    employee, 
                    taskReq.time_preference,
                    taskReq.hours
                );
                
                if (slot) {
                    assignments.push({
                        employee,
                        task: taskReq.task,
                        start_time: slot.start,
                        end_time: slot.end,
                        hours: taskReq.hours
                    });
                }
            }
        }
        
        return assignments;
    }
    
    /**
     * Check if employee can do task based on function
     */
    canDoTask(employee, task) {
        const taskSettings = this.getTaskSettings(task.task_id);
        
        if (!taskSettings.requires_function_ids) return true;
        
        return taskSettings.requires_function_ids.includes(
            employee.function_id
        );
    }
    
    /**
     * Select best employee for task
     * Criteria: least hours scheduled, appropriate function, availability
     */
    selectBestEmployee(eligibleEmployees) {
        return eligibleEmployees
            .filter(emp => this.isAvailable(emp))
            .sort((a, b) => {
                const aHours = this.getScheduledHours(a);
                const bHours = this.getScheduledHours(b);
                return aHours - bHours;
            })[0];
    }
    
    /**
     * Optimize schedule by combining tasks, adjusting breaks, etc.
     */
    optimizeSchedule(assignments) {
        // Combine nearby tasks for same employee
        const optimized = [];
        
        assignments.forEach(assignment => {
            const existing = optimized.find(
                a => a.employee.employee_id === assignment.employee.employee_id &&
                     isSameDay(a.date, assignment.date) &&
                     canCombine(a, assignment)
            );
            
            if (existing) {
                // Extend existing shift
                existing.tasks.push(assignment.task);
                existing.end_time = assignment.end_time;
                existing.hours += assignment.hours;
            } else {
                // Create new shift
                optimized.push({
                    ...assignment,
                    tasks: [assignment.task]
                });
            }
        });
        
        return optimized;
    }
    
    /**
     * Final validation and adjustments
     */
    validateAndAdjust(schedule) {
        const validated = [];
        
        for (const shift of schedule) {
            const validation = validateShift(shift, validated);
            
            if (validation.valid) {
                validated.push(shift);
            } else {
                // Try to adjust
                const adjusted = this.adjustShift(shift, validation.errors);
                if (adjusted) {
                    validated.push(adjusted);
                }
            }
        }
        
        return validated;
    }
}
```

### 4. **Excel Export/Import Logic**

```javascript
/**
 * Export schedule to Excel format (matching original structure)
 */
class ExcelExporter {
    constructor(schedule, store) {
        this.schedule = schedule;
        this.store = store;
    }
    
    /**
     * Generate Excel workbook
     * @returns {Workbook} Excel workbook object
     */
    generateWorkbook() {
        const workbook = new ExcelWorkbook();
        
        // Add sheets
        this.addWerkschemaInstelling(workbook);
        this.addWerkschemaRekening(workbook);
        this.addDailySheets(workbook);
        this.addPlanningSheet(workbook);
        this.addMedewerkerSheet(workbook);
        this.addInstellingenSheet(workbook);
        this.addBegrotingSheet(workbook);
        
        return workbook;
    }
    
    /**
     * Add "Werkschema - Instelling" sheet
     */
    addWerkschemaInstelling(workbook) {
        const sheet = workbook.addSheet('Werkschema - Instelling');
        
        // Headers
        sheet.addRow([
            'Omschrijving taak',
            'Afkorting',
            'Koppel',
            'Plustijd',
            'Exclusieve Dag',
            ...['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
            'Vaste tijd',
            'Volgorde',
            'Rekentijd'
        ]);
        
        // Add task data
        this.schedule.tasks.forEach(task => {
            const settings = this.getTaskSettings(task.task_id);
            sheet.addRow([
                task.name,
                task.abbreviation,
                task.linked_tasks || '',
                task.extra_time || '',
                this.formatExclusiveDays(settings.exclusive_days),
                ...this.getExclusiveDayChecks(settings.exclusive_days),
                settings.fixed_time || '',
                settings.priority || 100,
                this.calculateTaskTime(task)
            ]);
        });
        
        return sheet;
    }
    
    /**
     * Add daily sheets (Ma, Di, Wo, etc.)
     */
    addDailySheets(workbook) {
        const dayNames = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
        
        this.schedule.days.forEach((day, index) => {
            const sheet = workbook.addSheet(dayNames[index]);
            
            // Create time-based grid (rows = time slots, cols = employees)
            this.createDailyGrid(sheet, day);
        });
    }
    
    /**
     * Create hourly grid for daily schedule
     */
    createDailyGrid(sheet, day) {
        // Headers: time slots
        const timeSlots = this.generateTimeSlots(
            this.store.opening_time,
            this.store.closing_time,
            30 // 30-minute intervals
        );
        
        // First column: times
        sheet.getColumn(1).values = ['Tijd', ...timeSlots];
        
        // Subsequent columns: employees
        day.shifts.forEach((shift, index) => {
            const colIndex = index + 2;
            const column = sheet.getColumn(colIndex);
            
            // Header: employee name
            column.values[0] = `${shift.employee.first_name} ${shift.employee.last_name}`;
            
            // Fill time slots with tasks
            shift.tasks.forEach(task => {
                const startRow = this.timeToRow(task.start_time, timeSlots);
                const endRow = this.timeToRow(task.end_time, timeSlots);
                
                for (let row = startRow; row <= endRow; row++) {
                    column.values[row] = task.abbreviation;
                    
                    // Apply color coding
                    sheet.getCell(row, colIndex).fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: this.getTaskColor(task) }
                    };
                }
            });
        });
    }
}

/**
 * Import Excel schedule
 */
class ExcelImporter {
    /**
     * Parse Excel file and convert to database format
     * @param {Buffer} fileBuffer - Excel file buffer
     * @returns {object} Parsed schedule data
     */
    async parseExcelFile(fileBuffer) {
        const workbook = new ExcelReader(fileBuffer);
        
        const data = {
            store: await this.parseStoreInfo(workbook),
            tasks: await this.parseTasks(workbook),
            employees: await this.parseEmployees(workbook),
            schedule: await this.parseSchedule(workbook),
            settings: await this.parseSettings(workbook)
        };
        
        return data;
    }
    
    /**
     * Parse "Werkschema - Instelling" sheet
     */
    async parseTasks(workbook) {
        const sheet = workbook.getSheet('Werkschema - Instelling');
        const tasks = [];
        
        // Skip header row
        for (let row = 2; row <= sheet.lastRow; row++) {
            const rowData = sheet.getRow(row);
            
            if (!rowData[1]) continue; // Skip empty rows
            
            tasks.push({
                name: rowData[0],
                abbreviation: rowData[1],
                linked_tasks: rowData[2],
                extra_time: rowData[3],
                exclusive_days: this.parseExclusiveDays(rowData.slice(4, 11)),
                fixed_time: rowData[11],
                priority: rowData[12],
                calculated_time: rowData[13]
            });
        }
        
        return tasks;
    }
}
```

---

## 🌐 API Endpoints

### Authentication
```
POST   /api/auth/login              - Login user
POST   /api/auth/logout             - Logout user
POST   /api/auth/refresh            - Refresh access token
POST   /api/auth/forgot-password    - Request password reset
POST   /api/auth/reset-password     - Reset password
GET    /api/auth/me                 - Get current user
```

### Stores
```
GET    /api/stores                  - List all stores
GET    /api/stores/:id              - Get store details
POST   /api/stores                  - Create store (admin)
PUT    /api/stores/:id              - Update store
DELETE /api/stores/:id              - Delete store (admin)
GET    /api/stores/:id/hours        - Get opening hours
PUT    /api/stores/:id/hours        - Update opening hours
```

### Employees
```
GET    /api/employees               - List employees (filtered by store)
GET    /api/employees/:id           - Get employee details
POST   /api/employees               - Create employee
PUT    /api/employees/:id           - Update employee
DELETE /api/employees/:id           - Deactivate employee
GET    /api/employees/:id/availability  - Get availability
PUT    /api/employees/:id/availability  - Update availability
GET    /api/employees/:id/schedules     - Get employee's schedules
```

### Functions
```
GET    /api/functions               - List all functions
GET    /api/functions/:id           - Get function details
POST   /api/functions               - Create function (admin)
PUT    /api/functions/:id           - Update function (admin)
```

### Tasks
```
GET    /api/tasks                   - List all task definitions
GET    /api/tasks/:id               - Get task details
POST   /api/tasks                   - Create task (admin)
PUT    /api/tasks/:id               - Update task
DELETE /api/tasks/:id               - Delete task (admin)
GET    /api/tasks/:id/norms         - Get task norms
POST   /api/tasks/:id/norms         - Create/update task norm
GET    /api/tasks/:id/settings      - Get task settings
PUT    /api/tasks/:id/settings      - Update task settings
```

### Schedules
```
GET    /api/schedules               - List schedules (filtered by store/date)
GET    /api/schedules/:id           - Get schedule details
POST   /api/schedules               - Create new schedule
PUT    /api/schedules/:id           - Update schedule
DELETE /api/schedules/:id           - Delete draft schedule
POST   /api/schedules/generate      - Auto-generate schedule
POST   /api/schedules/:id/approve   - Approve schedule
POST   /api/schedules/:id/publish   - Publish schedule
GET    /api/schedules/:id/budget    - Get budget comparison
GET    /api/schedules/:id/export    - Export to Excel
POST   /api/schedules/import        - Import from Excel
```

### Daily Schedules
```
GET    /api/daily-schedules         - List daily schedules
GET    /api/daily-schedules/:id     - Get daily schedule
PUT    /api/daily-schedules/:id     - Update daily schedule
GET    /api/daily-schedules/:id/shifts  - Get shifts for day
```

### Shifts
```
GET    /api/shifts                  - List shifts
GET    /api/shifts/:id              - Get shift details
POST   /api/shifts                  - Create shift
PUT    /api/shifts/:id              - Update shift
DELETE /api/shifts/:id              - Delete shift
POST   /api/shifts/:id/confirm      - Confirm shift (employee)
POST   /api/shifts/:id/complete     - Mark shift complete
GET    /api/shifts/:id/tasks        - Get shift tasks
POST   /api/shifts/:id/tasks        - Add task to shift
PUT    /api/shifts/:id/tasks/:taskId  - Update task status
```

### Holidays & Events
```
GET    /api/events                  - List holidays/events
GET    /api/events/:id              - Get event details
POST   /api/events                  - Create event (admin)
PUT    /api/events/:id              - Update event
DELETE /api/events/:id              - Delete event
GET    /api/events/calendar/:year/:month  - Get monthly calendar
```

### Reports
```
GET    /api/reports/hours           - Hours report (by store/employee/period)
GET    /api/reports/budget          - Budget analysis
GET    /api/reports/tasks           - Task completion report
GET    /api/reports/productivity    - Productivity metrics
GET    /api/reports/export/pdf      - Export report as PDF
GET    /api/reports/export/excel    - Export report as Excel
```

### Dashboard
```
GET    /api/dashboard/overview      - Dashboard overview
GET    /api/dashboard/today         - Today's schedule overview
GET    /api/dashboard/week          - Week overview
GET    /api/dashboard/alerts        - Get alerts/notifications
```

---

## 🎨 Frontend Components Structure

### Pages
```
/
├── /login                          - Login page
├── /dashboard                      - Main dashboard
├── /stores                         - Store management
│   ├── /list                       - List stores
│   ├── /:id                        - Store details
│   └── /:id/settings               - Store settings
├── /employees                      - Employee management
│   ├── /list                       - List employees
│   ├── /:id                        - Employee profile
│   └── /availability               - Availability management
├── /schedules                      - Schedule management
│   ├── /list                       - List schedules
│   ├── /create                     - Create new schedule
│   ├── /:id                        - View/edit schedule
│   ├── /:id/day/:date              - Daily schedule view
│   └── /calendar                   - Calendar view
├── /tasks                          - Task management
│   ├── /definitions                - Task definitions
│   └── /norms                      - Task norms
├── /reports                        - Reporting
│   ├── /hours                      - Hours report
│   ├── /budget                     - Budget report
│   └── /productivity               - Productivity report
└── /settings                       - System settings
    ├── /profile                    - User profile
    ├── /functions                  - Function management
    └── /holidays                   - Holidays/events
```

### Component Hierarchy

```jsx
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── Navigation
│   │   ├── StoreSelector
│   │   └── UserMenu
│   ├── Sidebar
│   │   ├── MainNavigation
│   │   └── QuickActions
│   └── Footer
│
├── Dashboard
│   ├── DashboardHeader
│   ├── QuickStats
│   │   ├── StatCard (Hours)
│   │   ├── StatCard (Budget)
│   │   ├── StatCard (Employees)
│   │   └── StatCard (Tasks)
│   ├── TodaySchedule
│   │   ├── ScheduleTimeline
│   │   └── ShiftCard[]
│   ├── WeekOverview
│   │   └── WeeklyChart
│   ├── UpcomingShifts
│   │   └── ShiftList
│   └── Alerts
│       └── AlertCard[]
│
├── ScheduleManagement
│   ├── ScheduleList
│   │   ├── ScheduleTable
│   │   └── ScheduleFilters
│   ├── ScheduleEditor
│   │   ├── WeekView
│   │   │   ├── DayColumn[]
│   │   │   │   ├── EmployeeRow[]
│   │   │   │   │   ├── ShiftBlock
│   │   │   │   │   └── TaskChip[]
│   │   │   │   └── AddShiftButton
│   │   │   └── TimeScale
│   │   ├── ScheduleSidebar
│   │   │   ├── EmployeeList
│   │   │   ├── TaskList
│   │   │   └── BudgetSummary
│   │   └── ScheduleToolbar
│   │       ├── AutoGenerateButton
│   │       ├── SaveButton
│   │       ├── ApproveButton
│   │       └── ExportButton
│   ├── DailySchedule
│   │   ├── TimelineView
│   │   ├── EmployeeCards[]
│   │   └── TaskDistribution
│   └── ScheduleCalendar
│       └── CalendarGrid
│
├── EmployeeManagement
│   ├── EmployeeList
│   │   ├── EmployeeTable
│   │   └── EmployeeFilters
│   ├── EmployeeProfile
│   │   ├── BasicInfo
│   │   ├── ContractDetails
│   │   ├── AvailabilityCalendar
│   │   ├── ScheduleHistory
│   │   └── PerformanceMetrics
│   └── AvailabilityManager
│       ├── WeeklyAvailability
│       └── RequestTimeOff
│
├── TaskManagement
│   ├── TaskDefinitions
│   │   ├── TaskTable
│   │   └── TaskEditor
│   ├── TaskNorms
│   │   ├── NormTable
│   │   └── NormCalculator
│   └── TaskSettings
│       └── SettingsForm
│
├── Reports
│   ├── HoursReport
│   │   ├── ReportFilters
│   │   ├── HoursChart
│   │   └── HoursTable
│   ├── BudgetReport
│   │   ├── BudgetOverview
│   │   ├── BudgetVsActual
│   │   └── CostBreakdown
│   └── ProductivityReport
│       ├── ProductivityMetrics
│       └── TaskEfficiency
│
└── Shared Components
    ├── Forms
    │   ├── Input
    │   ├── Select
    │   ├── DatePicker
    │   ├── TimePicker
    │   ├── Checkbox
    │   └── FormField
    ├── Tables
    │   ├── DataTable
    │   ├── TableHeader
    │   ├── TableRow
    │   └── TablePagination
    ├── Modals
    │   ├── Modal
    │   ├── ConfirmDialog
    │   └── Drawer
    ├── Cards
    │   ├── Card
    │   ├── StatCard
    │   └── InfoCard
    ├── Charts
    │   ├── LineChart
    │   ├── BarChart
    │   └── PieChart
    ├── UI Elements
    │   ├── Button
    │   ├── Badge
    │   ├── Chip
    │   ├── Avatar
    │   ├── Spinner
    │   └── Toast
    └── Layout
        ├── Container
        ├── Grid
        └── Stack
```

---

## 📱 User Roles & Permissions

### Role Definitions

```javascript
const ROLES = {
    ADMIN: {
        name: 'Admin',
        permissions: ['*'], // All permissions
        description: 'Full system access'
    },
    
    HQ_MANAGER: {
        name: 'HQ Manager',
        permissions: [
            'view:all_stores',
            'edit:all_stores',
            'view:all_schedules',
            'approve:schedules',
            'view:all_reports',
            'manage:functions',
            'manage:task_norms',
            'manage:holidays'
        ],
        description: 'Hoofdkantoor manager met toegang tot alle winkels'
    },
    
    STORE_MANAGER: {
        name: 'Store Manager',
        permissions: [
            'view:own_store',
            'edit:own_store',
            'view:schedules',
            'create:schedules',
            'edit:schedules',
            'approve:schedules',
            'manage:employees',
            'manage:shifts',
            'view:reports',
            'export:schedules'
        ],
        description: 'Winkelmanager voor eigen winkel'
    },
    
    SHIFT_LEADER: {
        name: 'Shift Leader',
        permissions: [
            'view:own_store',
            'view:schedules',
            'edit:shifts', // Limited to assigned shifts
            'manage:tasks',
            'view:employees',
            'confirm:shifts'
        ],
        description: 'Shiftleider met beperkte beheermogelijkheden'
    },
    
    EMPLOYEE: {
        name: 'Employee',
        permissions: [
            'view:own_schedule',
            'view:own_shifts',
            'update:availability',
            'confirm:own_shifts',
            'view:own_tasks'
        ],
        description: 'Medewerker met toegang tot eigen roosters'
    }
};
```

### Permission Check Middleware

```javascript
/**
 * Check if user has permission
 * @param {string} permission - Permission to check (e.g., 'create:schedules')
 * @returns {function} Express middleware
 */
function requirePermission(permission) {
    return async (req, res, next) => {
        const user = req.user;
        
        if (!user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        
        const role = ROLES[user.role];
        
        // Admin has all permissions
        if (role.permissions.includes('*')) {
            return next();
        }
        
        // Check specific permission
        if (role.permissions.includes(permission)) {
            return next();
        }
        
        // Check wildcard permissions (e.g., 'edit:*')
        const [action, resource] = permission.split(':');
        if (role.permissions.includes(`${action}:*`) || 
            role.permissions.includes(`*:${resource}`)) {
            return next();
        }
        
        return res.status(403).json({ 
            error: 'Insufficient permissions',
            required: permission
        });
    };
}
```

---

## 🚀 Development Roadmap

### Phase 1: Foundation (Weeks 1-4)
- [ ] Set up project structure and development environment
- [ ] Design and implement database schema
- [ ] Create authentication system
- [ ] Build basic API endpoints (CRUD for core entities)
- [ ] Set up frontend project with routing
- [ ] Implement basic UI components library

### Phase 2: Core Features (Weeks 5-8)
- [ ] Store management interface
- [ ] Employee management system
- [ ] Task definitions and norms configuration
- [ ] Basic schedule viewing functionality
- [ ] Opening hours and availability management
- [ ] Holiday/event calendar

### Phase 3: Scheduling Engine (Weeks 9-12)
- [ ] Budget calculation logic
- [ ] Manual schedule creation interface
- [ ] Shift editor with drag-and-drop
- [ ] Validation engine
- [ ] Auto-schedule generation algorithm
- [ ] Schedule optimization

### Phase 4: Advanced Features (Weeks 13-16)
- [ ] Excel import/export functionality
- [ ] Multi-week scheduling
- [ ] Schedule templates
- [ ] Copy/paste schedule functionality
- [ ] Bulk operations
- [ ] Schedule comparison view

### Phase 5: Reporting & Analytics (Weeks 17-18)
- [ ] Hours reports
- [ ] Budget analysis reports
- [ ] Productivity metrics
- [ ] Export to PDF/Excel
- [ ] Dashboard analytics

### Phase 6: Mobile & Notifications (Weeks 19-20)
- [ ] Responsive mobile interface
- [ ] Push notifications
- [ ] Employee shift confirmation
- [ ] Real-time updates via WebSocket
- [ ] Mobile app (optional)

### Phase 7: Testing & Refinement (Weeks 21-22)
- [ ] Integration testing
- [ ] User acceptance testing
- [ ] Performance optimization
- [ ] Bug fixes
- [ ] Documentation

### Phase 8: Deployment (Week 23-24)
- [ ] Production environment setup
- [ ] Data migration tools
- [ ] User training materials
- [ ] Go-live support
- [ ] Post-launch monitoring

---

## 🧪 Testing Strategy

### Unit Tests
```javascript
// Example test for hours calculation
describe('calculateTaskHours', () => {
    it('should calculate hours based on revenue', () => {
        const norm = {
            hours_per_100k_revenue: 10,
            fixed_hours: 2
        };
        
        const result = calculateTaskHours(369312, norm);
        expect(result).toBeCloseTo(38.93, 2); // (369312/100000)*10 + 2
    });
    
    it('should handle zero revenue', () => {
        const norm = {
            hours_per_100k_revenue: 10,
            fixed_hours: 2
        };
        
        const result = calculateTaskHours(0, norm);
        expect(result).toBe(2); // Only fixed hours
    });
});

describe('validateShift', () => {
    it('should reject shift exceeding max daily hours', () => {
        const shift = {
            start_time: '08:00',
            end_time: '19:00', // 11 hours
            break_minutes: 30
        };
        
        const result = validateShift(shift, []);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Exceeds max daily hours (9h)');
    });
});
```

### Integration Tests
```javascript
// Example API integration test
describe('POST /api/schedules', () => {
    it('should create a new schedule', async () => {
        const response = await request(app)
            .post('/api/schedules')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                store_id: '3138',
                week_number: 1,
                year: 2025,
                expected_revenue: 369312
            });
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('schedule_id');
    });
    
    it('should reject duplicate schedule', async () => {
        // Create first schedule
        await createSchedule({ store_id: '3138', week_number: 1, year: 2025 });
        
        // Try to create duplicate
        const response = await request(app)
            .post('/api/schedules')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                store_id: '3138',
                week_number: 1,
                year: 2025
            });
        
        expect(response.status).toBe(409); // Conflict
    });
});
```

### E2E Tests (Playwright)
```javascript
// Example end-to-end test
test('Store manager can create and approve weekly schedule', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('[name="email"]', 'manager@ah.nl');
    await page.fill('[name="password"]', 'password');
    await page.click('button[type="submit"]');
    
    // Navigate to schedules
    await page.click('text=Schedules');
    await page.click('text=Create New Schedule');
    
    // Fill schedule details
    await page.selectOption('[name="week"]', '1');
    await page.selectOption('[name="year"]', '2025');
    await page.fill('[name="expected_revenue"]', '369312');
    
    // Auto-generate
    await page.click('text=Auto-generate');
    await page.waitForSelector('text=Schedule generated successfully');
    
    // Verify schedule
    await expect(page.locator('.schedule-grid')).toBeVisible();
    await expect(page.locator('.shift-block')).toHaveCount({ atLeast: 10 });
    
    // Approve
    await page.click('text=Approve Schedule');
    await page.click('text=Confirm');
    await expect(page.locator('text=Schedule approved')).toBeVisible();
});
```

---

## 📦 Project File Structure

```
ah-werkschema-manager/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── redis.js
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── Store.js
│   │   │   ├── Employee.js
│   │   │   ├── Schedule.js
│   │   │   ├── Shift.js
│   │   │   └── Task.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── storeController.js
│   │   │   ├── employeeController.js
│   │   │   ├── scheduleController.js
│   │   │   ├── shiftController.js
│   │   │   └── taskController.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── store.routes.js
│   │   │   ├── employee.routes.js
│   │   │   ├── schedule.routes.js
│   │   │   └── task.routes.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   ├── permission.middleware.js
│   │   │   ├── validation.middleware.js
│   │   │   └── error.middleware.js
│   │   ├── services/
│   │   │   ├── scheduleGenerator.service.js
│   │   │   ├── budgetCalculator.service.js
│   │   │   ├── validation.service.js
│   │   │   ├── excel.service.js
│   │   │   └── notification.service.js
│   │   ├── utils/
│   │   │   ├── dateHelpers.js
│   │   │   ├── calculations.js
│   │   │   └── logger.js
│   │   ├── jobs/
│   │   │   ├── scheduleReminder.job.js
│   │   │   └── reportGeneration.job.js
│   │   ├── database/
│   │   │   ├── migrations/
│   │   │   │   ├── 001_create_stores.sql
│   │   │   │   ├── 002_create_employees.sql
│   │   │   │   └── ...
│   │   │   └── seeds/
│   │   │       ├── functions.sql
│   │   │       ├── task_definitions.sql
│   │   │       └── holidays.sql
│   │   └── app.js
│   ├── tests/
│   │   ├── unit/
│   │   │   ├── calculations.test.js
│   │   │   └── validation.test.js
│   │   ├── integration/
│   │   │   ├── schedule.test.js
│   │   │   └── employee.test.js
│   │   └── setup.js
│   ├── .env.example
│   ├── package.json
│   └── Dockerfile
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── styles/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button/
│   │   │   │   ├── Input/
│   │   │   │   ├── Table/
│   │   │   │   └── Modal/
│   │   │   ├── layout/
│   │   │   │   ├── Header/
│   │   │   │   ├── Sidebar/
│   │   │   │   └── Footer/
│   │   │   ├── schedule/
│   │   │   │   ├── ScheduleGrid/
│   │   │   │   ├── ShiftEditor/
│   │   │   │   └── TaskChip/
│   │   │   ├── employee/
│   │   │   │   ├── EmployeeList/
│   │   │   │   └── AvailabilityCalendar/
│   │   │   └── reports/
│   │   │       ├── HoursChart/
│   │   │       └── BudgetChart/
│   │   ├── pages/
│   │   │   ├── Login/
│   │   │   ├── Dashboard/
│   │   │   ├── Schedules/
│   │   │   ├── Employees/
│   │   │   ├── Reports/
│   │   │   └── Settings/
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useSchedule.js
│   │   │   └── useEmployees.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.service.js
│   │   │   ├── schedule.service.js
│   │   │   └── employee.service.js
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── scheduleSlice.js
│   │   │   │   └── employeeSlice.js
│   │   │   └── store.js
│   │   ├── utils/
│   │   │   ├── dateHelpers.js
│   │   │   ├── calculations.js
│   │   │   └── formatters.js
│   │   ├── types/
│   │   │   ├── schedule.types.ts
│   │   │   ├── employee.types.ts
│   │   │   └── task.types.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── tests/
│   │   ├── components/
│   │   └── e2e/
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml
├── .gitignore
├── README.md
└── docs/
    ├── API.md
    ├── DATABASE.md
    ├── DEPLOYMENT.md
    └── USER_GUIDE.md
```

---

## 🔐 Security Considerations

### Authentication & Authorization
- JWT tokens with short expiration (15 min) and refresh tokens
- Secure password hashing (bcrypt with salt rounds ≥ 10)
- Role-based access control (RBAC)
- Multi-factor authentication (optional, for HQ users)

### Data Protection
- Encrypt sensitive data at rest
- HTTPS only (TLS 1.3)
- SQL injection prevention (parameterized queries)
- XSS prevention (input sanitization, CSP headers)
- CSRF protection (tokens)

### API Security
- Rate limiting (per user and per IP)
- Request validation (Joi/Zod)
- Input sanitization
- Output encoding
- CORS configuration

### Audit & Compliance
- Complete audit log of all actions
- GDPR compliance (data export, deletion)
- Regular security audits
- Backup and recovery procedures

---

## 📈 Performance Optimization

### Database
- Proper indexing on frequently queried columns
- Query optimization and EXPLAIN analysis
- Connection pooling
- Database caching (Redis)
- Pagination for large datasets

### Backend
- API response caching
- Async operations for heavy calculations
- Queue system for background jobs
- Compression (gzip)
- Load balancing

### Frontend
- Code splitting and lazy loading
- Image optimization
- Service worker for offline support
- Debouncing and throttling
- Virtual scrolling for large tables
- Memoization of expensive calculations

---

## 📊 Monitoring & Analytics

### Application Monitoring
- Error tracking (Sentry)
- Performance monitoring (New Relic/DataDog)
- User session recording (LogRocket)
- Uptime monitoring

### Business Metrics
- Schedule creation rate
- Schedule approval time
- Budget variance
- Employee satisfaction
- System adoption rate

### Alerts
- System errors
- Performance degradation
- Budget overruns
- Missing schedules
- Employee availability issues

---

## 🎓 Documentation Requirements

### Technical Documentation
- API documentation (OpenAPI/Swagger)
- Database schema documentation
- Architecture diagrams
- Development setup guide
- Deployment procedures

### User Documentation
- User manual (per role)
- Video tutorials
- FAQ
- Troubleshooting guide
- Best practices

---

## 💰 Cost Estimation

### Development (24 weeks)
- Backend Developer: €60/h × 960h = €57,600
- Frontend Developer: €60/h × 960h = €57,600
- UI/UX Designer: €50/h × 240h = €12,000
- Project Manager: €70/h × 240h = €16,800
- QA Engineer: €50/h × 480h = €24,000
**Total Development: €168,000**

### Infrastructure (Annual)
- Cloud hosting (AWS/Azure): €3,000
- Database: €1,200
- CDN & Storage: €600
- Monitoring tools: €1,200
- Email service: €300
- SSL certificates: €100
**Total Infrastructure: €6,400/year**

### Maintenance (Annual)
- Support & bug fixes: €20,000
- Feature updates: €15,000
- Security updates: €5,000
**Total Maintenance: €40,000/year**

---

## ✅ Success Criteria

1. **Functional Requirements**
   - [ ] System can generate schedules automatically
   - [ ] Budget calculations are accurate within 2%
   - [ ] All validations work correctly
   - [ ] Excel import/export works flawlessly

2. **Performance**
   - [ ] Page load time < 2 seconds
   - [ ] Schedule generation < 30 seconds
   - [ ] API response time < 500ms (95th percentile)

3. **User Adoption**
   - [ ] 80% of stores using the system within 3 months
   - [ ] Average user session > 10 minutes
   - [ ] User satisfaction score > 4/5

4. **Business Impact**
   - [ ] 20% reduction in scheduling time
   - [ ] 10% improvement in budget accuracy
   - [ ] 15% reduction in scheduling conflicts

---

**Document Version:** 1.0  
**Last Updated:** December 2024  
**Author:** Claude (AH Werkschema Project)
