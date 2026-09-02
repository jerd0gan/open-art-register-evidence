import { appendFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const HEALTH_URL = 'https://openartregister.art/api/health';
const TIMEOUT_MS = 10_000;
const MAX_BODY_BYTES = 512;

export function classifyPublicHealthResponse({ httpStatus, contentType = '', body = '', endToEndMs, checkedAt }) {
  let healthy = false;
  if (httpStatus === 200 && contentType.toLowerCase().includes('application/json') && Buffer.byteLength(body, 'utf8') <= MAX_BODY_BYTES) {
    try {
      const payload = JSON.parse(body);
      const keys = Object.keys(payload).sort();
      healthy = keys.length === 1 && keys[0] === 'ok' && payload.ok === true;
    } catch { healthy = false; }
  }
  return {
    ok: healthy,
    database: healthy ? 'UP' : 'UNCONFIRMED',
    readPath: healthy ? 'PASS' : 'FAIL',
    endToEndMs: Number.isFinite(endToEndMs) ? Math.max(0, Math.round(endToEndMs)) : null,
    checkedAt: checkedAt || new Date().toISOString()
  };
}

async function writeGitHubSummary(result) {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryPath) return;
  const summary = [
    '## Open Art Register — Public database status', '',
    '| Field | Value |', '| --- | --- |',
    `| Database | ${result.database} |`,
    `| Read path | ${result.readPath} |`,
    `| End-to-end | ${result.endToEndMs ?? 'N/A'} ms |`,
    `| Checked at | ${result.checkedAt} |`, '',
    '`END_TO_END_MS` is the complete public request time, not database-only latency.', ''
  ].join('\n');
  try { await appendFile(summaryPath, summary, 'utf8'); } catch { /* summary is non-critical */ }
}

export async function runPublicHealthCheck() {
  const startedAt = performance.now();
  let httpStatus = null;
  let contentType = '';
  let body = '';
  try {
    const response = await fetch(HEALTH_URL, {
      method: 'GET', headers: { accept: 'application/json' }, cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(TIMEOUT_MS)
    });
    httpStatus = response.status;
    contentType = response.headers.get('content-type') || '';
    const contentLength = Number(response.headers.get('content-length'));
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) throw new Error('payload_too_large');
    body = await response.text();
  } catch { /* fail closed without internal details */ }
  const result = classifyPublicHealthResponse({ httpStatus, contentType, body, endToEndMs: performance.now() - startedAt, checkedAt: new Date().toISOString() });
  console.log(`DATABASE=${result.database}`);
  console.log(`READ_PATH=${result.readPath}`);
  console.log(`END_TO_END_MS=${result.endToEndMs ?? 'N/A'}`);
  console.log(`CHECKED_AT=${result.checkedAt}`);
  await writeGitHubSummary(result);
  return result.ok ? 0 : 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) process.exitCode = await runPublicHealthCheck();
