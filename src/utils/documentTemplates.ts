export interface DocumentTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  badge?: string;
  title: string;
  initialContent: string;
  margins?: { top: number; right: number; bottom: number; left: number };
}

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'blank',
    name: 'Blank Document',
    category: 'General',
    description: 'Start fresh with a clean, unformatted Microsoft Office page.',
    icon: 'FileText',
    title: 'Document1.docx',
    initialContent: `<p>Start typing your document here...</p>`
  },
  {
    id: 'business-proposal',
    name: 'Executive Business Proposal',
    category: 'Business',
    badge: 'Popular',
    description: 'Formal corporate project proposal with executive summary, deliverables, and budget table.',
    icon: 'Briefcase',
    title: 'Executive_Project_Proposal.docx',
    initialContent: `
      <h1 style="color: #185abd; font-size: 26pt; margin-bottom: 4pt; border-bottom: 2px solid #185abd; padding-bottom: 8pt;">PROJECT PROPOSAL &amp; STRATEGY</h1>
      <p style="font-size: 11pt; color: #666; margin-top: 4pt; margin-bottom: 16pt;">Prepared by Azeem Office Solutions &bull; Published: October 2026</p>

      <h2>1. Executive Summary</h2>
      <p>This proposal outlines the strategic initiative to modernize client operations, streamline document lifecycles, and implement cloud-native workflow automation. Our objective is to reduce operational turnaround by <strong>42%</strong> while elevating enterprise publication fidelity to global standards.</p>

      <h2>2. Project Objectives &amp; Scope</h2>
      <p>The engagement spans four prioritized development phases focused on security, compliance, and multi-format document delivery:</p>
      <ul>
        <li><strong>Architecture Alignment:</strong> Unified typographic hierarchy and brand asset management.</li>
        <li><strong>Automated PDF Engine:</strong> Instant client-side vector rendering with zero server latency.</li>
        <li><strong>Collaboration &amp; Review:</strong> Integrated inline comments, version tracking, and cryptographic watermarks.</li>
      </ul>

      <h2>3. Deliverables &amp; Milestones</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 12pt;">
        <thead>
          <tr style="background-color: #185abd; color: white;">
            <th style="padding: 10px; border: 1px solid #185abd; text-align: left;">Phase / Milestone</th>
            <th style="padding: 10px; border: 1px solid #185abd; text-align: left;">Key Deliverable</th>
            <th style="padding: 10px; border: 1px solid #185abd; text-align: center;">Timeline</th>
            <th style="padding: 10px; border: 1px solid #185abd; text-align: right;">Budget</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce;">Phase 1: Discovery</td>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce;">Workflow audit &amp; compliance matrix</td>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce; text-align: center;">Weeks 1&ndash;2</td>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce; text-align: right;">$8,500</td>
          </tr>
          <tr style="background-color: #f9fbfd;">
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce;">Phase 2: Implementation</td>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce;">Core publishing suite deployment</td>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce; text-align: center;">Weeks 3&ndash;6</td>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce; text-align: right;">$24,000</td>
          </tr>
          <tr>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce;">Phase 3: QA &amp; Testing</td>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce;">High-resolution vector PDF validation</td>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce; text-align: center;">Weeks 7&ndash;8</td>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce; text-align: right;">$7,500</td>
          </tr>
        </tbody>
      </table>

      <h2 style="margin-top: 16pt;">4. Authorization &amp; Sign-off</h2>
      <p>By signing below, both parties confirm agreement to the deliverables, milestone dates, and terms specified above.</p>
      <div style="display: flex; justify-content: space-between; margin-top: 24pt; padding-top: 12pt;">
        <div style="border-top: 1px solid #333; width: 42%; text-align: center; padding-top: 4pt;">
          <strong>Azeem Executive Director</strong><br/>
          <span style="font-size: 9pt; color: #666;">Azeem Office Technologies</span>
        </div>
        <div style="border-top: 1px solid #333; width: 42%; text-align: center; padding-top: 4pt;">
          <strong>Authorized Client Representative</strong><br/>
          <span style="font-size: 9pt; color: #666;">Date: ________________________</span>
        </div>
      </div>
    `
  },
  {
    id: 'modern-resume',
    name: 'Modern Executive Resume',
    category: 'Personal',
    badge: 'Recommended',
    description: 'Clean typographic CV with two-column layout, skills metrics, and experience highlights.',
    icon: 'UserCheck',
    title: 'Azeem_Modern_Resume.docx',
    initialContent: `
      <div style="border-bottom: 2px solid #185abd; padding-bottom: 12pt; margin-bottom: 14pt;">
        <h1 style="margin: 0; color: #185abd; font-size: 26pt; letter-spacing: -0.5px;">AZEEM T. SULAIMAN</h1>
        <p style="margin: 4pt 0 0 0; font-size: 13pt; color: #444; font-weight: 500;">Lead Software Architect &bull; Document Systems Specialist</p>
        <p style="margin: 4pt 0 0 0; font-size: 9.5pt; color: #666;">
          azeem@example.com &bull; +1 (555) 349-8800 &bull; San Francisco, CA &bull; linkedin.com/in/azeem
        </p>
      </div>

      <h2 style="font-size: 13pt; text-transform: uppercase; color: #185abd; margin-bottom: 6pt;">Professional Summary</h2>
      <p style="margin-top: 0;">Visionary technology leader with 9+ years architecting desktop-class web applications, office productivity suites, and real-time document publishing pipelines. Proven track record of scaling vector PDF engines serving millions of documents monthly with 99.99% fidelity.</p>

      <h2 style="font-size: 13pt; text-transform: uppercase; color: #185abd; margin-top: 14pt; margin-bottom: 6pt;">Core Competencies</h2>
      <p style="margin-top: 0;">
        <strong>Architecture:</strong> Desktop-Class Web Apps, Vector PDF Generation, Rich Text DOM Engines, State Machines<br/>
        <strong>Technologies:</strong> React 19, TypeScript, jsPDF, WebGL, Canvas API, Tailwind CSS, Express, Node.js<br/>
        <strong>Design &amp; Standards:</strong> WCAG 2.1 AA Compliance, Typography Grids, Print Layout Fidelity, Office Ribbon UX
      </p>

      <h2 style="font-size: 13pt; text-transform: uppercase; color: #185abd; margin-top: 14pt; margin-bottom: 6pt;">Work Experience</h2>

      <div style="margin-bottom: 12pt;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <strong style="font-size: 11pt; color: #222;">Principal Architect &mdash; Office Platforms Inc.</strong>
          <span style="font-size: 9.5pt; color: #777;">2023 &ndash; Present</span>
        </div>
        <p style="margin: 2pt 0; font-style: italic; color: #555; font-size: 10pt;">Leading core document engineering, ribbon framework, and export capabilities</p>
        <ul>
          <li>Engineered next-generation web document editor supporting real-time pagination, ink drawing, and multi-column layouts.</li>
          <li>Optimized client-side PDF export throughput by 68%, generating 300 DPI vector outputs under 800ms.</li>
        </ul>
      </div>

      <div style="margin-bottom: 12pt;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <strong style="font-size: 11pt; color: #222;">Senior Software Engineer &mdash; CloudDocs Technologies</strong>
          <span style="font-size: 9.5pt; color: #777;">2020 &ndash; 2023</span>
        </div>
        <ul>
          <li>Developed WYSIWYG formatting toolbar with 50+ typography controls, undo/redo stacks, and clipboard format painter.</li>
          <li>Implemented high-fidelity SVG shape insertion and dynamic Table of Contents calculation.</li>
        </ul>
      </div>

      <h2 style="font-size: 13pt; text-transform: uppercase; color: #185abd; margin-top: 14pt; margin-bottom: 6pt;">Education &amp; Certifications</h2>
      <p style="margin-top: 0;">
        <strong>B.S. in Computer Science &amp; Systems Engineering</strong> &bull; Stanford University &bull; Honors<br/>
        <em>Certified Solutions Architect &bull; Professional Scrum Master</em>
      </p>
    `
  },
  {
    id: 'financial-report',
    name: 'Quarterly Financial Report',
    category: 'Finance',
    description: 'Executive quarterly report featuring KPI metrics, revenue breakdowns, and balance highlights.',
    icon: 'TrendingUp',
    title: 'Q3_Financial_Performance_Report.docx',
    initialContent: `
      <h1 style="color: #185abd; font-size: 24pt; margin-bottom: 2pt;">Q3 FISCAL PERFORMANCE REPORT</h1>
      <p style="color: #555; font-size: 10.5pt; margin-top: 0; margin-bottom: 16pt;">Comprehensive Financial Review &bull; Period Ending September 30, 2026</p>

      <blockquote style="margin: 0 0 16pt 0; padding: 10pt 14pt; background-color: #f0f7ff; border-left: 4px solid #185abd;">
        <strong>Executive Takeaway:</strong> Consolidated recurring revenue grew <strong>+31.4% YoY</strong>, driven by enterprise adoption of digital office suites and streamlined PDF automated workflows.
      </blockquote>

      <h2>1. Key Financial Highlights</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10pt;">
        <thead>
          <tr style="background-color: #f3f2f1;">
            <th style="padding: 8px; border: 1px solid #d2d0ce; text-align: left;">Metric</th>
            <th style="padding: 8px; border: 1px solid #d2d0ce; text-align: right;">Q3 2025</th>
            <th style="padding: 8px; border: 1px solid #d2d0ce; text-align: right;">Q3 2026</th>
            <th style="padding: 8px; border: 1px solid #d2d0ce; text-align: right;">Variance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px; border: 1px solid #d2d0ce;">Total Revenue</td>
            <td style="padding: 8px; border: 1px solid #d2d0ce; text-align: right; font-variant-numeric: tabular-nums;">$14.2M</td>
            <td style="padding: 8px; border: 1px solid #d2d0ce; text-align: right; font-variant-numeric: tabular-nums; font-weight: bold; color: #185abd;">$18.7M</td>
            <td style="padding: 8px; border: 1px solid #d2d0ce; text-align: right; color: #16a34a; font-weight: bold;">+31.7%</td>
          </tr>
          <tr style="background-color: #fafafa;">
            <td style="padding: 8px; border: 1px solid #d2d0ce;">Gross Margin</td>
            <td style="padding: 8px; border: 1px solid #d2d0ce; text-align: right; font-variant-numeric: tabular-nums;">74.1%</td>
            <td style="padding: 8px; border: 1px solid #d2d0ce; text-align: right; font-variant-numeric: tabular-nums; font-weight: bold; color: #185abd;">78.5%</td>
            <td style="padding: 8px; border: 1px solid #d2d0ce; text-align: right; color: #16a34a; font-weight: bold;">+4.4 pts</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #d2d0ce;">Operating Income (EBIT)</td>
            <td style="padding: 8px; border: 1px solid #d2d0ce; text-align: right; font-variant-numeric: tabular-nums;">$3.8M</td>
            <td style="padding: 8px; border: 1px solid #d2d0ce; text-align: right; font-variant-numeric: tabular-nums; font-weight: bold; color: #185abd;">$5.4M</td>
            <td style="padding: 8px; border: 1px solid #d2d0ce; text-align: right; color: #16a34a; font-weight: bold;">+42.1%</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Operational Outlook &amp; Recommendations</h2>
      <p>Moving into Q4, the company will allocate capital into two primary growth pillars:</p>
      <ol>
        <li>Expansion of automated serverless document conversion pipelines.</li>
        <li>Enterprise security hardening and multi-tier cryptographic watermarking.</li>
      </ol>
    `
  },
  {
    id: 'formal-invoice',
    name: 'Professional Invoice & Statement',
    category: 'Billing',
    description: 'Formatted itemized commercial invoice with company header, payment terms, and total calculations.',
    icon: 'Receipt',
    title: 'Invoice_AZ-2026-889.docx',
    initialContent: `
      <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #185abd; padding-bottom: 14pt; margin-bottom: 14pt;">
        <div>
          <h1 style="color: #185abd; font-size: 26pt; margin: 0;">AZEEM OFFICE</h1>
          <p style="color: #666; font-size: 9.5pt; margin: 4pt 0 0 0;">Enterprise Document &amp; Cloud Publishing</p>
          <p style="color: #777; font-size: 9pt; margin: 2pt 0 0 0;">100 Market Street, Suite 400 &bull; San Francisco, CA</p>
        </div>
        <div style="text-align: right;">
          <h2 style="font-size: 20pt; color: #333; margin: 0;">INVOICE</h2>
          <p style="font-size: 10pt; margin: 4pt 0 0 0;"><strong>Invoice #:</strong> AZ-2026-889</p>
          <p style="font-size: 10pt; margin: 2pt 0 0 0;"><strong>Date:</strong> October 30, 2026</p>
          <p style="font-size: 10pt; margin: 2pt 0 0 0;"><strong>Due Date:</strong> November 29, 2026</p>
        </div>
      </div>

      <div style="margin-bottom: 16pt;">
        <strong style="color: #185abd; font-size: 10pt; text-transform: uppercase;">Billed To:</strong><br/>
        <strong style="font-size: 11pt;">Acme Global Enterprises LLC</strong><br/>
        <span style="font-size: 10pt; color: #555;">Attn: Finance &amp; Operations Dept.</span><br/>
        <span style="font-size: 10pt; color: #555;">500 Tech Parkway, Suite 1200 &bull; New York, NY 10001</span>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16pt;">
        <thead>
          <tr style="background-color: #185abd; color: white;">
            <th style="padding: 10px; border: 1px solid #185abd; text-align: left;">Item Description</th>
            <th style="padding: 10px; border: 1px solid #185abd; text-align: center;">Qty</th>
            <th style="padding: 10px; border: 1px solid #185abd; text-align: right;">Unit Rate</th>
            <th style="padding: 10px; border: 1px solid #185abd; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce;">Azeem Office Enterprise License (Annual)</td>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce; text-align: center;">25</td>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce; text-align: right;">$240.00</td>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce; text-align: right;">$6,000.00</td>
          </tr>
          <tr style="background-color: #fbfcfd;">
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce;">Custom Vector PDF Template Integration</td>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce; text-align: center;">1</td>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce; text-align: right;">$1,850.00</td>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce; text-align: right;">$1,850.00</td>
          </tr>
          <tr>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce;">Implementation &amp; Team Training Session</td>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce; text-align: center;">4 hrs</td>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce; text-align: right;">$225.00</td>
            <td style="padding: 8px 10px; border: 1px solid #d2d0ce; text-align: right;">$900.00</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="padding: 8px 10px; text-align: right; border: 1px solid #d2d0ce;"><strong>Subtotal:</strong></td>
            <td style="padding: 8px 10px; text-align: right; border: 1px solid #d2d0ce; font-weight: bold;">$8,750.00</td>
          </tr>
          <tr>
            <td colspan="3" style="padding: 8px 10px; text-align: right; border: 1px solid #d2d0ce;">Tax (0.0%):</td>
            <td style="padding: 8px 10px; text-align: right; border: 1px solid #d2d0ce;">$0.00</td>
          </tr>
          <tr style="background-color: #e8f0fe; color: #185abd;">
            <td colspan="3" style="padding: 10px; text-align: right; border: 1px solid #d2d0ce; font-size: 12pt;"><strong>Total Due:</strong></td>
            <td style="padding: 10px; text-align: right; border: 1px solid #d2d0ce; font-size: 13pt; font-weight: bold;">$8,750.00</td>
          </tr>
        </tfoot>
      </table>

      <div style="background-color: #f9f9f9; padding: 10pt; border: 1px solid #e0e0e0; font-size: 9.5pt; color: #555;">
        <strong>Payment Instructions:</strong> Wire transfer to Bank of America, Routing #021000089, Acct #9842103328. Please reference Invoice #AZ-2026-889 with payment remittance.
      </div>
    `
  },
  {
    id: 'academic-paper',
    name: 'Academic Research Paper',
    category: 'Education',
    description: 'Formatted scholarly paper with abstract, numbered citations, and research methodology.',
    icon: 'GraduationCap',
    title: 'Research_Paper_Azeem.docx',
    initialContent: `
      <div style="text-align: center; margin-bottom: 24pt;">
        <h1 style="font-size: 22pt; margin-bottom: 8pt; color: #111;">High-Fidelity Client-Side Document Rendering and Vector PDF Synthesis in Modern Web Runtimes</h1>
        <p style="font-size: 11pt; color: #444; margin-bottom: 4pt;"><strong>Azeem T. Sulaiman</strong><sup>1</sup>, <strong>Dr. Helena Vance</strong><sup>2</sup></p>
        <p style="font-size: 9.5pt; color: #666;"><sup>1</sup>Department of Computer Science, Applied Systems Laboratory<br/><sup>2</sup>Center for Distributed Document Standards</p>
      </div>

      <div style="margin: 0 20pt 20pt 20pt; padding: 10pt 16pt; background-color: #fafafa; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc;">
        <h3 style="text-align: center; font-size: 11pt; text-transform: uppercase; margin-top: 0;">Abstract</h3>
        <p style="font-size: 9.5pt; line-height: 1.6; text-align: justify; margin-bottom: 0;">This paper investigates algorithmic techniques for replicating desktop publishing functionality inside zero-dependency client browsers. We present an architecture combining synthetic DOM pagination, vector path ink overlays, and multi-threaded raster-to-vector PDF compilation. Empirical evaluations demonstrate a 4.2x reduction in memory footprints compared to traditional headless browser server clusters.</p>
      </div>

      <h2>1. Introduction</h2>
      <p>For decades, enterprise word processing has remained tethered to desktop operating system APIs. While web-based alternatives emerged, early iterations struggled with print-ready pagination, accurate font metric calculations, and offline vector synthesis.</p>

      <h2>2. Methodology &amp; Mathematical Formulation</h2>
      <p>Given a page container height <em>H</em> and line metrics &lambda;, the page break threshold &Phi; is computed as:</p>
      <blockquote style="font-family: 'JetBrains Mono', monospace; font-size: 10pt; background: #f4f4f4; padding: 8pt 12pt; border-left: 3px solid #185abd;">
        &Phi;(n) = &sum;<sub>i=1</sub><sup>n</sup> h(b<sub>i</sub>) + &Delta;<sub>margin</sub> &le; H<sub>page</sub> - &Gamma;<sub>footer</sub>
      </blockquote>

      <h2>3. References</h2>
      <ol style="font-size: 9pt; color: #444;">
        <li>Sulaiman, A. (2025). <em>Desktop-Class Web Applications: Architectures and Real-Time State Engines</em>. MIT Press.</li>
        <li>Vance, H., &amp; Miller, R. (2024). "High-Resolution Client PDF Synthesis without Server Roundtrips." <em>ACM Transactions on Graphics</em>, 42(3), 112&ndash;128.</li>
      </ol>
    `
  }
];
