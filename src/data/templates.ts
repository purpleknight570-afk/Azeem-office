import { PageTemplate } from '../types';

export const PAGE_TEMPLATES: PageTemplate[] = [
  {
    id: 'blank',
    name: 'Blank Document',
    category: 'Blank',
    description: 'Start with a clean, empty canvas. Design your own headings, paragraphs, borders, and colors.',
    previewBg: '#ffffff',
    previewBorder: '#e2e8f0',
    backgroundColor: '#ffffff',
    textColor: '#1e293b',
    accentColor: '#185abd',
    fontFamily: 'Calibri, Plus Jakarta Sans, sans-serif',
    border: {
      style: 'none',
      color: '#cbd5e1',
      width: 0,
      inset: 0,
      radius: 0
    },
    initialContent: `
      <h1>Untitled Document</h1>
      <p>Start typing your paragraphs here. Use the toolbar above to change text size, font family, text color, background color, add page boundaries, or insert images from your device or offline library.</p>
    `
  },
  {
    id: 'formal-bordered',
    name: 'Formal Certificate / Award',
    category: 'Formal',
    description: 'Prestige certificate design with double-lined gold boundaries, formal heading, and signature line.',
    previewBg: '#fefce8',
    previewBorder: '#ca8a04',
    backgroundColor: '#fffdf5',
    textColor: '#422006',
    accentColor: '#ca8a04',
    fontFamily: 'Georgia, serif',
    border: {
      style: 'certificate',
      color: '#b45309',
      width: 4,
      inset: 12,
      radius: 4
    },
    initialContent: `
      <div style="text-align: center; padding: 20px 10px;">
        <h3 style="letter-spacing: 4px; text-transform: uppercase; color: #b45309; font-size: 13pt; margin-bottom: 8px;">Certificate of Recognition</h3>
        <h1 style="font-size: 30pt; color: #78350f; font-family: 'Cinzel', Georgia, serif; margin: 12px 0;">SPECIAL ACHIEVEMENT AWARD</h1>
        <p style="font-style: italic; color: #854d0e; font-size: 13pt; margin: 16px 0 8px 0;">This distinguished honor is proudly presented to</p>
        <h2 style="font-size: 24pt; color: #1e3a8a; border-bottom: 2px solid #ca8a04; display: inline-block; padding-bottom: 4px; margin: 8px 0 20px 0;">[Recipient Full Name]</h2>
        <p style="max-width: 580px; margin: 0 auto 28px auto; line-height: 1.6; font-size: 11pt; color: #57534e;">For exceptional leadership, distinguished contributions, and outstanding dedication demonstrated throughout the year 2026.</p>
        <div style="display: flex; justify-content: space-around; margin-top: 40px; padding-top: 20px;">
          <div style="text-align: center; border-top: 1px solid #78350f; width: 200px; padding-top: 6px;">
            <p style="margin: 0; font-weight: bold; font-size: 10pt;">Azeem Director</p>
            <p style="margin: 0; font-size: 8.5pt; color: #78350f;">Executive Authority</p>
          </div>
          <div style="text-align: center; border-top: 1px solid #78350f; width: 200px; padding-top: 6px;">
            <p style="margin: 0; font-weight: bold; font-size: 10pt;">Date of Issuance</p>
            <p style="margin: 0; font-size: 8.5pt; color: #78350f;">October 30, 2026</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'modern-business',
    name: 'Executive Business Report',
    category: 'Professional',
    description: 'Corporate business document with crisp blue header, structured deliverables, and thin clean boundary.',
    previewBg: '#ffffff',
    previewBorder: '#185abd',
    backgroundColor: '#ffffff',
    textColor: '#1e293b',
    accentColor: '#185abd',
    fontFamily: 'Plus Jakarta Sans, Calibri, sans-serif',
    border: {
      style: 'solid',
      color: '#185abd',
      width: 2,
      inset: 8,
      radius: 0
    },
    initialContent: `
      <div style="border-bottom: 3px solid #185abd; padding-bottom: 12px; margin-bottom: 20px;">
        <h1 style="color: #185abd; font-size: 24pt; margin: 0; font-weight: 700;">STRATEGIC PROJECT REPORT</h1>
        <p style="color: #64748b; font-size: 10pt; margin: 4px 0 0 0;">Prepared by Enterprise Operations &bull; Azeem Office Suite</p>
      </div>

      <h2>1. Project Overview &amp; Key Objectives</h2>
      <p>This report summarizes key milestone accomplishments and upcoming deliverables. Our initiative delivered a <strong>38% increase</strong> in operational throughput while ensuring complete print-ready PDF standardization across all company departments.</p>

      <h2>2. Deliverables Summary</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 14px 0;">
        <thead>
          <tr style="background-color: #185abd; color: white;">
            <th style="padding: 8px 12px; border: 1px solid #185abd; text-align: left;">Initiative Phase</th>
            <th style="padding: 8px 12px; border: 1px solid #185abd; text-align: left;">Lead Department</th>
            <th style="padding: 8px 12px; border: 1px solid #185abd; text-align: right;">Completion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">Digital Document Engine</td>
            <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">Architecture Team</td>
            <td style="padding: 8px 12px; border: 1px solid #e2e8f0; text-align: right; font-weight: bold; color: #16a34a;">100%</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">Vector PDF Export Suite</td>
            <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">Core Systems</td>
            <td style="padding: 8px 12px; border: 1px solid #e2e8f0; text-align: right; font-weight: bold; color: #16a34a;">100%</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">Offline Asset Integration</td>
            <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">Client Experience</td>
            <td style="padding: 8px 12px; border: 1px solid #e2e8f0; text-align: right; font-weight: bold; color: #16a34a;">95%</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Action Items &amp; Next Steps</h2>
      <p>The team will commence phase 4 validation next Tuesday. Please review all budget tables before final committee submission.</p>
    `
  },
  {
    id: 'vintage-manuscript',
    name: 'Vintage Classic Manuscript',
    category: 'Creative',
    description: 'Parchment toned paper with double vintage boundaries, serif typography, and elegant quotes.',
    previewBg: '#fef3c7',
    previewBorder: '#92400e',
    backgroundColor: '#faf6eb',
    textColor: '#292524',
    accentColor: '#92400e',
    fontFamily: 'Merriweather, EB Garamond, serif',
    border: {
      style: 'double',
      color: '#78350f',
      width: 4,
      inset: 10,
      radius: 2
    },
    initialContent: `
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="font-size: 24pt; color: #78350f; font-family: 'EB Garamond', serif; margin-bottom: 4px;">THE ARCHITECTURE OF SILENCE</h1>
        <p style="font-style: italic; color: #92400e; font-size: 11pt; margin-top: 0;">Essays on Typography, Space, and Thought</p>
      </div>

      <p style="line-height: 1.8; text-indent: 28px; font-size: 11pt;">In an age consumed by rapid digital fleetingness, the printed page remains a quiet sanctuary. When ink meets paper&mdash;or when precise digital rendering reproduces its tactile weight&mdash;thought slows down, sharpening into deliberate contemplation.</p>

      <blockquote style="border-left: 3px solid #92400e; padding-left: 16px; margin: 20px 24px; font-style: italic; color: #78350f; line-height: 1.6;">
        &ldquo;Typography is the craft of endowing human language with a durable visual form, and thus with an independent existence.&rdquo;
        <br/><span style="font-size: 9.5pt; font-style: normal; color: #57534e;">&mdash; Robert Bringhurst</span>
      </blockquote>

      <p style="line-height: 1.8; text-indent: 28px; font-size: 11pt;">Every margin is not merely empty space; it is the frame through which words are given breath. By selecting intentional boundaries and harmonious type scale, we respect both the author's voice and the reader's gaze.</p>
    `
  },
  {
    id: 'creative-newsletter',
    name: 'Creative Studio Flyer',
    category: 'Creative',
    description: 'Modern vibrant design with soft violet/slate background, bold title styling, and clean paragraphs.',
    previewBg: '#f1f5f9',
    previewBorder: '#6366f1',
    backgroundColor: '#f8fafc',
    textColor: '#0f172a',
    accentColor: '#4f46e5',
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    border: {
      style: 'modern-frame',
      color: '#4f46e5',
      width: 3,
      inset: 8,
      radius: 8
    },
    initialContent: `
      <div style="background: linear-gradient(135deg, #4f46e5, #06b6d4); color: white; padding: 24px 20px; border-radius: 6px; margin-bottom: 20px;">
        <h1 style="color: white; font-size: 26pt; margin: 0; font-weight: 800;">DESIGN &amp; INNOVATION</h1>
        <p style="margin: 6px 0 0 0; opacity: 0.9; font-size: 11pt;">Monthly Dispatch from the Azeem Creative Workshop &bull; Issue 12</p>
      </div>

      <h2>Spotlight: The Power of Vector PDF Synthesis</h2>
      <p>We are thrilled to unveil our new document crafting toolkit. Whether designing personal notes, corporate briefings, or formal certificates, users can now customize text sizes, palettes, boundaries, and embedded media with real-time responsiveness.</p>

      <div style="background-color: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 16px 0;">
        <h3 style="color: #4f46e5; margin-top: 0;">Feature Highlights:</h3>
        <ul style="margin-bottom: 0; padding-left: 20px; line-height: 1.6;">
          <li><strong>Zero-Lag Formatting:</strong> Headings, alignments, and fonts adapt instantly.</li>
          <li><strong>Offline &amp; Device Imagery:</strong> Insert device photos or built-in official stamps.</li>
          <li><strong>Custom Boundaries:</strong> Select from solid, certificate, ornate, or double borders.</li>
        </ul>
      </div>

      <p>Enjoy crafting your next publication with complete artistic freedom!</p>
    `
  }
];
