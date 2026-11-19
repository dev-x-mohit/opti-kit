/**
 * OptiKit Cron — Zero-dependency Cron expression parser, validator,
 * next-date scheduler, and human-readable English translator.
 */

export interface ParsedCron {
  minutes: number[];
  hours: number[];
  daysOfMonth: number[];
  months: number[];
  daysOfWeek: number[];
}

const MONTH_NAMES: Record<string, number> = {
  JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6,
  JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12
};

const DAY_NAMES: Record<string, number> = {
  SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6
};

function parseField(
  rawField: string,
  min: number,
  max: number,
  aliasMap?: Record<string, number>
): number[] {
  let field = rawField.toUpperCase().trim();

  if (aliasMap) {
    for (const [alias, val] of Object.entries(aliasMap)) {
      field = field.replace(new RegExp(alias, 'g'), String(val));
    }
  }

  const values = new Set<number>();
  const parts = field.split(',');

  for (const part of parts) {
    if (part === '*') {
      for (let i = min; i <= max; i++) values.add(i);
      continue;
    }

    if (part.startsWith('*/')) {
      const step = parseInt(part.slice(2), 10);
      if (isNaN(step) || step <= 0) throw new Error(`Invalid step value in: "${part}"`);
      for (let i = min; i <= max; i += step) values.add(i);
      continue;
    }

    if (part.includes('-')) {
      const [rangePart, stepPart] = part.split('/');
      const [startStr, endStr] = rangePart.split('-');
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      const step = stepPart ? parseInt(stepPart, 10) : 1;

      if (isNaN(start) || isNaN(end) || isNaN(step) || start > end || step <= 0) {
        throw new Error(`Invalid range specification in: "${part}"`);
      }
      for (let i = start; i <= end; i += step) {
        if (i >= min && i <= max) values.add(i);
      }
      continue;
    }

    const singleVal = parseInt(part, 10);
    if (isNaN(singleVal) || singleVal < min || singleVal > max) {
      throw new Error(`Value ${part} out of bounds [${min}-${max}]`);
    }
    values.add(singleVal);
  }

  return Array.from(values).sort((a, b) => a - b);
}

/**
 * Validates whether a cron expression is syntactically valid (5 standard fields).
 */
export function isValidCron(expression: string): boolean {
  try {
    parseCron(expression);
    return true;
  } catch {
    return false;
  }
}

/**
 * Parses a standard 5-part cron expression into integer arrays.
 *
 * @example
 * ```ts
 * parseCron('*\/15 9-17 * * 1-5');
 * ```
 */
export function parseCron(expression: string): ParsedCron {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) {
    throw new Error(`Cron expression must have exactly 5 parts (got ${parts.length}): "${expression}"`);
  }

  const [minPart, hourPart, domPart, monthPart, dowPart] = parts;

  return {
    minutes: parseField(minPart, 0, 59),
    hours: parseField(hourPart, 0, 23),
    daysOfMonth: parseField(domPart, 1, 31),
    months: parseField(monthPart, 1, 12, MONTH_NAMES),
    daysOfWeek: parseField(dowPart, 0, 6, DAY_NAMES),
  };
}

/**
 * Calculates the next occurrence Date matching the cron expression after a reference date.
 *
 * @example
 * ```ts
 * const next = getNextCronDate('0 0 * * *', new Date());
 * ```
 */
export function getNextCronDate(expression: string, fromDate: Date = new Date()): Date {
  const parsed = parseCron(expression);

  // Advance by 1 minute to avoid matching the exact current minute
  const current = new Date(fromDate.getTime() + 60000);
  current.setSeconds(0, 0);

  const startYear = current.getFullYear();

  while (current.getFullYear() <= startYear + 5) {
    const month = current.getMonth() + 1;
    if (!parsed.months.includes(month)) {
      current.setMonth(current.getMonth() + 1, 1);
      current.setHours(0, 0, 0, 0);
      continue;
    }

    const date = current.getDate();
    const dayOfWeek = current.getDay();

    if (!parsed.daysOfMonth.includes(date) || !parsed.daysOfWeek.includes(dayOfWeek)) {
      current.setDate(current.getDate() + 1);
      current.setHours(0, 0, 0, 0);
      continue;
    }

    const hour = current.getHours();
    if (!parsed.hours.includes(hour)) {
      current.setHours(current.getHours() + 1, 0, 0, 0);
      continue;
    }

    const minute = current.getMinutes();
    if (!parsed.minutes.includes(minute)) {
      current.setMinutes(current.getMinutes() + 1, 0, 0);
      continue;
    }

    return new Date(current.getTime());
  }

  throw new Error(`Could not find next cron execution date within 5 years for: "${expression}"`);
}

/**
 * Returns the next N occurrence dates matching the cron expression.
 */
export function getNextCronDates(expression: string, count = 5, fromDate: Date = new Date()): Date[] {
  const dates: Date[] = [];
  let ref = fromDate;
  for (let i = 0; i < count; i++) {
    const next = getNextCronDate(expression, ref);
    dates.push(next);
    ref = next;
  }
  return dates;
}

/**
 * Generates a human-friendly English description of a standard 5-part cron expression.
 *
 * @example
 * ```ts
 * describeCron('*\/15 * * * *'); // 'Every 15 minutes'
 * describeCron('0 9 * * 1-5');   // 'At 09:00 on Monday through Friday'
 * ```
 */
export function describeCron(expression: string): string {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) return 'Custom cron schedule';

  const [min, hour, dom, mon, dow] = parts;

  if (min === '*' && hour === '*' && dom === '*' && mon === '*' && dow === '*') {
    return 'Every minute';
  }

  if (min.startsWith('*/') && hour === '*' && dom === '*' && mon === '*' && dow === '*') {
    return `Every ${min.slice(2)} minutes`;
  }

  if (min === '0' && hour.startsWith('*/') && dom === '*' && mon === '*' && dow === '*') {
    return `Every ${hour.slice(2)} hours`;
  }

  if (dom === '*' && mon === '*' && dow === '*') {
    return `At ${hour.padStart(2, '0')}:${min.padStart(2, '0')} every day`;
  }

  if (dom === '*' && mon === '*' && (dow === '1-5' || dow === 'MON-FRI')) {
    return `At ${hour.padStart(2, '0')}:${min.padStart(2, '0')} on Monday through Friday`;
  }

  if (dom === '1' && mon === '*' && dow === '*') {
    return `At ${hour.padStart(2, '0')}:${min.padStart(2, '0')} on day 1 of every month`;
  }

  return `At minute ${min}, hour ${hour}, day-of-month ${dom}, month ${mon}, day-of-week ${dow}`;
}
