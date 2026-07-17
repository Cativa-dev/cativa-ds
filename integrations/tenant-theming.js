// Cativa DS — Tenant Theming helper (GAP-DS-008)
// Injeta a cor primária do tenant nas CSS vars. Requer tenant-theming.css carregado.
// Uso:  import { applyTenantTheme } from '@cativa/design-tokens/tenant';
//       applyTenantTheme(customer);            // usa customer.colors.quaternary
//       applyTenantTheme('#0EA5E9', el);       // ou uma cor direta, em escopo específico

export function applyTenantTheme(input, root = document.documentElement) {
  const base = typeof input === 'string' ? input : input?.colors?.quaternary;
  if (!base || !isColor(base)) return false;       // sem cor válida => mantém default do DS
  root.style.setProperty('--cds-primary', base);
  root.style.setProperty('--cds-on-primary', readableOn(base));
  return true;
}

export function clearTenantTheme(root = document.documentElement) {
  root.style.removeProperty('--cds-primary');
  root.style.removeProperty('--cds-on-primary');
}

function isColor(v) { return /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v.trim()); }

// Escolhe #fff ou near-black para contraste AA sobre a cor primária do tenant.
export function readableOn(hex) {
  const { r, g, b } = parseHex(hex);
  const lin = c => { c /= 255; return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); };
  const L = 0.2126*lin(r) + 0.7152*lin(g) + 0.0722*lin(b);
  return L > 0.45 ? '#18181b' : '#ffffff';
}

function parseHex(hex) {
  let h = hex.replace('#','').trim();
  if (h.length === 3) h = h.split('').map(c => c+c).join('');
  return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) };
}
