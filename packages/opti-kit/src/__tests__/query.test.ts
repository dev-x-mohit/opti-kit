import { describe, it, expect } from 'vitest';
import {
  queryFrom, whereClause, selectFields, orderByMultiple, groupByKey, havingClause,
  innerJoin, leftJoin, rightJoin, fullOuterJoin, crossJoin, distinctBy, paginateQuery,
  aggregateSum, aggregateAvg, aggregateMin, aggregateMax, aggregateCount,
  pivotTable, unpivotTable, rollupGroup, windowRank, windowRowNumber,
  windowRunningSum, windowMovingAvg, unionQueries, intersectQueries, exceptQueries,
} from '../query';

describe('Query Engine', () => {
  const users = [
    { id: 1, name: 'Alice', dept: 'Eng', salary: 120 },
    { id: 2, name: 'Bob', dept: 'Eng', salary: 100 },
    { id: 3, name: 'Carol', dept: 'Sales', salary: 90 },
  ];
  const bonuses = [
    { userId: 1, bonus: 20 },
    { userId: 4, bonus: 15 },
  ];

  it('filters, selects, sorts, groups, and paginates', () => {
    const res = queryFrom(users)
      .where((u) => u.salary >= 100)
      .orderBy([{ key: 'salary', direction: 'asc' }])
      .select(['name', 'salary'])
      .toArray();
    expect(res).toEqual([{ name: 'Bob', salary: 100 }, { name: 'Alice', salary: 120 }]);

    expect(whereClause(users, (u) => u.dept === 'Sales').length).toBe(1);
    expect(selectFields(users, ['id']).length).toBe(3);
    expect(orderByMultiple(users, [{ key: 'dept' }, { key: 'salary', direction: 'desc' }])[0].name).toBe('Alice');
    const grouped = groupByKey(users, 'dept');
    expect(Object.keys(havingClause(grouped, (g) => g.length > 1))).toEqual(['Eng']);
    expect(distinctBy(users, (u) => u.dept).length).toBe(2);
    expect(paginateQuery(users, 2, 2).items.length).toBe(1);
  });

  it('performs joins and set operations', () => {
    expect(innerJoin(users, bonuses, (u) => u.id, (b) => b.userId).length).toBe(1);
    expect(leftJoin(users, bonuses, (u) => u.id, (b) => b.userId).length).toBe(3);
    expect(rightJoin(users, bonuses, (u) => u.id, (b) => b.userId).length).toBe(2);
    expect(fullOuterJoin(users, bonuses, (u) => u.id, (b) => b.userId).length).toBe(4);
    expect(crossJoin([1, 2], ['a', 'b'], (x, y) => `${x}${y}`)).toEqual(['1a', '1b', '2a', '2b']);

    const a = [{ id: 1 }, { id: 2 }];
    const b = [{ id: 2 }, { id: 3 }];
    expect(unionQueries(a, b, (x) => x.id).map((x) => x.id)).toEqual([1, 2, 3]);
    expect(intersectQueries(a, b, (x) => x.id).map((x) => x.id)).toEqual([2]);
    expect(exceptQueries(a, b, (x) => x.id).map((x) => x.id)).toEqual([1]);
  });

  it('computes aggregations, pivots, and window functions', () => {
    expect(aggregateSum(users, (u) => u.salary)).toBe(310);
    expect(aggregateAvg(users, (u) => u.salary)).toBeCloseTo(103.33, 1);
    expect(aggregateMin(users, (u) => u.salary)).toBe(90);
    expect(aggregateMax(users, (u) => u.salary)).toBe(120);
    expect(aggregateCount(users, (u) => u.dept === 'Eng')).toBe(2);

    const pivoted = pivotTable(users, (u) => u.dept, () => 'total', (b) => aggregateSum(b, (x) => x.salary));
    expect(pivoted.Eng.total).toBe(220);
    expect(unpivotTable(pivoted).length).toBe(2);
    expect(rollupGroup(users, (u) => u.dept, (g) => g.length)).toEqual({ Eng: 2, Sales: 1 });

    expect(windowRank(users, (u) => u.salary).map((x) => x.rank)).toEqual([1, 2, 3]);
    expect(windowRowNumber(users).map((x) => x.rowNumber)).toEqual([1, 2, 3]);
    expect(windowRunningSum(users, (u) => u.salary).map((x) => x.runningSum)).toEqual([120, 220, 310]);
    expect(windowMovingAvg(users, (u) => u.salary, 2).map((x) => x.movingAvg)).toEqual([120, 110, 95]);
  });
});
