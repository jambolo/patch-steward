import { describe, expect, it } from 'vitest';
import { packageName } from './index.js';

describe('packageName', () => {
  it('returns the action package name', () => {
    expect(packageName()).toBe('@patch-steward/action');
  });
});
