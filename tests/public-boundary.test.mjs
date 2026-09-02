import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';

const ALLOWED = new Set([
  '.gitignore',
  'ARCHITECTURE.puml',
  'LICENSE',
  '.github/workflows/public-health.yml',
  'README.md',
  'package.json',
  'public-manifest.json',
  'scripts/public-health-check.mjs',
  'site/assets/open-art-register-logo.png',
  'site/example-statistics.html',
  'site/i18n.js',
  'site/index.html',
  'site/styles.css',
  'tests/demo-ui.test.mjs',
  'tests/public-boundary.test.mjs',
  'tests/public-health-contract.test.mjs'
]);

async function walk(dir = '.') {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === '.git') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(relative('.', path).replaceAll('\\', '/'));
  }
  return files.sort();
}

test('repository contains only the explicit public allowlist', async () => {
  const actual = await walk('.');
  assert.deepEqual(actual, [...ALLOWED].sort());
});

test('all six production roots and sensitive file classes are absent', async () => {
  const actual = await walk('.');
  const forbidden = actual.filter((path) =>
    /(^|\/)(01-oar-frontend|02-oar-google-cloud-backup|03-oar-google-cloud-sql-target|04-oar-cloud-run-api|05-oar-project-operator-frontend|06-oar-monitoring)(\/|$)|(^|\/)(?:\.env(?:$|\.)|[^/]*(?:secret|credential|private-key|private_key)[^/]*)|\.(?:sql|pem|key|p12|pfx|zip|tar|gz|db|sqlite)$/i.test(path)
  );
  assert.deepEqual(forbidden, []);
});

test('manifest hashes every public payload file except itself', async () => {
  const manifest = JSON.parse(await readFile('public-manifest.json', 'utf8'));
  const expectedPaths = [...ALLOWED].filter((path) => path !== 'public-manifest.json').sort();
  const manifestPaths = manifest.files.map((entry) => entry.path).sort();
  assert.deepEqual(manifestPaths, expectedPaths);
  for (const entry of manifest.files) {
    const bytes = await readFile(entry.path);
    const hash = createHash('sha256').update(bytes).digest('hex');
    assert.equal(hash, entry.sha256, entry.path);
  }
});

test('manifest declares the final 16-file public alignment with no screenshot placeholders', async () => {
  const manifest = JSON.parse(await readFile('public-manifest.json', 'utf8'));
  const actual = await walk('.');
  assert.equal(actual.length, 16);
  assert.equal(manifest.publicFileAllowlistCount, 16);
  assert.equal(manifest.claims.publicFileAlignmentComplete, true);
  assert.equal(manifest.claims.documentationScreenshotsIncluded, false);
  assert.equal(manifest.approvedVisualVersion, 'V7');
  assert.deepEqual(manifest.pendingPublicDocumentationFiles, []);
  assert.equal('gitTransparency18FileAlignmentComplete' in manifest.claims, false);
});
