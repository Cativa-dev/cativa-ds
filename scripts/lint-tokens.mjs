#!/usr/bin/env node
/* Cativa DS — lint anti-hardcode (GAP-DS-012)
 * Rejeita cor crua (#hex, rgb/rgba/hsl) e px "mágicos" fora de var(--cds-*).
 * Uso:  node scripts/lint-tokens.mjs "src/(glob).{css,tsx,jsx,html}"
 * [hotfix @Nina 2026-07-16: glob literal no comentário fechava o bloco e quebrava o parse — subir como v1.1.1]
 * Plugue no CI (pre-merge). Exit 1 = reprovado.
 * Requer Node 20+ (fs.glob) OU passe arquivos explícitos como args.
 */
import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';

const HEX  = /#[0-9a-fA-F]{3,8}\b/;
const FUNC = /\b(?:rgb|rgba|hsl|hsla)\s*\(/;
// px permitidos (bordas 1px, hairlines) — ajuste conforme necessidade
const PX_OK = /\b(?:0|1|2)px\b/;
const PX    = /\b\d{2,}px\b/;
// linhas isentas: definição do próprio token, comentário, ou uso via var()
const EXEMPT = /--cds-|var\(|@font-face|url\(|https?:|\/\/|\/\*/;

const patterns = process.argv.slice(2);
let files = [];
try { files = patterns.flatMap(p => globSync(p)); } catch { files = patterns; }
if (!files.length) { console.error('nenhum arquivo — passe globs, ex: "src/**/*.css"'); process.exit(2); }

let bad = 0;
for (const f of files) {
  let src; try { src = readFileSync(f, 'utf8'); } catch { continue; }
  src.split('\n').forEach((line, i) => {
    if (EXEMPT.test(line)) return;
    const hitHex = HEX.test(line);
    const hitFn  = FUNC.test(line);
    const hitPx  = PX.test(line) && !PX_OK.test(line);
    if (hitHex || hitFn || hitPx) {
      bad++;
      const why = [hitHex && 'cor #hex', hitFn && 'cor rgb/hsl', hitPx && 'px mágico'].filter(Boolean).join(', ');
      console.log(`\x1b[31m✗\x1b[0m ${f}:${i+1}  [${why}]  ${line.trim().slice(0,80)}`);
    }
  });
}
if (bad) { console.log(`\n${bad} violação(ões). Use var(--cds-*).`); process.exit(1); }
console.log('✓ nenhum hardcode encontrado.');
