declare module 'html2canvas' {
  interface Html2CanvasOptions {
    scale?: number;
    useCORS?: boolean;
    allowTaint?: boolean;
    backgroundColor?: string | null;
    logging?: boolean;
    onclone?: (document: Document) => void;
  }

  function html2canvas(element: HTMLElement, options?: Html2CanvasOptions): Promise<HTMLCanvasElement>;
  export default html2canvas;
}

declare module 'jspdf' {
  export class jsPDF {
    constructor(options?: { unit?: string; format?: string | number[] });
    addImage(imageData: string, format: string, x: number, y: number, width?: number, height?: number): void;
    save(filename?: string): void;
    // minimal surface types
  }
}