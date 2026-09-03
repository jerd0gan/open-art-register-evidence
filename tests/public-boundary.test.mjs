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
  '.github/workflows/public-pages.yml',
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

test('manifest preserves the 16-file base and declares the 17-file Pages extension', async () => {
  const manifest = JSON.parse(await readFile('public-manifest.json', 'utf8'));
  const actual = await walk('.');
  assert.equal(actual.length, 17);
  assert.equal(manifest.basePublicFileAllowlistCount, 16);
  assert.equal(manifest.publicFileAllowlistCount, 17);
  assert.equal(manifest.claims.publicFileAlignmentComplete, true);
  assert.equal(manifest.claims.documentationScreenshotsIncluded, false);
  assert.equal(manifest.claims.pagesExtensionV1, true);
  assert.equal(manifest.claims.pagesWorkflowManualOnly, true);
  assert.equal(manifest.claims.pagesDeploymentSourceSiteOnly, true);
  assert.equal(manifest.approvedVisualVersion, 'V7');
  assert.deepEqual(manifest.pendingPublicDocumentationFiles, []);
  assert.equal(manifest.pagesExtension.version, 'V1');
  assert.equal(manifest.pagesExtension.workflowPath, '.github/workflows/public-pages.yml');
  assert.equal(manifest.pagesExtension.deploymentSourceDirectory, 'site');
  assert.equal(manifest.pagesExtension.deploymentFileCount, 5);
  assert.deepEqual(manifest.pagesExtension.deploymentFiles, [
    'site/assets/open-art-register-logo.png',
    'site/example-statistics.html',
    'site/i18n.js',
    'site/index.html',
    'site/styles.css'
  ]);
  assert.deepEqual(manifest.pagesExtension.workflowTriggers, ['workflow_dispatch']);
  assert.equal(manifest.pagesExtension.activationRequiresSeparateApproval, true);
  assert.equal(manifest.pagesExtension.healthWorkflowUnchanged, true);
  assert.equal('gitTransparency18FileAlignmentComplete' in manifest.claims, false);
});

test('Pages workflow is manual-only and uploads only the site directory', async () => {
  const workflow = await readFile('.github/workflows/public-pages.yml', 'utf8');

  assert.match(workflow, /^on:\n  workflow_dispatch:\s*$/m);
  assert.doesNotMatch(workflow, /^\s{2}push:/m);
  assert.doesNotMatch(workflow, /^\s{2}schedule:/m);
  assert.match(workflow, /run:\s*npm test/);
  assert.match(workflow, /persist-credentials:\s*false/);
  assert.match(workflow, /uses:\s*actions\/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1/);
  assert.match(workflow, /uses:\s*actions\/setup-node@820762786026740c76f36085b0efc47a31fe5020/);
  assert.match(workflow, /uses:\s*actions\/configure-pages@983d7736d9b0ae728b81ab479565c72886d7745b/);
  assert.match(workflow, /uses:\s*actions\/upload-pages-artifact@7b1f4a764d45c48632c6b24a0339c27f5614fb0b/);
  assert.match(workflow, /uses:\s*actions\/deploy-pages@d6db90164ac5ed86f2b6aed7e0febac5b3c0c03e/);
  assert.match(workflow, /^\s{10}path:\s*site\s*$/m);
  assert.doesNotMatch(workflow, /^\s{10}path:\s*[.'"]+\s*$/m);
  assert.match(workflow, /^\s{4}needs:\s*build\s*$/m);
  assert.match(workflow, /^\s{6}pages:\s*write\s*$/m);
  assert.match(workflow, /^\s{6}id-token:\s*write\s*$/m);
});
