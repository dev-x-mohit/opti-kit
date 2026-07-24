/**
 * Extended CSV Utilities
 */

export function jsonToCsv(json: Record<string, any>[], delimiter = ','): string {
  if (json.length === 0) return '';
  const headers = Object.keys(json[0]);
  const rows = json.map(row => 
    headers.map(header => {
      let cell = row[header] === null || row[header] === undefined ? '' : String(row[header]);
      if (cell.includes(delimiter) || cell.includes('\n') || cell.includes('"')) {
        cell = '"' + cell.replace(/"/g, '""') + '"';
      }
      return cell;
    }).join(delimiter)
  );
  return [headers.join(delimiter), ...rows].join('\n');
}

export function csvToJson(csv: string, delimiter = ','): Record<string, string>[] {
  const rows = csv.split('\n').filter(r => r.trim() !== '');
  if (rows.length === 0) return [];
  const headers = parseCsvRow(rows[0], delimiter);
  return rows.slice(1).map(rowStr => {
    const values = parseCsvRow(rowStr, delimiter);
    return headers.reduce((acc, header, i) => {
      acc[header] = values[i] || '';
      return acc;
    }, {} as Record<string, string>);
  });
}

export function parseCsvRow(row: string, delimiter = ','): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    if (char === '"') {
      if (inQuotes && row[i+1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

export function stringifyCsvRow(row: string[], delimiter = ','): string {
  return row.map(cell => {
    if (cell.includes(delimiter) || cell.includes('\n') || cell.includes('"')) {
      return '"' + cell.replace(/"/g, '""') + '"';
    }
    return cell;
  }).join(delimiter);
}

export function detectCsvDelimiter(csv: string): string {
  const line = csv.split('\n')[0] || '';
  const delimiters = [',', ';', '\t', '|'];
  let maxCount = 0;
  let best = ',';
  for (const d of delimiters) {
    const count = line.split(d).length - 1;
    if (count > maxCount) {
      maxCount = count;
      best = d;
    }
  }
  return best;
}
