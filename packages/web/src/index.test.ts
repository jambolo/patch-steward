import { describe, expect, it } from 'vitest';
import { packageName } from './index.js';

describe('packageName', () => {
  it('returns the web package name', () => {
    expect(packageName()).toBe('@patch-steward/web');
  });
});
