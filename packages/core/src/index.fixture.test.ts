import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { greet } from './index.js';

const fixturePath = resolve(fileURLToPath(import.meta.url), '../../../../fixtures/smoke/greeting.txt');

describe('greet with the fixture corpus', () => {
  it('greets the name stored in fixtures/smoke/greeting.txt', () => {
    const name = readFileSync(fixturePath, 'utf8').trim();
    expect(greet(name)).toBe('Hello, world!');
  });
});
