export interface OfflineImageCategory {
  id?: string;
  category: string;
  items: {
    id: string;
    name: string;
    svgUrl: string;
    description: string;
  }[];
}

export const OFFLINE_IMAGES: OfflineImageCategory[] = [
  {
    category: 'Badges & Seals',
    items: [
      {
        id: 'gold-seal',
        name: 'Official Gold Seal',
        description: 'Verified official certificate emblem',
        svgUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><circle cx="50" cy="50" r="44" fill="%23f59e0b" stroke="%23b45309" stroke-width="3"/><circle cx="50" cy="50" r="38" fill="none" stroke="%23fef3c7" stroke-width="1.5" stroke-dasharray="3,2"/><polygon points="50,22 55,34 68,34 58,42 62,55 50,47 38,55 42,42 32,34 45,34" fill="%2378350f"/><path d="M50 56 L42 82 L50 76 L58 82 Z" fill="%23b45309"/><text x="50" y="65" font-family="Arial, sans-serif" font-size="6" font-weight="bold" fill="%2378350f" text-anchor="middle" letter-spacing="1">VERIFIED</text></svg>`
      },
      {
        id: 'approved-stamp',
        name: 'Approved Stamp',
        description: 'Official corporate approval rubber stamp',
        svgUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 60" width="140" height="60"><rect x="4" y="4" width="132" height="52" rx="6" fill="none" stroke="%2316a34a" stroke-width="4"/><rect x="8" y="8" width="124" height="44" rx="4" fill="none" stroke="%2316a34a" stroke-width="1.5" stroke-dasharray="4,2"/><text x="70" y="37" font-family="Arial, sans-serif" font-size="20" font-weight="900" fill="%2316a34a" text-anchor="middle" letter-spacing="3">APPROVED</text></svg>`
      },
      {
        id: 'confidential-stamp',
        name: 'Confidential Stamp',
        description: 'Red confidential document stamp',
        svgUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50"><rect x="3" y="3" width="154" height="44" rx="4" fill="none" stroke="%23dc2626" stroke-width="3.5"/><text x="80" y="33" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="%23dc2626" text-anchor="middle" letter-spacing="2">CONFIDENTIAL</text></svg>`
      }
    ]
  },
  {
    id: 'decorations',
    category: 'Decorative Dividers & Headers',
    items: [
      {
        id: 'floral-divider',
        name: 'Classic Floral Divider',
        description: 'Elegant page flourish separator',
        svgUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 30" width="300" height="30"><path d="M10,15 L110,15 M190,15 L290,15" stroke="%23185abd" stroke-width="1.5"/><circle cx="150" cy="15" r="4" fill="%23185abd"/><path d="M130,15 Q140,5 150,15 Q160,5 170,15 Q160,25 150,15 Q140,25 130,15 Z" fill="%23185abd" fill-opacity="0.3" stroke="%23185abd" stroke-width="1.5"/></svg>`
      },
      {
        id: 'modern-wave-banner',
        name: 'Corporate Header Wave',
        description: 'Clean modern top accent header',
        svgUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 60" width="500" height="60"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="%23185abd"/><stop offset="100%" stop-color="%2338bdf8"/></linearGradient></defs><path d="M0,0 L500,0 L500,35 Q375,60 250,30 T0,40 Z" fill="url(%23g)"/></svg>`
      },
      {
        id: 'gold-accent-line',
        name: 'Luxury Gold Divider',
        description: 'Prestige double line with diamond',
        svgUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 24" width="300" height="24"><line x1="10" y1="12" x2="135" y2="12" stroke="%23b45309" stroke-width="1.5"/><line x1="165" y1="12" x2="290" y2="12" stroke="%23b45309" stroke-width="1.5"/><polygon points="150,5 157,12 150,19 143,12" fill="%23f59e0b" stroke="%23b45309" stroke-width="1"/></svg>`
      }
    ]
  },
  {
    id: 'signatures',
    category: 'Signatures & Icons',
    items: [
      {
        id: 'digital-signature',
        name: 'Official Executive Signature',
        description: 'Realistic scripted signature mark',
        svgUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60" width="180" height="60"><path d="M15,42 Q30,12 45,30 T75,25 Q90,5 105,45 Q120,40 135,15 Q145,55 165,35" fill="none" stroke="%231e3a8a" stroke-width="2.5" stroke-linecap="round"/><line x1="10" y1="50" x2="170" y2="50" stroke="%2394a3b8" stroke-width="1" stroke-dasharray="3,3"/><text x="15" y="58" font-family="Arial, sans-serif" font-size="7" fill="%2364748b">Authorized Signatory</text></svg>`
      },
      {
        id: 'office-logo-badge',
        name: 'Azeem Office Shield',
        description: 'Blue corporate technology emblem',
        svgUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80"><path d="M40,10 L68,22 C68,48 55,68 40,74 C25,68 12,48 12,22 Z" fill="%23185abd" stroke="%230f3f82" stroke-width="2"/><path d="M40,22 L40,62 M28,40 L52,40" stroke="white" stroke-width="4" stroke-linecap="round"/></svg>`
      }
    ]
  }
];
