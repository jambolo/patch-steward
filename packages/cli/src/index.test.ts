import { describe, expect, it } from 'vitest';
import { stewardGreeting } from './index.js';

describe('stewardGreeting', () => {
  it('greets the steward via @patch-steward/core', () => {
    expect(stewardGreeting()).toBe('Hello, steward!');
  });
});
