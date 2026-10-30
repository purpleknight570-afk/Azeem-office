import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PDFExportOptions {
  filename?: string;
  pageSize?: 'a4' | 'letter' | 'legal';
  orientation?: 'portrait' | 'landscape';
  quality?: number; // 1, 2, or 3
}

/**
 * Downloads a pristine PDF directly from the page DOM element.
 */
export async function exportElementToPDF(
  element: HTMLElement,
  options: PDFExportOptions = {}
): Promise<boolean> {
  const {
    filename = 'azeem-document.pdf',
    pageSize = 'a4',
    orientation = 'portrait',
    quality = 2
  } = options;

  try {
    // Hide any temporary toolbars or editing highlights during capture
    const originalShadow = element.style.boxShadow;
    element.style.boxShadow = 'none';

    // Capture using html2canvas with high scale for vector-like clarity
    const canvas = await html2canvas(element, {
      scale: quality,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    element.style.boxShadow = originalShadow;

    const imgData = canvas.toDataURL('image/png', 1.0);

    // Initialize jsPDF
    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'mm',
      format: pageSize,
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate aspect ratio
    const ratio = canvasWidth / canvasHeight;
    const renderHeight = pdfWidth / ratio;

    if (renderHeight <= pdfHeight) {
      // Single page fits cleanly
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, renderHeight);
    } else {
      // Multi-page slicing if content overflows
      let heightLeft = renderHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, renderHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = position - pdfHeight;
        pdf.addPage(pageSize, orientation);
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, renderHeight);
        heightLeft -= pdfHeight;
      }
    }

    const safeFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    pdf.save(safeFilename);
    return true;
  } catch (error) {
    console.error('PDF export error:', error);
    // As a fail-safe fallback, trigger native print dialog
    window.print();
    return false;
  }
}

/**
 * Triggers native browser print dialog for crisp vector PDF export
 */
export function triggerPrintPDF(): void {
  window.print();
}
