import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateDailyPoints, formatDailyPoints } from './formatters.ts';

test('returns 2 points on the first day of a season', () => {
  assert.equal(calculateDailyPoints(new Date(2026, 8, 1)), '2');
});

test('returns 3 points on the second day of a season', () => {
  assert.equal(calculateDailyPoints(new Date(2026, 8, 2)), '3');
});

test('returns 4 points on the third day of a season', () => {
  assert.equal(calculateDailyPoints(new Date(2026, 8, 3)), '3.8');
});

test('returns 5 points on the fourth day of a season', () => {
  assert.equal(calculateDailyPoints(new Date(2026, 8, 4)), '5.279999999999999');
});

test('formats the final season-day value after calculating the full points array', () => {
  assert.equal(calculateDailyPoints(new Date(2026, 9, 2)), '21K');
});

test('treats january 1 as day 32 of the winter season', () => {
  assert.equal(calculateDailyPoints(new Date(2027, 0, 1)), '21K');
});

test('formats values at or below 1000 without K suffix', () => {
  assert.equal(formatDailyPoints(1000), '1000');
});

test('formats values above 1000 using rounded K suffix', () => {
  assert.equal(formatDailyPoints(1001), '1K');
  assert.equal(formatDailyPoints(20559), '21K');
});
