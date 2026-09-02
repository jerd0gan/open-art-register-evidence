import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyPublicHealthResponse } from '../scripts/public-health-check.mjs';

test('healthy public payload passes with rounded end-to-end time', () => {
  const result = classifyPublicHealthResponse({ httpStatus: 200, contentType: 'application/json; charset=utf-8', body: '{"ok":true}', endToEndMs: 83.6, checkedAt: '2026-09-01T07:00:00.000Z' });
  assert.equal(result.ok, true);
  assert.equal(result.database, 'UP');
  assert.equal(result.readPath, 'PASS');
  assert.equal(result.endToEndMs, 84);
});

test('extra public fields fail closed', () => {
  const result = classifyPublicHealthResponse({ httpStatus: 200, contentType: 'application/json', body: '{"ok":true,"database":"connected"}', endToEndMs: 20 });
  assert.equal(result.ok, false);
  assert.equal(result.database, 'UNCONFIRMED');
  assert.equal(result.readPath, 'FAIL');
});

test('non-200 response fails closed', () => {
  const result = classifyPublicHealthResponse({ httpStatus: 503, contentType: 'application/json', body: '{"ok":true}', endToEndMs: 20 });
  assert.equal(result.ok, false);
});
