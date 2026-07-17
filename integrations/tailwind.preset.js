/* Cativa DS — preset Tailwind. Mapeia utilitários para as CSS vars (--cds-*).
   uso: module.exports = { presets: [require('./cativa-ds/integrations/tailwind.preset.js')] } */
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: 'var(--cds-bg)', surface: 'var(--cds-surface)',
        'surface-2': 'var(--cds-surface-2)', 'surface-3': 'var(--cds-surface-3)',
        border: 'var(--cds-border)', 'border-strong': 'var(--cds-border-strong)',
        text: 'var(--cds-text)', 'text-2': 'var(--cds-text-2)', 'text-3': 'var(--cds-text-3)',
        primary: 'var(--cds-primary)', 'primary-strong': 'var(--cds-primary-strong)',
        'primary-soft': 'var(--cds-primary-soft)',
        success: 'var(--cds-success)', danger: 'var(--cds-danger)',
        warning: 'var(--cds-warning)', info: 'var(--cds-info)',
      },
      fontFamily: {
        sans: ['Onest','system-ui','sans-serif'],
        serif: ['Newsreader','Georgia','serif'],
        mono: ['JetBrains Mono','monospace'],
      },
      borderRadius: { sm:'8px', md:'10px', lg:'14px', xl:'20px', pill:'999px' },
      boxShadow: {
        raised:'var(--cds-shadow-raised)', overlay:'var(--cds-shadow-overlay)', glow:'var(--cds-shadow-glow)',
      },
      spacing: { '2xs':'4px', xs:'8px', sm:'12px', md:'16px', lg:'24px', xl:'32px', '2xl':'48px', '3xl':'64px' },
    },
  },
};
