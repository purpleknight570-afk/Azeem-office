export type RibbonTab =
  | 'file'
  | 'home'
  | 'insert'
  | 'draw'
  | 'layout'
  | 'references'
  | 'review'
  | 'view'
  | 'help';

export type PageSize = 'letter' | 'a4' | 'legal' | 'a5';
export type PageOrientation = 'portrait' | 'landscape';
export type ViewMode = 'print' | 'web' | 'reading';

export interface PageMargins {
  top: number; // in mm
  right: number;
  bottom: number;
  left: number;
  preset: 'normal' | 'narrow' | 'moderate' | 'wide' | 'custom';
}

export interface WatermarkSettings {
  text: string;
  opacity: number;
  color: string;
  angle: number;
  fontSize: number;
}

export interface HeaderFooterSettings {
  headerText: string;
  footerText: string;
  showHeader: boolean;
  showFooter: boolean;
  showPageNumbers: boolean;
  pageNumberPosition: 'top-right' | 'bottom-right' | 'bottom-center' | 'bottom-left';
  pageNumberFormat: 'page' | 'pageXofY';
}

export interface DocumentComment {
  id: string;
  author: string;
  text: string;
  selectedText?: string;
  createdAt: string;
  resolved: boolean;
}

export interface DocumentDrawingStroke {
  id: string;
  tool: 'pen' | 'highlighter';
  color: string;
  width: number;
  opacity: number;
  points: { x: number; y: number }[];
}

export interface DocumentPage {
  id: string;
  htmlContent: string;
  drawings: DocumentDrawingStroke[];
}

export interface DocumentStats {
  pages: number;
  words: number;
  characters: number;
  charactersNoSpaces: number;
  paragraphs: number;
  readingTimeMin: number;
}

export interface DocumentSettings {
  title: string;
  author: string;
  size: PageSize;
  orientation: PageOrientation;
  margins: PageMargins;
  pageColor: string;
  columns: 1 | 2 | 3;
  watermark: WatermarkSettings | null;
  headerFooter: HeaderFooterSettings;
  pageBorder: 'none' | 'box' | 'shadow' | 'double';
  borderColor: string;
  borderWidth: number;
}
