import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const files = ['site/index.html', 'site/example-statistics.html'];

const SOURCE_BASELINE = Object.freeze({
  '01-oar-frontend/index.html': '4732d7a97478762bb3d1e179f0bec5fc94b0187ad1bc2c39b9114cb3e69fac49',
  '01-oar-frontend/styles.css': 'eac7fe2bf7ed7b70c13df35825cdd5549a8b7d088399983df5fa7afcd913e69c',
  '01-oar-frontend/app/02-i18n.js': '3a41b0ce12cbdc7ad055aa900c74fecd2b8f9c1860b4c6391b18aa960b7c7c9a',
  '01-oar-frontend/app/08-statistics.js': '01f2e19b52b55d12a992aa2435752a08a59fab41fff41e15642a72411364b38c',
  '01-oar-frontend/app/11-init.js': 'edba80d0f84adf4f26ef933e72967d88a946c83872164af3c6ff5dfdf6782a7a',
  '01-oar-frontend/assets/open-art-register-logo.png': 'eeb60a496142112d517db2ad32bb05c4cb01c1a9d2bf8d2d172c55293a579504'
});

for (const file of files) {
  test(`${file} keeps only DE/EN language buttons interactive`, async () => {
    const html = await readFile(file, 'utf8');
    assert.match(html, /id="langDeBtn"/);
    assert.match(html, /id="langEnBtn"/);
    const buttonTags = [...html.matchAll(/<button\b[^>]*>/gi)].map((match) => match[0]);
    for (const button of buttonTags) {
      if (/id="lang(?:De|En)Btn"/.test(button)) assert.doesNotMatch(button, /\bdisabled\b/i);
      else assert.match(button, /\bdisabled\b/i);
    }
    assert.doesNotMatch(html, /<a\b[^>]*href=/i);
  });
}

test('homepage demo mirrors the protected OAR homepage and empirics state', async () => {
  const html = await readFile('site/index.html', 'utf8');
  const i18n = await readFile('site/i18n.js', 'utf8');
  assert.match(html, /Ein Fundort für künstlerische Praxis/);
  assert.match(html, /Leitgedanke/);
  assert.match(html, /Das Register entscheidet nicht, wer Künstler-\/in ist/);
  assert.match(i18n, /Öffentliche Sichtbarkeit, Suche und Statistik können getrennt gesteuert werden/);
  assert.match(html, /1 · Selbstauskunft/);
  assert.match(html, /2 · Empirie/);
  assert.match(html, /stats-placeholder__ring/);
  assert.match(html, />≥50</);
  assert.match(html, /Statistik noch geschützt/);
  assert.match(html, /Mindestprofile für Detailstatistik/);
  assert.match(html, /5 · Betrieb, Sicherheit und Transparenz/);
  assert.match(html, /class="demo-tape demo-tape--shared"/);
  assert.match(html, /data-i18n="demoTape"/);
  assert.match(i18n, /DEMOANSICHT · SIE KÖNNEN HIER NUR DE \/ EN AUSWÄHLEN/);
  assert.match(i18n, /DEMO VIEW · YOU CAN ONLY SELECT DE \/ EN HERE/);
});

test('example empirics exposes OAR statistical capabilities with synthetic values only', async () => {
  const html = await readFile('site/example-statistics.html', 'utf8');
  const css = await readFile('site/styles.css', 'utf8');
  const i18n = await readFile('site/i18n.js', 'utf8');
  assert.match(html, /synthetische Beispieldaten/i);
  assert.match(html, /publicArtisticDisciplinesTitle/);
  assert.match(html, /publicPracticeAreaTitle/);
  assert.match(html, /chartActivity/);
  assert.match(html, /chartPracticeScope/);
  assert.match(html, /monthlyTimelineTitle/);
  assert.match(html, /authenticatedStatisticsHint/);
  assert.match(i18n, /no real Open Art Register data is used in these charts/i);
  assert.match(html, /class="demo-tape demo-tape--shared"/);
  assert.match(html, /data-i18n="statsDemoTape"/);
  assert.match(i18n, /BEISPIEL \/ EXAMPLE/);
  assert.match(i18n, /DEMOANSICHT · SIE KÖNNEN HIER NUR DE \/ EN AUSWÄHLEN/);
  assert.match(i18n, /DEMO VIEW · YOU CAN ONLY SELECT DE \/ EN HERE/);
  assert.match(css, /background:rgba\(245,210,15,/);
  assert.match(css, /position:fixed/);
  assert.match(css, /pointer-events:none/);
});

test('homepage and example empirics use one identical demo-tape geometry', async () => {
  const home = await readFile('site/index.html', 'utf8');
  const stats = await readFile('site/example-statistics.html', 'utf8');
  const css = await readFile('site/styles.css', 'utf8');
  assert.match(home, /<\/header>\s*<div class="demo-tape demo-tape--shared"/);
  assert.match(stats, /<\/header>\s*<div class="demo-tape demo-tape--shared"/);
  assert.equal((home.match(/demo-tape--shared/g) || []).length, 1);
  assert.equal((stats.match(/demo-tape--shared/g) || []).length, 1);
  assert.match(css, /\.demo-tape--shared\s*\{[^}]*top:66\.666vh;[^}]*transform:rotate\(-3\.2deg\);[^}]*transform-origin:left top;/s);
  assert.doesNotMatch(css, /demo-tape--home|demo-tape--stats/);
});

test('demo tape keeps its overhang while the floating shadow is reduced', async () => {
  const css = await readFile('site/styles.css', 'utf8');
  assert.match(css, /\.demo-tape\s*\{[^}]*left:-12%;[^}]*width:124%;[^}]*box-shadow:0 1px 3px rgba\(0,0,0,\.18\);/s);
  assert.match(css, /@media \(max-width:700px\)[\s\S]*?\.demo-tape\s*\{[^}]*left:-22%;[^}]*width:144%;[^}]*\}/);
  assert.doesNotMatch(css, /box-shadow:0 8px 28px rgba\(0,0,0,\.32\)/);
});

test('demo tape is viewport-fixed and does not scroll with the document', async () => {
  const css = await readFile('site/styles.css', 'utf8');
  assert.match(css, /\.demo-tape\s*\{[^}]*position:fixed;/s);
  assert.match(css, /\.demo-tape--shared\s*\{[^}]*top:66\.666vh;/s);
  assert.doesNotMatch(css, /\.demo-tape\s*\{[^}]*position:absolute;/s);
});

test('visual derivation is pinned to the six approved source-of-truth identities', async () => {
  assert.equal(Object.keys(SOURCE_BASELINE).length, 6);
  assert.equal(SOURCE_BASELINE['01-oar-frontend/index.html'], '4732d7a97478762bb3d1e179f0bec5fc94b0187ad1bc2c39b9114cb3e69fac49');
  assert.equal(SOURCE_BASELINE['01-oar-frontend/app/08-statistics.js'], '01f2e19b52b55d12a992aa2435752a08a59fab41fff41e15642a72411364b38c');
  assert.equal(SOURCE_BASELINE['01-oar-frontend/assets/open-art-register-logo.png'], 'eeb60a496142112d517db2ad32bb05c4cb01c1a9d2bf8d2d172c55293a579504');

  const explicitRoot = process.env.OAR_SOURCE_OF_TRUTH_ROOT;
  if (!explicitRoot) return;

  for (const [relative, expected] of Object.entries(SOURCE_BASELINE)) {
    const bytes = await readFile(join(explicitRoot, relative));
    const actual = createHash('sha256').update(bytes).digest('hex');
    assert.equal(actual, expected, `source-of-truth visual baseline drift: ${relative}`);
  }
});

test('public demo copies only the approved logo byte-identically from the private reference set', async () => {
  const bytes = await readFile('site/assets/open-art-register-logo.png');
  const actual = createHash('sha256').update(bytes).digest('hex');
  assert.equal(actual, SOURCE_BASELINE['01-oar-frontend/assets/open-art-register-logo.png']);
});

test('language script is presentation-only and contains no production API/auth calls', async () => {
  const js = await readFile('site/i18n.js', 'utf8');
  assert.match(js, /langDeBtn/);
  assert.match(js, /langEnBtn/);
  assert.doesNotMatch(js, /fetch\s*\(/);
  assert.doesNotMatch(js, /localStorage|sessionStorage|cookie|passkey|webauthn/i);
});

test('DE/EN switch changes language, text and pressed state in a minimal DOM harness', async () => {
  const { runInNewContext } = await import('node:vm');
  const source = await readFile('site/i18n.js', 'utf8');

  const listeners = new Map();
  const languageButtons = [makeElement({ lang: 'de' }), makeElement({ lang: 'en' })];
  const translatedTitle = makeElement({ i18n: 'exampleBadge' });
  const ids = new Map([['langDeBtn', languageButtons[0]], ['langEnBtn', languageButtons[1]]]);
  let domReady;

  function makeElement(dataset = {}) {
    const attrs = new Map();
    const classes = new Set();
    return {
      dataset,
      textContent: '',
      classList: { toggle(name, active) { active ? classes.add(name) : classes.delete(name); } },
      setAttribute(name, value) { attrs.set(name, String(value)); },
      getAttribute(name) { return attrs.get(name); },
      addEventListener(name, fn) { listeners.set(`${dataset.lang || 'node'}:${name}`, fn); },
      hasClass(name) { return classes.has(name); }
    };
  }

  const document = {
    documentElement: { lang: 'de' },
    querySelectorAll(selector) {
      if (selector === '[data-i18n]') return [translatedTitle];
      if (selector === '[data-i18n-placeholder]') return [];
      if (selector === '[data-lang]') return languageButtons;
      return [];
    },
    getElementById(id) { return ids.get(id) || null; },
    addEventListener(name, fn) { if (name === 'DOMContentLoaded') domReady = fn; }
  };

  runInNewContext(source, { document });
  assert.equal(typeof domReady, 'function');
  domReady();
  assert.equal(document.documentElement.lang, 'de');
  assert.equal(languageButtons[0].getAttribute('aria-pressed'), 'true');
  assert.equal(languageButtons[1].getAttribute('aria-pressed'), 'false');

  listeners.get('en:click')();
  assert.equal(document.documentElement.lang, 'en');
  assert.equal(languageButtons[0].getAttribute('aria-pressed'), 'false');
  assert.equal(languageButtons[1].getAttribute('aria-pressed'), 'true');
  assert.equal(translatedTitle.textContent, 'NO REAL DATA');
});
