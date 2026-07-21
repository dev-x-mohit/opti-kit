import { describe, it, expect } from "vitest";
import { csvParse, csvStringify } from "../csv";

describe("csv module", () => {
  it("csvParse - simple format with headers", () => {
    const csv = "name,age,city\nMohit,25,Jaipur\nJohn,30,New York";
    const parsed = csvParse(csv);
    expect(parsed).toEqual([
      { name: "Mohit", age: "25", city: "Jaipur" },
      { name: "John", age: "30", city: "New York" }
    ]);
  });

  it("csvParse - handles quotes, newlines, and escaped quotes inside cells", () => {
    const csv = 'name,notes\nMohit,"developer\nlikes ""typescript"""\nJohn,"regular notes"';
    const parsed = csvParse(csv);
    expect(parsed).toEqual([
      { name: "Mohit", notes: 'developer\nlikes "typescript"' },
      { name: "John", notes: "regular notes" }
    ]);
  });

  it("csvParse - custom delimiter and without headers", () => {
    const csv = "Mohit\t25\tJaipur\nJohn\t30\tNew York";
    const parsed = csvParse(csv, { delimiter: "\t", hasHeaders: false });
    expect(parsed).toEqual([
      ["Mohit", "25", "Jaipur"],
      ["John", "30", "New York"]
    ]);
  });

  it("csvStringify - objects", () => {
    const data = [
      { name: "Mohit", age: 25, city: "Jaipur" },
      { name: 'John "CEO"', age: 30, city: "New York" }
    ];
    const stringified = csvStringify(data);
    expect(stringified).toBe('name,age,city\r\nMohit,25,Jaipur\r\n"John ""CEO""",30,New York');
  });

  it("csvStringify - arrays", () => {
    const data = [
      ["Mohit", 25, "Jaipur"],
      ['John "CEO"', 30, "New York"]
    ];
    const stringified = csvStringify(data);
    expect(stringified).toBe('Mohit,25,Jaipur\r\n"John ""CEO""",30,New York');
  });
});
