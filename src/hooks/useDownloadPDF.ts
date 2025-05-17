// hooks/useDownloadPDF.ts
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface DownloadPDFOptions {
  fileName?: string;
  orientation?: 'p' | 'l';
  unit?: 'mm' | 'pt' | 'cm' | 'in';
  format?: 'a4' | 'letter' | string;
}

export function useDownloadPDF(ref: React.RefObject<HTMLElement>) {
  const download = async (options?: DownloadPDFOptions) => {
    if (!ref.current) return;

    const canvas = await html2canvas(ref.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: options?.orientation || 'p',
      unit: options?.unit || 'mm',
      format: options?.format || 'a4',
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${options?.fileName || 'document'}.pdf`);
  };

  return { download };
}
