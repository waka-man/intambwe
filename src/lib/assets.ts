// Base-path-aware asset helpers for GitHub Pages (project site).
// import.meta.env.BASE_URL is '/' in dev and '/intambwe/' in production.
export const base: string = import.meta.env.BASE_URL;
export const asset = (p: string): string => `${base}${p.replace(/^\//, '')}`;
export const siteUrl = 'https://waka-man.github.io';
export const absAsset = (p: string): string => `${siteUrl}${base}${p.replace(/^\//, '')}`;
