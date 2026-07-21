export interface CsvParseOptions {
  delimiter?: string;
  hasHeaders?: boolean;
  skipEmpty?: boolean;
}

export interface CsvStringifyOptions {
  delimiter?: string;
  headers?: string[];
  includeHeaders?: boolean;
}

/**
 * Parses a CSV/TSV string into an array of objects (if headers are present) or raw string arrays.
 * Handles quoted cells containing delimiters, newlines, and escaped quotes ("").
 */
export function csvParse(
  csv: string,
  options: CsvParseOptions = {}
): Record<string, string>[] | string[][] {
  const { delimiter = ",", hasHeaders = true, skipEmpty = true } = options;

  const result: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let insideQuote = false;

  const len = csv.length;
  for (let i = 0; i < len; i++) {
    const char = csv[i];
    const nextChar = csv[i + 1];

    if (insideQuote) {
      if (char === '"') {
        if (nextChar === '"') {
          cell += '"';
          i++; // Skip the second quote
        } else {
          insideQuote = false;
        }
      } else {
        cell += char;
      }
    } else {
      if (char === '"') {
        insideQuote = true;
      } else if (char === delimiter) {
        row.push(cell);
        cell = "";
      } else if (char === "\r" || char === "\n") {
        row.push(cell);
        cell = "";
        if (skipEmpty && row.length === 1 && row[0] === "") {
          // Skip empty row
        } else {
          result.push(row);
        }
        row = [];
        if (char === "\r" && nextChar === "\n") {
          i++; // Skip secondary newline char
        }
      } else {
        cell += char;
      }
    }
  }

  // Handle remaining cell/row at EOF
  if (cell !== "" || row.length > 0) {
    row.push(cell);
    if (skipEmpty && row.length === 1 && row[0] === "") {
      // Skip empty row
    } else {
      result.push(row);
    }
  }

  if (!hasHeaders) {
    return result;
  }

  if (result.length === 0) {
    return [];
  }

  const headers = result[0];
  const objects: Record<string, string>[] = [];
  for (let i = 1; i < result.length; i++) {
    const currentRow = result[i];
    const obj: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentRow[j] !== undefined ? currentRow[j] : "";
    }
    objects.push(obj);
  }

  return objects;
}

/**
 * Stringifies an array of objects or an array of arrays into a CSV/TSV table.
 * Automatically wraps cells in quotes if they contain delimiters, newlines, or quotes.
 */
export function csvStringify(
  data: any[],
  options: CsvStringifyOptions = {}
): string {
  const { delimiter = ",", headers, includeHeaders = true } = options;
  if (data.length === 0) return "";

  function formatCell(val: any): string {
    if (val === null || val === undefined) return "";
    const str = String(val);
    const needsQuotes =
      str.includes(delimiter) ||
      str.includes('"') ||
      str.includes("\n") ||
      str.includes("\r");
    if (needsQuotes) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }

  const first = data[0];
  const isObject =
    first !== null &&
    typeof first === "object" &&
    !Array.isArray(first);

  if (isObject) {
    const keys = headers || Object.keys(first);
    const rows: string[] = [];

    if (includeHeaders) {
      rows.push(keys.map(formatCell).join(delimiter));
    }

    for (const item of data) {
      const row = keys.map((key) => formatCell(item[key]));
      rows.push(row.join(delimiter));
    }

    return rows.join("\r\n");
  } else {
    const rows = data.map((row: any[]) =>
      row.map(formatCell).join(delimiter)
    );
    return rows.join("\r\n");
  }
}
