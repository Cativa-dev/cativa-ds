// Cativa Design System — tokens tipados
// Estado: [IMPLEMENTADO] — espelho fiel de cativa.tokens.json
// NOTA: este arquivo é para consumo em build/ferramenta. A superfície
// principal do destino (sem build step) deve usar tokens/cativa.tokens.css.
// Ele NÃO injeta estilo em runtime — é só leitura de valores.

export const cdsTokens = {
  "version": "1.1.0-export",
  "accentToken": "--cds-primary"
} as const;

// O objeto completo vive em cativa.tokens.json. Para tipar sem duplicar:
//   import tokens from './cativa.tokens.json' assert { type: 'json' };
export type CdsThemeName = 'dark' | 'light';
export type CdsColorToken =
  | 'bg' | 'surface' | 'surface-2' | 'surface-3'
  | 'border' | 'border-strong'
  | 'text' | 'text-2' | 'text-3'
  | 'primary' | 'primary-strong' | 'primary-soft' | 'on-primary'
  | 'success' | 'success-soft' | 'danger' | 'danger-soft'
  | 'warning' | 'warning-soft' | 'info' | 'info-soft'
  | 'on-warning' | 'on-success' | 'on-danger' | 'scrim';

/** Retorna a referência var() de um token de cor. Não resolve valor. */
export const colorVar = (t: CdsColorToken): string => `var(--cds-${t})`;

export default cdsTokens;
