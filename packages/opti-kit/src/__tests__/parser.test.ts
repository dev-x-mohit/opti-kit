import { describe, it, expect } from 'vitest';
import {
  runParser, char, str, regexMatch, seq, alt, choice, many, many1, sepBy, sepBy1,
  between, optionalParse, mapParse, flatMapParse, lookahead, notFollowedBy, eof,
  whitespace, lexeme, digits, integer, floating, quotedString, identifier, lazyParser,
} from '../parser';

describe('Parser Combinators', () => {
  it('parses primitives, sequences, alternatives, and repetitions', () => {
    expect(runParser(char('a'), 'abc')).toMatchObject({ ok: true, value: 'a', index: 1 });
    expect(runParser(str('hello'), 'hello world')).toMatchObject({ ok: true, value: 'hello' });
    expect(runParser(digits, '1234abc')).toMatchObject({ ok: true, value: '1234' });
    expect(runParser(integer, '-42')).toMatchObject({ ok: true, value: -42 });
    expect(runParser(floating, '3.14')).toMatchObject({ ok: true, value: 3.14 });
    expect(runParser(quotedString, '"hi \\"there\\""')).toMatchObject({ ok: true, value: 'hi "there"' });
    expect(runParser(identifier, 'foo_123')).toMatchObject({ ok: true, value: 'foo_123' });

    const pair = seq(lexeme(identifier), lexeme(char('=')), integer);
    expect(runParser(pair, 'x = 10')).toMatchObject({ ok: true, value: ['x', '=', 10] });

    expect(runParser(alt(str('foo'), str('bar')), 'bar')).toMatchObject({ ok: true, value: 'bar' });
    expect(runParser(choice([char('a'), char('b')]), 'b')).toMatchObject({ ok: true, value: 'b' });
    expect(runParser(many(char('a')), 'aaab')).toMatchObject({ ok: true, value: ['a', 'a', 'a'] });
    expect(runParser(many1(char('a')), 'bbb').ok).toBe(false);
    expect(runParser(sepBy(integer, char(',')), '1,2,3')).toMatchObject({ ok: true, value: [1, 2, 3] });
    expect(runParser(sepBy1(integer, char(',')), '').ok).toBe(false);
  });

  it('supports combinators, lookahead, and recursive grammars', () => {
    const bracketed = between(char('['), char(']'), sepBy(integer, char(',')));
    expect(runParser(bracketed, '[10,20]')).toMatchObject({ ok: true, value: [10, 20] });
    expect(runParser(optionalParse(char('+')), 'abc')).toMatchObject({ ok: true, value: undefined, index: 0 });
    expect(runParser(flatMapParse(digits, (d) => str(`:${d}`)), '5:5')).toMatchObject({ ok: true, value: ':5' });
    expect(runParser(seq(lookahead(char('a')), char('a')), 'a')).toMatchObject({ ok: true, value: ['a', 'a'] });
    expect(runParser(seq(notFollowedBy(char('b')), char('a')), 'a')).toMatchObject({ ok: true, value: [null, 'a'] });
    expect(runParser(seq(regexMatch(/[a-z]+/), eof), 'abc')).toMatchObject({ ok: true });
    expect(runParser(whitespace, '   x')).toMatchObject({ ok: true, value: '   ' });

    type Nested = number | Nested[];
    const nested: ReturnType<typeof lazyParser<Nested>> = lazyParser(() =>
      alt<Nested>(integer, between(char('['), char(']'), sepBy(nested, char(','))))
    );
    expect(runParser(nested, '[1,[2,3]]')).toMatchObject({ ok: true, value: [1, [2, 3]] });
  });
});
