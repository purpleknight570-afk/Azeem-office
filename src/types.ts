export type PageSize = 'a4' | 'letter' | 'legal';
export type PageOrientation = 'portrait' | 'landscape';

export type BorderStyle = 
  | 'none' 
  | 'solid' 
  | 'double' 
  | 'dashed' 
  | 'dotted' 
  | 'groove' 
  | 'certificate' 
  | 'ornate' 
  | 'modern-frame';

export interface PageBorder {
  style: BorderStyle;
  color: string;
  width: number; // in pixels
  inset: number; // margin from page edge in mm
  radius: number; // border radius in px
}

export interface DocumentImage {
  id: string;
  src: string;
  alt: string;
  width: number; // percentage or px
  alignment: 'left' | 'center' | 'right' | 'full';
  caption?: string;
  borderRadius?: number;
  border?: boolean;
}

export interface PageTemplate {
  id: string;
  name: string;
  category: 'Blank' | 'Modern' | 'Professional' | 'Creative' | 'Formal';
  description: string;
  previewBg: string;
  previewBorder?: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  border: PageBorder;
  initialContent: string;
  pageSize?: PageSize;
}

export interface DocumentState {
  title: string;
  content: string; // HTML string for contentEditable
  pageSize: PageSize;
  orientation: PageOrientation;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: number;
  border: PageBorder;
  images: DocumentImage[];
  headerText: string;
  footerText: string;
  showPageNumber: boolean;
  watermarkText: string;
  watermarkOpacity: number;
}
