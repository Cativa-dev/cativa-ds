#!/usr/bin/env node
/* Cativa DS — guarda de CONTRASTE (GAP-DS-041)
 * Mede a razão de contraste WCAG 2.1 de TODO par semântico do arquivo de
 * tokens, NOS DOIS TEMAS, e reprova abaixo de AA (4.5:1 para texto normal).
 *
 * Uso:  node scripts/lint-contrast.mjs [tokens/cativa.tokens.css]
 * Exit 1 = reprovado. Plugue no CI ao lado do lint-tokens.
 *
 * POR QUE ELA EXISTE: `lint-tokens.mjs` verifica HARDCODE. Nada verificava
 * CONTRASTE — um par podia nascer reprovando AA e nenhum gate veria, porque
 * o checklist de aderência pergunta "contraste AA?" e depende de alguém
 * medir à mão. Guard executável > guard textual.
 *
 * A LINHA DE BASE É DECLARADA, NÃO VERDE POR CONVENIÊNCIA:
 * os pares que já reprovavam quando esta guarda nasceu estão em
 * `scripts/contrast-allowlist.json`, com valor medido, data e dono. A guarda
 * falha em REGRESSÃO NOVA e não finge que o passivo não existe. Guarda que
 * nasce vermelha é guarda que as pessoas aprendem a ignorar; guarda que
 * esconde o passivo é pior.
 *
 * ⛔ O QUE ELA NÃO PODE MEDIR: par cujo fundo é TRANSLÚCIDO (os `*-soft`,
 * rgba com alfa < 1). O contraste desses depende do que está ATRÁS, então
 * o componente não pode garantir o próprio contraste — não existe número
 * único a afirmar. Eles saem listados como NÃO VERIFICÁVEL, nunca como ✓.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const AA_TEXTO_NORMAL = 4.5;
const EPSILON = 0.005; // as razões da allowlist são gravadas com 2 casas

const AQUI = dirname(fileURLToPath(import.meta.url));
const arquivoTokens = process.argv[2] || join(AQUI, '..', 'tokens', 'cativa.tokens.css');
const arquivoAllowlist = join(AQUI, 'contrast-allowlist.json');

/* ---------------------------------------------------------------- cor --- */

function corDeTexto(valor) {
  const v = valor.trim();
  let m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(v);
  if (m) {
    const h = m[1].length === 3 ? m[1].split('').map(c => c + c).join('') : m[1];
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: 1 };
  }
  m = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/i.exec(v);
  if (m) {
    return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] };
  }
  return null; // color-mix, var(), gradiente, o que for — não é cor medível aqui
}

// WCAG 2.1 — luminância relativa
function luminancia({ r, g, b }) {
  const lin = c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function razao(frente, fundo) {
  const a = luminancia(frente), b = luminancia(fundo);
  const claro = Math.max(a, b), escuro = Math.min(a, b);
  return (claro + 0.05) / (escuro + 0.05);
}

const doisDigitos = n => Math.round(n * 100) / 100;

/* -------------------------------------------------------------- parse --- */

/** Lê os blocos de tema do arquivo de tokens. Um token declarado depois
 *  sobrescreve o anterior DENTRO do mesmo tema — a última declaração vence,
 *  que é o que a cascata faz. */
function lerTemas(css) {
  const temas = { dark: {}, light: {} };
  // varre bloco a bloco: seletor { corpo }
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    const seletor = m[1].replace(/\/\*[\s\S]*?\*\//g, '').trim();
    const corpo = m[2];
    const alvos = [];
    if (/(^|,)\s*:root\s*(,|$)/.test(seletor) || /\[data-theme=["']?dark["']?\]/.test(seletor)) alvos.push('dark');
    if (/\[data-theme=["']?light["']?\]/.test(seletor)) alvos.push('light');
    // `:root` puro (as INVARIANTES) só entra no dark; nenhum token de cor mora lá
    if (!alvos.length) continue;
    for (const [, nome, valor] of corpo.matchAll(/(--cds-[\w-]+)\s*:\s*([^;]+);/g)) {
      for (const t of alvos) temas[t][nome] = valor.trim();
    }
  }
  // o tema claro herda do dark o que não redeclara (é o que a cascata faz)
  temas.light = { ...temas.dark, ...temas.light };
  return temas;
}

/* --------------------------------------------------------------- pares -- */

const TEXTOS = ['--cds-text', '--cds-text-2', '--cds-text-3'];
const SUPERFICIES = ['--cds-bg', '--cds-surface', '--cds-surface-2', '--cds-surface-3'];

/** Compõe uma cor translúcida sobre um fundo opaco (o que o olho recebe). */
function compor(frente, fundo) {
  const a = frente.a;
  return {
    r: frente.r * a + fundo.r * (1 - a),
    g: frente.g * a + fundo.g * (1 - a),
    b: frente.b * a + fundo.b * (1 - a),
    a: 1,
  };
}

function paresDoTema(tokens) {
  const pares = [];
  // 1. pares declarados pelo próprio sistema: --cds-on-X sobre --cds-X
  for (const nome of Object.keys(tokens)) {
    const m = /^--cds-on-(.+)$/.exec(nome);
    if (!m) continue;
    const base = `--cds-${m[1]}`;
    if (tokens[base] === undefined) continue;
    pares.push({ frente: nome, fundo: base, familia: 'par semântico' });
  }
  // 2. cor cheia sobre o PRÓPRIO fundo suave — o que .cds-badge--*, .cds-chip--*,
  //    .cds-metric__delta--* e .cds-btn--danger/--success realmente fazem.
  //    O fundo é translúcido, então NÃO existe um número único: mede-se a
  //    composição sobre cada superfície opaca da casa e reporta-se a faixa.
  for (const nome of Object.keys(tokens)) {
    const m = /^--cds-(.+)-soft$/.exec(nome);
    if (!m) continue;
    const base = `--cds-${m[1]}`;
    if (tokens[base] === undefined) continue;
    pares.push({ frente: base, fundo: nome, familia: 'sobre fundo suave' });
  }
  // 3. texto neutro sobre superfície neutra — a escada de contraste da casa
  for (const t of TEXTOS) {
    if (tokens[t] === undefined) continue;
    for (const s of SUPERFICIES) {
      if (tokens[s] === undefined) continue;
      pares.push({ frente: t, fundo: s, familia: 'texto neutro' });
    }
  }
  return pares;
}

/* ------------------------------------------------------------ execução -- */

const css = readFileSync(arquivoTokens, 'utf8');
const temas = lerTemas(css);

let allowlist = { pares: [] };
try { allowlist = JSON.parse(readFileSync(arquivoAllowlist, 'utf8')); } catch { /* sem allowlist = tolerância zero */ }
const chaveDe = p => `${p.tema}|${p.frente}|${p.fundo}`;
const declarados = new Map((allowlist.pares || []).map(p => [chaveDe(p), p]));
const vistos = new Set();

const reprovasNovas = [];
const regressoes = [];
const obsoletas = [];
const naoVerificaveis = [];
const aprovados = [];
const tolerados = [];

for (const tema of ['dark', 'light']) {
  const tokens = temas[tema];
  for (const par of paresDoTema(tokens)) {
    const frente = corDeTexto(tokens[par.frente]);
    const fundo = corDeTexto(tokens[par.fundo]);
    const chave = chaveDe({ tema, ...par });

    if (!frente || !fundo || frente.a < 1) {
      naoVerificaveis.push({ tema, ...par, motivo: !frente || !fundo ? 'valor não é cor sólida (color-mix, var() ou gradiente)' : 'a FRENTE é translúcida — não há número a afirmar' });
      continue;
    }

    let r;
    if (fundo.a < 1) {
      // fundo translúcido: o que o olho recebe depende da superfície ATRÁS.
      // Mede-se a composição sobre cada superfície opaca da casa.
      const medidas = SUPERFICIES
        .map(nome => ({ nome, cor: corDeTexto(tokens[nome] || '') }))
        .filter(x => x.cor && x.cor.a === 1)
        .map(x => ({ sobre: x.nome, r: doisDigitos(razao(frente, compor(fundo, x.cor))) }));
      if (!medidas.length) {
        naoVerificaveis.push({ tema, ...par, motivo: 'fundo translúcido e nenhuma superfície opaca para compor' });
        continue;
      }
      const melhor = medidas.reduce((a, b) => (b.r > a.r ? b : a));
      const pior = medidas.reduce((a, b) => (b.r < a.r ? b : a));
      if (melhor.r >= AA_TEXTO_NORMAL) {
        // passa em alguma superfície e pode reprovar em outra ⇒ o componente
        // NÃO garante o próprio contraste. Não é ✓ e não é ✗: é indeterminado.
        naoVerificaveis.push({
          tema, ...par,
          motivo: `fundo translúcido — ${pior.r}:1 sobre ${pior.sobre} … ${melhor.r}:1 sobre ${melhor.sobre}` +
                  (pior.r >= AA_TEXTO_NORMAL ? ' (passa em todas as superfícies da casa)' : ' ⇒ DEPENDE do que está atrás'),
        });
        continue;
      }
      // reprova até na superfície mais favorável ⇒ reprova, ponto.
      r = melhor.r;
    } else {
      r = doisDigitos(razao(frente, fundo));
    }
    const passa = r >= AA_TEXTO_NORMAL;
    const decl = declarados.get(chave);
    if (decl) vistos.add(chave);

    if (passa) {
      if (decl) obsoletas.push({ tema, ...par, razao: r, declarado: decl.razao });
      else aprovados.push({ tema, ...par, razao: r });
      continue;
    }
    if (!decl) { reprovasNovas.push({ tema, ...par, razao: r }); continue; }
    if (r < decl.razao - EPSILON) regressoes.push({ tema, ...par, razao: r, declarado: decl.razao });
    else tolerados.push({ tema, ...par, razao: r, declarado: decl.razao, dono: decl.dono, desde: decl.desde });
  }
}

const orfas = (allowlist.pares || []).filter(p => !vistos.has(chaveDe(p)));

/* --------------------------------------------------------------- saída -- */

const vermelho = s => `\x1b[31m${s}\x1b[0m`;
const amarelo = s => `\x1b[33m${s}\x1b[0m`;
const verde = s => `\x1b[32m${s}\x1b[0m`;
const linha = p => `${p.tema.padEnd(5)} ${p.frente} sobre ${p.fundo}`;

console.log(`contraste WCAG 2.1 — AA texto normal = ${AA_TEXTO_NORMAL}:1 · fonte: ${arquivoTokens}`);
console.log(`${aprovados.length} par(es) ✓ · ${tolerados.length} no passivo declarado · ${naoVerificaveis.length} não verificável(is)\n`);

for (const p of tolerados) {
  console.log(`${amarelo('~')} ${linha(p)}  ${p.razao}:1  [passivo declarado desde ${p.desde} · dono: ${p.dono}]`);
}
for (const p of naoVerificaveis) {
  console.log(`${amarelo('?')} ${linha(p)}  NÃO VERIFICÁVEL — ${p.motivo}`);
}
for (const p of reprovasNovas) {
  console.log(`${vermelho('✗')} ${linha(p)}  ${p.razao}:1  REPROVA AA e NÃO está declarado no passivo`);
}
for (const p of regressoes) {
  console.log(`${vermelho('✗')} ${linha(p)}  ${p.razao}:1  REGREDIU (o passivo declarava ${p.declarado}:1)`);
}
for (const p of obsoletas) {
  console.log(`${vermelho('✗')} ${linha(p)}  ${p.razao}:1  agora PASSA — remova a entrada de contrast-allowlist.json`);
}
for (const p of orfas) {
  console.log(`${vermelho('✗')} ${p.tema} ${p.frente} sobre ${p.fundo}  entrada órfã na allowlist: o par não existe mais`);
}

const falhas = reprovasNovas.length + regressoes.length + obsoletas.length + orfas.length;
if (falhas) {
  console.log(`\n${falhas} problema(s) de contraste. Corrija o par, ou — se for decisão de marca — declare no passivo com valor medido, data e dono.`);
  process.exit(1);
}
console.log(verde('\n✓ nenhuma regressão de contraste.'));
if (tolerados.length) {
  console.log(amarelo(`⚠ ${tolerados.length} par(es) seguem reprovando AA no passivo declarado — isto NÃO é conformidade, é dívida visível.`));
}
